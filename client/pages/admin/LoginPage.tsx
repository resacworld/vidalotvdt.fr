import { useState } from 'react'
import { TRPCClientError } from '@trpc/client'
import { api } from '../../api.ts'

export function LoginPage() {
  const [error, setError] = useState('')

  // React 19 form action: gets the FormData directly, no preventDefault / controlled input.
  async function login(form: FormData) {
    try {
      await api.auth.login.mutate({ password: String(form.get('password')) })
      navigation.navigate('/admin')
    } catch (err) {
      setError(err instanceof TRPCClientError && err.data?.code === 'UNAUTHORIZED'
        ? 'Mot de passe incorrect'
        : 'Connexion impossible, réessaie plus tard')
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-extralight px-4 font-grotesk">
      <form action={login} className="flex w-full max-w-sm flex-col gap-4 rounded-lg bg-white p-8 shadow">
        <h1 className="text-2xl font-semibold text-extrabold">Administration</h1>
        <label className="flex flex-col gap-1 text-sm text-extrabold">
          Mot de passe
          <input name="password" type="password" required autoComplete="current-password"
            className="rounded border border-light px-3 py-2 focus:border-regular focus:outline-none" />
        </label>
        {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
        <button type="submit" className="rounded-md bg-extrabold px-4 py-2 text-sm font-medium text-white hover:bg-bold">
          Se connecter
        </button>
      </form>
    </main>
  )
}
