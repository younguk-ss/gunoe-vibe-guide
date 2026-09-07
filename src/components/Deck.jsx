import { useEffect, useRef, useState } from 'react'
import Slide from './Slide'
import Timer from './Timer'
import { SLIDES, SECTIONS } from '../data/slides'

/** localStorage는 시크릿 창·차단 설정에서 던질 수 있어 전부 감싼다. */
const store = {
  get(k, f) {
    try {
      const r = localStorage.getItem(k)
      return r ? JSON.parse(r) : f
    } catch {
      return f
    }
  },
  set(k, v) {
    try {
      localStorage.setItem(k, JSON.stringify(v))
    } catch {
      /* 저장 못 해도 앱은 동작한다 */
    }
  },
}

function initialIndex() {
  const h = parseInt(location.hash.replace('#', ''), 10)
  return Number.isFinite(h) && h >= 1 && h <= SLIDES.length ? h - 1 : 0
}

export default function Deck({ onTeacher }) {
  const [i, setI] = useState(initialIndex)
  const [toc, setToc] = useState(false)
  const [timerOpen, setTimerOpen] = useState(false)
  const touch = useRef(null)

  const total = SLIDES.length
  const s = SLIDES[i]
  const secIdx = SECTIONS.findIndex((x) => x.id === s.section)

  function go(n) {
    const next = Math.max(0, Math.min(total - 1, n))
    setI(next)
    setToc(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    history.replaceState(null, '', `#${i + 1}`)
  }, [i])

  useEffect(() => {
    function onKey(e) {
      const tag = e.target.tagName
      // 타이머 설정 중에는 화살표가 슬라이드를 넘기지 않게 한다
      if (tag === 'INPUT' || tag === 'TEXTAREA' || e.metaKey || e.ctrlKey || timerOpen) return
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        e.preventDefault()
        go(i + 1)
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault()
        go(i - 1)
      } else if (e.key === 'Home') go(0)
      else if (e.key === 'End') go(total - 1)
      else if (e.key === 't' || e.key === 'T') setToc((v) => !v)
      else if (e.key === 'f' || e.key === 'F') toggleFull()
      else if (e.key === 'Escape') setToc(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  function toggleFull() {
    if (document.fullscreenElement) document.exitFullscreen?.()
    else document.documentElement.requestFullscreen?.()
  }

  function onTouchStart(e) {
    touch.current = e.touches[0].clientX
  }
  function onTouchEnd(e) {
    if (touch.current == null) return
    const dx = e.changedTouches[0].clientX - touch.current
    touch.current = null
    if (Math.abs(dx) > 60) go(dx < 0 ? i + 1 : i - 1)
  }

  const prev = i > 0 ? SLIDES[i - 1] : null
  const next = i < total - 1 ? SLIDES[i + 1] : null

  return (
    <div className="deck" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <header className="topbar">
        <div className="topbar-in">
          <div className="brand">
            군외중 바이브코딩<small>우리 학교가 배경인 게임 만들기</small>
          </div>
          <div className="tools">
            <Timer onOpenChange={setTimerOpen} />
            <button className="tbtn hide-sm" onClick={() => setToc(true)} title="목차 (T)">
              ☰ 목차
            </button>
            <button className="tbtn hide-sm" onClick={toggleFull} title="전체 화면 (F)">
              ⛶
            </button>
          </div>
        </div>
        <nav className="secnav">
          {SECTIONS.map((sec, k) => (
            <button
              key={sec.id}
              className={k === secIdx ? 'on' : ''}
              onClick={() => go(SLIDES.findIndex((x) => x.section === sec.id))}
            >
              {sec.label}
            </button>
          ))}
          <button className="teach" onClick={onTeacher}>
            🎓 강사용
          </button>
        </nav>
        <div className="prog">
          <i style={{ width: `${((i + 1) / total) * 100}%` }} />
        </div>
      </header>

      <main className="stage">
        <Slide s={s} index={i} total={total} />
      </main>

      <div className="pager">
        <button className="pb" onClick={() => go(i - 1)} disabled={!prev}>
          <span className="dir">← 이전</span>
          <span>{prev ? prev.title.split('\n')[0] : '—'}</span>
        </button>
        <span className="cnt">
          {i + 1} / {total}
        </span>
        <button className="pb next" onClick={() => go(i + 1)} disabled={!next}>
          <span className="dir">다음 →</span>
          <span>{next ? next.title.split('\n')[0] : '끝'}</span>
        </button>
      </div>
      <div className="keyhint">
        <kbd>←</kbd> <kbd>→</kbd> 넘기기 · <kbd>T</kbd> 목차 · <kbd>F</kbd> 전체 화면 · 모바일은 좌우 스와이프
      </div>

      {toc && (
        <div className="toc-bg" onClick={() => setToc(false)}>
          <div className="toc" onClick={(e) => e.stopPropagation()}>
            <h2>목차</h2>
            {SECTIONS.map((sec) => (
              <div key={sec.id}>
                <div className="sec">{sec.label}</div>
                {SLIDES.map((x, k) =>
                  x.section === sec.id ? (
                    <div key={k} className={k === i ? 'it on' : 'it'} onClick={() => go(k)}>
                      <span className="n">{k + 1}</span>
                      <span>{x.title.split('\n')[0]}</span>
                    </div>
                  ) : null,
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
