import { Head } from '@inertiajs/react';

export default function WelcomeEe() {
  return (
    <>
      <Head title="Tere tulemast!" />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
        <h1 className="text-4xl font-bold text-green-800">Tere tulemast Eestisse!</h1>
        <p className="mt-4 text-lg">See on veebilehe EE versioon.</p>
      </div>
    </>
  );
}
