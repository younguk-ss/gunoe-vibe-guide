import { useState } from 'react'
import Flow from './Flow'

/** 콘텐츠 문자열의 <b>/<code>는 전부 slides.js에서 직접 작성한 값이다. */
export const H = ({ t, as: Tag = 'span', ...rest }) => (
  <Tag {...rest} dangerouslySetInnerHTML={{ __html: t }} />
)

async function copyText(text) {
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
      /* 복사 불가 환경 — 본문을 직접 드래그하면 된다 */
    }
    document.body.removeChild(ta)
  }
}

export function CopyButton({ text }) {
  const [done, setDone] = useState(false)
  async function onClick() {
    await copyText(text)
    setDone(true)
    setTimeout(() => setDone(false), 1600)
  }
  return (
    <button className={done ? 'copy done' : 'copy'} onClick={onClick}>
      {done ? '✓ 복사됨' : '복사'}
    </button>
  )
}

export function PromptBox({ label, text }) {
  return (
    <div className="prompt">
      <div className="prompt-bar">
        <span className="prompt-lbl">{label}</span>
        <CopyButton text={text} />
      </div>
      <pre>{text}</pre>
    </div>
  )
}

function Script({ text, star }) {
  return (
    <div className={star ? 'script star' : 'script'}>
      <span className="lbl">🎤 강사 대사 — 그대로 읽으세요</span>
      <H t={text} as="div" className="txt" />
    </div>
  )
}

function Callout({ kind, title, text }) {
  return (
    <div className={`co ${kind}`}>
      <div className="t">{title}</div>
      <H t={text} as="p" />
    </div>
  )
}

function Head({ s }) {
  return (
    <div>
      {s.kicker && <div className="kicker">{s.kicker}</div>}
      <h1 className="st">{s.title}</h1>
      {s.lead && <H t={s.lead} as="p" className="lead" style={{ marginTop: 8 }} />}
    </div>
  )
}

function Quiz({ options, answer, follow }) {
  const [picked, setPicked] = useState(null)
  return (
    <>
      <div className="quiz">
        {options.map((o, i) => {
          let cls = 'opt'
          if (picked !== null) cls += i === answer ? ' yes' : ' no'
          return (
            <div key={o} className={cls} onClick={() => setPicked(i)}>
              {o}
            </div>
          )
        })}
      </div>
      {picked !== null && follow && (
        <Callout kind="ok" title="이어지는 질문" text={follow} />
      )}
    </>
  )
}

