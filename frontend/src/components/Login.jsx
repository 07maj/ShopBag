import React, { useState } from "react";
import { IoCloseCircle } from "react-icons/io5";
import { IoIosCloseCircle } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(true);
  const [login, setLogin] = useState({ loginNumber: "", loginEmail: "", loginPass: "" });


  async function handleForm(e) {
    e.preventDefault()
    try {
      const response = await fetch('/api/logindata', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(login)
      })
      const result = await response.json()
      if (response.ok) {
        toast.success(result.message)
        localStorage.setItem("user", result.data._id)
        localStorage.setItem("token", result.token)
        navigate("/")
      } else {
        toast.error(result.message)

      }
    } catch (error) {
      toast.error(result.error)

    }
  }
  function handleLogin(e) {
    setLogin({ ...login, [e.target.name]: e.target.value })
  }
  return (
    <div
      className="fixed inset-0 backdrop-blur-sm flex items-center bg-black bg-opacity-40 justify-center
    "
    >
      <div className="max-w-md w-full p-6 rounded-xl shadow-lg bg-white relative">
        <button onClick={() => { navigate("/") }}>
          <IoCloseCircle className="absolute top-3 right-3 text-gray-500 hover:text-red-600 text-2xl" />
        </button>
        <h2 className="text-2xl font-bold mb-4 text-purple-500 text-center">
          Login Form 📃
        </h2>
        <form action="" onSubmit={handleForm}>
          <label htmlFor="" className=" block text-gray-700 font-medium mb-2 ">
            Contact Number
          </label>
          <input
            onChange={handleLogin}
            type="number"
            name="loginNumber"
            value={login.loginNumber}
            id=""
            placeholder="Enter Your Contact Number Here..."
            className="py-2 px-4 mt-1 border border-gray-300 focus:ring-2 focus:ring-purple-500 rounded w-full focus:outline-none"
          />
          <label htmlFor="" className=" block text-gray-700 font-medium mb-2 ">
            Your Email
          </label>
          <input
            onChange={handleLogin}
            type="email"
            name="loginEmail"
            value={login.loginEmail}
            id=""
            placeholder="Enter Your Email Here..."
            className="py-2 px-4 mt-1 border border-gray-300 focus:ring-2 focus:ring-purple-500 rounded w-full focus:outline-none"
          />
          <label className=" block text-gray-700 font-medium mb-2 " htmlFor="">
            Password
          </label>
          <div className="relative">
            <input
              onChange={handleLogin}
              name="loginPass"
              value={login.loginPass}
              type={showPassword ? "password" : "text"}
              placeholder="Enter Your Password Here..."
              className="py-2 px-4 border border-gray-300 focus:ring-2 focus:ring-purple-500 rounded w-full focus:outline-none mt-1"
            />
            <button
              type="button"
              onClick={() => { setShowPassword(!showPassword) }}
              className="absolute top-4 right-3 hover:text-purple-700">
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>

          </div>
          <button
            type='submit'
            className="w-full rounded-lg mt-3 py-3 mx-auto bg-purple-500 hover:bg-purple-800 text-white transition-colors "
          >
            Login Here
          </button>
        </form>
        <p className="text-gray-500 text-center mt-2">
          Don't Have An Account!
          <br />
          <Link to={"/reg"} className="text-blue-500 hover:underline">
            Click Here To Create An Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
