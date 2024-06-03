import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Booking, Game, Time } from "../../interface";
import { addBooking, fetchGames, fetchTimes } from "@/utils/api";
import { useRouter } from "next/navigation";

interface BookingTableProps {
  roomName: string;
  selectedDate: string;
}

export default function BookingTable({
  roomName,
  selectedDate,
}: BookingTableProps) {

  const [selectedCategory, setSelectedCategory] = useState("alla");
  const [isOpen, setIsOpen] = useState(false);
  const [maxPlayers, setMaxPlayers] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [times, setTimes] = useState<Time[]>([]);
  const [comment, setComment] = useState("");
  //const [bookingStatus, setBookingStatus] = useState(false);
  const [booking, setBooking] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [games, setGames] = useState<Game[]>([]);

  const router = useRouter();

  
  useEffect(() => {
    fetchGames()
      .then((data) => {
        setGames(data);
      })
      .catch((error) => {
        console.error("Error fetching games:", error);
      });

    fetchTimes()
      .then((data) => {
        setTimes(data);
      })
      .catch((error) => {
        console.error("Error fetching times:", error);
      });
  }, []);
  

  const handleCategoryChange = (event: { 
    preventDefault: () => void; 
    target: { value: any; }; 
  }) => {
    //event.preventDefault();
    const category = event.target.value;
    setSelectedCategory(category);
    localStorage.setItem("selectedCategory", category);
  };

  const handleOpenStatusChange = (event: {
    preventDefault: () => void;
    target: { value: any };
  }) => {
    const status = event.target.value === "true";
    setIsOpen(status);
    localStorage.setItem("isOpen", String(status));
  };

  const handleMaxPlayersChange = (event) => {
    const maxPlayersValue = event.target.value;
    setMaxPlayers(maxPlayersValue);
    localStorage.setItem("maxPlayers", maxPlayersValue);
  };

  const handleTimeChange = (event) => {
    const time = event.target.value;
    setSelectedTime(time);
    localStorage.setItem("selectedTime", time);
  };

  const handleCommentChange = (event) => {
    const commentValue = event.target.value;
    setComment(commentValue);
    localStorage.setItem("comment", commentValue);
  };

  // välj alla parametrar för att spara bokningen
  const isFormVald = () => {
    return (
      selectedCategory !== "" &&
      isOpen !== undefined &&
      (!isOpen || maxPlayers !== "") &&
      selectedTime !== "" &&
      comment !== "" 
    );
  };

  const handleSaveBooking = async () => {
    if (!isFormVald()) {
      alert("Vanligen fyll i alla parametrar innan du sparar bokningen.");
      return;
    }

    const newBooking = {
      booking_user_id: localStorage.getItem("user_id"),
      booking_room_id: localStorage.getItem("selectedRoom"),
      booking_game_id: selectedCategory,
      booking_description: comment,
      booking_date: selectedDate,
      booking_private: !isOpen,
      booking_deleted: false,
      booking_time_id: selectedTime,
      booking_max_players: isOpen ? maxPlayers : null,
    };


    addBooking(newBooking);

    setBooking(newBooking);
    setBookings([...bookings, newBooking]);
    // spara bokningen i localStorage
    localStorage.setItem("booking", JSON.stringify(newBooking));
    localStorage.setItem("bookings", JSON.stringify([...bookings, newBooking]));

    setSelectedCategory("");
    setIsOpen(false);
    setMaxPlayers("");
    setSelectedTime("");
    setComment("");
    // setBookingStatus(false);

    // if (newBooking) 
    router.push("/mypage");
   
  };

  return (
    <div className="pt-10 text-md">
      <div className="text-xl pb-4 text-stone-400 flex flex-row gap-2">
        <div>Här kan du boka:</div>
        <div className="text-stone-500 font-bold">
          {/* {localStorage.getItem("selectedRoomName")} */}
          {roomName}
        </div>
      </div>

      {/* update */}
      <div className="text-xl text-stone-400 flex flex-col gap-4 pb-8">
        <div className="text-xl text-stone-400 flex flex-row gap-2 pb-8">
          <div>Datum:</div>
          <div className="text-stone-500 font-bold border border-solid 
                        rounded-md border-orange-300 pl-2 pr-2">
            {selectedDate}
          </div>
        </div>

        <div className="flex flex-col border border-solid rounded-md bg-stone-50
                        w-96 pl-2">
          <div className="text-xl text-stone-400 flex flex-row gap-2 pb-4 pt-2">
            <div>Kategori:</div>
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option value="">Välj kategori</option>
                {games.length > 0 &&
                  games.map((game) => (
                    <option key={game.game_id} value={game.game_id}>
                      {game.game_category}
                    </option>
                  ))}
              </select>
          </div>

          <div className="text-xl text-stone-400 flex flex-row gap-2 pb-4 pt-4">
            <div>Öppen:</div>
            <select
              value={isOpen.toString()}
              onChange={handleOpenStatusChange}
            >
              <option value="">Välj</option>
              <option value="true">Ja</option>
              <option value="false">Nej</option>
            </select>
          </div>

          <div className="text-xl text-stone-400 flex flex-row gap-2 pb-4">
            <div>Deltagare:</div>
            {isOpen && (
              <select value={maxPlayers} onChange={handleMaxPlayersChange}>
                <option value=""> Välj antal deltagare</option>
                <option value="5">Max 5</option>
                <option value="10">Max 10</option>
                <option value="15">Max 15</option>
                </select>
              )}
          </div>

          <div className="text-xl text-stone-400 flex flex-row gap-2 pb-8">
            <div>Tid:</div>
            <select value={selectedTime} onChange={handleTimeChange}>
              <option value="">Välj tid</option>

                {times.map((time) => (
                  <option key={time.time_id} value={time.time_id}>
                    {time.time}
                  </option>
                ))}
              </select>
          </div>

          <div className="text-xl text-stone-400 flex flex-col gap-2 pb-4">
            <div>Kommentar:</div>
            <textarea
              className="max-w-64 max-h-96 border border-solid rounded-md border-stone-300"
              placeholder="Skriv din kommentar"
              value={comment}
              onChange={handleCommentChange}
              maxLength={100}
            />

          </div>
        </div>

        <div className="flex flex-row justify-left gap-3 pt-4 pb-8">
          <Link href="/">
            <button
              className="flex justify-center items-center text-xl w-32 h-12 
                rounded-xl border border-stone-900 bg-white hover:bg-stone-100
                text-stone-500"
            >
              Tillbaka
            </button>
          </Link>

          <button
            className="flex justify-center items-center text-xl w-32 h-12 
                rounded-xl border border-stone-500 bg-stone-500 hover:bg-stone-100
                text-white"
            type="submit"
            onClick={handleSaveBooking}
          >
            Spara
          </button>
        </div>


      </div>

      {/* update */}


      {/* <div className="overflow-x-auto w-min-screen">
        <table className="table border border-solid-stone-500 w-full">
          <thead>
            <tr>
              <th className="border border-solid-stone-500 text-left">Datum</th>
              <th className="border border-solid-stone-500 text-left">
                Kategori
              </th>
              <th className="border border-solid-stone-500 text-left">Öppen</th>
              <th className="border border-solid-stone-500 text-left">
                Deltagare
              </th>
              <th className="border border-solid-stone-500 text-left">Tid</th>
              <th className="border border-solid-stone-500 text-left">
                Kommentar
              </th>
            </tr>
          </thead>
          <tbody className="border border-solid-stone-500">
            <tr>
              <td className="border border-solid-stone-500 h-12">
                {selectedDate}
              </td>
              <td className="border border-solid-stone-500">
                <select
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                >
                  <option value="">Välj kategori</option>
      
                  {games.length > 0 &&
                    games.map((game) => (
                      <option key={game.game_id} value={game.game_id}>
                        {game.game_category}
                      </option>
                    ))}
                </select>
              </td>
              <td className="border border-solid-stone-500">
                <select
                  value={isOpen.toString()}
                  onChange={handleOpenStatusChange}
                >
                  <option value="">Välj</option>
                  <option value="true">Ja</option>
                  <option value="false">Nej</option>
                </select>
              </td>
              <td className="border border-solid-stone-500">
                {isOpen && (
                  <select value={maxPlayers} onChange={handleMaxPlayersChange}>
                    <option value=""> Välj antal deltagare</option>
                    <option value="5">Max 5</option>
                    <option value="10">Max 10</option>
                    <option value="15">Max 15</option>
                  </select>
                )}
              </td>
              <td className="border border-solid-stone-500">
                <select value={selectedTime} onChange={handleTimeChange}>
                  <option value="">Välj tid</option>

                  {times.map((time) => (
                    <option key={time.time_id} value={time.time_id}>
                      {time.time}
                    </option>
                  ))}
                </select>
              </td>
              <td className="border border-solid-stone-500">
                <textarea
                  className=""
                  placeholder="Skriv kommentar"
                  value={comment}
                  onChange={handleCommentChange}
                  maxLength={100}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex flex-row justify-center gap-3 pt-8">
        <Link href="/">
          <button
            className="flex justify-center items-center text-xl w-32 h-12 
              rounded-xl border border-stone-900 bg-white hover:bg-stone-100
              text-stone-500"
          >
            Tillbaka
          </button>
        </Link>

        <button
          className="flex justify-center items-center text-xl w-32 h-12 
              rounded-xl border border-stone-500 bg-stone-500 hover:bg-stone-100
              text-white"
          type="submit"
          onClick={handleSaveBooking}
          // disabled={!isFormVald} // inaktivera knappen om formuläret inte är giltigt
        >
          Spara
        </button>
      </div> */}

    </div>
  );
}
