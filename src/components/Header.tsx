'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Navbar from './Navbar'
//import { FaHome } from "react-icons/fa";

export default function Header() {

  return (
    <header 
        className="sticky top-0 flex flex-wrap items-start pt-6 
        justify-around h-18 bg-white z-[1000]"
    >
        <Link href="/"> 
          <div className="flex flex-wrap justify-center text-stone-500 text-2xl">

            {/* <FaHome /> */}

            <div>
              <img src="/images/armagedon.png"
                  className="h-16 w-16"
            />
            </div>
            <div className="flex flex-wrap justify-center text-stone-900
            font-semibold text-3xl pt-4 pl-2">
              Armagedon
            </div>

          </div>
        </Link>

        <div className="flex flex-wrap justify-center text-gray-500
            pt-6"
        >
          
          <Navbar />

        </div>
    </header>
  )
}
