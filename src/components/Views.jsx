import { Block, PromptBox, H } from './Blocks'
import {
  META,
  TIMETABLE,
  PACE,
  REFERENCES,
  THEORY,
  STEPS,
  ADVANCED,
  MODEL_RANKING,
  PREP,
  RISKS,
  PLAN_B,
  INTENT,
} from '../data/lecture'

export function Overview({ go, done }) {
  return (
    <>
      <div className="hero">
        <h1>
          {META.title}
          <br />
          실습 가이드
        </h1>
        <p>{META.subtitle}</p>
        <div className="pills">
          <span className="pill">{META.date}</span>
          <span className="pill">{META.duration}</span>
          <span className="pill">{META.teacher}</span>
        </div>
      </div>

      <div className="goal">
        <div className="lbl">오늘의 목표</div>
        <p>{META.goal}</p>
      </div>

      <h2 className="sec">타임테이블 · 100분</h2>
      <div className="tt">
        {TIMETABLE.map((r, i) => (
          <div
            key={i}
            className={r.step ? 'tt-row is-step' : 'tt-row'}
            onClick={r.step ? () => go(`step-${r.step}`) : undefined}
            style={r.step ? { cursor: 'pointer' } : undefined}
          >
            <span className="tt-time">{r.time}</span>
            <div className="tt-main">
              <div className="tt-label">
                {r.label} {r.step && done[r.step] && <span style={{ color: 'var(--ok)' }}>✓</span>}
              </div>
              <div className="tt-note">{r.note}</div>
            </div>
          </div>
        ))}
      </div>

      <h2 className="sec">페이스 기준점</h2>
      <div className="card">
        {PACE.map((p, i) => (
          <div className="pace" key={i}>
            <span className="at">{p.at}</span>
            <span className="rule">{p.rule}</span>
          </div>
        ))}
        <p style={{ color: 'var(--text-faint)', fontSize: 13.5, margin: '12px 0 0' }}>
          여유 시간이 0입니다. 깃허브 가입을 사전에 끝내두면 STEP 4가 17분 → 6분이 되어 11분이
          확보됩니다.
        </p>
      </div>

      <h2 className="sec">사용할 모델</h2>
      <div className="card">
        <h3 className="blk-title">제미나이 3.8 Flash · 사고 수준 high</h3>
        <p style={{ color: 'var(--text-dim)', margin: '0 0 4px', fontSize: 14.5 }}>
          Pro가 상위 모델이니 코딩도 더 잘하겠지 — 라는 직관이 이번엔 틀립니다. 근거는{' '}
          <a href="#" onClick={(e) => { e.preventDefault(); go('teacher') }}>
            강사용 탭
          </a>
          에 있습니다.
        </p>
      </div>

      <h2 className="sec">작동 원리 — 8분 안에</h2>
      <div className="card">
        <pre
          style={{
            fontFamily: 'var(--mono)',
            fontSize: 12.6,
            lineHeight: 1.9,
            color: 'var(--accent)',
            background: 'var(--surface-2)',
            padding: '13px 15px',
            borderRadius: 10,
            overflowX: 'auto',
            margin: '0 0 14px',
          }}
        >
{`내 말(프롬프트) → AI가 코드 작성 → 브라우저가 화면으로 표시
깃허브(파일 저장) → Vercel(서버에 올림) → 누구나 URL로 접속`}
        </pre>
        <dl style={{ margin: 0 }}>
          {THEORY.map((t) => (
            <div className="def" key={t.term}>
              <dt>{t.term}</dt>
              <dd>{t.desc}</dd>
            </div>
          ))}
        </dl>
      </div>

      <h2 className="sec">선배들 작품 — 직접 플레이하기</h2>
      <div className="card">
        {REFERENCES.map((r) => (
          <a className="linkrow" key={r.url} href={r.url} target="_blank" rel="noreferrer">
            <span>▶</span>
            <span>{r.label}</span>
            <span className="u">{r.url.replace('https://', '')}</span>
          </a>
        ))}
      </div>

      <div className="pager">
        <button disabled>
          <span className="dir">이전</span>
        </button>
        <button className="next" onClick={() => go('step-1')}>
          <span className="dir">다음</span>
          STEP 1. 게임 만들기 →
        </button>
      </div>
    </>
  )
}

export function StepView({ step, go, done, toggle }) {
  const prev = STEPS.find((s) => s.id === step.id - 1)
  const next = STEPS.find((s) => s.id === step.id + 1)
  const isDone = !!done[step.id]

  return (
    <>
      <div className={step.highlight ? 'step-head hl' : 'step-head'}>
        <div className="step-badge">{step.icon}</div>
        <div>
          <div className="meta">
            STEP {step.id} · {step.duration}
          </div>
          <h1>{step.title}</h1>
        </div>
      </div>

      <div className="goal">
        <div className="lbl">이 단계의 목표</div>
        <p>{step.goal}</p>
      </div>

      {step.blocks.map((b, i) => (
        <Block key={i} b={b} />
      ))}

      <div className={isDone ? 'step-done on' : 'step-done'} onClick={() => toggle(step.id)}>
        <input type="checkbox" checked={isDone} readOnly style={{ pointerEvents: 'none' }} />
        <span className="t">
          {isDone ? `STEP ${step.id} 완료!` : `STEP ${step.id}을 마쳤으면 여기를 누르세요`}
        </span>
      </div>

      <div className="pager">
        <button onClick={() => go(prev ? `step-${prev.id}` : 'overview')}>
          <span className="dir">이전</span>
          {prev ? `← STEP ${prev.id}. ${prev.title}` : '← 개요'}
        </button>
        <button className="next" onClick={() => go(next ? `step-${next.id}` : 'advanced')}>
          <span className="dir">다음</span>
          {next ? `STEP ${next.id}. ${next.title} →` : '심화 탐구 →'}
        </button>
      </div>
    </>
  )
}

