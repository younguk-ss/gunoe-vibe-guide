import { useState } from 'react'
import Deck from './components/Deck'
import Teacher from './components/Teacher'
import PrintAll from './components/PrintAll'

const isPrint = typeof location !== 'undefined' && new URLSearchParams(location.search).has('print')

export default function App() {
  const [teacher, setTeacher] = useState(false)
  if (isPrint) return <PrintAll />
  return teacher ? <Teacher onBack={() => setTeacher(false)} /> : <Deck onTeacher={() => setTeacher(true)} />
}
