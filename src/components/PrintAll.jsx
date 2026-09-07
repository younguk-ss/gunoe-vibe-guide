import Slide from './Slide'
import { SLIDES } from '../data/slides'

/**
 * 인쇄(PDF) 전용 화면. 한 페이지에 슬라이드 하나씩 세로로 쌓는다.
 * ?print=1 로 접근하며, from/to로 구간을 잘라 뽑을 수 있다.
 * (크롬은 문서가 너무 길면 인쇄에 실패하므로 나눠 뽑고 합친다)
 */
export default function PrintAll() {
  const q = new URLSearchParams(location.search)
  const from = Math.max(0, parseInt(q.get('from') ?? '0', 10) || 0)
  const to = Math.min(SLIDES.length, parseInt(q.get('to') ?? String(SLIDES.length), 10) || SLIDES.length)

  return (
    <div className="printing">
      {SLIDES.slice(from, to).map((s, i) => (
        <div className="page" key={from + i}>
          <Slide s={s} index={from + i} total={SLIDES.length} />
        </div>
      ))}
    </div>
  )
}
