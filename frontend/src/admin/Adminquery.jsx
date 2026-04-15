import React, { useEffect, useState } from "react";
import Slidebar from "./Slidebar";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Adminquery = () => {
  const [query, setQuery] = useState([]);

  async function getQuery() {
    try {
      const response = await fetch("/api/getquery");
      const result = await response.json();
      if (response.ok) {
        setQuery(result.data);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error(error);
    }
  }
  useEffect(() => {
    getQuery();
  }, []);

  async function handleDelete(id) {
    try {
      const response = await fetch(`/api/deletequery/${id}`, {
        method: "Delete",
      });
      const result = await response.json();
      if (response.ok) {
        toast.success(result.message);
        getQuery();
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
      <div className="flex-1 p-10 min-h-screen relative">
        <h1 className="text-gray-600 mb-3 text-3xl font-bold">
          Query Management 📧
        </h1>
        <div>
          <table className="text-sm w-full text-left text-gray-700 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-6 py-3">S.No</th>
                <th className="px-6 py-3">Username</th>
                <th className="px-6 py-3">Email-Id</th>
                <th className="px-6 py-3">Query</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Action-1</th>
                <th className="px-6 py-3">Action-2</th>
              </tr>
            </thead>
            <tbody>
              {query.length === 0 ? <tr><td colSpan="100%"><p className="text-red-600 text-2xl font-bold text-center my-2">😉 No Queries Found</p></td></tr> : query.map((item, index) => (
                <tr className="bg-white border-b border-gray-300" key={index}>
                  <td className="px-6 py-3">{index + 1}</td>
                  <td className="px-6 py-3">{item.userName}</td>
                  <td className="px-6 py-3">{item.userEmail}</td>
                  <td className="px-6 py-3">{item.userQuery}</td>
                  <td className="px-6 py-3">{item.userQueryStatus}</td>
                  <td className="px-6 py-3">
                    <Link to={`/admin/queryreply/${item._id}`}>
                      <button className="text-xs bg-green-700 px-4 py-2 rounded text-white hover:bg-green-800">
                        Reply
                      </button>
                    </Link>
                  </td>
                  <td className="px-6 py-3">
                    <button
                      onClick={() => {
                        handleDelete(item._id);
                      }}
                      className="text-xs bg-red-700 px-4 py-2 rounded text-white hover:bg-red-800"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Adminquery;
