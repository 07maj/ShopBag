import React from 'react'
import Hero from '../components/Hero'
import Products from '../components/Products'

const Homepage = () => {
  console.log(import.meta.env.VITE_API_URL);
  return (
    <div>
      <Hero />
      <Products />
    </div>
  )
}

export default Homepage