"use client";

import React, { useState } from "react";
import { Booking } from "../../../interface";
import Link from "next/link";
import { formatDate } from "@/utils/formatDate";
import GamesTable from "@/components/GamesTable";
import { fetchBookings, getBookingsByStartDate } from "@/utils/api";

export default function Games() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [showGamesTable, setShowGamesTable] = useState(false);

  // Funktion för att hantera visning av bokningar f.o.m. idag
  const handleShowBookings = async () => {
    try {
      setShowGamesTable(true);

      //const data = await fetchBookings();
      const data = await getBookingsByStartDate();
      setBookings(data);
      console.log(data);
    } catch (error) {
      console.error("Något gick fel", error);
    }
  };

  const handleHideBookings = async () => {
    setShowGamesTable(false);
  };

  return (
    <div className="flex flex-col w-full min-h-screen pt-36 text-stone-500">
      <div className="flex justify-center items-center">
        <h2 className="text-4xl font-semibold pb-6 text-stone-400">
          Se alla bokningar
        </h2>
      </div>

      <div className="flex flex-row justify-center gap-3 pt-8">
        {showGamesTable && (
          <button
            onClick={handleHideBookings}
            className="flex justify-center items-center text-xl w-32 h-12 
              rounded-xl border border-stone-900 bg-white hover:bg-stone-100
              text-stone-500"
          >
            Tömma
          </button>
        )}

        <button
          onClick={handleShowBookings}
          className="flex justify-center items-center text-xl w-32 h-12 
              rounded-xl border border-stone-500 bg-stone-500 hover:bg-stone-100
              text-white"
        >
          Visa
        </button>
      </div>

      {/* Knapp för att visa bokningar för den valda perioden */}
      <div className="flex justify-center mt-4"></div>

      {/* Alla bokningar */}
      <div className="mt-8">
        {showGamesTable && <GamesTable bookings={bookings} />}
      </div>
    </div>
  );
}
