<?php

use App\Http\Controllers\AnketaController;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Controllers\TestController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\FormCodeController;
use App\Http\Middleware\AdminMiddleware;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\FormTypeController;
use App\Http\Controllers\VideoController;
use App\Http\Controllers\OnlineTrainingController;
use App\Http\Controllers\LectureController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\StoredFileController;

if (!function_exists('findPageComponent')) {

    function findPageComponent(string $country): string
    {
        // Map geo country code -> Inertia component name (must match filenames in resources/js/pages)
        $map = [
            'LV' => 'WelcomeLv',
            'LT' => 'WelcomeLt',
            'EE' => 'WelcomeEE',
            'NO' => 'WelcomeNO',
        ];

        // Default to generic welcome page if no specific mapping
        $name = $map[$country] ?? 'welcome';

        // IMPORTANT: your folder is resources/js/pages (lowercase)
        $base = resource_path('js/pages') . DIRECTORY_SEPARATOR;
        $extensions = ['.tsx', '.jsx', '.vue', '.js'];

        foreach ($extensions as $ext) {
            if (file_exists($base . $name . $ext)) {
                return $name;
            }
        }

        // Final fallback
        return 'welcome';
    }
}

Route::post('/locale', function (Request $request) {
    $request->validate(['locale' => 'required|in:lv,en']); // adjust allowed locales
    session(['locale' => $request->locale]);
    app()->setLocale($request->locale);

    // Return JSON so axios resolves successfully
    return response()->json(['locale' => $request->locale]);
})->name('locale.switch');

Route::get('/', function (Request $request) {
    // Country code provided by DetectCountry middleware
    $country = $request->attributes->get('geo_country', config('geo.default_country', 'US'));

    // Determine locale based on country map
    $locale = session('locale')
        ?? (config('geo.map')[$country] ?? config('geo.default_locale', 'lv'));

    app()->setLocale($locale);

    // Optional sync (keep if your app needs it)
    if (function_exists('syncLangFiles')) {
        syncLangFiles('head');
    }

    // Decide which welcome page to use based on country
    $component = findPageComponent($country);

    // Render page and pass plain data
    return Inertia::render($component, [
        'detectedCountry' => $country,
        'locale' => $locale,
    ]);
})->name('home');

Route::get('/test', [TestController::class, 'test'])->name('test');

// <<<<<<<<<<<<<<<< PACIENTIEM >>>>>>>>>>>>>>>>

Route::get('pacientiem/atmp', fn() => Inertia::render('Pacientiem/atmp'))->name('Pacientiem/atmp');
Route::get('pacientiem/psoriaze-terapija', fn() => Inertia::render('Pacientiem/psoriaze-terapija'))->name('Pacientiem/psoriaze-terapija');
Route::get('pacientiem/krona-terapija', fn() => Inertia::render('Pacientiem/krona-terapija'))->name('Pacientiem/krona-terapija');
Route::get('pacientiem/faq', fn() => Inertia::render('Pacientiem/faq'))->name('Pacientiem/faq');


// <<<<<<<<<<<<<<< SPECIALISTIEM >>>>>>>>>>>>>>>>>>

Route::get('specialistiem/apmaciba', fn() => Inertia::render('Specialistiem/apmaciba'))->name('Specialistiem/apmaciba');
Route::get('specialistiem/atmp', fn() => Inertia::render('Specialistiem/atmp'))->name('Specialistiem/atmp');
Route::get('specialistiem/likumi', fn() => Inertia::render('Specialistiem/likumi'))->name('Specialistiem/likumi');

// <<<<<<<<<<<<< Kaut kas no tās puses >>>>>>>>>>>

Route::get('ParMums/contacts', fn() => Inertia::render('ParMums/contacts'))->name('contacts');
Route::get('ParMums/pievienojies-mums', fn() => Inertia::render('ParMums/pievienojiesMums'))->name('pievienojies-mums');
Route::get('ParMums/musu-grupa', fn() => Inertia::render('ParMums/musuGrupa'))->name('musu-grupa');
Route::get('ParMums/lablife', fn() => Inertia::render('ParMums/lablife'))->name('lablife');

