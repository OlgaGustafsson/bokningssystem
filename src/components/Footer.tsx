import React from 'react'

export default function Footer() {
  return (
    <div className="bottom-0 w-full p-6 h-38 flex flex-col flex-wrap justify-center 
        items-center text-xs text-stone-500 bg-stone-900"
    >
        <div className="pb-2 text-sm flex flex-col justify-center items-center">
            <p>Copyright Armagedon 2024.</p>
            <p>All rights reserved.</p>
        </div>
        <div className="text-stone-500">
            Created by 
            <a href="https://github.com/OlgaGustafsson" className="p-2 text-yellow-600" target="_blank" rel="noopener noreferrer">
               Olga Gustafsson  
            </a> 
            with 
            <span className="heart p-2 text-lg text-yellow-600">&hearts;</span>
        </div>
    </div>
  )
}