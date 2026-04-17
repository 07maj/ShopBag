import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Slidebar from "./Slidebar";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
const Adminproducts = () => {
  const [products, setProducts] = useState([]);

  async function getAllProducts() {

    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        toast.error("Please Login To access the store")
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/getproducts`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }
      );
      const record = await response.json();
      setProducts(record.data);
    } catch (error) {
      toast.error(error);
    }
  }
  useEffect(() => {
    getAllProducts();
  }, []);

  async function handleDelete(id) {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/productdelete/${id}`, {
        method: "DELETE",
      });
      const result = await response.json();
      if (response.ok) {
        toast.success(result.message);
        getAllProducts();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error(error);
    }
  }

  return (
    <div className="flex mt-16">
      <Slidebar />
      <div className="flex-1 p-10 min-h-screen">
        <h1 className="text-gray-600 mb-3 text-3xl font-bold">
          Manage Products 🛒
        </h1>
        <Link to={"/admin/addproduct"}>
          {" "}
          <button className="text-white bg-green-600 rounded hover:bg-green-700  py-2 px-4 flex items-center gap-2">
            Add Products
          </button>{" "}
        </Link>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-5">
          {products.map((item, index) => (
            <div className="bg-white rounded-xl shadow p-4 hover:shadow-xl" key={index}>
              <img
                src={`/uploads/${item.productImage}`} alt=""
                className=" w-full mb-4 border h-40 object-contain rounded-md"
              />
              <h3 className="text-gray-700 text-2xl mb-1">
                {item.productName}
              </h3>
              <p className="text-sm text-gray-400">
                Category:-{item.productCategory}
              </p>
              <p className="text-green-700 font-bold mb-1">
                ₹{item.productPrice}
              </p>
              <p className="text-blue-500 font-semibold mb-1">Status:-
                {item.productStatus === "In-Stock" ? <span className="text-purple-400 font-medium">{item.productStatus}</span> : <span className="text-red-600 font-medium">{item.productStatus}</span>}
              </p>

              <div className="flex flex-col sm:flex-row justify-between mt-4">
                <Link to={`/admin/editproduct/${item._id}`}>
                  <FaEdit className="flex  text-xl items-center text-blue-500 hover:text-blue-800 gap-3" />
                </Link>
                <Link
                  onClick={() => {
                    handleDelete(item._id);
                  }}
                >
                  <MdDelete className="flex text-2xl items-center text-red-500 hover:text-red-800 gap-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Adminproducts;
