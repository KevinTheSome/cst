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
        $forms = [
            [
                'code' => 'public',
                'title' => [
                    'lv' => 'Anketa par psoriāzi un attieksmi pret ATMP/MSC terapijām',
                    'en' => 'Questionnaire about psoriasis and attitude to ATMP/MSC therapies',
                ],
                'data' => [
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
                                'lv' => ['Sieviete', 'Vīrietis'],
                                'en' => ['Female', 'Male'],
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
                        [
                            'id' => (string) Str::uuid(),
                            'label' => ['lv' => '2.4.1. Ja "Citi", lūdzu norādiet', 'en' => '2.4.1. If "Other", please specify'],
                            'type' => 'text',
                            'placeholder' => ['lv' => 'Rakstiet šeit', 'en' => 'Please specify'],
                        ],
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
                        [
                            'id' => (string) Str::uuid(),
                            'label' => ['lv' => '3.1.1. Ja "Citi", lūdzu norādiet', 'en' => '3.1.1. If "Other", please specify'],
                            'type' => 'text',
                            'placeholder' => ['lv' => 'Norādiet citus veidus', 'en' => 'Specify other methods'],
                        ],
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
                        [
                            'id' => (string) Str::uuid(),
                            'type' => 'scale',
                            'label' => [
                                'lv' => '5.1. Cik apmierināts/a esat ar esošo psoriāzes stāvokli, ņemot vērā šobrīd lietoto (vai nelietoto) ārstēšanu? (1–10)',
                                'en' => '5.1. How satisfied are you with your current psoriasis condition, considering current (or no) treatment? (1–10)',
                            ],
                            'options' => [],
                            'placeholder' => null,
                            'scale' => [
                                'min' => 1,
                                'max' => 10,
                                'minLabel' => [
                                    'lv' => 'Pilnīgi neapmierināts(a)',
                                    'en' => 'Completely dissatisfied',
                                ],
                                'maxLabel' => [
                                    'lv' => 'Pilnīgi apmierināts(a)',
                                    'en' => 'Completely satisfied',
                                ],
                            ],
                        ],
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
                        [
                            'id' => (string) Str::uuid(),
                            'type' => 'scale',
                            'label' => [
                                'lv' => '7.1.1. Cik lielā mērā Jūs interesētu iespēja nākotnē apsvērt ATMP (MSC šūnu) terapiju savai psoriāzei? (1–10)',
                                'en' => '7.1.1. How interested would you be to consider ATMP therapy in future? (1–10)',
                            ],
                            'options' => [],
                            'placeholder' => null,
                            'scale' => [
                                'min' => 1,
                                'max' => 10,
                                'minLabel' => [
                                    'lv' => 'Maz interesē',
                                    'en' => 'Low interest',
                                ],
                                'maxLabel' => [
                                    'lv' => 'Ļoti interesē',
                                    'en' => 'High interest',
                                ],
                            ],
                        ],
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
                        [
                            'id' => (string) Str::uuid(),
                            'label' => ['lv' => '7.2.1.1. Ja "Citi", lūdzu norādiet', 'en' => 'If "Other", please specify'],
                            'type' => 'text',
                            'placeholder' => ['lv' => 'Norādiet citus faktorus', 'en' => 'Specify other factors'],
                        ],
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
                        [
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
                        ],
                        [
                            'id' => (string) Str::uuid(),
                            'label' => ['lv' => '8.2.3. Kādu saziņas veidu Jūs visvairāk vēlētos?', 'en' => '8.2.3. Preferred contact method'],
                            'type' => 'radio',
                            'options' => [
                                'lv' => ['E-pasts', 'Telefona zvans', 'Īsziņa / WhatsApp (ja pieejams)', 'Citi (lūdzu, norādiet)'],
                                'en' => ['Email', 'Phone call', 'SMS / WhatsApp (if available)', 'Other (please specify)'],
                            ],
                        ],
                        [
                            'id' => (string) Str::uuid(),
                            'label' => ['lv' => '8.2.3.1. Ja "Citi", lūdzu norādiet', 'en' => 'If "Other", please specify'],
                            'type' => 'text',
                            'placeholder' => ['lv' => 'Norādiet citu saziņas veidu', 'en' => 'Specify other contact method'],
                        ],
                        /*[
                            'id' => (string) Str::uuid(),
                            'label' => ['lv' => '8.3. Brīvais komentārs', 'en' => '8.3. Free comment'],
                            'type' => 'textarea',
                            'rows' => 5,
                            'placeholder' => ['lv' => 'Pastāstiet par savu pieredzi vai citiem komentāriem', 'en' => 'Tell us about your experience or other comments'],
                        ],*/
                    ],
                ],
            ],
            [
                'code' => 'public',
                'title' => [
                    'lv' => 'Anketa par Krona slimību un attieksmi pret ATMP/MSC terapijām',
                    'en' => 'Questionnaire about Crohn\'s disease and attitude to ATMP/MSC therapies',
                ],
                'data' => [
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
                                'lv' => ['Sieviete', 'Vīrietis'],
                                'en' => ['Female', 'Male'],
                            ],
                        ],

                        // 2. Krona slimības diagnoze un gaita
                        [
                            'id' => (string) Str::uuid(),
                            'label' => ['lv' => '2.1. Vai Jums ir ārsta noteikta Krona slimības diagnoze?', 'en' => '2.1. Do you have a doctor-diagnosed Crohn\'s disease?'],
                            'type' => 'radio',
                            'options' => [
                                'lv' => ['Jā, gastroenterologa', 'Jā, ģimenes ārsta', 'Man ir aizdomas, bet oficiāli nav diagnosticēta', 'Nē / neesmu pārliecināts(a)'],
                                'en' => ['Yes, gastroenterologist', 'Yes, GP/family doctor', 'I suspect it but no official diagnosis', 'No / not sure'],
                            ],
                        ],
                        [
                            'id' => (string) Str::uuid(),
                            'label' => ['lv' => '2.2. Cik sen Jums ir diagnosticēta Krona slimība?', 'en' => '2.2. How long have you been diagnosed with Crohn\'s disease?'],
                            'type' => 'radio',
                            'options' => [
                                'lv' => ['Mazāk nekā 1 gadu', '1–3 gadi', '4–10 gadi', 'Vairāk nekā 10 gadi'],
                                'en' => ['Less than 1 year', '1–3 years', '4–10 years', 'More than 10 years'],
                            ],
                        ],
                        [
                            'id' => (string) Str::uuid(),
                            'label' => ['lv' => '2.3. Kuras gremošanas trakta daļas visvairāk ir skartas? (var atzīmēt vairākas)', 'en' => '2.3. Which parts of the GI tract are most affected? (multiple)'],
                            'type' => 'checkbox',
                            'options' => [
                                'lv' => ['Tievā zarna', 'Resnā zarna', 'Tievā un resnā zarna', 'Taisnā zarna / anālā zona', 'Nezinu / neesmu pārliecināts(a)'],
                                'en' => ['Small intestine', 'Large intestine', 'Both small and large intestine', 'Rectum / anal area', 'Don\'t know / not sure'],
                            ],
                        ],
                        [
                            'id' => (string) Str::uuid(),
                            'label' => ['lv' => '2.4. Kā Jūs raksturotu savas Krona slimības aktivitāti pēdējā gada laikā?', 'en' => '2.4. How would you describe Crohn\'s disease activity in the last year?'],
                            'type' => 'radio',
                            'options' => [
                                'lv' => ['Remisija – gandrīz bez simptomiem', 'Viegls paasinājums – nelielas sūdzības, bet varu dzīvot ikdienu', 'Vidējs paasinājums – simptomi būtiski traucē ikdienu', 'Smags paasinājums – bieža caureja, sāpes, nespēks, biežas vizītes vai hospitalizācijas'],
                                'en' => ['Remission – almost no symptoms', 'Mild flare – minor complaints, can live daily life', 'Moderate flare – symptoms significantly affect daily life', 'Severe flare – frequent diarrhea, pain, weakness, frequent visits or hospitalizations'],
                            ],
                        ],
                        // 2.5. Blakussaslimšanas
                        [
                            'id' => (string) Str::uuid(),
                            'label' => ['lv' => '2.5. Vai Jums ir kādas ar Krona slimību saistītas blakussaslimšanas vai komplikācijas?', 'en' => '2.5. Do you have complications or comorbidities related to Crohn\'s disease?'],
                            'type' => 'radio',
                            'options' => [
                                'lv' => ['Jā', 'Nē'],
                                'en' => ['Yes', 'No'],
                            ],
                        ],
                        // NOTE: free-text to describe if yes
                        // NOTE: type = text
                        [
                            // NOTE: text field — front-end may need to handle this as open input
                            'id' => (string) Str::uuid(),
                            'label' => ['lv' => 'Ja Jā, lūdzu, īsi norādiet', 'en' => 'If yes, please briefly specify'],
                            'type' => 'text',
                            'placeholder' => ['lv' => 'Piem., fistulas, striktūras, locītavu iekaisums', 'en' => 'E.g., fistulas, strictures, joint inflammation'],
                        ],

                        // 3. Pašreizējie simptomi
                        [
                            'id' => (string) Str::uuid(),
                            'label' => ['lv' => '3.1. Cik bieži pēdējā mēneša laikā Jums ir bijusi caureja?', 'en' => '3.1. How often have you had diarrhea in the last month?'],
                            'type' => 'radio',
                            'options' => [
                                'lv' => ['Lielākoties normāla vēdera izeja', '1–3 reizes dienā šķidrāka vēdera izeja', '4–6 reizes dienā šķidra vēdera izeja', 'Vairāk nekā 6 reizes dienā'],
                                'en' => ['Mostly normal stools', '1–3 times/day loose stools', '4–6 times/day loose stools', 'More than 6 times/day'],
                            ],
                        ],
                        [
                            'id' => (string) Str::uuid(),
                            'label' => ['lv' => '3.2. Vai pēdējā mēneša laikā esat novērojis/as asiņu piejaukumu vēdera izejai?', 'en' => '3.2. Have you noticed blood in stools in the last month?'],
                            'type' => 'radio',
                            'options' => [
                                'lv' => ['Jā, bieži', 'Dažreiz', 'Nē'],
                                'en' => ['Yes, often', 'Sometimes', 'No'],
                            ],
                        ],
                        [
                            'id' => (string) Str::uuid(),
                            'label' => ['lv' => '3.3. Cik bieži Jums ir vēdera sāpes saistībā ar Krona slimību?', 'en' => '3.3. How often do you have abdominal pain related to Crohn\'s disease?'],
                            'type' => 'radio',
                            'options' => [
                                'lv' => ['Reti vai gandrīz nekad', 'Dažreiz, bet varu paciest', 'Bieži, traucē ikdienu', 'Gandrīz pastāvīgi, ļoti traucē'],
                                'en' => ['Rarely or almost never', 'Sometimes, but manageable', 'Often, affects daily life', 'Almost constantly, severely affects life'],
                            ],
                        ],
                        // 3.4. Ietekme uz ikdienu — trīs apakšjautājumi (each as radio)
                        [
                            'id' => (string) Str::uuid(),
                            'label' => ['lv' => '3.4.1. Ikdienas aktivitātes (darbs, mācības, mājas darbi)', 'en' => '3.4.1. Daily activities (work, studies, household)'],
                            'type' => 'radio',
                            'options' => [
                                'lv' => ['Maz', 'Vidēji', 'Ļoti daudz'],
                                'en' => ['Little', 'Moderate', 'A lot'],
                            ],
                        ],
                        [
                            'id' => (string) Str::uuid(),
                            'label' => ['lv' => '3.4.2. Sociālā dzīve (draugi, pasākumi)', 'en' => '3.4.2. Social life (friends, events)'],
                            'type' => 'radio',
                            'options' => [
                                'lv' => ['Maz', 'Vidēji', 'Ļoti daudz'],
                                'en' => ['Little', 'Moderate', 'A lot'],
                            ],
                        ],
                        [
                            'id' => (string) Str::uuid(),
                            'label' => ['lv' => '3.4.3. Psihiskā pašsajūta (trauksme, nomāktība)', 'en' => '3.4.3. Mental wellbeing (anxiety, low mood)'],
                            'type' => 'radio',
                            'options' => [
                                'lv' => ['Maz', 'Vidēji', 'Ļoti daudz'],
                                'en' => ['Little', 'Moderate', 'A lot'],
                            ],
                        ],

                        // 4. Līdzšinējā ārstēšana
                        [
                            'id' => (string) Str::uuid(),
                            'label' => ['lv' => '4.1. Kādas ārstēšanas metodes Jūs esat lietojis/la Krona slimības dēļ? (atzīmējiet visu, kas attiecas)', 'en' => '4.1. Which treatments have you used for Crohn\'s disease? (select all that apply)'],
                            'type' => 'checkbox',
                            'options' => [
                                'lv' => [
                                    '5-ASA preparāti (mesalazīns u.tml.)',
                                    'Kortikosteroīdi (piem., prednizolons)',
                                    'Imūnmodulatori (piem., azatioprīns, 6-MP u.c.)',
                                    'Bioloģiskā terapija (piem., anti-TNF, anti-IL, anti-integrīni u.c.)',
                                    'Citi medikamenti (lūdzu, norādiet)',
                                    'Uztura terapija (speciālas diētas, enterālā/parenterālā barošana)',
                                    'Ķirurģiska ārstēšana (zarnu rezekcija, stoma u.c.)',
                                    'Neesmu saņēmis/usi specifisku ārstēšanu',
                                ],
                                'en' => [
                                    '5-ASA preparations (mesalazine etc.)',
                                    'Corticosteroids (e.g., prednisolone)',
                                    'Immunomodulators (e.g., azathioprine, 6-MP)',
                                    'Biologic therapy (e.g., anti-TNF, anti-IL, anti-integrins)',
                                    'Other medications (please specify)',
                                    'Nutritional therapy (special diets, enteral/parenteral nutrition)',
                                    'Surgical treatment (bowel resection, stoma etc.)',
                                    'I have not received specific treatment',
                                ],
                            ],
                        ],

                        [
                            'id' => (string) Str::uuid(),
                            'label' => ['lv' => '4.1.1 Ja "Citi medikamenti", lūdzu norādiet', 'en' => '4.1.1 If "Other medications", please specify'],
                            'type' => 'text',
                            'placeholder' => ['lv' => 'Norādiet citus medikamentus', 'en' => 'Specify other medications'],
                        ],
                        [
                            'id' => (string) Str::uuid(),
                            'label' => ['lv' => '4.2. Vai kopumā iepriekšējās terapijas Jums palīdzēja?', 'en' => '4.2. Did previous therapies help overall?'],
                            'type' => 'radio',
                            'options' => [
                                'lv' => ['Ļoti palīdzēja – simptomi būtiski mazinājās', 'Deva jūtamu uzlabojumu –  kļuva labāk, bet slimība joprojām aktīva', 'Maz palīdzēja – neliels vai īslaicīgs efekts', 'Nepalīdzēja vispār', 'Nezinu / grūti pateikt'],
                                'en' => ['Very helpful – symptoms greatly reduced', 'Moderately helpful – improved but disease active', 'Little help – small or short effect', 'Did not help at all', 'Don\'t know / hard to say'],
                            ],
                        ],
                        [
                            'id' => (string) Str::uuid(),
                            'label' => ['lv' => '4.3. Vai Jums bijušas būtiskas blaknes no Krona slimības terapijas?', 'en' => '4.3. Have you had significant side effects from Crohn\'s disease therapy?'],
                            'type' => 'radio',
                            'options' => [
                                'lv' => ['Jā', 'Nē'],
                                'en' => ['Yes', 'No'],
                            ],
                        ],

                        /*[
                            'id' => (string) Str::uuid(),
                            'label' => ['lv' => 'Ja Jā, lūdzu, īsi aprakstiet', 'en' => 'If yes, please briefly describe'],
                            'type' => 'textarea',
                            'rows' => 4,
                            'placeholder' => ['lv' => 'Aprakstiet blaknes', 'en' => 'Describe side effects'],
                        ],*/
                        [
                            'id' => (string) Str::uuid(),
                            'label' => ['lv' => '4.4. Vai Jums ir veikta operācija Krona slimības dēļ?', 'en' => '4.4. Have you had surgery for Crohn\'s disease?'],
                            'type' => 'radio',
                            'options' => [
                                'lv' => ['Jā, vienu reizi', 'Jā, vairākas reizes', 'Nē'],
                                'en' => ['Yes, once', 'Yes, several times', 'No'],
                            ],
                        ],

                        /*[
                            'id' => (string) Str::uuid(),
                            'label' => ['lv' => 'Ja Jā – lūdzu, īsi norādiet gadu(-us) un būtiskāko', 'en' => 'If yes – please indicate year(s) and main details'],
                            'type' => 'textarea',
                            'rows' => 3,
                            'placeholder' => ['lv' => 'Piem., 2018 – zarnas rezekcija', 'en' => 'E.g., 2018 – bowel resection'],
                        ],*/
                        [
                            'id' => (string) Str::uuid(),
                            'label' => ['lv' => '4.5. Pašlaik Jūs:', 'en' => '4.5. Currently you:'],
                            'type' => 'radio',
                            'options' => [
                                'lv' => ['Turpinu regulāru Krona slimības ārstēšanu', 'Terapiju pārtraucu blakņu dēļ', 'Terapiju pārtraucu, jo nelikās efektīva', 'Šobrīd neārstējos citu iemeslu dēļ (piem., laika, naudas trūkums u.c.)'],
                                'en' => ['Continue regular Crohn\'s treatment', 'Stopped due to side effects', 'Stopped because not effective', 'Not treating currently for other reasons (time/cost etc.)'],
                            ],
                        ],

                        // 5. Finansiālais atbalsts un izmaksas
                        [
                            'id' => (string) Str::uuid(),
                            'label' => ['lv' => '5.1. Vai līdz šim Jūsu Krona slimības ārstēšanas izdevumus ir segusi valsts?', 'en' => '5.1. Have treatment costs been covered by the state?'],
                            'type' => 'radio',
                            'options' => [
                                'lv' => ['Jā, lielākā daļa izdevumu', 'Jā, daļa izdevumu', 'Nē, pārsvarā maksāju pats/pati', 'Nezinu / neesmu pārliecināts(a)'],
                                'en' => ['Yes, most costs', 'Yes, part of costs', 'No, I mostly pay myself', 'Don\'t know / not sure'],
                            ],
                        ],
                        [
                            'id' => (string) Str::uuid(),
                            'label' => ['lv' => '5.2. Vai ārstēšanas izmaksas Jums kādreiz ir bijušas šķērslis turpināt vai uzsākt terapiju?', 'en' => '5.2. Have costs ever been a barrier to start/continue therapy?'],
                            'type' => 'radio',
                            'options' => [
                                'lv' => ['Jā, bieži', 'Dažkārt', 'Nē, nekad', 'Nevēlos atbildēt'],
                                'en' => ['Yes, often', 'Sometimes', 'No, never', 'Prefer not to answer'],
                            ],
                        ],
                        [
                            'id' => (string) Str::uuid(),
                            'type' => 'scale',
                            'label' => [
                                'lv' => '6.1. Cik apmierināts/a esat ar esošo Krona slimības stāvokli? (1–10)',
                                'en' => '6.1. How satisfied are you with your current Crohn\'s disease status? (1–10)',
                            ],
                            'options' => [],
                            'placeholder' => null,
                            'scale' => [
                                'min' => 1,
                                'max' => 10,
                                'minLabel' => [
                                    'lv' => 'Pilnīgi neapmierināts(a)',
                                    'en' => 'Completely dissatisfied',
                                ],
                                'maxLabel' => [
                                    'lv' => 'Pilnīgi apmierināts(a)',
                                    'en' => 'Completely satisfied',
                                ],
                            ],
                        ],
                        [
                            'id' => (string) Str::uuid(),
                            'label' => ['lv' => '6.2. Vai Jūs vēlētos izmēģināt jaunu ārstēšanas pieeju, ja tā būtu pamatota ar zinātniskiem pētījumiem un atbilstu ES regulām?', 'en' => '6.2. Would you try a new treatment if evidence and regulations are met?'],
                            'type' => 'radio',
                            'options' => [
                                'lv' => ['Jā, noteikti', 'Drīzāk jā, bet gribētu vēl uzzināt vairāk', 'Neesmu pārliecināts(a)', 'Drīzāk nē', 'Nē, neinteresē'],
                                'en' => ['Yes, definitely', 'Rather yes, but want more info', 'Not sure', 'Rather no', 'No, not interested'],
                            ],
                        ],

                        // 7. Īss ievads par ATMP un MSC (Krona kontekstā) — (informācija parakstīta lietotājam)
                        // (no fields needed — informational text)

                        // 8. Zināšanas par ATMP un MSC
                        [
                            'id' => (string) Str::uuid(),
                            'label' => ['lv' => '8.1. Vai pirms šīs anketas Jūs jau zinājāt, kas ir ATMP?', 'en' => '8.1. Before this survey, did you know what ATMP is?'],
                            'type' => 'radio',
                            'options' => [
                                'lv' => ['Jā, labi zināju', 'Kaut ko biju dzirdējis/dzirdējusi', 'Nē, pirmo reizi dzirdu'],
                                'en' => ['Yes, well informed', 'I had heard something', 'No, first time hearing'],
                            ],
                        ],
                        [
                            'id' => (string) Str::uuid(),
                            'label' => ['lv' => '8.2. Vai esat dzirdējis/dzirdējusi par MSC šūnām kā iespējamu Krona slimības ārstēšanas pieeju?', 'en' => '8.2. Have you heard about MSC cells as a possible treatment for Crohn\'s?'],
                            'type' => 'radio',
                            'options' => [
                                'lv' => ['Jā, pietiekami daudz', 'Kaut ko esmu lasījis/lasījusi vai dzirdējis/dzirdējusi', 'Nē, par to nezinu neko'],
                                'en' => ['Yes, enough', 'I have read/heard something', 'No, I know nothing about it'],
                            ],
                        ],

                        /*[
                            'id' => (string) Str::uuid(),
                            'label' => ['lv' => '8.3. Ja Jums ir kāds priekšstats par MSC terapiju Krona slimībai, lūdzu, īsi uzrakstiet, ko par to zināt vai domājat', 'en' => '8.3. If you have any idea about MSC therapy for Crohn\'s, briefly describe it'],
                            'type' => 'textarea',
                            'rows' => 4,
                            'placeholder' => ['lv' => 'Rakstiet īsu priekšstatu', 'en' => 'Write your brief understanding or thoughts'],
                        ],*/

                        [
                            'id' => (string) Str::uuid(),
                            'type' => 'scale',
                            'label' => [
                                'lv' => '9.1. Cik lielā mērā Jūs interesētu iespēja nākotnē apsvērt ATMP (MSC šūnu) terapiju Krona slimībai? (1–10)',
                                'en' => '9.1. How interested would you be to consider ATMP therapy in future? (1–10)',
                            ],
                            'options' => [],
                            'placeholder' => null,
                            'scale' => [
                                'min' => 1,
                                'max' => 10,
                                'minLabel' => [
                                    'lv' => 'Maz interesē',
                                    'en' => 'Low interest',
                                ],
                                'maxLabel' => [
                                    'lv' => 'Ļoti interesē',
                                    'en' => 'High interest',
                                ],
                            ],
                        ],
                        [
                            'id' => (string) Str::uuid(),
                            'label' => ['lv' => '9.2. Kas Jums būtu vissvarīgākie faktori, lemjot, vai apsvērt šādu inovatīvu terapiju?', 'en' => '9.2. What would be the most important factors when deciding?'],
                            'type' => 'checkbox',
                            'options' => [
                                'lv' => [
                                    'Drošība un iespējamās blaknes',
                                    'Zinātnisko pētījumu kvalitāte un rezultāti',
                                    'Cena un izmaksas man personīgi',
                                    'Ārsta (gastroenterologa) viedoklis',
                                    'Valsts / oficiālo institūciju attieksme un atbalsts',
                                    'Iespēja samazināt paasinājumus un uzlabot dzīves kvalitāti',
                                    'Samazināt vajadzību pēc operācijām nākotnē',
                                    'Citi faktori (lūdzu, norādiet)',
                                ],
                                'en' => [
                                    'Safety and possible side effects',
                                    'Quality of scientific research and results',
                                    'Cost and personal expenses',
                                    'Doctor (gastroenterologist) opinion',
                                    'Government / official institution support',
                                    'Potential to reduce flares and improve quality of life',
                                    'Reduce need for surgeries in future',
                                    'Other factors (please specify)',
                                ],
                            ],
                        ],

                        [
                            'id' => (string) Str::uuid(),
                            'label' => ['lv' => 'Ja "Citi faktori", lūdzu norādiet', 'en' => 'If "Other factors", please specify'],
                            'type' => 'text',
                            'placeholder' => ['lv' => 'Norādiet citus faktorus', 'en' => 'Specify other factors'],
                        ],
                        [
                            'id' => (string) Str::uuid(),
                            'label' => ['lv' => '9.3. Vai vēlaties būt vieni no pirmajiem, kas saņem strukturētu informāciju un uzaicinājumus?', 'en' => '9.3. Would you like to be among the first to receive structured info and invitations?'],
                            'type' => 'radio',
                            'options' => [
                                'lv' => ['Jā, noteikti – es gribētu būt informēts(a) pirmais(ā)', 'Varbūt – ja informācija būs skaidra un saprotama', 'Nē – pašlaik mani tas neinteresē'],
                                'en' => ['Yes, definitely – I want to be informed first', 'Maybe – if information is clear and understandable', 'No – not interested currently'],
                            ],
                        ],

                        [
                            'id' => (string) Str::uuid(),
                            'label' => ['lv' => '10.1. Vai piekrītat, ka Jūsu atbildes var tikt izmantotas promocijas darba izstrādei (anonimizēti)?', 'en' => '10.1. Do you consent to anonymized use of your answers for a thesis?'],
                            'type' => 'radio',
                            'options' => [
                                'lv' => ['Jā, piekrītu', 'Nē, nepiekrītu'],
                                'en' => ['Yes, I consent', 'No, I do not consent'],
                            ],
                        ],
                        [
                            'id' => (string) Str::uuid(),
                            'label' => ['lv' => '10.2. Vai piekrītat, ka nepieciešamības gadījumā ar Jums var sazināties?', 'en' => '10.2. Do you agree to be contacted if necessary?'],
                            'type' => 'radio',
                            'options' => [
                                'lv' => ['Jā, piekrītu', 'Nē, nepiekrītu'],
                                'en' => ['Yes, I agree', 'No, I do not agree'],
                            ],
                        ],

                        [
                            'id' => (string) Str::uuid(),
                            'label' => ['lv' => 'Vārds (var būt tikai vārds)', 'en' => 'Name (first name only)'],
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
                        ],
                        [
                            'id' => (string) Str::uuid(),
                            'label' => ['lv' => '10.3. Kādu saziņas veidu Jūs visvairāk vēlētos?', 'en' => '10.3. Preferred contact method'],
                            'type' => 'radio',
                            'options' => [
                                'lv' => ['E-pasts', 'Telefona zvans', 'Īsziņa / WhatsApp (ja pieejams)', 'Citi (lūdzu, norādiet)'],
                                'en' => ['Email', 'Phone call', 'SMS / WhatsApp (if available)', 'Other (please specify)'],
                            ],
                        ],

                        [
                            'id' => (string) Str::uuid(),
                            'label' => ['lv' => 'Ja "Citi", lūdzu norādiet', 'en' => 'If "Other", please specify'],
                            'type' => 'text',
                            'placeholder' => ['lv' => 'Norādiet citu saziņas veidu', 'en' => 'Specify other contact method'],
                        ],

                        /*[
                            'id' => (string) Str::uuid(),
                            'label' => ['lv' => '11. Brīvais komentārs', 'en' => '11. Free comment'],
                            'type' => 'textarea',
                            'rows' => 6,
                            'placeholder' => ['lv' => 'Pastāstiet par savu pieredzi vai citiem komentāriem', 'en' => 'Tell us about your experience or other comments'],
                        ],*/
                    ],
                ],
            ],
            [
                'code' => 'public',
                'title' => [
                    'lv' => 'Ārstu anketa par ATMP / MSC terapijām',
                    'en' => 'Physician Survey on ATMP / MSC Therapies',
                ],
                'data' => [
                    'fields' => [
                        // 1. Vispārīga informācija par ārstu un praksi
                        [
                            'id' => (string) Str::uuid(),
                            'label' => ['lv' => '1.1. Jūsu pamatprofesija / specialitāte:', 'en' => '1.1. Your primary profession / specialty:'],
                            'type' => 'radio',
                            'options' => [
                                'lv' => ['Dermatologs/-e', 'Gastroenterologs/-e', 'Internists', 'Ģimenes ārsts/-e', 'Cita (lūdzu, norādiet)'],
                                'en' => ['Dermatologist', 'Gastroenterologist', 'Internist', 'General practitioner / Family physician', 'Other (please specify)'],
                            ],
                        ],
                        [
                            'id' => (string) Str::uuid(),
                            'label' => ['lv' => '1.1.1. Ja "Cita", lūdzu, norādiet', 'en' => '1.1.1. If "Other", please specify'],
                            'type' => 'text',
                            'placeholder' => ['lv' => 'Rakstiet šeit', 'en' => 'Type here'],
                        ],
                        [
                            'id' => (string) Str::uuid(),
                            'label' => ['lv' => '1.2. Prakses vieta (reģions / pilsēta):', 'en' => '1.2. Practice location (region / city):'],
                            'type' => 'text',
                            'placeholder' => ['lv' => 'Piem., Rīga', 'en' => 'e.g., Riga'],
                        ],
                        [
                            'id' => (string) Str::uuid(),
                            'label' => ['lv' => '1.3. Prakses tips:', 'en' => '1.3. Type of practice:'],
                            'type' => 'radio',
                            'options' => [
                                'lv' => ['Valsts / pašvaldības ārstniecības iestāde', 'Privāta ārstniecības iestāde', 'Jaukta (valsts + privāta prakse)', 'Citi (lūdzu, norādiet)'],
                                'en' => ['Public / state healthcare institution', 'Private healthcare institution', 'Mixed (public + private practice)', 'Other (please specify)'],
                            ],
                        ],
                        [
                            'id' => (string) Str::uuid(),
                            'label' => ['lv' => '1.3.1. Ja "Citi", lūdzu, norādiet', 'en' => '1.3.1. If "Other", please specify'],
                            'type' => 'text',
                            'placeholder' => ['lv' => 'Rakstiet šeit', 'en' => 'Type here'],
                        ],
                        [
                            'id' => (string) Str::uuid(),
                            'label' => ['lv' => '1.4. Cik gadus praktizējat savā specialitātē?', 'en' => '1.4. How many years have you been practicing in your specialty?'],
                            'type' => 'radio',
                            'options' => [
                                'lv' => ['Mazāk nekā 5 gadi', '5–10 gadi', '11–20 gadi', 'Vairāk nekā 20 gadi'],
                                'en' => ['Less than 5 years', '5–10 years', '11–20 years', 'More than 20 years'],
                            ],
                        ],

                        // 2. Pacientu profils
                        [
                            'id' => (string) Str::uuid(),
                            'label' => ['lv' => '2.1. Aptuvens psoriāzes pacientu skaits Jūsu aktīvajā aprūpē (vismaz 1 vizīte pēdējā gada laikā):', 'en' => '2.1. Approximate number of psoriasis patients under your active care (≥1 visit in the last year):'],
                            'type' => 'radio',
                            'options' => [
                                'lv' => ['< 20', '20–50', '51–100', '> 100'],
                                'en' => ['< 20', '20–50', '51–100', '> 100'],
                            ],
                        ],
                        [
                            'id' => (string) Str::uuid(),
                            'label' => ['lv' => '2.2. Aptuvens Krona slimības pacientu skaits Jūsu aktīvajā aprūpē:', 'en' => '2.2. Approximate number of Crohn’s disease patients under your active care:'],
                            'type' => 'radio',
                            'options' => [
                                'lv' => ['0', '1–10', '11–30', '> 30'],
                                'en' => ['0', '1–10', '11–30', '> 30'],
                            ],
                        ],
                        [
                            'id' => (string) Str::uuid(),
                            'label' => ['lv' => '2.3. Aptuveni cik pacientiem Jūsu praksē ir citas hroniskas iekaisuma/autoimūnas slimības, kur teorētiski nākotnē varētu izskatīt šūnu/ATMP terapijas?', 'en' => '2.3. Approx. how many patients have other chronic inflammatory/autoimmune diseases where cell/ATMP therapies could be considered in the future?'],
                            'type' => 'radio',
                            'options' => [
                                'lv' => ['< 20', '20–50', '51–100', '> 100'],
                                'en' => ['< 20', '20–50', '51–100', '> 100'],
                            ],
                        ],

                        // 3. Zināšanas par ATMP HE
                        [
                            'id' => (string) Str::uuid(),
                            'type' => 'scale',
                            'label' => [
                                'lv' => '3.1. Cik labi Jūs esat informēts/-a par ATMP regulējumu ES kopumā? (1–10)',
                                'en' => '3.1. How well informed do you feel about ATMP regulation in the EU overall? (1–10)',
                            ],
                            'scale' => [
                                'min' => 1,
                                'max' => 10,
                                'minLabel' => ['lv' => 'Pilnīgi neinformēts/-a', 'en' => 'Not informed at all'],
                                'maxLabel' => ['lv' => 'Ļoti labi informēts/-a', 'en' => 'Very well informed'],
                            ],
                        ],
                        [
                            'id' => (string) Str::uuid(),
                            'type' => 'scale',
                            'label' => [
                                'lv' => '3.2. Cik labi Jūs jūtaties informēts/-a par to, kā ATMP HE plānots / varētu tikt realizēts Latvijā? (1–10)',
                                'en' => '3.2. How well informed do you feel about how ATMP HE is planned / could be implemented in Latvia? (1–10)',
                            ],
                            'scale' => [
                                'min' => 1,
                                'max' => 10,
                                'minLabel' => ['lv' => 'Pilnīgi neinformēts/-a', 'en' => 'Not informed at all'],
                                'maxLabel' => ['lv' => 'Ļoti labi informēts/-a', 'en' => 'Very well informed'],
                            ],
                        ],
                        [
                            'id' => (string) Str::uuid(),
                            'label' => [
                                'lv' => "3.3. Vai Jūs vēlētos strukturētu, koncentrētu pārskatu (lekciju/mācību moduļa veidā) par ES un Latvijas ATMP regulējumu?",
                                'en' => "3.3. Would you like a structured, concise overview (lecture/training module) on EU and Latvian ATMP regulation?",
                            ],
                            'type' => 'radio',
                            'options' => [
                                'lv' => ['Jā, noteikti', 'Varbūt / atkarīgs no formāta', 'Šobrīd neuzskatu par prioritāti'],
                                'en' => ['Yes, definitely', 'Maybe / depends on the format', 'Not a priority at the moment'],
                            ],
                        ],

                        // 4. Zināšanas par MSC
                        [
                            'id' => (string) Str::uuid(),
                            'type' => 'scale',
                            'label' => [
                                'lv' => '4.1. Cik lielā mērā Jūs pārzītat publicētos klīniskos pētījumus ar MSC terapiju psoriāzes ārstēšanā? (1–10)',
                                'en' => '4.1. How familiar are you with published clinical studies on MSC therapy in psoriasis? (1–10)',
                            ],
                            'scale' => [
                                'min' => 1,
                                'max' => 10,
                                'minLabel' => ['lv' => 'Vispār nepārzinu', 'en' => 'Not familiar at all'],
                                'maxLabel' => ['lv' => 'Pārzinu vairākus pētījumus un rezultātus', 'en' => 'Familiar with multiple studies and outcomes'],
                            ],
                        ],
                        [
                            'id' => (string) Str::uuid(),
                            'type' => 'scale',
                            'label' => [
                                'lv' => '4.2. Cik lielā mērā Jūs pārzītat MSC terapijas klīniskos pētījumus Krona slimībai (un IZS kopumā)? (1–10)',
                                'en' => '4.2. How familiar are you with clinical studies on MSC therapy for Crohn’s disease (and IBD overall)? (1–10)',
                            ],
                            'scale' => [
                                'min' => 1,
                                'max' => 10,
                                'minLabel' => ['lv' => 'Vispār nepārzinu', 'en' => 'Not familiar at all'],
                                'maxLabel' => ['lv' => 'Pārzinu vairākus pētījumus un rezultātus', 'en' => 'Familiar with multiple studies and outcomes'],
                            ],
                        ],
                        [
                            'id' => (string) Str::uuid(),
                            'label' => ['lv' => '4.3. Vai esat saskāries/-usies ar MSC terapijas individuāliem gadījumiem (case reports) psoriāzes vai Krona slimības ārstēšanā?', 'en' => '4.3. Have you encountered individual MSC therapy cases (case reports) in psoriasis or Crohn’s disease?'],
                            'type' => 'radio',
                            'options' => [
                                'lv' => ['Jā, esmu lasījis/-usi publikācijas', 'Jā, esmu dzirdējis/-usi konferencēs / kolēģu pieredzē', 'Nē, neesmu saskāries/-usies', 'Neesmu pārliecināts/-a'],
                                'en' => ['Yes, I have read publications', 'Yes, I have heard at conferences / from colleagues', 'No, I have not encountered this', 'Not sure'],
                            ],
                        ],
                        [
                            'id' => (string) Str::uuid(),
                            'type' => 'scale',
                            'label' => [
                                'lv' => '4.4. Kā Jūs kopumā vērtējat MSC terapiju potenciālu psoriāzes un Krona slimības ārstēšanā, balstoties uz līdz šim zināmo? (1–10)',
                                'en' => '4.4. Overall, how do you assess MSC therapy potential for psoriasis and Crohn’s disease based on current evidence? (1–10)',
                            ],
                            'scale' => [
                                'min' => 1,
                                'max' => 10,
                                'minLabel' => ['lv' => 'Skeptisks/-a', 'en' => 'Skeptical'],
                                'maxLabel' => ['lv' => 'Redzu augstu potenciālu', 'en' => 'High potential'],
                            ],
                        ],

                        // 5. Interese par apmācību
                        [
                            'id' => (string) Str::uuid(),
                            'type' => 'scale',
                            'label' => [
                                'lv' => '5.1. Cik lielā mērā Jūs vēlētos iziet strukturētu ATMP HE / MSC terapijas pamatkursu (sertificēts kvalifikācijas celšanas kurss)? (1–10)',
                                'en' => '5.1. How interested would you be in a structured ATMP HE / MSC introductory course (certified CME)? (1–10)',
                            ],
                            'scale' => [
                                'min' => 1,
                                'max' => 10,
                                'minLabel' => ['lv' => 'Man tas nešķiet aktuāli', 'en' => 'Not relevant to me'],
                                'maxLabel' => ['lv' => 'Es ļoti vēlos', 'en' => 'I strongly want it'],
                            ],
                        ],
                        [
                            'id' => (string) Str::uuid(),
                            'label' => ['lv' => '5.2. Kādu formātu Jūs dotu priekšroku šādam kursam?', 'en' => '5.2. Which format would you prefer?'],
                            'type' => 'radio',
                            'options' => [
                                'lv' => ['100% on-line (ierakstītas lekcijas + tests)', 'On-line “live” + diskusijas', 'Hibrīda formāts (on-line teorija + klātiene praktiskā/klīniskā daļa)', 'Tikai klātienē'],
                                'en' => ['100% online (recorded lectures + test)', 'Online live + discussions', 'Hybrid (online theory + in-person practical/clinical part)', 'In-person only'],
                            ],
                        ],
                        [
                            'id' => (string) Str::uuid(),
                            'label' => ['lv' => '5.3. Cik stundu apjomā kurss Jums šķistu optimāls?', 'en' => '5.3. What course duration would be optimal?'],
                            'type' => 'radio',
                            'options' => [
                                'lv' => ['4–6 akadēmiskās stundas', '7–12 akad. stundas', '13–20 akad. stundas', '> 20 akad. stundas (padziļināts modulis)'],
                                'en' => ['4–6 academic hours', '7–12 academic hours', '13–20 academic hours', '> 20 academic hours (advanced)'],
                            ],
                        ],
                        [
                            'id' => (string) Str::uuid(),
                            'label' => ['lv' => '5.4. Cik Jūs būtu gatavs/gatava maksāt par kvalitatīvu kursu ar sertifikātu (CME)?', 'en' => '5.4. How much would you be willing to pay for a high-quality course with a certificate (CME)?'],
                            'type' => 'radio',
                            'options' => [
                                'lv' => ['Līdz 50 EUR', '51–100 EUR', '101–200 EUR', 'Vairāk nekā 200 EUR', 'Vēlos, lai kursu pilnībā sedz sponsori / projekts'],
                                'en' => ['Up to EUR 50', 'EUR 51–100', 'EUR 101–200', 'More than EUR 200', 'Prefer sponsors/project to cover fully'],
                            ],
                        ],

                        // 6. Gatavība izmantot praksē
                        [
                            'id' => (string) Str::uuid(),
                            'type' => 'scale',
                            'label' => [
                                'lv' => '6.1.1. Cik gatavs/gatava Jūs būtu nozīmēt / rekomendēt ATMP HE / MSC terapiju saviem psoriāzes pacientiem? (1–10)',
                                'en' => '6.1.1. How willing would you be to prescribe/recommend ATMP HE / MSC therapy for psoriasis patients? (1–10)',
                            ],
                            'scale' => [
                                'min' => 1,
                                'max' => 10,
                                'minLabel' => ['lv' => 'Noteikti nē', 'en' => 'Definitely not'],
                                'maxLabel' => ['lv' => 'Aktīvi piedāvātu', 'en' => 'Would actively offer'],
                            ],
                        ],
                        [
                            'id' => (string) Str::uuid(),
                            'type' => 'scale',
                            'label' => [
                                'lv' => '6.1.2. Cik gatavs/gatava Jūs būtu nozīmēt / rekomendēt ATMP HE / MSC terapiju Krona slimības pacientiem? (1–10)',
                                'en' => '6.1.2. How willing would you be to prescribe/recommend ATMP HE / MSC therapy for Crohn’s disease patients? (1–10)',
                            ],
                            'scale' => [
                                'min' => 1,
                                'max' => 10,
                                'minLabel' => ['lv' => 'Noteikti nē', 'en' => 'Definitely not'],
                                'maxLabel' => ['lv' => 'Aktīvi piedāvātu', 'en' => 'Would actively offer'],
                            ],
                        ],
                        [
                            'id' => (string) Str::uuid(),
                            'type' => 'scale',
                            'label' => [
                                'lv' => '6.1.3. Cik gatavs/gatava Jūs būtu nozīmēt / rekomendēt ATMP HE / MSC terapiju citām indikācijām, ja pierādījumi ir pietiekami? (1–10)',
                                'en' => '6.1.3. How willing would you be to prescribe/recommend ATMP HE / MSC therapy for other indications if evidence is sufficient? (1–10)',
                            ],
                            'scale' => [
                                'min' => 1,
                                'max' => 10,
                                'minLabel' => ['lv' => 'Noteikti nē', 'en' => 'Definitely not'],
                                'maxLabel' => ['lv' => 'Aktīvi piedāvātu', 'en' => 'Would actively offer'],
                            ],
                        ],
                        [
                            'id' => (string) Str::uuid(),
                            'type' => 'scale',
                            'label' => [
                                'lv' => '6.2. Cik atvērts/-a Jūs būtu sadarbībai ar ATMP/MSC ražotāju vai klīnisko centru? (1–10)',
                                'en' => '6.2. How open would you be to collaboration with an ATMP/MSC manufacturer or clinical center? (1–10)',
                            ],
                            'scale' => [
                                'min' => 1,
                                'max' => 10,
                                'minLabel' => ['lv' => 'Neesmu ieinteresēts/-a', 'en' => 'Not interested'],
                                'maxLabel' => ['lv' => 'Ļoti ieinteresēts/-a', 'en' => 'Very interested'],
                            ],
                        ],

                        // 7. Potenciālo pacientu skaits
                        [
                            'id' => (string) Str::uuid(),
                            'label' => ['lv' => '7.1. Cik psoriāzes pacientiem Jūsu praksē nākotnē varētu būt pamatojums izskatīt ATMP HE / MSC terapiju?', 'en' => '7.1. For how many psoriasis patients could there be a rationale to consider ATMP HE / MSC therapy in the future?'],
                            'type' => 'radio',
                            'options' => [
                                'lv' => ['Neviens pacients gadā','1–5 pacienti gadā', '6–20 pacienti gadā', '21–50 pacienti gadā', '> 50 pacienti gadā'],
                                'en' => ['No patients/year','1–5 patients/year', '6–20 patients/year', '21–50 patients/year', '> 50 patients/year'],
                            ],
                        ],
                        [
                            'id' => (string) Str::uuid(),
                            'label' => ['lv' => '7.2. Cik Krona slimības pacientiem Jūsu praksē varētu būt pamatojums izskatīt šādu terapiju?', 'en' => '7.2. For how many Crohn’s disease patients could there be a rationale to consider such therapy?'],
                            'type' => 'radio',
                            'options' => [
                                'lv' => ['Nevienam pacientam', '1–5 pacienti gadā', '6–15 pacienti gadā', '> 15 pacienti gadā'],
                                'en' => ['No patients', '1–5 patients/year', '6–15 patients/year', '> 15 patients/year'],
                            ],
                        ],
                        [
                            'id' => (string) Str::uuid(),
                            'label' => ['lv' => '7.3. Cik citiem pacientiem ar hroniskām iekaisuma/autoimūnām slimībām Jūs teorētiski varētu apsvērt ATMP HE / MSC terapiju?', 'en' => '7.3. For how many other chronic inflammatory/autoimmune patients could you theoretically consider ATMP HE / MSC therapy?'],
                            'type' => 'radio',
                            'options' => [
                                'lv' => ['Neviens pacients gadā','1–5 pacienti gadā', '6–20 pacienti gadā', '21–50 pacienti gadā', '> 50 pacienti gadā'],
                                'en' => ['No patients','1–5 patients/year', '6–20 patients/year', '21–50 patients/year', '> 50 patients/year'],
                            ],
                        ],

                        // 8. Motivācija, skaidrība un turpmāka saziņa
                        [
                            'id' => (string) Str::uuid(),
                            'type' => 'scale',
                            'label' => [
                                'lv' => '8.1. Cik skaidrs Jums šķiet aptaujas teksts un informācija par ATMP HE / MSC terapiju? (1–10)',
                                'en' => '8.1. How clear do you find the survey text and information about ATMP HE / MSC therapy? (1–10)',
                            ],
                            'scale' => [
                                'min' => 1,
                                'max' => 10,
                                'minLabel' => ['lv' => 'Neskaidrs', 'en' => 'Unclear'],
                                'maxLabel' => ['lv' => 'Pilnīgi skaidrs', 'en' => 'Completely clear'],
                            ],
                        ],
                        [
                            'id' => (string) Str::uuid(),
                            'type' => 'scale',
                            'label' => [
                                'lv' => '8.2. Cik ļoti Jūs šobrīd vēlaties iziet ATMP HE / MSC apmācību kursu ar sertifikātu? (1–10)',
                                'en' => '8.2. How motivated are you right now to take an ATMP HE / MSC certified training course? (1–10)',
                            ],
                            'scale' => [
                                'min' => 1,
                                'max' => 10,
                                'minLabel' => ['lv' => 'Nevēlos', 'en' => 'Not motivated'],
                                'maxLabel' => ['lv' => 'Vēlos maksimāli drīz', 'en' => 'Want as soon as possible'],
                            ],
                        ],
                        [
                            'id' => (string) Str::uuid(),
                            'type' => 'scale',
                            'label' => [
                                'lv' => '8.3. Cik ļoti Jūs nākotnē vēlētos sūtīt pacientus uz sertificētu centru ATMP HE / MSC izvērtēšanai? (1–10)',
                                'en' => '8.3. How willing would you be to refer patients to a certified center for ATMP HE / MSC assessment in the future? (1–10)',
                            ],
                            'scale' => [
                                'min' => 1,
                                'max' => 10,
                                'minLabel' => ['lv' => 'Drīzāk nē', 'en' => 'Rather not'],
                                'maxLabel' => ['lv' => 'Aktīvi nosūtītu', 'en' => 'Would actively refer'],
                            ],
                        ],
                        [
                            'id' => (string) Str::uuid(),
                            'type' => 'scale',
                            'label' => [
                                'lv' => '8.4. Cik augsta Jums ir motivācija uz sadarbību ar ATMP HE / MSC centru/ražotāju? (1–10)',
                                'en' => '8.4. How high is your motivation to collaborate with an ATMP HE / MSC center/manufacturer? (1–10)',
                            ],
                            'scale' => [
                                'min' => 1,
                                'max' => 10,
                                'minLabel' => ['lv' => 'Zema', 'en' => 'Low'],
                                'maxLabel' => ['lv' => 'Ļoti augsta', 'en' => 'Very high'],
                            ],
                        ],

                        // 8.5 in your text is “checkbox list” + optional email.
                        [
                            'id' => (string) Str::uuid(),
                            'label' => ['lv' => '8.5. Par ko Jūs vēlētos saņemt piedāvājumus/paziņojumus? (atzīmējiet visu, kas attiecas)', 'en' => '8.5. What would you like to receive offers/notifications about? (select all that apply)'],
                            'type' => 'checkbox',
                            'options' => [
                                'lv' => ['ATMP/MSC izglītojošiem kursiem', 'Dalības iespējām klīniskos pētījumos / reģistros', 'Kopīgu pacientu gadījumu apspriešanu (konsiliji, MDT)'],
                                'en' => ['ATMP/MSC educational courses', 'Participation in clinical studies/registries', 'Joint patient case discussions (case conferences, MDT)'],
                            ],
                        ],
                        [
                            'id' => (string) Str::uuid(),
                            'label' => ['lv' => '8.5.1. Ja vēlaties, norādiet e-pastu (pēc izvēles):', 'en' => '8.5.1. If you wish, provide email (optional):'],
                            'type' => 'text',
                            'placeholder' => ['lv' => 'email@piemers.lv', 'en' => 'email@example.com'],
                        ],

                        // 9. Brīvais komentārs
                        [
                            'id' => (string) Str::uuid(),
                            'label' => ['lv' => '9. Brīvais komentārs', 'en' => '9. Open comment'],
                            'type' => 'textarea',
                            'rows' => 6,
                            'placeholder' => [
                                'lv' => 'Komentāri / bažas / ierosinājumi par ATMP HE / MSC terapiju, apmācību vajadzībām un sadarbību…',
                                'en' => 'Comments / concerns / suggestions about ATMP HE / MSC therapy, training needs and collaboration…',
                            ],
                        ],
                    ],
                ],
            ],

        ];

        foreach ($forms as $formData) {
            // Use updateOrCreate by title so re-running won't duplicate
            Form::updateOrCreate(
                ['title' => $formData['title']],
                $formData
            );

            $this->command->info("Seeded form: " . $formData['title']['en']);
        }
    }
}
