import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <div className='flex gap-6 justify-between bg-gray-900 p-4 rounded-2xl'>
      <div>LOGO</div>
      <div className='flex gap-6'>
        <Link href={"/"}>Home</Link>
        <Link href={"/about"}>About</Link>
        <Link href={"/contact"}>Contact</Link>
        <Link href={"/product"}>Product</Link>
      </div>
      <div>login</div>
    </div>
  )
}

export default Navbar
