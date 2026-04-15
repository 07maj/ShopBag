import React from "react";
import { FaBagShopping } from "react-icons/fa6";
import {
    FaHome,
    FaCoffee,
    FaGamepad,
    FaLaptop,
    FaMobile,
    FaAppleAlt,
} from "react-icons/fa";
import { GiNailedFoot } from "react-icons/gi";
const Category = ({ onselectcat }) => {
    const categories = [
        { name: "All", icon: <FaBagShopping /> },
        { name: "Cafe", icon: <FaCoffee /> },
        { name: "Toys", icon: <FaGamepad /> },
        { name: "Home", icon: <FaHome /> },
        { name: "Fresh", icon: <FaAppleAlt /> },
        { name: "Electronics", icon: <FaLaptop /> },
        { name: "Mobile", icon: <FaMobile /> },
        { name: "Beauty", icon: <GiNailedFoot /> },
    ];

    return (
        <div className="w-full">
            <div className="max-w-7xl mx-auto py-10 px-6">
                <div className="flex sm:justify-center overflow-x-auto">
                    {categories.map((cat, index) => (
                        <div
                            key={index}
                            onClick={() => { onselectcat(cat.name) }}
                            className="flex flex-col items-center min-w-[80px] text-sm
               text-gray-800
               hover:text-purple-500"
                        >
                            <div className="text-2xl mb-2">{cat.icon}</div>
                            <div className="text-center cursor-pointer">{cat.name}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Category;
