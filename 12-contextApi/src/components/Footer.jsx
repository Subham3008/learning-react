import React, { useContext } from 'react'
import { userDataContext } from '../context/UserContext'

const Footer = () => {
  const data = useContext(userDataContext)
  return (
    <div className='footer'>
      <h1>footer - {data}</h1>
    </div>
  )
}

export default Footer
