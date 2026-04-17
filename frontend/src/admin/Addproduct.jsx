import React from 'react'
import { useState } from 'react'
import Slidebar from './Slidebar'
import { Link, useNavigate } from 'react-router-dom'
import toast from "react-hot-toast";

const Addproduct = () => {
    const navigate = useNavigate()
    const [product, setProduct] = useState({ pname: "", price: "", cat: "", status: "" })
    const [image, setImage] = useState("")


    async function handleForm(e) {
        e.preventDefault()
        const formallData = new FormData()
        formallData.append("pname", product.pname)
        formallData.append("price", product.price)
        formallData.append("cat", product.cat)
        formallData.append("status", product.status)
        formallData.append("image", image)

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/addproduct`, {
                method: "POST",
                body: formallData
            })
            const result = await response.json()
            if (response.ok) {
                toast.success(result.message)
                navigate("/admin/manageproducts")
            } else {
                toast.error(result.message)

            }
        } catch (error) {
            toast.error(error)
        }
    }

    function addProduct(e) {
        setProduct({ ...product, [e.target.name]: e.target.value })
    }
    return (
        <div className='flex mt-16'>
            <Slidebar />
            <div className='flex-1 p-10 min-h-screen'>
                <h1 className='text-gray-600 mb-3 text-3xl font-bold'>Add Products 🛍️</h1>
                <button onClick={() => { navigate("/admin/dashboard") }} className='bg-gray-200 hover:bg-gray-300 rounded px-4 py-2'>Back</button>
                <form action=""
                    encType="multipart/form-data"
                    onSubmit={handleForm} className='max-w-3xl mx-auto shadow-xl px-4 py-4'>
                    <label htmlFor="" className='block text-gray-700 font-medium mb-1'>Product Name</label>
                    <input onChange={addProduct} value={product.pname} type="text" name="pname" id="" className='w-full py-2 px-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-300' />
                    <label htmlFor="" className='block text-gray-700 font-medium mb-1'>Price ₹</label>
                    <input onChange={addProduct} value={product.price} type="number" name="price" className='w-full py-2 px-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-300' />
                    <label htmlFor="" className='block text-gray-700 font-medium mb-1'>Status</label>

                    <select onChange={addProduct} value={product.status} name="status" id="" className="w-full py-2 px-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-300">
                        <option value="---Select---">---Select---</option>
                        <option value="In-Stock">In-Stock</option>
                        <option value="Out-Off-Stock">Out-Off-Stock</option>
                    </select>
                    <label htmlFor="" className='block text-gray-700 font-medium mb-1'>Category</label>
                    <select className="w-full py-2 px-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-300" onChange={addProduct} value={product.cat} name="cat" id="">
                        <option value="---Select---">---Select---</option>
                        <option value="Cafe">Cafe</option>
                        <option value="Toys">Toys</option>
                        <option value="Home">Home</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Fresh">Fresh</option>
                        <option value="Mobile">Mobile</option>
                        <option value="Beauty">Beauty</option>
                    </select>
                    <label htmlFor="" className='block text-gray-700 font-medium mb-1'>Label</label>
                    <input
                        type="file" name="image" onChange={(e) => { setImage(e.target.files[0]) }} id="" className='w-full py-2 px-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-300' />
                    <div className='text-right'>
                        <button type='submit' className='bg-red-600 hover:bg-red-700 rounded px-4 py-2 mt-2'>Add Product</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Addproduct