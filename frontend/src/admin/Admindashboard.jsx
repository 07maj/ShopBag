import { useState } from "react";
import { useEffect } from "react";
import React from "react";
import toast from "react-hot-toast";
import Slidebar from "./Slidebar";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

const Admindashboard = () => {
  const hasFetched = useRef(false);

  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  async function getAllProducts() {
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        toast.error("Please Login To access the store");
        navigate("/adminlogin");
        return;
      }
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/getproducts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 401 || response.status === 403) {
        toast.error("Session expired. Please login again");
        localStorage.removeItem("adminToken");
        navigate("/adminlogin");
        return;
      }
      const record = await response.json();

      setProducts(record.data);
    } catch (error) {
      toast.error(error);
    }
  }
  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    getAllProducts();
  }, []);
  return (
    <div className="flex mt-16">
      <Slidebar />
      <div className="flex-1 p-10 min-h-screen">
        <h1 className="text-gray-600 mb-3 text-3xl font-bold">
          Admin Dashboard 🌍
        </h1>
        <div className="grid grid-flow-cols-1">
          <div className="bg-white p-6 rounded-lg shadow-2xl">
            <h2 className="text-xl font-semibold text-gray-700">
              Total Products
            </h2>
            <p className="text-3xl font-bold text-green-700 mt-3">
              {products.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admindashboard;
