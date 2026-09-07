import { useEffect, useState } from 'react'
import { H } from './Slide'
import { MODEL_RANKING, PREP, RISKS, PLAN_B, INTENT } from '../data/lecture'

function usePrep() {
  const [prep, setPrep] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('gv-prep') || '{}')
    } catch {
      return {}
    }
  })
  useEffect(() => {
    try {
      localStorage.setItem('gv-prep', JSON.stringify(prep))
    } catch {
      /* 저장 실패해도 무방 */
    }
  }, [prep])
  return [prep, (k) => setPrep((p) => ({ ...p, [k]: !p[k] }))]
}

export default function Teacher({ onBack }) {
  const [prep, toggle] = usePrep()

  return (
    <div className="deck">
      <header className="topbar">
        <div className="topbar-in">
          <div className="brand">
            🎓 강사용 자료<small>학생 화면에는 띄우지 마세요</small>
          </div>
          <div className="tools">
            <button className="tbtn on" onClick={onBack}>
              ← 슬라이드로
            </button>
          </div>
        </div>
      </header>

      <div className="teacher">
        <h2>왜 3.8 Flash인가</h2>
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
                  <td style={{ fontFamily: 'var(--mono)', fontWeight: 800 }}>{r.rank}</td>
                  <td>{r.name}</td>
                  <td style={{ fontFamily: 'var(--mono)', fontWeight: 800 }}>{r.total}</td>
                  <td style={{ fontFamily: 'var(--mono)', fontWeight: 800 }}>{r.coding}</td>
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
        <div className="box">
          <h3>여기서 읽어낼 것</h3>
          <ol className="steps">
            {MODEL_RANKING.points.map((p, i) => (
              <H key={i} t={p} as="li" />
            ))}
          </ol>
        </div>
        <div className="box">
          <h3>수업에서 Flash가 유리한 실질적 이유</h3>
          <dl style={{ margin: 0 }}>
            {MODEL_RANKING.why.map((w) => (
              <div className="def" key={w.head}>
                <dt>{w.head}</dt>
                <dd>{w.body}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="co warn">
          <div className="t">수업 전 확인</div>
          <p>
            아이모두 드롭다운에 3.8 Flash가 아직 없을 수 있습니다 (정식 출시 2026.9.2).{' '}
            <b>있는 것 중 가장 최신 Flash + 사고 수준 최대</b>를 고르면 위 논리가 그대로 적용됩니다.
          </p>
        </div>

        <h2>사전 준비 체크리스트</h2>
        {PREP.map((g) => (
          <div className="box" key={g.group}>
            <h3>{g.group}</h3>
            {g.items.map((it) => {
              const key = `${g.group}:${it}`
              return (
                <label className="chk" key={key}>
                  <input type="checkbox" checked={!!prep[key]} onChange={() => toggle(key)} />
                  <H t={it} />
                </label>
              )
            })}
          </div>
        ))}

        <h2>Plan B</h2>
        <div className="box">
          <div className="co warn" style={{ marginBottom: 12 }}>
            <div className="t">전환 시점</div>
            <p>{PLAN_B.trigger}</p>
          </div>
          <ol className="steps">
            {PLAN_B.steps.map((st, i) => (
              <H key={i} t={st} as="li" />
            ))}
          </ol>
          <p className="src">{PLAN_B.note}</p>
        </div>

        <h2>리스크 대응표</h2>
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
                  <td style={{ fontWeight: 800, color: 'var(--ink)' }}>{r.case}</td>
                  <td>{r.fix}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>이 설계의 의도</h2>
        <div className="box">
          <dl style={{ margin: 0 }}>
            {INTENT.map((x) => (
              <div className="def" key={x.k}>
                <dt>{x.k}</dt>
                <dd>{x.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
