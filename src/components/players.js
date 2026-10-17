import { useState, useEffect, useRef } from 'react'
export default function Players({ id, name }) {
  const [provider, setProvider] = useState(null), [attempt, setAttempt] = useState(0)
  const [status, setStatus] = useState('Старые плееры сейчас недоступны. Описание и похожие фильмы доступны ниже.')
  const iframe = useRef()
  useEffect(() => {
    if (!provider) return
    setStatus('Пробуем открыть плеер…')
    const timer = setTimeout(() => setStatus('Плеер не открылся. Можно попробовать позже.'), 10000)
    const message = event => {
      if (event.source !== iframe.current?.contentWindow || event.data?.cinemaPlayer !== 'unavailable') return
      clearTimeout(timer); setStatus('Плеер недоступен. Можно попробовать позже.')
    }
    window.addEventListener('message', message)
    return () => { clearTimeout(timer); window.removeEventListener('message', message) }
  }, [provider, attempt])
  return <section className="film players" aria-label="Плееры">
    <div className="player-controls">
      <button onClick={() => { setProvider('yohoho'); setAttempt(a => a + 1) }}>Плеер 1</button>
      <button onClick={() => { setProvider('pleer'); setAttempt(a => a + 1) }}>Плеер 2</button>
      <a href={`https://www.kinopoisk.ru/film/${id}/`} target="_blank" rel="noreferrer">На КиноПоиске</a>
    </div>
    <p role="status">{status}</p>
    {provider && <iframe ref={iframe} key={`${provider}-${attempt}`} title={`${name} — ${provider}`} src={`/players/${provider}.html?id=${id}`} sandbox="allow-scripts allow-forms allow-presentation" allow="fullscreen" referrerPolicy="no-referrer" />}
  </section>
}
