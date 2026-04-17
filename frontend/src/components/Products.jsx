import React from "react";
import Category from "../pages/Category";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from 'react-redux'
import { addToCart } from "../features/cart/CartSlice";
const Products = () => {

  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("all");

  async function productsData(selectCategory = "all") {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/userproducts?category=${selectCategory}`);
      const record = await response.json();
      setProducts(record.data);
    } catch (error) {
      toast.error(error.message);
    }
  }
  useEffect(() => {
    productsData(category);
  }, [category]);
  const dispatch = useDispatch()
  return (
    <div className="max-w-7xl mx-auto py-10 px-6">
      <Category onselectcat={setCategory} />
      <h2 className="text-3xl font-semibold text-gray-700 mb-6 text-center">
        Products 🔥
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {products?.map((item, index) => (
          <div
            className="bg-gray-100 shadow-md rounded-lg p-4 hover:shadow-xl hover:-translate-y-2 transition duration-300 ease-in-out text-center" key={item._id}>
            <img
              src={`${import.meta.env.VITE_API_URL}/uploads/${item.productImage}`}
              alt=""
              className="w-full h-28 object-contain rounded-md " />
            <h3 className="text-gray-700 text-2xl mb-1 font-semibold">
              {item.productName}
            </h3>
            <p className="text-sm text-gray-400">
              Category:-{item.productCategory}
            </p>
            <p className="text-blue-500 font-semibold mb-1">Status:-
              {item.productStatus === "In-Stock" ? <span className="text-purple-400 font-medium">{item.productStatus}</span> : <span className="text-red-600 font-medium">{item.productStatus}</span>}
            </p>
            <p className="mt-1 text-green-600 font-bold">₹{item.productPrice}</p>
            <div className="text-center">
              <button onClick={() => { dispatch(addToCart(item)) }} className="mt-2 px-20 bg-purple-500 text-white py-1 mx-auto rounded hover:bg-purple-900 text-center">
                Add To Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
