import { Head } from '@inertiajs/react';

export default function WelcomeLv() {
  return (
    <>
      <Head title="Sveicināti!" />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
        <h1 className="text-4xl font-bold text-green-800">Sveicināti no Latvijas!</h1>
        <p className="mt-4 text-lg">Šī ir mājaslapas LV versija.</p>
      </div>
    </>
  );
}
