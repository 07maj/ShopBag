import React, { useEffect, useState } from 'react'
import Slidebar from './Slidebar'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'

const Queryreply = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [queryData, setqueryData] = useState({ to: "", sub: "", from: "", body: "" })

    async function userQueryReply() {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/userqueryreply/${id}`)
            const result = await response.json()
            if (response.ok) {
                console.log(result)
                setqueryData({ to: result.data.userEmail })
            } else {
                toast.error(result.message)
            }
        } catch (error) {
            toast.error(error)
        }
    }
    useEffect(() => {
        userQueryReply()
    }, [])

    async function handleForm(e) {
        try {
            e.preventDefault()
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/mailreply/${id}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(queryData)
            })
            const result = await response.json()
            if (response.ok) {
                toast.success(result.message)
                navigate("/admin/query")
            } else {
                toast.error(result.message)
                setqueryData({ sub: "", body: "" })
            }
        } catch (error) {
            toast.error(error)
        }
    }

    function handleChange(e) {
        setqueryData({ ...queryData, [e.target.name]: e.target.value })
    }

    return (
        <div className='flex mt-16'>
            <Slidebar />
            <div className='flex-1 p-10 min-h-screen'>
                <h1 className='text-gray-600 mb-3 text-3xl font-bold'>Query Reply 💬</h1>
                <button onClick={() => { navigate("/admin/query") }} className='bg-gray-200 hover:bg-gray-300 rounded px-4 py-2'>Back</button>
                <div className='bg-white shadow-md rounded-xl max-w-3xl mx-auto space-y-6 p-6'>
                    <form action="" onSubmit={handleForm}>
                        <label className='block text-gray-700 mb-1 font-medium' htmlFor="">To</label>
                        <input name="to" value={queryData.to} readOnly className='rounded-md w-full px-5 py-2 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-700' type="text" id="" />
                        <label className='block text-gray-700 mb-1 font-medium' htmlFor="">From</label>
                        <input value={"alaziztechnologiespvtltd@gmail.com"} readOnly name="from" className='rounded-md w-full px-5 py-2 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-700' type="text" id="" />
                        <label className='block text-gray-700 mb-1 font-medium' htmlFor="">Sub</label>
                        <input name="sub" onChange={handleChange} value={queryData.sub} className='rounded-md w-full px-5 py-2 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-700' type="text" id="" />
                        <label className='block text-gray-700 mb-1 font-medium' htmlFor="">Body</label>
                        <textarea onChange={handleChange} value={queryData.body} name="body" className='rounded-md w-full px-5 py-2 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-700' id=""></textarea>
                        <div className='text-right'>
                            <button className='px-5 py-1 text-white bg-purple-500 hover:bg-purple-700 rounded-lg'>Reply</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Queryreply