import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Convertor from './components/Convertor'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Convertor/>
    </>
  )
}

export default App
