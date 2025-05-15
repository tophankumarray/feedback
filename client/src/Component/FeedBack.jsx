import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_END_POINT } from "../Utils/constant";

const FeedBack = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [data, setData] = useState([]);

  const validateEmail = (email) => {
    const regex = /^\S+@\S+\.\S+$/;
    setEmailValid(regex.test(email));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { name, email, message };
    try {
      const res = await axios.post(`${API_END_POINT}/feedback`, user, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        alert.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
    setName("");
    setEmail("");
    setMessage("");
  };

  const getFeedbacks = async () => {
    try {
      const res = await axios.get(`${API_END_POINT}/feedbacks`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (res.status === 200) {
        setData(res.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getFeedbacks();
  }, []);

  return (
    <div>
      <div
        className={`transition-all duration-700 ease-in-out min-h-screen p-6 ${
          darkMode
            ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white"
            : "bg-gradient-to-br from-blue-100 via-white to-blue-50 text-black"
        }`}
      >
        <div className="max-w-xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold tracking-wide">Feedback</h1>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">
                {darkMode ? "Dark Mode" : "Light Mode"}
              </span>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${
                  darkMode ? "bg-blue-600" : "bg-gray-400"
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                    darkMode ? "translate-x-6" : "translate-x-0"
                  }`}
                ></div>
              </button>
            </div>
          </div>
          <form
            onSubmit={handleSubmit}
            className={`space-y-4 rounded-xl shadow-xl p-6 transition-all duration-700 ${
              darkMode
                ? "bg-gray-800 text-white"
                : "bg-white text-black border border-gray-200"
            }`}
          >
            <div>
              <label className="block font-semibold mb-1">Name</label>
              <input
                className="w-full border rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-400 text-black"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Email</label>
              <input
                className="w-full border rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-400 text-black"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  validateEmail(e.target.value);
                }}
                required
              />
              <p
                className={`text-sm mt-1 ${
                  emailValid ? "text-green-500" : "text-red-500"
                }`}
              >
                {email
                  ? emailValid
                    ? "This is a valid email"
                    : "Please enter a valid email"
                  : ""}
              </p>
            </div>
            <div>
              <label className="block font-semibold mb-1">Feedback</label>
              <textarea
                className="w-full border rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-400 text-black"
                rows="4"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              ></textarea>
              <p className="text-sm text-gray-500 mt-1">
                Word Count: {message.trim().split(/\s+/).filter(Boolean).length}
              </p>
            </div>
            <button
              type="submit"
              className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:to-red-600 transition-all duration-300 text-white font-semibold py-2 px-4 rounded-md shadow-lg w-full"
            >
              Feedback
            </button>
          </form>

          <div className="mt-10 space-y-4">
            {data.map((entry) => (
              <div
                key={entry._id}
                className={`p-4 rounded-lg shadow-md transition-colors duration-500 ${
                  darkMode ? "bg-gray-700" : "bg-white border"
                }`}
              >
                <p className="font-serif text-lg"> Name : {entry.name}</p>
                <p className="text-sm text-gray-400">Email : {entry.email}</p>
                <p className="mt-2 font-mono text-base">
                  Feedback : {entry.message}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedBack;
