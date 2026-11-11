import { lazy, Suspense, useEffect, useState } from 'react'
import '../style.css'
import LoadingPage from './LoadingPage.tsx'

// Dictionnary of Lazy-loaded pages
const routes: Record<string, ReturnType<typeof lazy>> = {
  '/admin/login': lazy(() => import('./admin/LoginPage.tsx').then((m) => ({ default: m.LoginPage }))),
  '/admin': lazy(() => import('./admin/DashboardPage.tsx').then((m) => ({ default: m.DashboardPage }))),
}

/**
 * Spa main component (manage routes)
 */
export function SpaAdmin() {
  const [path, setPath] = useState(location.pathname)

  useEffect(() => {
    const onNavigate = (e: NavigateEvent) => {
      const url = new URL(e.destination.url)
      if (!e.canIntercept || e.hashChange || e.downloadRequest !== null || !url.pathname.startsWith('/admin')) return
      e.intercept({ handler: async () => setPath(url.pathname) })
    }
    navigation.addEventListener('navigate', onNavigate)
    return () => navigation.removeEventListener('navigate', onNavigate)
  }, [])

  const Page = routes[path] ?? routes['/admin']
  return <Suspense fallback={<LoadingPage />}><Page /></Suspense>
}