Route::get('/anketa', fn() => Inertia::render('anketa'))->name('anketa');
Route::get('/postdock-anketa', fn() => Inertia::render('PostDockanketa'))->name('postdock-anketa');

// <<<<<<<<<<<< ANKETAS >>>>>>>>>>>>>
Route::get('/clinical-trials', fn() => Inertia::render('clinicalTrials'))->name('clinicalTrials');
Route::get(
    '/anketa-specialiste',
    fn() =>
    app(AnketaController::class)->loadByCode('specialists')
)->name('anketa.specialist.show');

Route::get(
    '/anketa-psoriāze',
    fn() =>
    app(AnketaController::class)->loadByCode('psoriasis')
)->name('anketa.psoriaze.show');

Route::get(
    '/anketa-hroniskas',
    fn() =>
    app(AnketaController::class)->loadByCode('chronic')
)->name('anketa.hroniskas.show');

Route::get('/anketa-kods', [AnketaController::class, 'showCode'])->name('anketa.koda.show');

Route::post('/anketa/store-answers', [AnketaController::class, 'storeAnswers'])->name('anketa.answers');

Route::post('/form-codes/verify', [FormCodeController::class, 'verify'])->name('formCodes.verify');

Route::post('/lecture-codes/verify', [LectureController::class, 'verifyCode'])->name('lectureCodes.verify');

// <<<<<<<<<< Video >>>>>>>>>>>>>>>>>
Route::post('/generate-temp-link/{filename}', [VideoController::class, 'generateTempLink'])->name('generate.temp.link');
Route::get('/download/{token}', [VideoController::class, 'downloadTemp'])->name('download.temp');

// <<<<<<<<<<<<<<<< DOKUMENTU DATUBĀZE (USER VIEW) >>>>>>>>>>>>>>>>>
Route::get('/datubaze', [DocumentController::class, 'index'])->name('documents.index');
Route::get('/documents/{document}/download', [DocumentController::class, 'download'])->name('documents.download');

// <<<<<<<<<< ADMIN >>>>>>>>>>>>>>>>>>

