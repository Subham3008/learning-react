import Link from 'next/link'
import React from 'react'

const ContactLayout = ({ children }) => {
  return (
    <div>
      <div className='flex gap-4'>
        <Link href={"/contact/phone"}>Phone</Link>
        <Link href={"/contact/laptop"}>Laptop</Link>
      </div>
      {children}
    </div>
  )
}

export default ContactLayout
