import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import toast from 'react-hot-toast'



const Searchbar = ({ onClose }) => {

  const [search, setSearch] = useState("")
  const [searchData, setSearchData] = useState([])

  // Debounce
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (search.trim()) {
        fetch(`${import.meta.env.VITE_API_URL}/api/search?q=${search}`).then((res) => {
          return res.json()
        }).then((result) => {
          setSearchData(result.data)
        }).catch((error) => {
          toast.error(error)
        })
      }
    }, 300);
    return () => clearTimeout(delayDebounce)
  }, [search])
  return (
    <div className="bg-white inset-0 fixed z-[999] p-4 overflow-y-auto">
      <div className="flex justify-between items-center mb-4 ">
        <input
          type="text"
          placeholder="Search Here..."
          autoFocus
          onChange={(e) => { setSearch(e.target.value) }}
          name=""
          id=""
          className="flex-1 px-4 py-2 rounded-full border-2 focus:outline-none focus:ring-2 focus:ring-purple-400 "
        />
        <button className="ml-3 text-purple-600 hover:text-red-600 text-xl"
          onClick={() => { onClose(false) }}>
          <FaTimes></FaTimes>
        </button>
      </div>
      {/* Result */}
      <div className="mt-4 space-y-4" >
        {
          searchData.length < 1 ? <p className="text-center text-red-600 text-2xl text-semibold">No Result Found 👎</p> :
            searchData.map((item, index) => (
              <div
                className="bg-gray-100 shadow-md rounded-lg p-4 hover:shadow-xl hover:-translate-y-2 transition duration-300 ease-in-out text-center" key={item._id}>
                <img
                  src={`/uploads/${item.productImage}`}
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
            ))
        }

      </div>
    </div>
  );
};

export default Searchbar;
