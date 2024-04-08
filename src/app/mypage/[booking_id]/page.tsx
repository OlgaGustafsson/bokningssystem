'use client'

import { getBookingById } from '@/utils/api';
import { formatDate } from '@/utils/formatDate';
import React, { useEffect, useState } from 'react'
import { Booking } from '../../../../interface'
import { useParams } from '../../../../node_modules/next/navigation';


// under utveckling

export default function MyBooking() {

    const [bookingData, setBookingData] = useState<Booking | null>(null);

    useEffect(() => {
        const getBooking = async () => {
            try {

                const booking_id: any = useParams<{ booking_id: string }>();
                
                const response = await getBookingById(booking_id);
                const data = await response.json();
                console.log(data);

                setBookingData(await data);

            } catch (error) {
                console.error('Error fetching booking data:', error);

            }
        };
        getBooking();

        console.log('bookingData:', bookingData);

    }, []);



  return (
    <div>
            {/* {bookingData ? (
                <div>
                    <p>Boknings ID: {bookingData.booking_id}</p>

                </div>
            ) : (
                <p>Ingen bokning hittades</p>
            )} */}

            {(Array.isArray(bookingData) && bookingData.length > 0) ? (
                <div className="flex flex-col p-10 pt-32font-light font-sans
                    overflow-y-auto max-h-screen w-auto">
                    {/* <h2>id: {params.id}</h2> */}
                    <h2 className="text-2xl text-yellow-600 pb-3">{bookingData[0].booking_id}</h2>
                    <p className="text-gray-300 pb-3">{bookingData[0].user_name}</p>
                    <p className="text-gray-300 pb-3">{bookingData[0].game_category}</p>
                    <p className="text-yellow-600 ">{formatDate(bookingData[0].booking_date)}</p>
                </div>
            ) : (
                <p>Laddar...</p>
            )}

    </div>
  )
}