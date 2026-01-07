import React from 'react'
import Navbar from './components/Navbar'
import { useState } from 'react'

const App = () => {
  const [color, setcolor] = useState('red')
  const getColor = (e)=>{
    setcolor(e)
  }
  return (
    <div>
      <h1>Your Favorite color is {color}</h1>
      <Navbar getColor={getColor} />
    </div>
  )
}

export default App
