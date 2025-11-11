import { Head } from '@inertiajs/react';

export default function WelcomeLt() {
  return (
    <>
      <Head title="Sveiki atvykę!" />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
        <h1 className="text-4xl font-bold text-green-800">Sveiki atvykę į Lietuvą!</h1>
        <p className="mt-4 text-lg">Tai yra tinklalapio LT versija.</p>
      </div>
    </>
  );
}
