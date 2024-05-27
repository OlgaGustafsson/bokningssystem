import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Login from "./Login";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  
  const router = useRouter();

  const handleToggleLogin = () => {
    if (isLoggedIn) {
      setIsLoggedIn(false);
      router.push("/");
    } else {
      setShowModal(true);
      //router.push("/start");
    }
  };

  const handleGoToCalendar = () => {
    if (isLoggedIn) {
      router.push("/calendar");
    } else {
      alert("Du måste logga in för att kunna göra en bokning.")
    }
  }

  const handleGoToMyPage = () => {
    if (isLoggedIn) {
      router.push("/mypage");
    } else {
      alert("Du måste logga in för att kunna gå in på Min sida.")
      router.push("/");
    }
  }

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await fetch ("/api/users", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json"
        }
      });
      
      const data = await response.json();
      console.log('Data:', data);
      
      //const data = await response.json();
    if (response.ok && data.message === 'Inloggningen lyckades') {

      localStorage.setItem("user_id", data.user_id);
      localStorage.setItem("user_name", data.user_name);
    
      setIsLoggedIn(true);
      setShowModal(false);
      router.push("/calendar");
    
    }  else {
      console.log("Inloggning misslyckades")
      setShowModal(false);
      alert("Inloggning misslyckades")
    }

    } catch (error) {
      console.error("Fel vid inloggning:", error);
      setShowModal(false);
      alert("Fel vid inloggning")
    }
  };

  return (
    <div>
      <ul className="list-none flex gap-6 text-stone-500">
        <li>
          <Link href="/games">Alla bokningar</Link>
        </li> 

        <li>
          <button
            onClick={handleGoToCalendar}
          >
            Boka
          </button>
        </li> 

        <li>
          <button
            onClick={handleGoToMyPage}
          >
            Min sida
          </button>
        </li> 

        {/* <li>
                <Link href="/login">Logga in</Link>
                </li> */}

        <li>
          <button
            onClick={handleToggleLogin}
            className={`${isLoggedIn ? "text-blue-400" : "text-orange-300"}`}
          >
            {isLoggedIn ? "Logga ut" : "Logga in"}
          </button>
        </li>
      </ul>

      <Login isOpen={showModal} onClose={() => setShowModal(false)} onLogin={handleLogin} />
    </div>
  );
}
