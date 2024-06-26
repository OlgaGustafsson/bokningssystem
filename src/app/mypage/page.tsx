"use client";

import React, { useEffect, useState } from "react";
import { MdOutlineDeleteForever, MdOutlineModeEditOutline  } from "react-icons/md";
import Link from "next/link";
import { deleteBooking, fetchBookings } from "@/utils/api";
import { Booking, User } from "../../../interface";
import { formatDate } from "@/utils/formatDate";
import { formatTime } from "@/utils/formatTime";
import { today } from "@/utils/today";
//import { MdOutlineModeEditOutline } from "react-icons/md";

export default function MyPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  //const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserBookings = async () => {
      try {
        const userId = localStorage.getItem("user_id");
        if (userId) {
          const data: Booking[] = await fetchBookings();
          //console.log(data);
          if (data && data.length > 0) {
            const userBookings = data.filter(
              (data) =>
                data.booking_user_id.toString() === userId &&
                new Date(data.booking_date).toISOString().split("T")[0] >= today
            );
            setBookings(userBookings);
            //console.log(userBookings);
          } else {
            console.log("Inga bokningar hittades för användaren");
          }
        } else {
          console.log("user_id finns inte i localStorage");
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };
    fetchUserBookings(); // hämta users bokningar om userId finns
  }, []);

  const handleRemoveBooking = async (booking_id: any) => {
    try {
      const confirmation = window.confirm("Vill du radera bokningen?");
      if (confirmation) {
        //console.log('Försöker ta bort bokning med ID:', booking_id);
        await deleteBooking(booking_id.toString());
        setBookings((prevBookings) =>
          prevBookings.filter((booking) => booking.booking_id !== booking_id)
        );
        //console.log(bookings);
      } else {
        alert("'Ingen åtgärd vidtogs.");
      }
    } catch (error) {
      console.error("Error removing booking:", error);
    }
  };

  return (
    <div
      className="w-full max-w-screen-lg min-h-screen
    bg-white flex flex-col"
    >
      <div
        className="pt-32 pb-10 text-4xl text-stone-400 font-semibold
            flex flex-col items-center"
      >
        Min sida
      </div>

      <div className="overflow-x-auto flex flex-col items-left pb-4 pl-8 pr-8 sm:pl-8 sm:pr-8">
        <div className="bg-stone-100 h-40 rounded-md">
          <p className="pl-8 pt-8 text-2xl text-stone-400 font-bold">Medlem:</p>
          <p className="pl-8 pt-8 text-2xl text-blue-600">
            {localStorage.getItem("user_name")}
          </p>
        </div>
      </div>

      <div className="flex flex-col items-left pb-4 pl-8 pr-8 sm:pl-8 sm:pr-8">
        <div className="bg-stone-50 h-40 rounded-md">
          <p className="pl-8 pt-8 text-2xl text-stone-400 font-bold">Medlemsavgift:</p>
          <p className="pl-8 pt-8 text-2xl text-green-600">...</p>
        </div>
      </div>

      <div className="flex flex-col items-left pl-8 pr-8 sm:pl-8 sm:pr-8">
        <div className="bg-stone-100 h-auto pb-10 rounded-md">
          <p className="pl-8 pt-8 text-2xl text-stone-400 font-bold">Mina bokningar:</p>

          <div className="flex flex-col justify-between pr-8">
            <ul className="pl-8 pt-8 flex flex-col gap-8 overflow-x-auto">
              {bookings.map((booking) => (
                <li
                  key={booking.booking_id}
                  //href={`/mypage/${booking.booking_id}`}
                  className="text-lg text-stone-500 border border-solid rounded-md 
                            pl-2 pt-4 pb-4 flex flex-col bg-stone-50"
                >
                  <div className="flex flex-col gap-4">
                    <p className="flex-grow text-xl font-bold">
                      {formatDate(booking.booking_date)}
                    </p>
                    <p className="flex-grow text-xl font-bold">{booking.room_name}</p>
                    <p className="flex-grow pb-4 text-xl font-bold">kl. {formatTime(booking.time)}</p>
                    <p className="flex-grow">Spel: {booking.game_category}</p>
                    <p className="flex-grow">Kommentar: {booking.booking_description}</p>

                    <div className="flex flex-row gap-8">
                      <MdOutlineDeleteForever
                        onClick={() => handleRemoveBooking(booking.booking_id)}
                        className="text-4xl text-orange-300"
                      />
                      <MdOutlineModeEditOutline
                        className="text-4xl text-green-600"
                      />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <Link href="/calendar">
        <div className="flex flex-col items-center pt-24 pb-24">
          <button
            className="flex justify-center items-center text-xl w-32 h-12 
                    rounded-xl border border-stone-900 bg-white hover:bg-stone-100
                    text-stone-500"
          >
            Till kalender
          </button>
        </div>
      </Link>
    </div>
  );
}
