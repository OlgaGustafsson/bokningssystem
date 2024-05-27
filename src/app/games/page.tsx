'use client'

import React, { useState } from 'react';
import { Booking } from '../../../interface';
import Link from 'next/link';
import { formatDate } from '@/utils/formatDate';
import GamesTable from '@/components/GamesTable';
import { fetchBookings } from '@/utils/api';

export default function Games() {
  //const [startDate, setStartDate] = useState(''); // State för startdatum
  //const [endDate, setEndDate] = useState(''); // State för slutdatum
  const [bookings, setBookings] = useState<Booking[]>([]); // State för bokningar
  const [showGamesTable, setShowGamesTable] = useState(false);

  // Funktion för att hantera visning av bokningar för den valda perioden
  const handleShowBookings = async () => {
    try {
      setShowGamesTable(true);
      
      // if (!startDate || !endDate) {
      //   console.error('Startdatum och/eller slutdatum saknas.');
      //   return;
      // }

      // Formatera start- och slutdatumet till ISO 8601-format
    // const formattedStartDate = startDate.toString().slice(0, 10);
    // const formattedEndDate = endDate.toString().slice(0, 10);


      // Anropa API för att hämta bokningar för den valda perioden
      // const response = await fetch(`/api/bookings?startDate=${formattedStartDate}&endDate=${formattedEndDate}`);
      
      const data = await fetchBookings();
      setBookings(data);
      console.log(data);
    } catch (error) {
      console.error('Något gick fel', error);
    }
  };

  const handleHideBookings = async () => {
    setShowGamesTable(false);
  };

  return (
    <div className="flex flex-col w-full min-h-screen pt-32 text-stone-500">
      <div className="flex justify-center items-center">
        <h2 className="text-4xl font-semibold pb-6 text-stone-400">Se alla bokningar</h2>
      </div>

      <div className="flex flex-row justify-center gap-3 pt-8">
        {/* <Link href="/start">
          <button
            className="flex justify-center items-center text-xl w-32 h-12 
              rounded-xl border border-stone-900 bg-white hover:bg-stone-100
              text-stone-500"
          >
            Tillbaka
          </button>
        </Link> */}
        
        {/* <Link href="/games"> */}
        {showGamesTable && (
          <button onClick={handleHideBookings}
            className="flex justify-center items-center text-xl w-32 h-12 
              rounded-xl border border-stone-900 bg-white hover:bg-stone-100
              text-stone-500"
          >
            Tömma
          </button>
          )}
        {/* </Link> */}

        <button onClick={handleShowBookings} className="flex justify-center items-center text-xl w-32 h-12 
              rounded-xl border border-stone-500 bg-stone-500 hover:bg-stone-100
              text-white">
          Visa
        </button>
        </div>

      {/* Knapp för att visa bokningar för den valda perioden */}
      <div className="flex justify-center mt-4">

      </div>

      {/* Alla bokningar */}
      <div className="mt-8">

        {showGamesTable && <GamesTable bookings={bookings} />}

      </div>
    </div>
  );
}