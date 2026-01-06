import React from 'react'
import { Link } from 'react-router-dom'

const Courses = () => {
  return (
    <div>
      <h1>Courses Page</h1>
      <div>
        <Link to="/courses/coder">Coder Page</Link>
        <Link to="/courses/kodex">Kodex Page</Link>
      </div>
    </div>
  )
}

export default Courses
