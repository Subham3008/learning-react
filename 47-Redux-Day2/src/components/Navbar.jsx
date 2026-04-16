import { NavLink } from 'react-router'

const Navbar = () => {
  return (
    <div className='flex justify-between px-10 py-4  items-center'>
      <div className='text-2xl font-medium'>LOGO</div>
      <div className='flex gap-8'>
        <NavLink to={"/"} className={({isActive})=> isActive? "text-red-600 underline" : "text-black"}>Home</NavLink>
        <NavLink to={"/shop"} className={({isActive})=> isActive? "text-red-600 underline" : "text-black"}>Shop</NavLink>
        <NavLink to={"/about"} className={({isActive})=> isActive? "text-red-600 underline" : "text-black"}>About</NavLink>
      </div>
      <div>
         <NavLink to={"/cart"} className={({isActive})=> isActive? "text-red-600 underline" : "text-black"}>Cart</NavLink>
      </div>
    </div>
  )
}

export default Navbar
