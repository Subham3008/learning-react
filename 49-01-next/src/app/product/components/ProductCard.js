"use client"
import React, { use } from 'react'

const ProductCard = ({ product }) => {

  let pro = use(product)
  return (
    <>
      {pro.map((elem) => {
        return (<div key={elem.id} className='flex flex-col border p-4 gap-2'>
          <h1>{elem.title}</h1>
          <h1>{elem.price}</h1>
        </div>)
      })}
    </>
  )
}

export default ProductCard
