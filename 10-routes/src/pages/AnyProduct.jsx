import React from 'react'
import { useParams } from 'react-router-dom'

const AnyProduct = () => {
  const params = useParams()
  return (
    <div>
      <h1>{params.id} PRODUCT PAGE</h1>
    </div>
  )
}

export default AnyProduct
