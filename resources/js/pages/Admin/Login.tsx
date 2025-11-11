import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import LoginLayout from '../../Layouts/LoginLayout';

type LoginProps = {
  onSuccess?: (data: any) => void;
  apiEndpoint?: string;
};

export default function LoginPage({ onSuccess, apiEndpoint = '/admin/login' }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});
  const [showPassword, setShowPassword] = useState(false);

  function validate() {
    const errors: { email?: string; password?: string } = {};

    if (!email.trim()) errors.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(email)) errors.email = 'Enter a valid email address';

    if (!password) errors.password = 'Password is required';
    else if (password.length < 6) errors.password = 'Password must be at least 6 characters';

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!validate()) return;

    setLoading(true);
    try {
      const payload = { email: email.trim(), password, remember };

      const token = (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement | null)?.content || '';

      const res = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': token,               // <-- important
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload),
        credentials: 'include',                // <-- include session cookie
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        if (data.errors) setFieldErrors(data.errors);
        setError(data.message || 'Login failed.');
        setLoading(false);
        return;
      }

      setLoading(false);
      if (onSuccess) onSuccess(data);

      if (data.redirect) window.location.href = data.redirect;
    } catch (err: any) {
      setLoading(false);
      setError(err?.message || 'Network error');
    }
  }

  return (
    <>
      <Head title="Login" />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="max-w-md w-full bg-white shadow-lg rounded-xl p-8 border border-gray-200">
          <h1 className="text-2xl font-semibold text-gray-800 mb-1">
            Sign in to your account
          </h1>
          <p className="text-sm text-gray-600 mb-6">
            Enter your credentials to continue.
          </p>

          {error && (
            <div className="mb-4 text-sm text-red-700 bg-red-50 border border-red-200 p-3 rounded-md">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            {/* Email */}
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>

            <div className="mt-1 mb-4">
              <input
                id="email"
                type="email"
                value={email}
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
                className={`block w-full px-3 py-2 border rounded-md shadow-sm text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                  fieldErrors.email ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {fieldErrors.email && (
                <p className="mt-1 text-xs text-red-600">{fieldErrors.email}</p>
              )}
            </div>

            {/* Password */}
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>

            <div className="mt-1 mb-4 relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
                className={`block w-full px-3 py-2 border rounded-md shadow-sm text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                  fieldErrors.password ? 'border-red-300' : 'border-gray-300'
                }`}
              />

              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-3 top-2 text-xs text-gray-600 hover:text-gray-800"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>

              {fieldErrors.password && (
                <p className="mt-1 text-xs text-red-600">{fieldErrors.password}</p>
              )}
            </div>

            {/* Remember Me */}
            <label className="flex items-center mb-4 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
              />
              <span className="ml-2">Remember me</span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 disabled:opacity-60"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

LoginPage.layout = (page: React.ReactNode) => <LoginLayout title="Login">{page}</LoginLayout>;