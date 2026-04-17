import React, { useState } from "react";
import logo from "../assets/logo.png";
import {
  FaSearch,
  FaHome,
  FaCartPlus,
  FaRegUserCircle,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";
import { Bs5CircleFill, BsCircleFill } from "react-icons/bs";
import { IoLogOut } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { GrContact } from "react-icons/gr";
import Searchbar from "./Searchbar";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchBar, setSearchBar] = useState(false);
  const navigate = useNavigate();
  let token = localStorage.getItem("token");
  let user = localStorage.getItem("user");
  let adminToken = localStorage.getItem("adminToken");
  let adminuser = localStorage.getItem("adminuser");
  const data = useSelector((state) => state.cart.cart);

  function handleLogOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logout Successfully");
    navigate("/");
  }
  function handleLogin() {
    navigate("/login");
  }
  function handleAdminLogin() {
    navigate("/adminlogin");
  }
  function toggleMenu() {
    setIsOpen(!isOpen);
  }
  return (
    <nav className="bg-gradient-to-r from-purple-100 to-white via-white fixed top-0 left-0 right-0 z-50 shadow-md ">
      <div className=" max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="flex items-center justify-between h-16 relative cursor-pointer">
          {/* Logo */}
          <div>
            <img src={logo} alt="" className="w-auto h-28" onClick={()=>{navigate("/")}}  />
          </div>
          <div className="flex-1 mx-4">
            {/*search input*/}
            <div className="relative">
              <input
                type="text"
                name=""
                id=""
                onFocus={() => {
                  setSearchBar(true);
                }}
                readOnly
                className="w-full bg-gray-200 rounded-full pl-4 pr-10 py-2 shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Search for fruits, electronics and more..."
              />
              <FaSearch
                className="absolute right-3 top-1/2 
                        -translate-y-1/2 text-gray-500 text-lg"
              />
            </div>
          </div>
          {/* Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link to={"/"} className="text-gray-700 hover:text-purple-600">
              <FaHome className="text-xl" />
            </Link>
            <div className="relative inline-block">
              <Link to="/cart" className="text-gray-700 hover:text-purple-600">
                <FaCartPlus className="text-xl" />

                {data.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                    {data.length}
                  </span>
                )}
              </Link>
            </div>
            {!token ? (
              <ul className="flex justify-between items-center gap-3 ">
                <li>
                  <button onClick={handleLogin}>
                    <FaRegUserCircle className="text-xl text-gray-700 hover:text-red-600" />
                  </button>
                </li>
                <li>
                  {!adminToken ? (
                    <button onClick={handleAdminLogin}>
                      <RiAdminFill className="text-xl text-gray-700 hover:text-red-600" />
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        navigate("/admin/dashboard");
                      }}
                    >
                      <MdAdminPanelSettings className="text-[22px] text-gray-700 hover:text-blue-600" />
                    </button>
                  )}
                </li>
              </ul>
            ) : (
              <Link className="text-gray-700 hover:text-red-600">
                <IoLogOut className="text-xl" onClick={handleLogOut} />
              </Link>
            )}
            <Link to={"/query"} className="text-gray-700 hover:text-purple-600">
              <GrContact className="text-xl" />
            </Link>
          </div>
          {/* Toggle */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-2xl text-purple-600">
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
          {/* Toggle menu */}
          {isOpen && (
            <div className="md:hidden bg-white px-4 pt-2 pb-4 space-y-2 shadow-md absolute top-16 right-0">
              <Link
                to={"/"}
                className="text-gray-700 block hover:text-purple-100"
              >
                Home
              </Link>
              <Link
                to={"/query"}
                className="text-gray-700 block hover:text-purple-100"
              >
                Contact
              </Link>
              <Link
                to={"/cart"}
                className="text-gray-700 block hover:text-purple-100"
              >
                Cart
              </Link>
              {!token ? (
                <ul>
                  <li>
                    <Link
                      to={"/login"}
                      className="text-gray-700 hover:text-purple-100"
                    >
                      login
                    </Link>{" "}
                  </li>
                  {!adminToken ? (
                    <li>
                      <Link
                        to={"/adminlogin"}
                        className="text-gray-700 hover:text-purple-100"
                      >
                        Admin login
                      </Link>
                    </li>
                  ) : (
                    <li>
                      <Link
                        to={"/admin/dashboard"}
                        className="text-gray-700 hover:text-purple-100"
                      >
                        Admin
                      </Link>
                    </li>
                  )}
                </ul>
              ) : (
                <Link
                  to={"/"}
                  onClick={handleLogOut}
                  className="text-gray-700 block hover:text-purple-100"
                >
                  Log Out
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
      {searchBar && <Searchbar onClose={setSearchBar} />}
    </nav>
  );
};

export default Navbar;
