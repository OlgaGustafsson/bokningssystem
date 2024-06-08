import { Booking, User } from "../../interface";

export async function fetchRooms() {
    try {
      const response = await fetch("/api/rooms");
      if (response.ok) {
        const data = await response.json();
        //console.log("Rooms data:", data); 
        //setRooms(data);
        return data;
      } else {
        console.error("Failed to fetch rooms:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  }

  export async function fetchGames() {
    try {
      const response = await fetch("/api/games");

      if (response.ok) {
        const data = await response.json();
        //console.log(data);
        //setGames(data);
        return data;
      }
    } catch (error) {
      console.error("Error fetching games:", error);
    }
  }

  export async function fetchTimes() {
    try {
      const response = await fetch("/api/times");

      if (response.ok) {
        const data = await response.json();
        //console.log(data);
        //setTimes(data);
        return data;
      }
    } catch (error) {
      console.error("Error fetching times:", error);
    }
  }

  export async function fetchUsers() {
    try {
      const response = await fetch("/api/users");

      if (response.ok) {
        const data = await response.json();
        //console.log(data);
        //setUsers(data);
        return data;
      }
    } catch (error) {
      console.error("Error fetching times:", error);
    }
  }

  export async function addBooking(newBooking: Booking) {
    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBooking),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Booking successfuflly created:", data);
        alert("Du har skapat en bokning");
        // uppdatera state eller gör andra åtgärder t.ex. skicka användaren till "/start" eller "/mypage"
      } else {
        console.error("Failed to create booking:", response.statusText);
        alert("Vänligen, välj en annan tid.")
      }
    } catch (error) {
      console.error("Error creating booking:", error);
    }
  }

  export async function fetchBookingsByUserId({params} : {params : {user_id: string}}) {
    try {
      const response = await fetch(`/api/users/${params.user_id}`);
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error("Failed to fetch bookings");
      }
    } catch (error) {
      console.error("Something went wrong:", error);
      throw error;
    }
  }


export const fetchBookings = async () => {
  try {
    const response = await fetch("/api/bookings");
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Fel vid hämtning av bokningar');
    }
  } catch (error) {
    console.error("Något gick fel:", error);
  }
};

// getBookingsByStartDate
export const getBookingsByStartDate = async () => {
  try {
    const today = new Date().toISOString().split("T")[0];
    const response = await fetch("/api/bookings");
    if (response.ok) {
      const data = await response.json();
      const filteredBookings = data.filter((booking: { booking_date: string; }) => booking.booking_date >= today);
      return filteredBookings;
    } else {
      throw new Error('Fel vid hämtning av bokningar');
    }
  } catch (error) {
    console.error("Något gick fel:", error);
  }
};


export async function getBookingById(booking_id: string) {
  try{
    const response = await fetch(`/api/bookings/${booking_id}`);
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error("Något gick fel:", error);

  }
}

// export async function getBookingById({params} : {params : {booking_id: string}}) {
//   try {
//       const response = await fetch(`/api/bookings/${params.booking_id}`);

//       if (response.ok) {
//       const data = await response.json();
//       console.log("API Response Data:", data);
//       return data;
//       }
//   } catch (error) {
//       console.error('Error fetching post data:', error);
//   }
// };

  
export async function deleteBooking(booking_id: number) {
  try {
    //console.log('Försöker ta bort bokning med ID:', booking_id);
    //console.log(typeof booking_id);
    const response = await fetch(`/api/bookings/${booking_id}`, {
      method: 'DELETE',
      // headers: {
      //   'Content-Type': 'application/json',
      // },
      // body: JSON.stringify({ booking_id: booking_id }),
    });

    if (!response.ok) {
      throw new Error('Delete failed');
    }

    const result = await response.json();
    console.log('Booking deleted:', result);
    //return result;
  } catch (error) {
    console.error('Error deleting booking:', error);
  }
}
