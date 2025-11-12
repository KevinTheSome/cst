import { Head } from '@inertiajs/react';

export default function WelcomeNO() {
  return (
    <>
      <Head title="Velkommen!" />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
        <h1 className="text-4xl font-bold text-green-800">Velkommen fra Norge!</h1>
        <p className="mt-4 text-lg">Dette er den norske versjonen av hjemmesiden.</p>
      </div>
    </>
  );
}
