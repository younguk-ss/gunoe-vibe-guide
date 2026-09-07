import { useEffect, useState } from 'react'
import { Overview, StepView, Advanced, Teacher } from './components/Views'
import { STEPS, META } from './data/lecture'

/** localStorage는 시크릿 창·차단 설정에서 던질 수 있어 전부 감싼다. */
const store = {
  get(key, fallback) {
    try {
      const raw = localStorage.getItem(key)
      return raw ? JSON.parse(raw) : fallback
    } catch {
      return fallback
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      /* 저장 못 해도 앱은 그대로 동작한다 */
    }
  },
}

const NAV = [
  { id: 'overview', label: '개요' },
  ...STEPS.map((s) => ({ id: `step-${s.id}`, label: `${s.id}`, step: s.id, title: s.title })),
  { id: 'advanced', label: '심화' },
  { id: 'teacher', label: '강사용' },
]

export default function App() {
  const [view, setView] = useState('overview')
  const [theme, setTheme] = useState(() => store.get('gv-theme', 'dark'))
  const [done, setDone] = useState(() => store.get('gv-done', {}))
  const [prep, setPrep] = useState(() => store.get('gv-prep', {}))

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    store.set('gv-theme', theme)
  }, [theme])

  useEffect(() => store.set('gv-done', done), [done])
  useEffect(() => store.set('gv-prep', prep), [prep])

  function go(next) {
    setView(next)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const toggleStep = (id) => setDone((d) => ({ ...d, [id]: !d[id] }))
  const togglePrep = (key) => setPrep((p) => ({ ...p, [key]: !p[key] }))

  const completed = STEPS.filter((s) => done[s.id]).length
  const pct = Math.round((completed / STEPS.length) * 100)

  const step = STEPS.find((s) => `step-${s.id}` === view)

  return (
    <>
      <header className="hdr">
        <div className="hdr-in">
          <div className="brand">
            <span className="brand-t">{META.title}</span>
            <span className="brand-s">{META.subtitle}</span>
          </div>
          <button
            className="icon-btn"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            title={theme === 'dark' ? '밝은 화면으로' : '어두운 화면으로'}
            aria-label="화면 밝기 전환"
          >
            {theme === 'dark' ? '☀' : '☾'}
          </button>
        </div>

        <nav className="nav">
          {NAV.map((n) => (
            <button
              key={n.id}
              className={view === n.id ? 'on' : ''}
              onClick={() => go(n.id)}
              title={n.title}
            >
              {n.step ? `STEP ${n.label}` : n.label}
              {n.step && done[n.step] && <span className="done-dot" />}
            </button>
          ))}
        </nav>

        <div className="prog">
          <i style={{ width: `${pct}%` }} />
        </div>
      </header>

      <main className="shell">
        {view === 'overview' && <Overview go={go} done={done} />}
        {step && <StepView step={step} go={go} done={done} toggle={toggleStep} />}
        {view === 'advanced' && <Advanced go={go} />}
        {view === 'teacher' && <Teacher go={go} prep={prep} togglePrep={togglePrep} />}

        <div className="foot">
          {META.title} 실습 가이드 · {META.date}
          <br />
          {META.teacher}
        </div>
      </main>
    </>
  )
}
