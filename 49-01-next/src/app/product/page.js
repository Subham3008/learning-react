import React, { Suspense } from 'react'
import ProductCard from './components/ProductCard';


const product = async () => {
  const res = await fetch('https://fakestoreapi.com/products')
  const data = res.json()


  return (
    <div>
      <h1>This is Product</h1>
      <div className='grid grid-cols-5 gap-4'>
        <Suspense fallback={<h1>Loading...</h1>}>
          <ProductCard product={data} />
        </Suspense>
      </div>
    </div>
  )
}

export default product
