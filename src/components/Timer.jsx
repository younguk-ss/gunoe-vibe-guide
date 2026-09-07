import { useEffect, useRef, useState } from 'react'

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
      /* 저장 못 해도 타이머는 그대로 동작한다 */
    }
  },
}

const MINUTES = Array.from({ length: 61 }, (_, i) => i)
const SECONDS = Array.from({ length: 60 }, (_, i) => i)
const ITEM_H = 40

const PRESETS = [
  { label: 'STEP 1', m: 22 },
  { label: 'STEP 2', m: 8 },
  { label: 'STEP 3', m: 5 },
  { label: 'STEP 4', m: 17 },
  { label: 'STEP 5', m: 10 },
  { label: 'STEP 6', m: 10 },
]

const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`

/** 휠이 실제로 멈춰 있는 위치의 값. 스크롤 이벤트를 놓쳐도 이게 진짜다. */
function valueAtScroll(el, values, fallback) {
  if (!el) return fallback
  const i = Math.round(el.scrollTop / ITEM_H)
  return values[Math.min(values.length - 1, Math.max(0, i))] ?? fallback
}

function ScrollPicker({ colRef, values, value, onChange, suffix }) {
  const ref = colRef
  const settle = useRef(null)
  const fromScroll = useRef(false)

  // 값이 밖에서 바뀌면(프리셋 클릭·숫자 클릭) 휠도 그 자리로 옮긴다.
  // 스크롤로 바뀐 경우에는 이미 그 자리이므로 건드리지 않는다.
  useEffect(() => {
    if (fromScroll.current) {
      fromScroll.current = false
      return
    }
    const el = ref.current
    if (!el) return
    const target = Math.max(0, values.indexOf(value)) * ITEM_H
    if (Math.abs(el.scrollTop - target) > 2) el.scrollTop = target
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  function onScroll() {
    clearTimeout(settle.current)
    settle.current = setTimeout(() => {
      const el = ref.current
      if (!el) return
      const i = Math.round(el.scrollTop / ITEM_H)
      const v = values[Math.min(values.length - 1, Math.max(0, i))]
      if (v !== value) {
        fromScroll.current = true
        onChange(v)
      }
    }, 60)
  }

  return (
    <div className="tcol" ref={ref} onScroll={onScroll}>
      <div className="pad" />
      {values.map((v) => (
        <div key={v} className={v === value ? 'it on' : 'it'} onClick={() => onChange(v)}>
          {v}
          <small>{suffix}</small>
        </div>
      ))}
      <div className="pad" />
    </div>
  )
}

export default function Timer({ onOpenChange }) {
  const [st, setSt] = useState(() =>
    store.get('gv-timer2', { total: 600, endAt: null, left: 600, done: false }),
  )
  const [open, setOpen] = useState(false)
  const [now, setNow] = useState(Date.now())
  const [min, setMin] = useState(() => Math.floor(store.get('gv-timer2', { total: 600 }).total / 60))
  const [sec, setSec] = useState(() => store.get('gv-timer2', { total: 600 }).total % 60)
  const audio = useRef(null)
  const fired = useRef(false)
  const box = useRef(null)
  const minCol = useRef(null)
  const secCol = useRef(null)

  useEffect(() => store.set('gv-timer2', st), [st])
  useEffect(() => onOpenChange?.(open), [open, onOpenChange])

  const running = st.endAt !== null
  const display = running ? Math.max(0, Math.round((st.endAt - now) / 1000)) : st.left

  // 1초마다 남은 시간 갱신
  useEffect(() => {
    if (!running) return
    const id = setInterval(() => setNow(Date.now()), 250)
    return () => clearInterval(id)
  }, [running])

  // 0에 닿으면 알람 — 음악 파일 없이 Web Audio API로 소리를 만든다
  useEffect(() => {
    if (!running || display > 0 || fired.current) return
    fired.current = true
    playAlarm()
    setSt((s) => ({ ...s, endAt: null, left: 0, done: true }))
  }, [running, display])

  function ensureAudio() {
    if (!audio.current) {
      const AC = window.AudioContext || window.webkitAudioContext
      if (AC) audio.current = new AC()
    }
    audio.current?.resume?.()
    return audio.current
  }

  function playAlarm() {
    const ctx = audio.current
    if (!ctx) return
    const beep = (at, freq) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.value = freq
      gain.gain.setValueAtTime(0.0001, at)
      gain.gain.exponentialRampToValueAtTime(0.35, at + 0.02)
      gain.gain.exponentialRampToValueAtTime(0.0001, at + 0.45)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(at)
      osc.stop(at + 0.5)
    }
    const t = ctx.currentTime
    for (let i = 0; i < 4; i++) beep(t + i * 0.55, i === 3 ? 1175 : 880)
  }

  // 화면에 보이는 휠 위치를 그대로 쓴다 (스크롤 이벤트 유실에 영향받지 않음)
  function startFromWheels() {
    const m = valueAtScroll(minCol.current, MINUTES, min)
    const s = valueAtScroll(secCol.current, SECONDS, sec)
    if (m !== min) setMin(m)
    if (s !== sec) setSec(s)
    start(m * 60 + s)
  }

  function start(totalSecs) {
    const total = Math.max(1, totalSecs)
    ensureAudio() // 사용자 클릭 시점에 오디오를 열어둬야 나중에 소리가 난다
    fired.current = false
    setNow(Date.now())
    setSt({ total, endAt: Date.now() + total * 1000, left: total, done: false })
    setOpen(false)
  }

  function toggle() {
    if (running) {
      setSt((s) => ({ ...s, endAt: null, left: display }))
    } else if (st.left > 0 && st.left < st.total) {
      ensureAudio()
      fired.current = false
      setNow(Date.now())
      setSt((s) => ({ ...s, endAt: Date.now() + s.left * 1000, done: false }))
    } else {
      setOpen((v) => !v)
    }
  }

  function reset() {
    fired.current = false
    setSt((s) => ({ ...s, endAt: null, left: s.total, done: false }))
  }

  // 바깥 클릭 · Esc로 닫기
  useEffect(() => {
    if (!open) return
    const onDown = (e) => {
      if (box.current && !box.current.contains(e.target)) setOpen(false)
    }
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const ratio = st.total > 0 ? display / st.total : 1
  let cls = 'tbtn timer'
  if (st.done) cls += ' done'
  else if (running && ratio <= 0.1) cls += ' late'
  else if (running && ratio <= 0.25) cls += ' warn'

  return (
    <div className="timer-wrap" ref={box}>
      <button
        className={cls}
        onClick={toggle}
        title={running ? '일시정지' : st.left > 0 && st.left < st.total ? '이어서 시작' : '타이머 맞추기'}
      >
        <span className="ic">{st.done ? '🔔' : running ? '⏸' : '⏱'}</span>
        {fmt(display)}
      </button>

      {(running || st.left !== st.total || st.done) && (
        <button className="tbtn ghost" onClick={reset} title="처음으로">
          ↺
        </button>
      )}
      {!running && !st.done && st.left === st.total && (
        <button className="tbtn ghost" onClick={() => setOpen((v) => !v)} title="시간 바꾸기">
          ▾
        </button>
      )}

      {open && (
        <div className="tpick">
          <div className="ttl">타이머 맞추기</div>

          <div className="tcols">
            <div className="tsel" />
            <ScrollPicker colRef={minCol} values={MINUTES} value={min} onChange={setMin} suffix="분" />
            <ScrollPicker colRef={secCol} values={SECONDS} value={sec} onChange={setSec} suffix="초" />
          </div>

          <div className="tpre">
            {PRESETS.map((p) => (
              <button
                key={p.label}
                onClick={() => {
                  setMin(p.m)
                  setSec(0)
                }}
              >
                {p.label} <b>{p.m}분</b>
              </button>
            ))}
          </div>

          <button className="tgo" onClick={startFromWheels}>
            ▶ {fmt(min * 60 + sec)} 시작
          </button>
          <div className="thint">시간이 끝나면 알림음이 울립니다</div>
        </div>
      )}
    </div>
  )
}
