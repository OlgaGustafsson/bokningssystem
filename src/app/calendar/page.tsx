"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import BookingTable from "@/components/BookingTable";
import { Room } from "../../../interface";
import { fetchRooms } from "@/utils/api";

export default function Calendar() {
  //const [selectedOption, setSelectedOption] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");
  const [roomName, setRoomName] = useState("");
  const [rooms, setRooms] = useState<Room[]>([]);
  const [showBookingTable, setShowBookingTable] = useState(false);
  const router = useRouter();


  useEffect(() => {
    fetchRooms().then(data => {
      setRooms(data);
    }).catch(error => {
      console.error("Error fetching rooms:", error);
    });
  }, []);

  

  // useEffect(() => {
  //   const today = new Date().toISOString().split("T")[0];
  //   setSelectedValue(today);
  // }, []);

  // välj datum i kalender
  const handleValueChange = (event) => {
    const value = event.target.value;
    setSelectedDate(value);
    localStorage.setItem("selectedDate", value);
  };

  // välj rum
  const handleRoomChange = (event) => {
    const room = event.target.value;
    setSelectedRoom(room);
    localStorage.setItem("selectedRoom", room);
    //setRoomName(selectedRoomName);
  };

  // room_name
  const selectedRoomId = parseInt(selectedRoom, 10);
  const selectedRoomData = rooms.find(room => room.room_id === selectedRoomId);
  const selectedRoomName =  selectedRoomData ? selectedRoomData.room_name : '';

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
    //setSelectedOption("");
    //localStorage.clear();

    console.log(selectedDate);
    console.log(typeof selectedDate);
    console.log("Value of selectedDate in Calendar:", selectedDate);
  };
  // console.log(selectedValue);
  // console.log(selectedRoom);

  
  return (
    <>
      <div
        className="flex flex-col xl:flex-row w-full min-h-screen gap-4 pt-32 
    text-stone-500"
      >
        <div className="flex flex-col w-auto p-3 gap-4 text-4xl text-stone-400">
          <p className="font-semibold">Boka rum</p>

          <form className="flex flex-row gap-4 xl:flex-col" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4">

              <div
                className="flex flex-col text-xl gap-3 
                  border rounded-md border-solid-stone-600 h-12 w-64"
              >

                  <input
                    key={selectedDate}
                    type="date"
                    className="text-xl w-60 h-12"
                    value={selectedDate}
                    onChange={handleValueChange}
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
                    className="w-60 pt-2"
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

                    {/* <option value="stora rummet">Stora rummet</option>
                    <option value="röda rummet">Röda rummet</option>
                    <option value="gröna rummet">Gröna rummet</option>
                    <option value="bruna rummet">Bruna rummet</option>
                    <option value="blå rummet">Blå rummet</option> */}
                  </select>
                </label>
              </div>

              
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col">
                <button
                  type="submit"
                  // className="flex justify-center items-center text-md w-40 h-12
                  // rounded-3xl border border-stone-500 bg-white hover:bg-stone-100
                  // text-stone-500"
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
          {/* <div className="">Här kan du boka:</div> */}
          
          {showBookingTable && <BookingTable roomName={roomName} selectedDate={selectedDate} />}

        </div>

      </div>

    </>
  );
}
