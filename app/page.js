'use client'
//import Image from "next/image";
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function Home() {
  return (
    <main className='h-[calc(100vh-3rem)]'>
      <h1>Welcome to My Website</h1>
      {/* <button className='mt-10 p-2 ml-20 rounded-xl text-white font-bold bg-amber-700 hover:bg-amber-300 cursor-pointer' 
      onClick={()=>toast('Success...')}>Click</button> */}
    </main>
  );
}
