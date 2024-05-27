'use client'

import React, { useEffect, useState } from 'react'
import { MdOutlineDeleteForever } from "react-icons/md";
import Link from 'next/link';
import { deleteBooking, fetchBookings, fetchUsers, getBookingsForUser } from '@/utils/api';
import { Booking, User } from '../../../interface';

export default function MyPage() {

    const [bookings, setBookings] = useState<Booking[]>([]);
    const [userName, setUserName] = useState<string | null>(null);

    // const userId = localStorage.getItem('user_id');
    // console.log(userId);

    const formatDate = (date: string | number | Date) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(date).toLocaleDateString('sv-SE');
      };


    useEffect(() => {
        const fetchUserBookings = async () => {
            try {
                const userId = localStorage.getItem('user_id');
                if (userId) {
                const data: Booking[] = await fetchBookings();
                console.log(data);
                if (data && data.length > 0) {
                const userBookings = data.filter(data  => data.booking_user_id.toString() === userId);
                setBookings(userBookings);
                console.log(userBookings);
                } else {
                    console.log('Inga bokningar hittades för användaren')
                }
                } else {
                    console.log('user_id finns inte i localStorage');
                }
            } catch (error) {
                console.error('Error fetching bookings:', error);
            }
        };
            fetchUserBookings(); // hämta users bokningar om userId finns
        
    }, []);

    const handleRemoveBooking = async (booking_id: any) => {
        try {

            const confirmation = window.confirm('Vill du radera bokningen?');
            if (confirmation) {
            console.log('Försöker ta bort bokning med ID:', booking_id);
            await deleteBooking(booking_id.toString());
            setBookings(prevBookings => prevBookings.filter(booking => booking.booking_id !== booking_id));
            //setBookings(bookings);
            console.log(bookings);
            } else {
                alert("'Ingen åtgärd vidtogs.");
            }
        } catch (error) {
            console.error('Error removing booking:', error);
        }
    }

    // const handleRemoveBooking = async (booking_id: any) => {
    //     try {
    //         const userId = localStorage.getItem('user_id');
    //         if (!userId) {
    //             console.error('User ID not found in localStorage');
    //             return;
    //         }
            
    //         console.log('Försöker ta bort bokning med ID:', booking_id);
            
    //         // Hämta bokningen från state
    //         const bookingToRemove = bookings.find(booking => booking.booking_id === booking_id);
            
    //         // Kontrollera om bokningen tillhör den aktuella användaren
    //         if (bookingToRemove && bookingToRemove.booking_user_id.toString() !== userId) {
    //             console.error('Attempted to remove booking that does not belong to current user');
    //             return;
    //         }
    
    //         // Ta bort bokningen från servern
    //         await deleteBooking(booking_id.toString());
            
    //         // Uppdatera state för bokningar genom att filtrera bort den borttagna bokningen
    //         setBookings(prevBookings => prevBookings.filter(booking => booking.booking_id !== booking_id));
            
    //         console.log(bookings);
    //     } catch (error) {
    //         console.error('Error removing booking:', error);
    //     }
    // }
    



  return (
    <div className="w-full max-w-screen-lg min-h-screen
    bg-white flex flex-col">
        <div className="pt-32 pb-10 text-4xl text-stone-400 font-semibold
            flex flex-col items-center">
            Min sida
        </div>

        <div className="overflow-x-auto flex flex-col items-left pb-4 pl-24 pr-24 sm:pl-8 sm:pr-8">
            <div className="bg-stone-100 h-40 rounded-md">
                <p className="pl-10 pt-10 text-xl text-stone-400">
                    Medlem:
                </p>
                <p className="pl-10 pt-10 text-2xl text-blue-600">
                    {localStorage.getItem("user_name")}
                </p>
            </div>
        </div>

        <div className="flex flex-col items-left pb-4 pl-24 pr-24 sm:pl-8 sm:pr-8">
            <div className="bg-stone-50 h-40 rounded-md">
                <p className="pl-10 pt-10 text-xl text-stone-400">
                    Medlemsavgift:
                </p>
                <p className="pl-10 pt-10 text-2xl text-green-600">
                    ...
                </p>
            </div>
        </div>

        <div className="flex flex-col items-left pl-24 pr-24 sm:pl-8 sm:pr-8">
            <div className="bg-stone-100 h-auto pb-10 rounded-md">
                <p className="pl-10 pt-10 text-xl text-stone-400">
                    Mina bokningar:
                </p>

                <div className="flex flex-col justify-between pr-8">
                {/* <p className="pl-10 pt-10 text-2xl text-stone-500">
                    Stora rummet
                </p> */}

                <ul className="pl-10 pt-6 flex flex-col gap-4 overflow-x-auto">
                    {bookings.map(booking => (
                        <li
                            key={booking.booking_id} 
                            //href={`/mypage/${booking.booking_id}`}
                            className="text-lg text-stone-500 border border-solid rounded-md 
                                    p-2 flex flex-col bg-stone-50">
                                <div className="flex lg:flex-row md:flex-row sm:flex-col gap-4">
                                    <p className="flex-grow">Datum: {formatDate(booking.booking_date)}</p>
                                    <p className="flex-grow">Rum: {booking.room_name}</p>
                                    <p className="flex-grow">Tid: {booking.time}</p>
                                    <p className="flex-grow">Spel: {booking.game_category}</p>
                                
                                    <MdOutlineDeleteForever
                                    onClick={() => handleRemoveBooking(booking.booking_id)} 
                                    className="text-3xl text-orange-300"
                                    />
                                </div>
                        </li>
                    ))}
                </ul>


                {/* <p className="pl-10 pt-10 text-3xl text-stone-500 pr-20"><MdOutlineDeleteForever /></p> */}
                </div>
            </div>
        </div>

        <Link href="/calendar">
            <div className="flex flex-col items-center pt-24 pb-24">
                <button 
                    // className="flex justify-center items-center text-md w-40 h-12 
                    // rounded-3xl border border-stone-500 bg-whtie hover:bg-stone-100 
                    // text-stone-500"
                    className="flex justify-center items-center text-xl w-32 h-12 
                    rounded-xl border border-stone-900 bg-white hover:bg-stone-100
                    text-stone-500"
                >
                    Till kalender
                </button>
            </div>
        </Link>

    </div>
  )
}