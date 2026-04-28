import Link from 'next/link'
import React from 'react'
import ThemeToggle from './ThemeToggle'

const Navbar = () => {
  return (
    <div className='flex justify-between items-center py-4 px-10'>
      <div>LOGO</div>
      <div className='flex justify-between gap-6'>
        <Link href={"/"}>Home</Link>
        <Link href={"/about"}>About</Link>
        <Link href={"/console"}>Console</Link>
      </div>
      <div>
        <ThemeToggle />
      </div>
    </div>
  )
}

export default Navbar
