import { Head } from '@inertiajs/react';
import { useLang } from '@/hooks/useLang';

const euRegulas = [
  {
    title: 'Directive 2004/23/EC',
    text: 'ES pamatdirektīva par cilvēku audu un šūnu kvalitāti, drošību, ziedošanu, testēšanu, apstrādi un izplatīšanu. Attiecas arī uz cilmes šūnām.',
  },
  {
    title: 'Commission Directive 2006/17/EC',
    text: 'Detalizētās prasības audu un šūnu ziedošanai, pārbaudēm un apstrādei.',
  },
  {
    title: 'Commission Directive 2006/86/EC',
    text: 'Prasības trasējamībai, uzskaites sistēmām, nopietnu blakņu un incidentu ziņošanai un audu banku darbībai.',
  },
  {
    title: 'Directive 98/44/EC',
    text: 'Biotehnoloģisko izgudrojumu aizsardzība – ierobežojumi un izņēmumi, kas ietekmē cilmes šūnu tehnoloģijas.',
  },
  {
    title: 'Regulation (EU) 2021/695 – Horizon Europe',
    text: 'ES pētniecības finansējuma regulējums; aizliedz projektu finansēšanu, ja mērķis ir radīt jaunus cilvēka embrijus pētniecībai.',
  },
];

const lvLikumi = [
  {
    title: 'Likums par cilvēka audiem un orgāniem medicīnā',
    text: 'Nosaka audu un šūnu izmantošanu, donoru piekrišanu, audu banku darbību un aizliegumus komerciālai tirdzniecībai.',
  },
  {
    title: 'ZVA regulētās prasības audu/šūnu bankām',
    text: 'Cilmes šūnu bankām nepieciešama sertifikācija, atbilstība kvalitātes un drošības standartiem.',
  },
  {
    title: 'Zinātniskās darbības likums',
    text: 'Nosaka pētījumu ētikas un organizatoriskos rāmjus Latvijā.',
  },
  {
    title: 'Biobanku regulējums',
    text: 'Notiekošās diskusijas par cilvēka bioloģisko paraugu glabāšanu un izmantošanu pētniecībā.',
  },
];

function Card({ title, text, index }: { title: string; text: string; index: number }) {
  return (
    <div className="group relative rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="absolute -top-3 left-6 rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white shadow">
        0{index + 1}
      </div>
      <h4 className="mt-3 text-lg font-semibold text-slate-900">{title}</h4>
      <p className="mt-3 text-sm leading-relaxed text-slate-600">{text}</p>
      <div className="mt-5 h-1 w-12 rounded-full bg-gradient-to-r from-emerald-400 to-sky-400 opacity-70 transition group-hover:w-20" />
    </div>
  );
}

export default function Likumi() {
  const { __ } = useLang();

  return (
    <>
      <Head title={__('Likumi un regulas')} />

      <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#eef7ff] via-white to-[#ecf9f6] text-slate-900">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 left-8 h-72 w-72 rounded-full bg-sky-200/50 blur-3xl" />
          <div className="absolute top-52 right-[-40px] h-80 w-80 rounded-full bg-emerald-200/50 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(#0f172a12_1px,transparent_1px)] [background-size:18px_18px] opacity-40" />
        </div>

        <section className="relative mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-14 sm:px-8 sm:py-16">
          <h1 className="text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl">
            ES regulas un Latvijas likumi par cilmes šūnu tehnoloģijām
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-slate-600">
            Apkopoti galvenie normatīvie akti, kas regulē cilmes šūnu, cilvēka audu un šūnu izmantošanu Eiropas Savienībā un Latvijā.
          </p>

          <div className="rounded-[32px] border border-white/70 bg-white p-8 shadow-xl shadow-slate-200/80">
            <p className="text-xs uppercase tracking-[0.4em] text-emerald-600">ES normatīvie akti</p>
            <h3 className="mt-3 text-3xl font-semibold text-slate-900">Eiropas Savienības regulējums</h3>

            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {euRegulas.map((r, i) => (
                <Card key={r.title} title={r.title} text={r.text} index={i} />
              ))}
            </div>
          </div>

          <div className="rounded-[32px] border border-white/70 bg-white p-8 shadow-xl shadow-slate-200">
            <p className="text-xs uppercase tracking-[0.4em] text-emerald-600">Latvijas regulējums</p>
            <h3 className="mt-3 text-2xl font-semibold text-slate-900">Nacionālie likumi</h3>

            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {lvLikumi.map((l, i) => (
                <Card key={l.title} title={l.title} text={l.text} index={i} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
