<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Form;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class FormSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Form::create([
            'code' => 'private',
            'title' => [
                'lv' => 'Anketa par psoriāzi un attieksmi pret ATMP/MSC terapijām',
                'en' => 'Questionnaire about psoriasis and attitude to ATMP/MSC therapies',
            ],
            'results' => [
                'fields' => [
                    // 1. Par Jums
                    [
                        'id' => (string) Str::uuid(),
                        'label' => ['lv' => '1.1. Vecums', 'en' => '1.1. Age'],
                        'type' => 'radio',
                        'options' => [
                            'lv' => ['Līdz 18 gadiem', '18–25', '26–40', '41–60', 'Vairāk nekā 60'],
                            'en' => ['Up to 18', '18–25', '26–40', '41–60', 'Over 60'],
                        ],
                    ],
                    [
                        'id' => (string) Str::uuid(),
                        'label' => ['lv' => '1.2. Dzimums', 'en' => '1.2. Gender'],
                        'type' => 'radio',
                        'options' => [
                            'lv' => ['Sieviete', 'Vīrietis', 'Citi / nevēlos norādīt'],
                            'en' => ['Female', 'Male', 'Other / prefer not to say'],
                        ],
                    ],

                    // 2. Psoriāze – diagnoze un slimības gaita
                    [
                        'id' => (string) Str::uuid(),
                        'label' => ['lv' => '2.1. Vai Jums ir ārsta noteikta psoriāzes diagnoze?', 'en' => '2.1. Do you have a doctor-diagnosed psoriasis?'],
                        'type' => 'radio',
                        'options' => [
                            'lv' => ['Jā, dermatologa', 'Jā, ģimenes ārsta', 'Domāju, ka ir, bet oficiāli nav diagnosticēta', 'Nē / neesmu pārliecināts(a)'],
                            'en' => ['Yes, dermatologist', 'Yes, GP/family doctor', "I think so but not officially diagnosed", 'No / not sure'],
                        ],
                    ],
                    [
                        'id' => (string) Str::uuid(),
                        'label' => ['lv' => '2.2. Cik sen Jums ir psoriāze?', 'en' => '2.2. How long have you had psoriasis?'],
                        'type' => 'radio',
                        'options' => [
                            'lv' => ['Mazāk nekā 1 gadu', '1–3 gadi', '4–10 gadi', 'Vairāk nekā 10 gadi'],
                            'en' => ['Less than 1 year', '1–3 years', '4–10 years', 'More than 10 years'],
                        ],
                    ],
                    [
                        'id' => (string) Str::uuid(),
                        'label' => ['lv' => '2.3. Kā Jūs raksturotu savas psoriāzes smagumu pēdējā gada laikā?', 'en' => '2.3. How would you describe severity of your psoriasis in the last year?'],
                        'type' => 'radio',
                        'options' => [
                            'lv' => ['Viegls – nelieli perēkļi, neliels diskomforts', 'Vidējs – vairāki perēkļi, traucē ikdienu', 'Smags – plaši bojājumi, būtiski traucē ikdienu', 'Ļoti smags – ietekmē gandrīz visas dzīves jomas'],
                            'en' => ['Mild – small patches, little discomfort', 'Moderate – several patches, affects daily life', 'Severe – extensive lesions, significantly affects daily life', 'Very severe – affects almost all life areas'],
                        ],
                    ],
                    [
                        'id' => (string) Str::uuid(),
                        'label' => ['lv' => '2.4. Kuras ķermeņa zonas visvairāk skar psoriāze? (var atzīmēt vairākas)', 'en' => '2.4. Which body areas are most affected? (multiple)'],
                        'type' => 'checkbox',
                        'options' => [
                            'lv' => ['Galvas matainā daļa', 'Elkoņi, ceļgali', 'Mugura / rumpis', 'Plaukstas / pēdas', 'Nāgas', 'Citi (lūdzu, norādiet)'],
                            'en' => ['Scalp', 'Elbows, knees', 'Back / trunk', 'Palms / soles', 'Nails', 'Other (please specify)'],
                        ],
                    ],
                    /*[
                        'id' => (string) Str::uuid(),
                        'label' => ['lv' => '2.4.1. Ja "Citi", lūdzu norādiet', 'en' => '2.4.1. If "Other", please specify'],
                        'type' => 'text',
                        'placeholder' => ['lv' => 'Rakstiet šeit', 'en' => 'Please specify'],
                    ],*/
                    [
                        'id' => (string) Str::uuid(),
                        'label' => ['lv' => '2.5. Vai Jums ir kādas ar psoriāzi saistītas blakussaslimšanas, par kurām zināt?', 'en' => '2.5. Do you have comorbidities related to psoriasis?'],
                        'type' => 'radio',
                        'options' => [
                            'lv' => ['Jā', 'Nē'],
                            'en' => ['Yes', 'No'],
                        ],
                    ],
                    /*[
                        'id' => (string) Str::uuid(),
                        'label' => ['lv' => 'Ja Jā, lūdzu, kādas?', 'en' => 'If yes, please specify'],
                        'type' => 'textarea',
                        'placeholder' => ['lv' => 'Piem., psoriātiskais artrīts, depresija, vielmaiņas traucējumi', 'en' => 'E.g., psoriatic arthritis, depression, metabolic disorders'],
                        'rows' => 4,
                    ],*/

                    // 3. Līdzšinējā ārstēšana
                    [
                        'id' => (string) Str::uuid(),
                        'label' => ['lv' => '3.1. Kādas ārstēšanas metodes Jūs esat lietojis/la psoriāzes dēļ? (atzīmējiet visu, kas attiecas)', 'en' => '3.1. Which treatments have you used? (select all that apply)'],
                        'type' => 'checkbox',
                        'options' => [
                            'lv' => [
                                'Lokālie krēmi/ziedes (kortikosteroīdi, D vitamīna preparāti u.c.)',
                                'Fototerapija (UV terapija)',
                                'Tabletes (sistēmiskā terapija, piem., metotreksāts u.c.)',
                                'Bioloģiskā terapija (injicējamas zāles)',
                                'Citi (piem., “dabiskās” metodes, uztura bagātinātāji)',
                                'Neesmu saņēmis/la specifisku ārstēšanu',
                            ],
                            'en' => [
                                'Topical creams/ointments (steroids, vitamin D, etc.)',
                                'Phototherapy (UV therapy)',
                                'Oral/systemic medication (e.g., methotrexate)',
                                'Biologic therapy (injectables)',
                                'Other (e.g., natural methods, supplements)',
                                'I have not received specific treatment',
                            ],
                        ],
                    ],
                    /*[
                        'id' => (string) Str::uuid(),
                        'label' => ['lv' => '3.1.1. Ja "Citi", lūdzu norādiet', 'en' => '3.1.1. If "Other", please specify'],
                        'type' => 'text',
                        'placeholder' => ['lv' => 'Norādiet citus veidus', 'en' => 'Specify other methods'],
                    ],*/
                    [
                        'id' => (string) Str::uuid(),
                        'label' => ['lv' => '3.2. Vai kopumā iepriekšējās terapijas Jums palīdzēja?', 'en' => '3.2. Did previous therapies help overall?'],
                        'type' => 'radio',
                        'options' => [
                            'lv' => ['Ļoti palīdzēja – simptomi gandrīz pazuda', 'Vidēji palīdzēja – kļuva labāk, bet psoriāze paliek', 'Maz palīdzēja – neliels vai īslaicīgs efekts', 'Nepalīdzēja vispār', 'Nezinu / grūti pateikt'],
                            'en' => ['Very helpful – symptoms almost gone', 'Moderately helpful – improved but persists', 'Little help – small or short effect', 'Did not help at all', "Don't know / hard to say"],
                        ],
                    ],
                    [
                        'id' => (string) Str::uuid(),
                        'label' => ['lv' => '3.3. Vai Jums bijušas būtiskas blaknes no psoriāzes terapijas?', 'en' => '3.3. Have you had significant side effects from therapy?'],
                        'type' => 'radio',
                        'options' => [
                            'lv' => ['Jā', 'Nē'],
                            'en' => ['Yes', 'No'],
                        ],
                    ],
                    /*[
                        'id' => (string) Str::uuid(),
                        'label' => ['lv' => 'Ja Jā, lūdzu, īsi aprakstiet', 'en' => 'If yes, briefly describe'],
                        'type' => 'textarea',
                        'rows' => 3,
                        'placeholder' => ['lv' => 'Aprakstiet blaknes', 'en' => 'Describe side effects briefly'],
                    ],*/
                    [
                        'id' => (string) Str::uuid(),
                        'label' => ['lv' => '3.4. Pašlaik Jūs:', 'en' => '3.4. Currently you:'],
                        'type' => 'radio',
                        'options' => [
                            'lv' => ['Turpinu regulāru psoriāzes ārstēšanu', 'Terapiju pārtraucu blakņu dēļ', 'Terapiju pārtraucu, jo nelikās efektīva', 'Šobrīd neārstējos citu iemeslu dēļ (piem., laika, naudas trūkums u.c.)'],
                            'en' => ['Continue regular treatment', 'Stopped due to side effects', 'Stopped because not effective', 'Not treating currently for other reasons (time/cost etc.)'],
                        ],
                    ],

                    // 4. Finansiālais atbalsts un izmaksas
                    [
                        'id' => (string) Str::uuid(),
                        'label' => ['lv' => '4.1. Vai līdz šim Jūsu psoriāzes ārstēšanas izdevumus ir sedzusi valsts?', 'en' => '4.1. Have treatment costs been covered by the state?'],
                        'type' => 'radio',
                        'options' => [
                            'lv' => ['Jā, lielākā daļa izdevumu', 'Jā, daļa izdevumu', 'Nē, pārsvarā maksāju pats/pati', 'Nezinu / neesmu pārliecināts(a)'],
                            'en' => ['Yes, most costs', 'Yes, part of costs', 'No, I mostly pay myself', 'Don’t know / not sure'],
                        ],
                    ],
                    [
                        'id' => (string) Str::uuid(),
                        'label' => ['lv' => '4.2. Vai ārstēšanas izmaksas Jums kādreiz ir bijušas šķērslis turpināt vai uzsākt terapiju?', 'en' => '4.2. Have costs ever been a barrier to start/continue therapy?'],
                        'type' => 'radio',
                        'options' => [
                            'lv' => ['Jā, bieži', 'Dažkārt', 'Nē, nekad', 'Nevēlos atbildēt'],
                            'en' => ['Yes, often', 'Sometimes', 'No, never', 'Prefer not to answer'],
                        ],
                    ],

                    // 5. Apmierinātība ar esošo stāvokli
                    /*[
                        'id' => (string) Str::uuid(),
                        'label' => ['lv' => '5.1. Cik apmierināts/a esat ar esošo psoriāzes stāvokli, ņemot vērā šobrīd lietoto (vai nelietoto) ārstēšanu? (1-10)', 'en' => '5.1. How satisfied are you with current psoriasis status? (1-10)'],
                        'type' => 'scale',
                        'scale' => ['min' => 1, 'max' => 10],
                        'help' => ['lv' => '1 – Pilnīgi neapmierināts(a); 10 – Pilnīgi apmierināts(a)', 'en' => '1 – Completely dissatisfied; 10 – Completely satisfied'],
                    ],*/
                    [
                        'id' => (string) Str::uuid(),
                        'label' => ['lv' => '5.2. Vai Jūs vēlētos izmēģināt jaunu ārstēšanas pieeju, ja tā būtu pamatota ar zinātniskiem pētījumiem un atbilstu ES regulām?', 'en' => '5.2. Would you try a new treatment if evidence and regulations are met?'],
                        'type' => 'radio',
                        'options' => [
                            'lv' => ['Jā, noteikti', 'Drīzāk jā, bet gribētu vēl uzzināt vairāk', 'Nezinu / grūti pateikt', 'Drīzāk nē', 'Nē, neinteresē'],
                            'en' => ['Yes, definitely', 'Rather yes, but want more info', 'Not sure', 'Rather no', 'No, not interested'],
                        ],
                    ],

                    // 6. Īss ievads par ATMP un MSC + zināšanas
                    [
                        'id' => (string) Str::uuid(),
                        'label' => ['lv' => '6.1.1. Vai pirms šīs anketas Jūs jau zinājāt, kas ir ATMP?', 'en' => '6.1.1. Before this survey, did you know what ATMP is?'],
                        'type' => 'radio',
                        'options' => [
                            'lv' => ['Jā, labi zināju', 'Kaut ko biju dzirdējis/dzirdējusi', 'Nē, pirmo reizi dzirdu'],
                            'en' => ['Yes, well informed', 'I had heard something', 'No, first time hearing'],
                        ],
                    ],
                    [
                        'id' => (string) Str::uuid(),
                        'label' => ['lv' => '6.2.1. Vai esat dzirdējis/dzirdējusi par MSC šūnām kā iespējamu psoriāzes ārstēšanas pieeju?', 'en' => '6.2.1. Have you heard about MSC cells as a possible treatment?'],
                        'type' => 'radio',
                        'options' => [
                            'lv' => ['Jā, pietiekami daudz', 'Kaut ko esmu lasījis/lasījusi vai dzirdējis/dzirdējusi', 'Nē, par to nezinu neko'],
                            'en' => ['Yes, enough', 'I have read/heard something', 'No, I know nothing about it'],
                        ],
                    ],
                    /*[
                        'id' => (string) Str::uuid(),
                        'label' => ['lv' => '6.2.2. Ja Jums ir kāds priekšstats par MSC terapiju, lūdzu, īsi uzrakstiet, ko par to zināt vai domājat', 'en' => '6.2.2. If you have any idea about MSC therapy, briefly describe it'],
                        'type' => 'textarea',
                        'rows' => 4,
                        'placeholder' => ['lv' => 'Rakstiet īsu priekšstatu', 'en' => 'Write your brief understanding or thoughts'],
                    ],*/

                    // 7. Interese un gatavība apsvērt ATMP / MSC terapiju
                    /*[
                        'id' => (string) Str::uuid(),
                        'label' => ['lv' => '7.1.1. Cik lielā mērā Jūs interesētu iespēja nākotnē apsvērt ATMP (MSC šūnu) terapiju savai psoriāzei? (1-10)', 'en' => '7.1.1. How interested would you be to consider ATMP therapy in future? (1-10)'],
                        'type' => 'scale',
                        'scale' => ['min' => 1, 'max' => 10],
                    ],*/
                    [
                        'id' => (string) Str::uuid(),
                        'label' => ['lv' => '7.2.1. Kas Jums būtu vissvarīgākie faktori, lemjot, vai apsvērt šādu inovatīvu terapiju?', 'en' => '7.2.1. What factors would be most important to you when deciding?'],
                        'type' => 'checkbox',
                        'options' => [
                            'lv' => [
                                'Drošība un iespējamās blaknes',
                                'Zinātnisko pētījumu kvalitāte (pierādījumi, rezultāti)',
                                'Cena un izmaksas man personīgi',
                                'Ārsta viedoklis (dermatologs / gastroenterologs)',
                                'Valsts / oficiālo institūciju attieksme un atbalsts',
                                'Iespēja uzlabot dzīves kvalitāti, ja citi varianti ir izsmelti',
                                'Citi faktori (lūdzu, norādiet)',
                            ],
                            'en' => [
                                'Safety and possible side effects',
                                'Quality of scientific research (evidence, results)',
                                'Cost and personal expenses',
                                'Doctor’s opinion (dermatologist)',
                                'Government / official institution support',
                                'Potential to improve quality of life if others exhausted',
                                'Other factors (please specify)',
                            ],
                        ],
                    ],
                    /*[
                        'id' => (string) Str::uuid(),
                        'label' => ['lv' => '7.2.1.1. Ja "Citi", lūdzu norādiet', 'en' => 'If "Other", please specify'],
                        'type' => 'text',
                        'placeholder' => ['lv' => 'Norādiet citus faktorus', 'en' => 'Specify other factors'],
                    ],*/
                    [
                        'id' => (string) Str::uuid(),
                        'label' => ['lv' => '7.3.1. Vai Jūs būtu gatavs/gatava saņemt vairāk informācijas par ATMP / MSC iespējām psoriāzes ārstēšanā?', 'en' => '7.3.1. Would you be willing to receive more info about ATMP/MSC options?'],
                        'type' => 'radio',
                        'options' => [
                            'lv' => ['Jā, noteikti – es gribētu būt informēts(a) pirmais(a)', 'Varbūt – ja informācija būs skaidra un saprotama', 'Nē – pašlaik mani tas neinteresē'],
                            'en' => ['Yes, definitely – I want to be informed first', 'Maybe – if information is clear and understandable', 'No – not interested currently'],
                        ],
                    ],

                    // 8. Saziņa, turpmāka iesaiste un promocijas darbs
                    [
                        'id' => (string) Str::uuid(),
                        'label' => ['lv' => '8.1.1. Vai piekrītat, ka Jūsu atbildes var tikt izmantotas promocijas darba izstrādei, apkopotā un anonimizētā veidā?', 'en' => '8.1.1. Do you consent to anonymized use of your answers for a thesis?'],
                        'type' => 'radio',
                        'options' => [
                            'lv' => ['Jā, piekrītu', 'Nē, nepiekrītu'],
                            'en' => ['Yes, I consent', 'No, I do not consent'],
                        ],
                    ],
                    [
                        'id' => (string) Str::uuid(),
                        'label' => ['lv' => '8.2.1. Vai piekrītat, ka nepieciešamības gadījumā ar Jums var sazināties, lai sniegtu plašāku informāciju par inovatīvām psoriāzes ārstēšanas iespējām un informētu par iespējamām dalības iespējām pētījumos nākotnē?', 'en' => '8.2.1. Do you agree to be contacted about future info / study participation?'],
                        'type' => 'radio',
                        'options' => [
                            'lv' => ['Jā, piekrītu', 'Nē, nepiekrītu'],
                            'en' => ['Yes, I agree', 'No, I do not agree'],
                        ],
                    ],
                    /*[
                        'id' => (string) Str::uuid(),
                        'label' => ['lv' => '8.2.2. Vārds (var būt tikai vārds)', 'en' => '8.2.2. Name (first name only)'],
                        'type' => 'text',
                        'placeholder' => ['lv' => 'Vārds', 'en' => 'First name'],
                    ],
                    [
                        'id' => (string) Str::uuid(),
                        'label' => ['lv' => 'E-pasts', 'en' => 'Email'],
                        'type' => 'text',
                        'placeholder' => ['lv' => 'email@piemers.lv', 'en' => 'email@example.com'],
                    ],
                    [
                        'id' => (string) Str::uuid(),
                        'label' => ['lv' => 'Telefona nr. (pēc izvēles)', 'en' => 'Phone number (optional)'],
                        'type' => 'text',
                        'placeholder' => ['lv' => '+371 ...', 'en' => '+371 ...'],
                    ],*/
                    [
                        'id' => (string) Str::uuid(),
                        'label' => ['lv' => '8.2.3. Kādu saziņas veidu Jūs visvairāk vēlētos?', 'en' => '8.2.3. Preferred contact method'],
                        'type' => 'radio',
                        'options' => [
                            'lv' => ['E-pasts', 'Telefona zvans', 'Īsziņa / WhatsApp (ja pieejams)', 'Citi (lūdzu, norādiet)'],
                            'en' => ['Email', 'Phone call', 'SMS / WhatsApp (if available)', 'Other (please specify)'],
                        ],
                    ],
                    /*[
                        'id' => (string) Str::uuid(),
                        'label' => ['lv' => '8.2.3.1. Ja "Citi", lūdzu norādiet', 'en' => 'If "Other", please specify'],
                        'type' => 'text',
                        'placeholder' => ['lv' => 'Norādiet citu saziņas veidu', 'en' => 'Specify other contact method'],
                    ],
                    [
                        'id' => (string) Str::uuid(),
                        'label' => ['lv' => '8.3. Brīvais komentārs', 'en' => '8.3. Free comment'],
                        'type' => 'textarea',
                        'rows' => 5,
                        'placeholder' => ['lv' => 'Pastāstiet par savu pieredzi vai citiem komentāriem', 'en' => 'Tell us about your experience or other comments'],
                    ],*/
                ],
            ],
        ]);
    }
}
