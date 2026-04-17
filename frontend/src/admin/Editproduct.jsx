import React, { useEffect, useState } from "react";
import Slidebar from "./Slidebar";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";

const Editproduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [edit, setEdit] = useState({});

  async function updateProduct() {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/updateproduct/${id}`);
      const result = await response.json();
      if (response.ok) {
        setEdit(result.data);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    updateProduct();
  }, []);


  async function handleForm(e) {
    e.preventDefault();

    try {
      const formData = {
        Pname: edit.productName,
        Pprice: edit.productPrice,
        Pcat: edit.productCategory,
        Pstatus: edit.productStatus,
      };
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/updateddata/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })
      const record = await response.json()
      if (response.ok) {
        toast.success(record.message)
        navigate("/admin/manageproducts")
      } else {
        toast.error(record.message)
      }
    } catch (error) {
      toast.error(error)
    }
  }

  function handleChange(e) {
    setEdit({ ...edit, [e.target.name]: e.target.value });
  }

  return (
    <div className="flex mt-16">
      <Slidebar />
      <div className="flex-1 p-10 min-h-screen">
        <h1 className="text-gray-600 mb-3 text-3xl font-bold">
          Update Products 🛍️
        </h1>
        <button
          onClick={() => {
            navigate("/admin/dashboard");
          }}
          className="bg-gray-200 hover:bg-gray-300 rounded px-4 py-2"
        >
          Back
        </button>
        <form
          action=""
          onSubmit={handleForm}
          className="max-w-3xl mx-auto shadow-xl px-4 py-4"
        >
          <label htmlFor="" className="block text-gray-700 font-medium mb-1">
            Product Name
          </label>
          <input
            onChange={handleChange}
            value={edit.productName}
            type="text"
            name="productName"
            id=""
            className="w-full py-2 px-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-300"
          />
          <label htmlFor="" className="block text-gray-700 font-medium mb-1">
            Price ₹
          </label>
          <input
            onChange={handleChange}
            value={edit.productPrice}
            type="number"
            name="productPrice"
            className="w-full py-2 px-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-300"
          />
          <label htmlFor="" className="block text-gray-700 font-medium mb-1">
            Label
          </label>
          <select
            onChange={handleChange}
            value={edit.productCategory}
            name="productCategory"
            id=""
            className="w-full py-2 px-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-300"
          >
            <option value="---Select---">---Select---</option>
            <option value="Cafe">Cafe</option>
            <option value="Toys">Toys</option>
            <option value="Home">Home</option>
            <option value="Electronics">Electronics</option>
            <option value="Fresh">Fresh</option>
            <option value="Mobile">Mobile</option>
            <option value="Beauty">Beauty</option>
          </select>
          <label htmlFor="" className="block text-gray-700 font-medium mb-1">
            Status
          </label>
          <select
            onChange={handleChange}
            value={edit.productStatus}
            name="productStatus"
            id=""
            className="w-full py-2 px-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-300"
          >
            <option value="---Select---">---Select---</option>
            <option value="In-Stock">In-Stock</option>
            <option value="Out-Off-Stock">Out-Off-Stock</option>
          </select>
          <div className="text-right">
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 rounded px-4 py-2 mt-2"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Editproduct;
