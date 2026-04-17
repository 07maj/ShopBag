import React, { useState } from "react";
import toast from "react-hot-toast";
const Query = () => {
  const [query, setQuery] = useState({
    userName: "",
    userNumber: "",
    userEmail: "",
    userQuery: "",
  });

  function handleChange(e) {
    setQuery({ ...query, [e.target.name]: e.target.value });
  }

  async function handleForm(e) {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/userquery`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(query),
      });
      const result = await response.json();
      if (response.ok) {
        toast.success(result.message);
        setQuery({
          userName: "",
          userNumber: "",
          userEmail: "",
          userQuery: "",
        });
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <div className="bg-gray-200 rounded-xl max-w-7xl mx-auto mt-24 p-6  shadow-lg">
      <h2 className="text-center text-2xl font-bold text-purple-500">
        Query Form 📃
      </h2>
      <form action="" onSubmit={handleForm}>
        <label className=" block text-gray-700 font-medium mt-2 " htmlFor="">
          Name
        </label>
        <input
          type="text"
          value={query.userName}
          onChange={handleChange}
          name="userName"
          placeholder="Enter Your Name Here..."
          className="py-2 px-4 border border-gray-300 focus:ring-2 focus:ring-purple-500 rounded w-full focus:outline-none mt-1"
        />
        <label htmlFor="" className=" block text-gray-700 font-medium mt-2 ">
          Email
        </label>
        <input
          type="email"
          value={query.userEmail}
          onChange={handleChange}
          name="userEmail"
          id=""
          placeholder="Enter Your Email Here..."
          className="py-2 px-4 mt-1 border border-gray-300 focus:ring-2 focus:ring-purple-500 rounded w-full focus:outline-none"
        />
        <label htmlFor="" className=" block text-gray-700 font-medium mt-2 ">
          Number
        </label>
        <input
          type="number"
          value={query.userNumber}
          onChange={handleChange}
          name="userNumber"
          id=""
          placeholder="Enter Your Email Here..."
          className="py-2 px-4 mt-1 border border-gray-300 focus:ring-2 focus:ring-purple-500 rounded w-full focus:outline-none"
        />
        <label htmlFor="" className=" block text-gray-700 font-medium mt-2 ">
          Query
        </label>
        <textarea
          name="userQuery"
          value={query.userQuery}
          onChange={handleChange}
          id=""
          placeholder="Enter Your Query Here.."
          className="py-2 px-4 mt-1 border border-gray-300 focus:ring-2 focus:ring-purple-500 rounded w-full focus:outline-none"
        ></textarea>
        <button
          type="submit"
          className="w-full rounded mt-3 py-3 mx-auto bg-purple-500 hover:bg-purple-800 text-white transition-colors "
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Query;
