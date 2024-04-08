'use client'

import React from 'react'
import Link from 'next/link'

export default function Start() {
  return (
    <div className="w-full max-w-screen-lg min-h-screen
    bg-white flex flex-col items-center"
    >
        <div className="pt-64 flex justify-center">

            <div className="flex flex-col gap-3 items-center pt-16 pb-24">
                <Link href="/calendar">
                    <button className="flex justify-center items-center text-xl w-64 h-12 
                    rounded-xl border border-stone-500 bg-whtie hover:bg-stone-100 
                    text-stone-500">
                    Boka rum
                    </button>
                </Link>
                {/* <Link href="/games">
                    <button className="flex justify-center items-center text-xl w-64 h-12 
                    rounded-xl border border-stone-500 bg-white hover:bg-stone-100
                    text-stone-500">
                    Se bokningar
                    </button>
                </Link> */}
            </div> 

        </div>
    </div>
  )
}
