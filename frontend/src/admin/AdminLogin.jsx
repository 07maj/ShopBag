import React, { useState } from "react";
import { IoCloseCircle } from "react-icons/io5";
import { IoIosCloseCircle } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(true);
  const [adminLogin, setAdminLogin] = useState({
    adminLoginNumber: "",
    adminLoginEmail: "",
    adminLoginPass: "",
  });

  async function handleForm(e) {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/logindata`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(adminLogin),
      });
      const result = await response.json();
      if (response.ok) {
        localStorage.setItem("adminuser", result.adminLoginData._id);
        localStorage.setItem("adminToken", result.adminToken);
        toast.success(result.message);
        navigate("/admin/dashboard");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error(error || "something went wrong");
    }
  }
  function handleLogin(e) {
    setAdminLogin({ ...adminLogin, [e.target.name]: e.target.value });
  }

  return (
    <div
      className="fixed inset-0 backdrop-blur-sm flex items-center bg-black bg-opacity-40 justify-center
    "
    >
      <div className="max-w-md w-full p-6 rounded-xl shadow-lg bg-white relative">
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          <IoCloseCircle className="absolute top-3 right-3 text-gray-500 hover:text-red-600 text-2xl" />
        </button>
        <h2 className="text-2xl font-bold mb-4 text-purple-500 text-center">
          Admin Login Form 📃
        </h2>
        <form action="" onSubmit={handleForm}>
          <label htmlFor="" className=" block text-gray-700 font-medium mb-2 ">
            Contact Number
          </label>
          <input
            onChange={handleLogin}
            type="number"
            name="adminLoginNumber"
            value={adminLogin.adminLoginNumber}
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
            name="adminLoginEmail"
            value={adminLogin.adminLoginEmail}
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
              name="adminLoginPass"
              value={adminLogin.adminLoginPass}
              type={showPassword ? "password" : "text"}
              placeholder="Enter Your Password Here..."
              className="py-2 px-4 border border-gray-300 focus:ring-2 focus:ring-purple-500 rounded w-full focus:outline-none mt-1"
            />
            <button
              type="button"
              onClick={() => {
                setShowPassword(!showPassword);
              }}
              className="absolute top-4 right-3 hover:text-purple-700"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <button
            type="submit"
            className="w-full rounded-lg mt-3 py-3 mx-auto bg-purple-500 hover:bg-purple-800 text-white transition-colors "
          >
            Login Here
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
