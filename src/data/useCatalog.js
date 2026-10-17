import { createContext, useContext, useEffect, useState } from 'react'
import { loadCatalog } from './catalog.mjs'
const CatalogContext = createContext()
export function CatalogProvider({ children }) {
  const [state, setState] = useState({ repository: null, error: false })
  const [attempt, setAttempt] = useState(0)
  useEffect(() => {
    let active = true
    setState({ repository: null, error: false })
    loadCatalog().then(repository => { if (active) setState({ repository, error: false }) })
      .catch(() => { if (active) setState({ repository: null, error: true }) })
    return () => { active = false }
  }, [attempt])
  const retry = () => { loadCatalog({ retry: true }).catch(() => {}); setAttempt(a => a + 1) }
  return <CatalogContext.Provider value={{ ...state, retry }}>{children}</CatalogContext.Provider>
}
export default function useCatalog() { return useContext(CatalogContext) }
