import React from 'react'
import { useNavigate } from 'react-router-dom'
import hero from "../assets/hero.jpg"
const Hero = () => {
  const navigate= useNavigate()

  function handleShop(){
    navigate("/products")
  }
  return (
    <section className="bg-gradient-to-r from-purple-100 to-white via-white  md:flex items-center justify-between px-6 py-12 max-w-7xl mx-auto rounded-xl mt-28 border border-2">
      {/* Hero Content */}
      <div className='md:w-1/2 space-y-4'>
        <h1 className='text-4xl md:text-5xl font-bold text-gray-800'>Fast Delivery 🚀</h1>
        <p className='text-gray-800'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam fugiat quod aliquid asperiores ipsam ex assumenda voluptates. Aspernatur dolorem doloribus, sapiente, eveniet officia harum suscipit tempora dolorum, animi ad soluta.</p>
        <button onClick={handleShop} className='py-2 px-4 bg-purple-500 hover:bg-purple-700 text-white rounded-lg'>Shop Now</button>
      </div>
      {/* Hero Image */}
      <div className='md:w-1/2 mt-8 md:mt-0'>
        <img src={hero} alt="" className='rounded-2xl w-full max-w-md mx-auto' />
      </div>
    </section>
  )
}

export default Hero