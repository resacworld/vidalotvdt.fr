import Navbar from "../components/NavBar.tsx"

export function Ssr404Page() {
  return (
    <div className="flex min-h-screen flex-col bg-extralight font-grotesk">
      <Navbar />

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center px-6">
        <p className="text-sm text-violet-700">Erreur 404</p>
        <h1 className="mt-4 text-4xl font-semibold text-indigo-950">Cette page n’existe pas.</h1>
        <p className="mt-6 max-w-md text-sm text-indigo-950">
          Le lien est inexistant ou a été retiré.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href="/" className="rounded-md bg-violet-700 px-4 py-2 text-sm font-medium text-white hover:bg-violet-800">
            Retour à l’accueil
          </a>
          <a href="/projects" className="rounded-md border border-violet-300 px-4 py-2 text-sm text-violet-700 hover:bg-violet-100">
            Voir tous les projets
          </a>
        </div>
      </main>
    </div>
  )
}
