// 'use client'

// import React, { useState } from 'react';
// import { Booking } from '../../../interface';
// import Link from 'next/link';
// import { formatDate } from '@/utils/formatDate';

// export default function Games() {
//   const [startDate, setStartDate] = useState(''); // State för startdatum
//   const [endDate, setEndDate] = useState(''); // State för slutdatum
//   const [bookings, setBookings] = useState<Booking[]>([]); // State för bokningar

//   // Funktion för att hantera visning av bokningar för den valda perioden
//   const handleShowBookings = async () => {
//     try {

//       // if (!startDate || !endDate) {
//       //   console.error('Startdatum och/eller slutdatum saknas.');
//       //   return;
//       // }

//       // Formatera start- och slutdatumet till ISO 8601-format
//     // const formattedStartDate = startDate.toString().slice(0, 10);
//     // const formattedEndDate = endDate.toString().slice(0, 10);


//       // Anropa API för att hämta bokningar för den valda perioden
//       // const response = await fetch(`/api/bookings?startDate=${formattedStartDate}&endDate=${formattedEndDate}`);
//       const response = await fetch("/api/bookings");
//       if (response.ok) {
//         const data = await response.json();
//         setBookings(data);
//       } else {
//         console.error('Fel vid hämtning av bokningar:', response.statusText);
//       }
//     } catch (error) {
//       console.error('Något gick fel', error);
//     }
//   };

//   return (
//     <div className="flex flex-col w-full min-h-screen pt-16 text-stone-500">
//       <div className="flex justify-center items-center">
//         <h2 className="text-2xl font-semibold">Välj period och se bokningar</h2>
//       </div>

//       {/* Startdatum */}
//       <div className="flex justify-center mt-4">
//         <input
//           type="date"
//           value={startDate}
//           onChange={(e) => setStartDate(e.target.value)}
//           className="border p-2 rounded-md mr-2"
//         />
//       </div>

//       {/* Slutdatum */}
//       <div className="flex justify-center mt-2">
//         <input
//           type="date"
//           value={endDate}
//           onChange={(e) => setEndDate(e.target.value)}
//           className="border p-2 rounded-md mr-2"
//         />
//       </div>
//       <div className="flex flex-row justify-center gap-3 pt-8">
//         <Link href="/start">
//           <button
//             className="flex justify-center items-center text-xl w-32 h-12 
//               rounded-xl border border-stone-900 bg-white hover:bg-stone-100
//               text-stone-500"
//           >
//             Tillbaka
//           </button>
//         </Link>

//         <button onClick={handleShowBookings} className="flex justify-center items-center text-xl w-40 h-12 
//               rounded-xl border border-stone-500 bg-stone-500 hover:bg-stone-100
//               text-white">
//           Visa bokningar
//         </button>
//         </div>

//       {/* Knapp för att visa bokningar för den valda perioden */}
//       <div className="flex justify-center mt-4">

//       </div>

//       {/* Visa bokningar för den valda perioden */}
//       <div className="mt-8">
//         <table className="table-auto border-collapse border border-solid">
//           <thead>
//             <tr>
//               <th className="border border-solid p-2">Boknings id</th>
//               <th className="border border-solid p-2">Datum</th>
//               <th className="border border-solid p-2">Namn</th>
//               <th className="border border-solid p-2">Rum</th>
//               <th className="border border-solid p-2">Spel/ aktivitet</th>
//               <th className="border border-solid p-2">Tid</th>
//               <th className="border border-solid p-2">Kommentar</th>
//               <th className="border border-solid p-2">Max spelare</th>
//               {/* Lägg till fler kolumnrubriker efter behov */}
//             </tr>
//           </thead>
//           <tbody>
//             {bookings.map(booking => (
//               <tr key={booking.booking_id}>
//                 <td className="border border-solid p-2">{booking.booking_id}</td>
//                 <td className="border border-solid p-2">{formatDate (booking.booking_date)}</td>
//                 <td className="border border-solid p-2">{booking.user_name}</td>
//                 <td className="border border-solid p-2">{booking.room_name}</td>
//                 <td className="border border-solid p-2">{booking.game_category}</td>
//                 <td className="border border-solid p-2">{booking.time}</td>
//                 <td className="border border-solid p-2">{booking.booking_description}</td>
//                 <td className="border border-solid p-2">{booking.booking_max_players}</td>
//                 {/* Lägg till fler kolumner efter behov */}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }









