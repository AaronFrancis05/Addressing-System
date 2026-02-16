'use client';
import Link from 'next/link';
import Image from 'next/image';
import {FaMoon, FaSun} from 'react-icons/fa'
import { ThemeContext } from '@providers/ThemeProvider';
import { useContext } from 'react';
const Nav = () => {
  const {dark,handleClick}=useContext(ThemeContext)
  //const { data: session } = useSession();
  //console.log(dark);
  const session= false;
  //alert(session?.user?.name || 'No user logged in');

  return (
    <nav className='mx-4 pt-2'>
      {/* DESKTOP */}
      <div className={`${dark ?"bg-teal-800":"bg-gray-100"} flex justify-between items-center p-4  shadow-md rounded-xl`}>
          <div className='flex flex-1 items-center gap-4'>
          <Link href="/public"><h1>My Website</h1></Link>
          </div>
          <div className='flex items-center gap-4 flex-3 justify-center'>
            <Link className={`${dark?'bg-teal-400 hover:bg-teal-200':'bg-gray-100 hover:bg-gray-200'} rounded-md p-2`} href="/public">Home</Link>
            <Link className={`${dark?'bg-teal-400 hover:bg-teal-200':'bg-gray-100 hover:bg-gray-200'} rounded-md p-2`} href="/about">About</Link>
            <Link className={`${dark?'bg-teal-400 hover:bg-teal-200':'bg-gray-100 hover:bg-gray-200'} rounded-md p-2`} href="/services">Services</Link>
          <div className={`cursor-pointer relative  flex items-center justify-between p-2 h-8 w-20  rounded-2xl ${dark ? "bg-gray-300" : "bg-gray-800"}`}
            onClick={handleClick}>
            <FaSun className='text-yellow-400 text-2xl' />
            <div className={`bg-white h-6 w-6 rounded-full absolute ${dark?"right-2":"left-2"}`}/> 
            <FaMoon className='text-xl text-teal-500' />
            </div>
           
          </div>
          {session?<div className='flex justify-end items-center gap-4 flex-1'>
           <Link href='/profile'> <Image src={'https://example.com/user.png'} alt='User' width={40} height={40} className='rounded-full'/></Link>
            <button className='text-sm text-gray-500/90 cursor-pointer bg-gray-100 hover:bg-gray-200 rounded-md px-4 py-2' onClick={}>Sign Out</button>
          </div>:<div className='flex justify-end items-center gap-4 flex-1'>
            <Link className={`${dark?'bg-teal-400 hover:bg-teal-200':'bg-gray-100 hover:bg-gray-200'} bg-gray-100 hover:bg-gray-200 rounded-md p-2`} href='/auth/sign-in'>Sign In</Link>
            <Link className={`${dark?'bg-teal-400 hover:bg-teal-200':'bg-gray-100 hover:bg-gray-200'} bg-gray-100 hover:bg-gray-200 rounded-md p-2`} href='/auth/sign-up'>Sign Up</Link>
          </div>}
        </div>
    </nav>
  )
}

export default Nav
