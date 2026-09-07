import { FLOW } from '../data/slides'

/**
 * 6단계 흐름도. active: 현재 STEP 번호 | 'all' | null
 * 현재 단계는 강조, 지난 단계는 체크, 다음 단계는 흐리게.
 */
export default function Flow({ active }) {
  return (
    <div className="flow">
      {FLOW.map((n) => {
        let cls = 'fnode'
        if (active === 'all') cls += ' done'
        else if (typeof active === 'number') {
          if (n.step === active) cls += ' on'
          else if (n.step < active) cls += ' done'
          else cls += ' dim'
        }
        return (
          <div className={cls} key={n.step}>
            <div className="ic">{n.icon}</div>
            <div className="st">STEP {n.step}</div>
            <div className="lb">{n.label}</div>
            <div className="sb">{n.sub}</div>
          </div>
        )
      })}
    </div>
  )
}
