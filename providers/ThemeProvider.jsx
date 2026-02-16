'use client'
import { useState } from 'react';
import {createContext} from 'react'

export const ThemeContext=createContext();

export const ThemeProvider=({children})=>{
    const [dark,setDark]=useState(false)
    const handleClick =()=>{
        setDark((prev)=>!prev)
        console.log("AAron");
       
        
    }
    // console.log(dark);
    
    return(
    
        <ThemeContext.Provider value={{ dark, handleClick }}>
        <div className={`${dark?"bg-gray-900 text-white":"bg-white text-black"} m-0 p-0`}>
        {children}
        </div>
    </ThemeContext.Provider>
    )

}