export function Advanced({ go }) {
  return (
    <>
      <div className="step-head">
        <div className="step-badge">🚀</div>
        <div>
          <div className="meta">보너스</div>
          <h1>심화 탐구</h1>
        </div>
      </div>

      <div className="card">
        <p style={{ margin: 0, color: 'var(--text-dim)' }}>{ADVANCED.intro}</p>
      </div>

      <h2 className="sec">{ADVANCED.main.title}</h2>
      <PromptBox label="급식표 피드백 앱 만들기" text={ADVANCED.main.prompt} />
      <div className="card">
        <h3 className="blk-title">여기서 더 나아가려면</h3>
        <ul className="plain">
          {ADVANCED.main.extra.map((e) => (
            <li key={e}>{e}</li>
          ))}
        </ul>
      </div>

      <h2 className="sec">그 외 소재</h2>
      <div className="card">
        <ul className="plain">
          {ADVANCED.others.map((o) => (
            <li key={o}>{o}</li>
          ))}
        </ul>
      </div>

      <div className="pager">
        <button onClick={() => go('step-6')}>
          <span className="dir">이전</span>← STEP 6. DB 랭킹
        </button>
        <button className="next" onClick={() => go('teacher')}>
          <span className="dir">다음</span>강사용 자료 →
        </button>
      </div>
    </>
  )
}

export function Teacher({ go, prep, togglePrep }) {
  return (
    <>
      <div className="step-head">
        <div className="step-badge">🎓</div>
        <div>
          <div className="meta">강사 전용</div>
          <h1>강사용 자료</h1>
        </div>
      </div>

      <h2 className="sec">왜 3.8 Flash인가</h2>
      <div className="tw">
        <table>
          <thead>
            <tr>
              <th>순위</th>
              <th>모델</th>
              <th>종합</th>
              <th>코딩</th>
            </tr>
          </thead>
          <tbody>
            {MODEL_RANKING.rows.map((r) => (
              <tr key={r.name} className={r.pick ? 'pick' : r.absent ? 'absent' : ''}>
                <td className="num">{r.rank}</td>
                <td>{r.name}</td>
                <td className="num">{r.total}</td>
                <td className="num">{r.coding}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="src">
        {MODEL_RANKING.sourceNote} ·{' '}
        <a href={MODEL_RANKING.source} target="_blank" rel="noreferrer">
          moket.kr/rankings
        </a>
      </p>

      <div className="card">
        <h3 className="blk-title">여기서 읽어낼 것</h3>
        <ol className="steps">
          {MODEL_RANKING.points.map((p, i) => (
            <H key={i} t={p} as="li" />
          ))}
        </ol>
      </div>

      <div className="card">
        <h3 className="blk-title">수업에서 Flash가 유리한 실질적 이유</h3>
        <dl style={{ margin: 0 }}>
          {MODEL_RANKING.why.map((w) => (
            <div className="def" key={w.head}>
              <dt>{w.head}</dt>
              <dd>{w.body}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="callout c-warn">
        <div className="ct">
          <span>⚠️</span>
          <span>수업 전 확인</span>
        </div>
        <p>
          아이모두 드롭다운에 3.8 Flash가 아직 없을 수 있습니다 (정식 출시 2026.9.2).{' '}
          <b>있는 것 중 가장 최신 Flash + 사고 수준 최대</b>를 고르면 위 논리가 그대로 적용됩니다.
        </p>
      </div>

      <h2 className="sec">사전 준비 체크리스트</h2>
      {PREP.map((g) => (
        <div className="card" key={g.group}>
          <h3 className="blk-title">{g.group}</h3>
          {g.items.map((it) => {
            const key = `${g.group}:${it}`
            return (
              <label className="chk" key={key}>
                <input type="checkbox" checked={!!prep[key]} onChange={() => togglePrep(key)} />
                <H t={it} />
              </label>
            )
          })}
        </div>
      ))}

      <h2 className="sec">Plan B</h2>
      <div className="card">
        <div className="callout c-warn" style={{ marginTop: 0 }}>
          <div className="ct">
            <span>🚨</span>
            <span>전환 시점</span>
          </div>
          <p>{PLAN_B.trigger}</p>
        </div>
        <ol className="steps">
          {PLAN_B.steps.map((s, i) => (
            <H key={i} t={s} as="li" />
          ))}
        </ol>
        <p style={{ color: 'var(--text-faint)', fontSize: 13.5, margin: '12px 0 0' }}>
          {PLAN_B.note}
        </p>
      </div>

      <h2 className="sec">리스크 대응표</h2>
      <div className="tw">
        <table>
          <thead>
            <tr>
              <th>상황</th>
              <th>대응</th>
            </tr>
          </thead>
          <tbody>
            {RISKS.map((r) => (
              <tr key={r.case}>
                <td style={{ fontWeight: 600, color: 'var(--text)' }}>{r.case}</td>
                <td>{r.fix}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="sec">이 설계의 의도</h2>
      <div className="card">
        <dl style={{ margin: 0 }}>
          {INTENT.map((i) => (
            <div className="def" key={i.k}>
              <dt>{i.k}</dt>
              <dd>{i.v}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="pager">
        <button onClick={() => go('advanced')}>
          <span className="dir">이전</span>← 심화 탐구
        </button>
        <button className="next" onClick={() => go('overview')}>
          <span className="dir">처음으로</span>개요 →
        </button>
      </div>
    </>
  )
}
