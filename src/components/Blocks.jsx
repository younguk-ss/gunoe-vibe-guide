import { useState } from 'react'
import { THEMES, DESIGN3, SAVE_RULES } from '../data/lecture'

/** 콘텐츠 문자열에는 <b>/<code> 만 쓰인다. 전부 이 앱이 직접 작성한 값이다. */
export const H = ({ t, as: Tag = 'span', ...rest }) => (
  <Tag {...rest} dangerouslySetInnerHTML={{ __html: t }} />
)

export function PromptBox({ label, text }) {
  const [done, setDone] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = text
      ta.style.position = 'fixed'
      ta.style.opacity = '0'
      document.body.appendChild(ta)
      ta.select()
      try {
        document.execCommand('copy')
      } catch {
        /* 복사 불가 환경 — 아래 텍스트를 직접 선택하면 된다 */
      }
      document.body.removeChild(ta)
    }
    setDone(true)
    setTimeout(() => setDone(false), 1600)
  }

  return (
    <div className="prompt">
      <div className="prompt-bar">
        <span className="prompt-lbl">{label}</span>
        <button className={done ? 'copy done' : 'copy'} onClick={copy}>
          {done ? '✓ 복사됨' : '복사'}
        </button>
      </div>
      <pre>{text}</pre>
    </div>
  )
}

function Callout({ kind, icon, title, text, items }) {
  return (
    <div className={`callout c-${kind}`}>
      <div className="ct">
        <span>{icon}</span>
        <span>{title}</span>
      </div>
      {text && <H t={text} as="p" />}
      {items && (
        <ul className="plain">
          {items.map((s, i) => (
            <H key={i} t={s} as="li" />
          ))}
        </ul>
      )}
    </div>
  )
}

function ThemePicker({ title, note }) {
  return (
    <div>
      <h3 className="blk-title">{title}</h3>
      <div className="grid">
        {THEMES.map((t) => (
          <div className="tcard" key={t.name}>
            <div className="em">{t.emoji}</div>
            <h4>{t.name}</h4>
            <p>{t.desc}</p>
            <div className="ph">배경 사진: {t.photo}</div>
          </div>
        ))}
      </div>
      {note && <p style={{ color: 'var(--text-faint)', fontSize: 13.5, margin: 0 }}>{note}</p>}
    </div>
  )
}

function Design3({ title }) {
  return (
    <div>
      <h3 className="blk-title">{title}</h3>
      <div className="tw">
        <table>
          <thead>
            <tr>
              <th>단계</th>
              <th>방법</th>
              <th>결과</th>
            </tr>
          </thead>
          <tbody>
            {DESIGN3.map((d) => (
              <tr key={d.level} className={d.now ? 'pick' : ''}>
                <td>
                  <b>{d.level}</b>
                  <br />
                  <span style={{ fontSize: 12.5, color: 'var(--text-faint)' }}>{d.name}</span>
                </td>
                <td>
                  {d.method}
                  {d.now && ' ← 오늘 하는 것'}
                </td>
                <td>{d.result}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function SaveTable({ title }) {
  return (
    <div>
      <h3 className="blk-title">⚠️ {title}</h3>
      <div className="tw">
        <table>
          <thead>
            <tr>
              <th>항목</th>
              <th>이렇게 설정</th>
              <th>안 하면?</th>
            </tr>
          </thead>
          <tbody>
            {SAVE_RULES.map((r) => (
              <tr key={r.item}>
                <td>{r.item}</td>
                <td>
                  <code>{r.value}</code>
                </td>
                <td>{r.fail}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function Aha({ title, teacherScript }) {
  return (
    <div className="aha">
      <div className="aha-bar">
        <span>⭐</span>
        <span>{title}</span>
      </div>
      <div className="aha-body">
        <div className="lbl">강사 대사 — 그대로 읽으세요</div>
        <H t={teacherScript} as="div" className="script" />
      </div>
    </div>
  )
}

export function Block({ b }) {
  switch (b.type) {
    case 'prompt':
      return <PromptBox label={b.label} text={b.text} />

    case 'steps':
      return (
        <div className="card">
          <h3 className="blk-title">{b.title}</h3>
          <ol className="steps">
            {b.items.map((s, i) => (
              <H key={i} t={s} as="li" />
            ))}
          </ol>
        </div>
      )

    case 'warn':
      return <Callout kind="warn" icon="⚠️" {...b} />

    case 'note':
      return <Callout kind="note" icon="💡" {...b} />

    case 'success':
      return <Callout kind="ok" icon="✅" {...b} />

    case 'teacher':
      return <Callout kind="teacher" icon="🎤" {...b} />

    case 'aha':
      return <Aha {...b} />

    case 'theme':
      return <ThemePicker {...b} />

    case 'design3':
      return <Design3 {...b} />

    case 'savetable':
      return <SaveTable {...b} />

    default:
      return null
  }
}
