import React from "react";
import { Link } from "react-router-dom";
import {
  MdDashboardCustomize,
  MdOutlineQueryStats,
  MdOutlineProductionQuantityLimits,
} from "react-icons/md";
import { IoExit } from "react-icons/io5";
import { MdAdminPanelSettings } from "react-icons/md";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Slidebar = () => {
  const navigate = useNavigate();
  function handleLogOut() {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminuser");
    toast.success("Admin Exited The Store 🛍️");
    navigate("/");
  }

  return (
    <div className="bg-gray-800 text-white w-64 min-h-screen p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-8">Admin Panel</h1>
      <nav className="space-y-4">
        <Link to={"/admin/dashboard"} className="block hover:text-green-600">
          Dashboard{" "}
          <MdDashboardCustomize className="inline text-blue-400" />{" "}
        </Link>
        <Link
          to={"/admin/manageproducts"}
          className="block hover:text-green-600"
        >
          Manage Product{" "}
          <MdOutlineProductionQuantityLimits className="inline text-yellow-400" />
        </Link>
        <Link to={"/admin/query"} className="block hover:text-green-600">
          Manage Query <MdOutlineQueryStats className="inline text-green-400" />
        </Link>
        <Link to={"/adminreg"} className=" block hover:text-blue-600 ">
          Create An Admin Account{" "}
          <MdAdminPanelSettings className="inline text-red-600" />
        </Link>
        <button onClick={handleLogOut} className="block hover:text-red -600">
          Exit The Store <IoExit className="inline text-red-400" />
        </button>
      </nav>
    </div>
  );
};

export default Slidebar;
