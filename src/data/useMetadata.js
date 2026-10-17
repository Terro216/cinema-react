import { useEffect, useState } from 'react'
import useCatalog from './useCatalog.js'

export default function useMetadata(method, args = []) {
  const { repository } = useCatalog()
  const key = JSON.stringify(args)
  const [state, setState] = useState({ key: '', data: null, error: false })
  const [attempt, setAttempt] = useState(0)
  useEffect(() => {
    let active = true
    setState({ key, data: null, error: false })
    if (repository && method) {
      repository[method](...JSON.parse(key)).then(data => { if (active) setState({ key, data, error: false }) })
        .catch(() => { if (active) setState({ key, data: null, error: true }) })
    }
    return () => { active = false }
  }, [repository, method, key, attempt])
  return { data: state.key === key ? state.data : null, error: state.error,
    retry: () => { repository?.retry(); setAttempt(a => a + 1) } }
}
