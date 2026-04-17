import React, { useEffect, useRef, useState } from "react";
import { IoCloseCircle } from "react-icons/io5";
import { IoIosCloseCircle } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { FaPlus, FaMinus } from "react-icons/fa";
import { MdDeleteSweep } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { Bs5CircleFill } from "react-icons/bs";

import {
  cartTotal,
  DecrementQuantity,
  deleteCartItem,
  IncrementQuantity,
  cartSave,
  fetchCart,
} from "../features/cart/CartSlice";

const Cart = () => {
  const hasFetch = useRef(false)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.cart.cart);
  const cartAllTotal = useSelector((state) => state.cart);
  const [rNo, setRno] = useState(0);

  

  useEffect(() => {
    dispatch(cartTotal());
  }, [cartData, dispatch]);

  useEffect(() => {
    let userId = localStorage.getItem("user");
    let token = localStorage.getItem("token");

    if (userId && token) {
      dispatch(
        cartSave({
          userId: userId,
          cartItems: cartData,
          totalPrice: cartAllTotal.TotalPrice,
          totalQuantity: cartAllTotal.TotalQuantity
        }),
      );
    }
  }, [cartData, dispatch]);

  useEffect(() => {
     if(hasFetch.current) return;
      hasFetch.current = true;
    let userId = localStorage.getItem("user");
    let token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please Login To Access Your Cart");
      navigate("/login");
      return;
    }
    if (userId) {
      dispatch(fetchCart(userId));
    }
  }, [dispatch, navigate]);

  function handleCheckout() {
    const receiptNo = rNo + 1;
    setRno(receiptNo);
    const amount = cartAllTotal.TotalPrice;
    const currency = "INR";
    const receipt = `Receipt ${receiptNo}`;

    fetch(`${import.meta.env.VITE_API_URL}/api/cart-order`, {
    method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: amount,
        currency: currency,
        receipt: receipt,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((order) => {
        const options = {
          key: "rzp_test_ScGPBjlLijR9cO",
          amount: order.amount,
          currency: order.currency,
          name: "shopBag",
          description: "testing mode",
          order_id: order.id,
          handler: function (response) {
            let token = localStorage.getItem("token");
            let userId = localStorage.getItem("user");

            fetch(`${import.meta.env.VITE_API_URL}/api/verify`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                razorpay_orderid: response.razorpay_order_id,
                razorpay_paymentid: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                amount,
                userId,
              }),
            })
              .then((res) => {
                return res.json();
              })
              .then((result) => {
                if (result.success) {
                  toast.success(result.message);
                } else {
                  toast.error(result.message);
                }
              });
          },
          prefill: {
            name: "admin",
            email: "admin@gmail.com",
            contact: "9346971119",
          },
        };
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      });
  }

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center bg-black bg-opacity-45 justify-center z-50">
      <div className="max-w-xl w-full p-6 rounded-xl shadow-lg bg-white relative overflow-y-auto max-h-[90vh] mx-4">
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          <IoCloseCircle className="absolute top-3 right-3 text-gray-500 hover:text-red-600 text-2xl" />
        </button>
        <h2 className="text-2xl font-bold mb-4 text-purple-500 text-center">
          Your Cart 🛍️
        </h2>
        {cartData?.map((item, index) => (
          <ul className="divide-y divide-gray-400" key={index}>
            <li className="flex items-center gap-5 py-4">
              <img
                src={`${import.meta.env.VITE_API_URL}/uploads/${item.productImage}`}
                alt=""
                className="h-16 w-16 object-contain"
              />
              <div className="flex-1">
                <h2 className="font-semibold text-gray-800">
                  {item.productName}
                </h2>
              </div>
              <p className="font-bold text-green-700 text-sm ">
                ₹{item.productPrice * item.quantity}
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    dispatch(DecrementQuantity(item));
                  }}
                >
                  <FaMinus className="py-1 px-1 text-black rounded bg-purple-300 hover:bg-purple-500 text-2xl font-bold" />
                </button>
                <span className="px-1 ">{item.quantity}</span>
                <button
                  onClick={() => {
                    dispatch(IncrementQuantity(item));
                  }}
                >
                  <FaPlus className="py-1 px-1 font-bold text-black rounded bg-purple-300 hover:bg-purple-500 text-2xl " />
                </button>
              </div>
              <MdDeleteSweep
                onClick={() => {
                  dispatch(deleteCartItem(item));
                }}
                className="text-gray-700 hover:text-red-600 text-2xl hover:cursor-pointer"
              />
            </li>
          </ul>
        ))}
        <div className="flex items-center justify-between">
          <div className="text-left ">
            <p className="text-lg font-semibold text-gray-700">
              Total Quantity :-
              <span className="text-blue-500">
                {cartAllTotal.TotalQuantity}
              </span>
            </p>
          </div>
          <div className="mt-5 text-right">
            <p className="text-lg font-semibold text-gray-700">
              Total:-
              <span className="text-green-500">₹{cartAllTotal.TotalPrice}</span>
            </p>
            <button
              onClick={handleCheckout}
              className="mt-4 bg-purple-600 text-white py-2 px-6 rounded hover:bg-purple-700"
            >
              Check Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
