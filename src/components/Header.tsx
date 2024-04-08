'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Navbar from './Navbar'
import { FaHome } from "react-icons/fa";
import { useRouter } from 'next/navigation';

export default function Header() {


  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  //   const router = useRouter();

  //   const handleToggleLogin = () => {
  //       if(isLoggedIn) {
  //           setIsLoggedIn(false);
  //           router.push('/');
  //       } else {
  //           setIsLoggedIn(true);
  //           router.push('/calendar');
  //       }
  //   };



  return (
    <header 
        className="sticky top-0 flex flex-wrap items-start pt-6 
        justify-around h-18 bg-white z-[1000]"
        // className=" fixed bottom-0 w-full flex flex-wrap items-center pt-6
        // justify-around h-18 bg-stone-300"
    >
        <Link href="/"> 
          <div className="flex flex-wrap justify-center text-stone-500 text-2xl">
            {/* <h1 className="text-xl pb-4">Logo</h1> */}

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

        {/* <div className='flex flex-wrap justify-center pt-6 text-stone-500'>
        <button onClick={handleToggleLogin}
                className={`${
                  isLoggedIn
                    ? "text-blue-400"
                    : "text-orange-300"
                }`}
        >
          {isLoggedIn ? 'Logga ut' : 'Logga in'}
        </button>
        </div> */}
    </header>
  )
}
