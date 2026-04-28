import ProductCard from '@/components/local/ProductCard'
import Spinner from '@/components/local/Spinner'
import React, { Suspense } from 'react'

const Home = async () => {
  const res = await fetch("https://fakestoreapi.com/products")
  const data = res.json()


  return (
    <div>
      <Suspense fallback={<Spinner />}>
        <ProductCard product={data} />
      </Suspense>
    </div>
  )
}

export default Home
