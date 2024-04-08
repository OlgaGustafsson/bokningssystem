import React, { useEffect, useState } from 'react';
import { Booking, Game } from '../../../interface';
import { formatDate } from '@/utils/formatDate';
import { fetchGames } from '@/utils/api';

interface GamesTableProps {
  bookings: Booking[];
  //startDate: string;
  //endDate: string;
}

const GamesTable: React.FC<GamesTableProps> = ({ bookings }) => {

    //const [sortOption, setSortOption] = useState<string>('');

    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);

    const [startDate, setStartDate] = useState(''); 
    const [endDate, setEndDate] = useState(''); 

    const [selectedOpen, setSelectedOpen] = useState<string>('');

    const [games, setGames] = useState<Game[]>([]);


    useEffect(() => {
        fetchGames()
          .then((data) => {
            setGames(data);
          })
          .catch((error) => {
            console.error("Error fetching games:", error);
          });
      }, []);

    // sortera efter private
//   const sortBookings = (bookings: Booking[]) => {
//     return bookings.sort((a, b) => {
//       if (a.booking_private && !b.booking_private) {
//         return -1; // a först
//       }
//       if (!a.booking_private && b.booking_private) {
//         return 1; // b först
//       }
//       return 0; // no change
//     });
//   };

    // filtrering efter kategori
    // useEffect(() => {
    //     let filtered;
    //     if (selectedCategory === "") {
    //         // om ingen kategory är vald, visa alla bokningar
    //         filtered = bookings;
    //     } else {
    //         // filtrera bokningar efter kategorin
    //         filtered = bookings.filter(booking => booking.game_category === selectedCategory);
    //     }

    //     //const sortedBookings = sortBookings(filtered);
    //     setFilteredBookings(filtered);
    //    // setFilteredBookings(sortedBookings);
    // }, [bookings, selectedCategory]);
    

    useEffect(() => {
        let filtered = bookings;
    
        // om både start- och slutdatum är definierade
        if (startDate && endDate) {
            // konvertera start- och slutdatum till Date-objekt
            const start = new Date(startDate);
            const end = new Date(endDate);
    
            // filtrera bokningarna baserat på datumintervallet
            filtered = filtered.filter(booking => {
                const bookingDate = new Date(booking.booking_date);
                return bookingDate >= start && bookingDate <= end;
            });
        }
    
        // om ingen kategori är vald, visa alla bokningar
        if (selectedCategory !== "") {
            filtered = filtered.filter(booking => booking.game_category === selectedCategory);
        }
    
        // uppdatera filtrerade bokningar
        setFilteredBookings(filtered);
    }, [bookings, startDate, endDate, selectedCategory]);
    

  return (
    <div className="flex flex-col justify-center overflow-x-auto ">

        <div className="flex flex-row gap-4 pb-4">

            {/* Startdatum */}
            <div className="flex justify-center mt-4">
                <label className="text-stone-400">Startdatum
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="border p-2 rounded-md mr-2"
                />
                </label>
            </div>

            {/* Slutdatum */}
            <div className="flex justify-center mt-4">
                <label className="text-stone-400">Slutdatum
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="border p-2 rounded-md mr-2"
                />
                </label>
            </div>


        </div>
        
        <div className="flex flex-row gap-4 text-stone-400">
            <div className="flex justify-start mb-6">
                <label htmlFor="sortSelect" className="mr-2">Sortera efter kategori:</label>
                <select 
                    value={selectedCategory} 
                    onChange={e => {
                        setSelectedCategory(e.target.value)
                    }}
                >
                <option value="">alla</option>

                {games.length > 0 &&
                    games.map((game) => (
                      <option key={game.game_id} value={game.game_category}>
                        {game.game_category}
                      </option>
                    ))}

                {/* <option value="rollspel">Rollspel</option>
                <option value="brädspel">Brädspel</option>
                <option value="kortspel">Kortspel</option>
                <option value="figurspel">Figurspel</option>
                <option value="diorama">Diorama</option> */}
                {/* Lägg till fler sorteringsalternativ här */}
                </select>
            </div>

            <div className="flex justify-start mb-6">
                {/* <label htmlFor="sortSelect" className="mr-2"></label>
                <select 
                    value={selectedOpen} 
                    onChange={e => {
                        setSelectedOpen(e.target.value)
                    }}
                >
                <option value="">öppen/stängd</option>
                <option value="true">Stängd</option>
                <option value="false">Öppen</option>
                </select> */}
            </div>

        </div>


        <table className="table-auto border-collapse border border-solid mb-8">
        <thead>
            <tr>
            <th className="border border-solid p-2 text-start">Bokning</th>
            <th className="border border-solid p-2 text-start">Datum</th>
            <th className="border border-solid p-2 text-start">Namn</th>
            <th className="border border-solid p-2 text-start">Rum</th>
            <th className="border border-solid p-2 text-start">Spel/ aktivitet</th>
            <th className="border border-solid p-2 text-start">Tid</th>
            <th className="border border-solid p-2 text-start">Kommentar</th>
            <th className="border border-solid p-2 text-start">Max spelare</th>
            {/* Lägg till fler kolumnrubriker efter behov */}
            </tr>
        </thead>
        <tbody>
            {filteredBookings.map(booking => (
            <tr key={booking.booking_id}>
                <td className="border border-solid p-2">{booking.booking_id}</td>
                <td className="border border-solid p-2">{formatDate(booking.booking_date)}</td>
                <td className="border border-solid p-2">{booking.user_name}</td>
                <td className="border border-solid p-2">{booking.room_name}</td>
                <td className="border border-solid p-2">{booking.game_category}</td>
                <td className="border border-solid p-2">{booking.time}</td>
                <td className="border border-solid p-2">{booking.booking_description}</td>
                <td className="border border-solid p-2">{booking.booking_max_players}</td>
                {/* Lägg till fler kolumner efter behov */}
            </tr>
            ))}
        </tbody>
        </table>
    </div>
  );
};

export default GamesTable;