function Body({ s }) {
  switch (s.type) {
    case 'title':
      return (
        <div className="slide-body title-slide">
          <div className="kicker">{s.kicker}</div>
          <h1 className="st">{s.title}</h1>
          <div className="sub">{s.subtitle}</div>
          <div className="pills">
            {s.pills.map((p) => (
              <span className="pill" key={p}>
                {p}
              </span>
            ))}
          </div>
        </div>
      )

    case 'hook':
      return (
        <div className="slide-body">
          <Head s={s} />
          <div className="hook-big">{s.big}</div>
          <div className="lines">
            {s.lines.map((l, i) => (
              <H key={i} t={l} as="div" />
            ))}
          </div>
        </div>
      )

    case 'links':
      return (
        <div className="slide-body">
          <Head s={s} />
          <div className="links">
            {s.links.map((l) => (
              <a className="link" key={l.url} href={l.url} target="_blank" rel="noreferrer">
                <span className="em">{l.emoji}</span>
                <span>
                  <div className="lb">{l.label}</div>
                  <div className="ds">{l.desc}</div>
                  <div className="u">{l.url.replace('https://', '')}</div>
                </span>
              </a>
            ))}
          </div>
          {s.script && <Script text={s.script} />}
        </div>
      )

    case 'flow':
      return (
        <div className="slide-body">
          <Head s={s} />
          <Flow active={s.active} />
        </div>
      )

    case 'timeline': {
      const total = s.rows.reduce((a, r) => a + r.t, 0)
      return (
        <div className="slide-body">
          <Head s={s} />
          <div className="tl">
            {s.rows.map((r) => (
              <div
                key={r.label}
                className={r.step ? 'seg step' : 'seg'}
                style={{ flex: `${r.t} 1 0` }}
                title={`${r.label} · ${r.t}분`}
              >
                <span className="l">{r.label}</span>
                <span className="m">{r.t}분</span>
              </div>
            ))}
          </div>
          <div className="pace">
            {s.pace.map((p) => (
              <div className="p" key={p.at}>
                <span className="at">{p.at}</span>
                <span>{p.rule}</span>
              </div>
            ))}
          </div>
          <p className="lead" style={{ fontSize: 14, color: 'var(--ink-3)' }}>
            합계 {total}분. 깃허브 가입을 사전에 끝내두면 STEP 4가 17분 → 6분, 11분 여유가 생깁니다.
          </p>
        </div>
      )
    }

    case 'image':
      return (
        <div className="slide-body">
          <Head s={s} />
          <img className="img" src={s.src} alt={s.alt} />
        </div>
      )

    case 'three':
      return (
        <div className="slide-body">
          <Head s={s} />
          <div className="three">
            {s.cols.map((c) => (
              <div className="col" key={c.name}>
                <div className="num">{c.num}</div>
                <div className="name">{c.name}</div>
                <div className="em">{c.emoji}</div>
                <H t={c.desc} as="div" className="desc" />
                <H t={c.detail} as="div" className="detail" />
                {c.tag && <div className="tag">{c.tag}</div>}
              </div>
            ))}
          </div>
          {s.arrows && (
            <div className="arrows">
              {s.arrows.map((a) => (
                <span key={a}>{a}</span>
              ))}
            </div>
          )}
        </div>
      )

    case 'pipeline':
      return (
        <div className="slide-body">
          <Head s={s} />
          <div className="pipe">
            {s.nodes.map((n, i) => (
              <span key={n.name} style={{ display: 'contents' }}>
                {i > 0 && <span className="ar">→</span>}
                <div className="pn">
                  <div className="em">{n.emoji}</div>
                  <div className="nm">{n.name}</div>
                  <div className="ds">{n.desc}</div>
                </div>
              </span>
            ))}
          </div>
          <div className="lines">
            {s.lines.map((l, i) => (
              <H key={i} t={l} as="div" />
            ))}
          </div>
        </div>
      )

    case 'quiz':
      return (
        <div className="slide-body">
          <Head s={s} />
          <Quiz options={s.options} answer={s.answer} follow={s.follow} />
        </div>
      )

    case 'stepIntro':
      return (
        <div className="slide-body">
          <div className={s.highlight ? 'stepintro hl' : 'stepintro'}>
            <div className="badge">{['', '🎮', '🎨', '🔗', '📦', '🚀', '🏆'][s.step]}</div>
            <div>
              <div className="meta">
                <span className="n">STEP {s.step}</span>
                <span className="d">{s.duration}</span>
              </div>
              <h1 className="st">{s.title}</h1>
              <p className="goal">{s.goal}</p>
            </div>
          </div>
          <Flow active={s.step} />
        </div>
      )

    case 'cards':
      return (
        <div className="slide-body">
          <Head s={s} />
          <div className="cards">
            {s.cards.map((c) => (
              <div className="card" key={c.name}>
                <div className="em">{c.emoji}</div>
                <h3>{c.name}</h3>
                <p>{c.desc}</p>
                {c.foot && <div className="foot">{c.foot}</div>}
              </div>
            ))}
          </div>
        </div>
      )

    case 'steps':
      return (
        <div className="slide-body">
          <Head s={s} />
          <ol className="steps">
            {s.items.map((it, i) => (
              <H key={i} t={it} as="li" />
            ))}
          </ol>
          {s.callout && <Callout {...s.callout} />}
          {s.script && <Script text={s.script} />}
          {s.success && <Callout kind="ok" title="확인" text={s.success} />}
        </div>
      )

    case 'prompt':
      return (
        <div className="slide-body">
          <Head s={s} />
          <PromptBox label={s.label} text={s.text} />
          {s.extra && (
            <ul className="bul">
              {s.extra.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          )}
        </div>
      )

    case 'keywords':
      return (
        <div className="slide-body">
          <Head s={s} />
          <div className="kw">
            {s.items.map((it, i) => (
              <div className="c" key={it.k}>
                <div className="top">
                  <span className="em">{it.emoji}</span>
                  <span className="n">{i + 1}</span>
                </div>
                <div className="k">{it.k}</div>
                <H t={it.one} as="div" className="one" />
                <H t={it.ex} as="div" className="ex" />
              </div>
            ))}
          </div>
        </div>
      )

    case 'annotated': {
      const full = s.lines.map((l) => l.text).join('\n')
      return (
        <div className="slide-body">
          <Head s={s} />
          <div className="anno">
            <div className="prompt-bar">
              <span className="prompt-lbl">{s.label}</span>
              <CopyButton text={full} />
            </div>
            <div className="body">
              {s.lines.map((l, i) =>
                l.text === '' ? (
                  <div className="row blank" key={i} />
                ) : (
                  <div className="row" key={i}>
                    <span className="t">{l.text}</span>
                    <span className="tags">
                      {(l.tags || []).map((t) => (
                        <span className="tag" key={t}>
                          {t}
                        </span>
                      ))}
                    </span>
                  </div>
                ),
              )}
            </div>
          </div>
          {s.foot && (
            <H t={s.foot} as="p" className="lead" style={{ fontSize: 13.5, color: 'var(--ink-3)' }} />
          )}
        </div>
      )
    }

    case 'prompts':
      return (
        <div className="slide-body">
          <Head s={s} />
          <div className="prompts">
            {s.prompts.map((p) => (
              <PromptBox key={p.label} label={p.label} text={p.text} />
            ))}
          </div>
        </div>
      )

    case 'script':
      return (
        <div className="slide-body">
          <Head s={s} />
          <Script text={s.script} star={s.star} />
          {s.bullets && (
            <ul className="bul">
              {s.bullets.map((b) => (
                <H key={b} t={b} as="li" />
              ))}
            </ul>
          )}
        </div>
      )

    case 'naming':
      return (
        <div className="slide-body">
          <Head s={s} />
          <div className="naming">
            <ol className="steps">
              {s.steps.map((it, i) => (
                <H key={i} t={it} as="li" />
              ))}
            </ol>
            {s.bad && (
              <div className="gb">
                {s.bad.map((b) => (
                  <div className="bad" key={b}>
                    {b}
                  </div>
                ))}
                <div className="good">{s.good}</div>
              </div>
            )}
          </div>
        </div>
      )

    case 'design3':
      return (
        <div className="slide-body">
          <Head s={s} />
          <div className="d3">
            {s.rows.map((r) => (
              <div className={r.now ? 'row now' : 'row'} key={r.level}>
                <div className="lv">
                  {r.level}
                  <small>{r.name}</small>
                </div>
                <H t={r.method + (r.now ? '  ← 오늘' : '')} as="div" />
                <div>{r.result}</div>
              </div>
            ))}
          </div>
        </div>
      )

    case 'savetable':
      return (
        <div className="slide-body">
          <Head s={s} />
          <div className="tw wrap">
            <table>
              <thead>
                <tr>
                  <th>항목</th>
                  <th>이렇게 설정</th>
                  <th>안 하면?</th>
                </tr>
              </thead>
              <tbody>
                {s.rows.map((r) => (
                  <tr key={r.item}>
                    <td style={{ fontWeight: 800, color: 'var(--ink)' }}>{r.item}</td>
                    <td className="big">
                      <code>{r.value}</code>
                    </td>
                    <td>{r.fail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {s.success && <Callout kind="ok" title="여기까지 오면" text={s.success} />}
        </div>
      )

    case 'message':
      return (
        <div className="slide-body message">
          <div className="kicker" style={{ justifyContent: 'center' }}>
            {s.kicker}
          </div>
          <h1 className="st">{s.title}</h1>
          {s.sub && <p className="sub">{s.sub}</p>}
        </div>
      )

    default:
      return (
        <div className="slide-body">
          <Head s={s} />
        </div>
      )
  }
}

export default function Slide({ s, index, total }) {
  return (
    <section className="slide" key={index}>
      <Body s={s} />
      <div className="slide-foot">
        {s.note ? <span className="note">{s.note}</span> : <span className="note" style={{ opacity: 0.5 }}>—</span>}
        <span className="cnt">
          {index + 1} / {total}
        </span>
      </div>
    </section>
  )
}
