import React, { useContext } from 'react'
import { userDataContext } from '../context/UserContext'

const Navbar = () => {
  const data = useContext(userDataContext)
  return (
    <div className='nav'>
      <h1>navbar - {data}</h1>
    </div>
  )
}

export default Navbar