// import React, { useEffect, useState } from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';

// const Booking: React.FC = () => {

//   const router = useRouter();
//   const [selectedDate, setSelectedDate] = useState('');

//   // useEffect(() => {
//   //   if (router && router.query && typeof router.query.selectedDate === 'string') {
//   //     setSelectedDate(router.query.selectedDate);
//   //   }
//   // }, [router?.query?.selectedDate]);
  
//   // console.log(router.query);

//   useEffect(() => {
//     const date = localStorage.getItem('selectedDate');
//     if (date) {
//       setSelectedDate(date);
//     } else {
//       setSelectedDate('');
//     }
//   }, []);
  
//   // const { selectedDate } = router.query || '' ;
//   console.log(selectedDate);

//   // Funktion för att generera tider med 2 timmars intervall från starttid
//   const generateTimes = (startTime: number, endTime: number, interval: number): number[] => {
//     const times: number[] = [];
//     let currentTime = startTime;
//     while (currentTime < endTime) {
//       times.push(currentTime);
//       currentTime += interval;
//     }
//     return times;
//   };

//   // Tider för bokningar (från kl. 10.00 till 20.00 med 2 timmars intervall)
//   const bookingTimes: number[] = generateTimes(10, 20, 2);

//   // Färger för rummen
//   const rooms: string[] = ['Stora rummet', 'Blå rummet', 'Röda rummet', 'Bruna rummet', 'Gröna rummet'];

//   // State för att hålla reda på bokade rum och tider
//   const [booked, setBooked] = useState<{ [key: string]: number[] }>({});

//   // Funktion för att hantera bokning eller avbokning av ett rum vid en viss tid
//   const handleBooking = (room: string, time: number) => {
//     if (booked[room] && booked[room].includes(time)) {
//       // Avboka om rummet redan är bokat vid denna tid
//       setBooked(prevState => ({
//         ...prevState,
//         [room]: prevState[room].filter(t => t !== time),
//       }));
//     } else {
//       // Boka rummet för den här tiden
//       setBooked(prevState => ({
//         ...prevState,
//         [room]: prevState[room] ? [...prevState[room], time] : [time],
//       }));
//       console.log(room);
//       console.log(time);
//     }
//   };
//   return (
//     <div className="w-full max-w-screen-lg min-h-screen bg-white flex flex-col items-center">
//       <div className="pt-40 pb-20 text-3xl text-stone-400">Boka rum</div>
//       <div className="pt-4 pb-4 text-2xl text-stone-500 font-bold">
//         {selectedDate}
//       </div>

//       <div className="bg-stone-50 pt-8 pb-8 pl-4 pr-4 rounded-md 
//       overflow-x-scroll">
//       <table className="mt-2 border-collapse border border-gray-300">
//         <thead>
//           <tr>
//             <th className="border border-gray-300 text-sm text-stone-300">Tid/ Rum</th>
//             {rooms.map((name, index) => (
//               <th key={index} className="border border-gray-300 text-sm px-4 py-2 text-center">
//                 {name}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {bookingTimes.map((time, index) => (
//             <tr key={index}>
//               <td className="border border-gray-300 px-4 py-2">{time}:00</td>
//               {rooms.map((name, index) => (
//                 <td key={index} className="border border-gray-300 px-4 py-2 text-center">
//                   <button
//                     className={`${
//                       booked[name] && booked[name].includes(time) ? 'bg-orange-300 text-white' : 
//                       'text-blue-500 border border-blue-500 bg-white'
//                     } py-2 px-4 rounded`}
//                     onClick={() => handleBooking(name, time)}
//                   >
//                     {booked[name] && booked[name].includes(time) ? 'Avboka' : 'Boka'}
//                   </button>
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       </div>
   
//         <div className="flex flex-row gap-3 items-center pt-16 pb-24">
//           <Link href="/calendar">
//             <button className="flex justify-center items-center text-md w-32 h-12 
//               rounded-3xl border border-stone-500 bg-whtie hover:bg-stone-100 
//               text-stone-500">
//               Till kalender
//             </button>
//           </Link>
//           <Link href="/mypage">
//             <button className="flex justify-center items-center text-md w-32 h-12 
//               rounded-3xl border border-stone-900 bg-stone-900 hover:text-yellow-600
//               text-white">
//               Bekräfta
//             </button>
//           </Link>
//         </div>

//     </div>
//   );
// };

// export default Booking;
