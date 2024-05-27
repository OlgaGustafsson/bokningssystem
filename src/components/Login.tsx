// modal login

import { useEffect, useState } from "react";

interface LoginProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (email: string, password: string) => void;
}


const Login: React.FC<LoginProps> = ({ isOpen, onClose, onLogin}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect (() => {
    if (isOpen) {
      setEmail("");
      setPassword("");
    }
  }, [isOpen]);

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    onLogin(email, password);
    console.log(email, password);
  };

  const handleClose = () => {
    // setEmail("");
    // setPassword("");
    onClose();
  }
  
  return (
    <>
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg w-72 flex flex-col">
            <div className="flex justify-end">
              <button
                onClick={handleClose}
                className="bg-stone-200 text-gray-700 px-4 py-2 
                rounded-md hover:bg-gray-400 flex justify-center max-w-16"
              >
                Stäng
              </button>
            </div>
            <h2 className="text-lg font-bold mb-4 text-center">Logga in</h2>
            <form onSubmit={handleSubmit}
              className="pb-4"
            >
              <div className="mb-4">
                {/* <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  E-post:
                </label> */}
                <input
                  type="email"
                  placeholder="E-post"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-4">
                {/* <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Lösenord:
                </label> */}
                <input
                  type="password"
                  placeholder="Lösenord"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md 
                hover:bg-blue-600"
              >
                Logga in
              </button>
            </form>
            {/* <button
              onClick={handleClose}
              className="bg-stone-200 text-gray-700 px-4 py-2 
              rounded-md hover:bg-gray-400"
            >
              Stäng
            </button> */}
          </div>
        </div>
      )}
    </>
  );
}

export default Login;