import { useState } from 'react'
import Deck from './components/Deck'
import Teacher from './components/Teacher'

export default function App() {
  const [teacher, setTeacher] = useState(false)
  return teacher ? <Teacher onBack={() => setTeacher(false)} /> : <Deck onTeacher={() => setTeacher(true)} />
}
