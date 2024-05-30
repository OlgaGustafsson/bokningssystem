"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
//import Link from "next/link";
import BookingTable from "@/components/BookingTable";
import { Room } from "../../../interface";
import { fetchRooms } from "@/utils/api";
import { today } from "@/utils/today";
import { getFutureDate } from "@/utils/futureDate";

export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");
  const [roomName, setRoomName] = useState("");
  const [rooms, setRooms] = useState<Room[]>([]);
  const [showBookingTable, setShowBookingTable] = useState(false);
  const router = useRouter();

  const futureDate = getFutureDate();

  useEffect(() => {
    fetchRooms()
      .then((data) => {
        setRooms(data);
      })
      .catch((error) => {
        console.error("Error fetching rooms:", error);
      });
  }, []);

  // välj datum i kalender
  const handleValueChange = (event: { target: { value: any } }) => {
    const value = event.target.value;
    setSelectedDate(value);
    localStorage.setItem("selectedDate", value);
  };

  // välj rum
  const handleRoomChange = (event: { target: { value: any } }) => {
    const room = event.target.value;
    setSelectedRoom(room);
    localStorage.setItem("selectedRoom", room);
    //setRoomName(selectedRoomName);
  };

  // room_name
  const selectedRoomId = parseInt(selectedRoom, 10);
  const selectedRoomData = rooms.find(
    (room) => room.room_id === selectedRoomId
  );
  const selectedRoomName = selectedRoomData ? selectedRoomData.room_name : "";

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    if (!selectedDate) {
      alert("Vänligen välj ett datum");
      return;
    }

    if (!selectedRoom) {
      alert("Vänligen välj ett rum");
      return;
    }

    console.log("selected value:", selectedDate);
    console.log("selected room:", selectedRoom);

    // visa bokningstabellen
    setShowBookingTable(true);
    localStorage.setItem("selectedRoomName", selectedRoomName);
    setRoomName(selectedRoomName);
    setSelectedDate(selectedDate);

    // setSelectedDate("");
    // setSelectedRoom("");
    //localStorage.clear();

    console.log(selectedDate);
    console.log(typeof selectedDate);
    console.log("Value of selectedDate in Calendar:", selectedDate);
  };

  return (
    <>
      <div
        className="flex flex-col xl:flex-col w-full min-h-screen gap-4 pt-32 
    text-stone-500"
      >
        <div className="flex flex-col w-auto pl-2 pr-2 gap-4 text-4xl text-stone-400">
          <p className="font-semibold pb-4">Boka rum</p>

          <form
            className="flex flex-col gap-4 xl:flex-col"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col gap-4">
              <div
                className="flex flex-col text-xl gap-3 
                  border rounded-md border-solid-stone-600 h-12 w-64"
              >
                <input
                  key={selectedDate}
                  type="date"
                  className="text-xl w-64 h-12 pl-2 rounded-md mr-2 bg-stone-100 border-none"
                  value={selectedDate}
                  onChange={handleValueChange}
                  min={today}
                  max={futureDate}
                />
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div
                className="flex flex-col text-xl gap-3 pb-8
                  border rounded-md border-solid-stone-600 h-12 w-64 "
              >
                <label>
                  <select
                    className="w-64 h-12 pl-2 rounded-md mr-2 bg-stone-100 border-none"
                    value={selectedRoom}
                    onChange={handleRoomChange}
                  >
                    <option value="">Välj rum</option>

                    {rooms.length > 0 &&
                      rooms.map((room) => (
                        <option key={room.room_id} value={room.room_id}>
                          {room.room_name}
                        </option>
                      ))}
                  </select>
                </label>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col pt-4">
                <button
                  type="submit"
                  className="flex justify-center items-center text-xl w-32 h-12 
                    rounded-xl border border-stone-900 bg-white hover:bg-stone-100
                    text-stone-500"
                >
                  Visa
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className="flex flex-col w-auto p-3">
          {showBookingTable && (
            <BookingTable roomName={roomName} selectedDate={selectedDate} />
          )}
        </div>
      </div>
    </>
  );
}