Route::prefix('admin')->middleware(AdminMiddleware::class)->group(function () {

    // <<<<<<<<<<<<<<<< ADMIN PAGES >>>>>>>>>>>>>>>>>>
    Route::get('/', fn() => Inertia::render('Admin/dashboard'))->name('admin.dashboard');
    Route::get('/content-studio', fn() => Inertia::render('Admin/contentStudio'))->name('admin.content');
    Route::get('/insights', fn() => Inertia::render('Admin/insights'))->name('admin.insights');
    Route::get('/integrations', fn() => Inertia::render('Admin/integrations'))->name('admin.integrations');
    Route::get('/missions', fn() => Inertia::render('Admin/missions'))->name('admin.missions');
    Route::get('/requests', fn() => Inertia::render('Admin/requests'))->name('admin.requests');
    Route::get('/security', [AdminController::class, 'security'])->name('admin.security');
    Route::post('/security', [AdminController::class, 'adminsStore'])->name('admin.security.store');
    Route::put('/security/{admin}', [AdminController::class, 'adminsUpdate'])->name('admin.security.update');
    Route::delete('/security/{admin}', [AdminController::class, 'adminsDestroy'])->name('admin.security.destroy');
    Route::get('/team-heatmap', fn() => Inertia::render('Admin/teamHeatmap'))->name('admin.team-heatmap');
    Route::get('/workspace', fn() => Inertia::render('Admin/workspace'))->name('admin.workspace');

    Route::get('/form-codes', [FormCodeController::class, 'index'])->name('admin.formCodes');
    Route::post('/form-codes', [FormCodeController::class, 'store'])->name('admin.formCodes.store');
    Route::delete('/form-codes/{formCode}', [FormCodeController::class, 'destroy'])->name('admin.formCodes.destroy');

    Route::get('/anketa', [AnketaController::class, 'index'])->name('admin.anketa');
    Route::get('/anketa/create', [AnketaController::class, 'create'])->name('admin.anketa.create');
    Route::post('/anketa/store', [AnketaController::class, 'store'])->name('admin.anketa.store');

    Route::get('/anketa/show/{id}', [AnketaController::class, 'show'])->name('admin.anketa.show');
    Route::get('/anketa/edit/{id}', [AnketaController::class, 'edit'])->name('admin.anketa.edit');
    Route::put('/anketa/update/{id}', [AnketaController::class, 'update'])->name('admin.anketa.update');
    Route::delete('/anketa/destroy/{id}', [AnketaController::class, 'destroy'])->name('admin.anketa.destroy');

    Route::get('/selector', [FormTypeController::class, 'index'])->name('admin.selector');
    Route::post('/selector/add', [FormTypeController::class, 'add'])->name('admin.selector.add');

    Route::get('/anketa/results', [AnketaController::class, 'resultsIndex'])->name('admin.anketa.results');
    Route::get('/anketa/results/{id}', [AnketaController::class, 'resultsShow'])->name('admin.anketa.results.show');

    Route::get('/trainings', [OnlineTrainingController::class, 'index'])->name('admin.trainings');
    Route::get('/trainings/create', [OnlineTrainingController::class, 'create'])->name('admin.trainings.create');
    Route::post('/trainings/store', [OnlineTrainingController::class, 'store'])->name('admin.trainings.store');

    Route::get('/trainings/show/{id}', [OnlineTrainingController::class, 'show'])->name('admin.trainings.show');
    Route::get('/trainings/edit/{id}', [OnlineTrainingController::class, 'edit'])->name('admin.trainings.edit');
    Route::put('/trainings/update/{id}', [OnlineTrainingController::class, 'update'])->name('admin.trainings.update');

    Route::delete('/trainings/destroy/{id}', [OnlineTrainingController::class, 'destroy'])->name('admin.trainings.destroy');

    Route::get('/lecture/codes', [LectureController::class, 'index'])->name('codes.index');
    Route::post('/lecture/codes', [LectureController::class, 'store'])->name('codes.store');
    Route::get('/lecture/codes/{id}', [LectureController::class, 'show'])->name('codes.show');
    Route::put('/lecture/codes/{id}', [LectureController::class, 'update'])->name('codes.update');
    Route::delete('/lecture/codes/{id}', [LectureController::class, 'destroy'])->name('codes.destroy');
    Route::post('/lecture/codes/{id}/regenerate', [LectureController::class, 'regenerate'])->name('codes.regenerate');

    Route::get('/files/upload', [StoredFileController::class, 'create'])->name('files.create');
    Route::post('/files', [StoredFileController::class, 'store'])->name('files.store');
    Route::get('/files/show', [StoredFileController::class, 'show'])->name('files.show');
    Route::get('/files/{id}/edit', [StoredFileController::class, 'edit'])->name('files.edit');
    Route::put('/files/update/{id}', [StoredFileController::class, 'update'])->name('files.update');
    Route::delete('/files/{id}', [StoredFileController::class, 'destroy'])->name('files.destroy');
    Route::get('/files/{id}/download', [StoredFileController::class, 'download'])->name('files.download');
});

// <<<<<<<<<< ADMIN AUTH (outside admin prefix) >>>>>>>>>>>>>>>>>>

Route::get('/admin/login', fn() => Inertia::render('Admin/login'))->name('admin.login');
Route::post('/admin/login', [AdminController::class, 'login'])->name('admin.login.submit');

Route::get('/admin/logout', function () {
    session()->forget('is_admin');   // remove the admin flag
    return redirect()->route('admin.login');
})->name('admin.logout');
