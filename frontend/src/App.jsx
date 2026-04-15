import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Homepage from './pages/Homepage'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Footer from './components/Footer'
import Query from './pages/Query'
import Login from './components/Login'
import Reg from './components/Reg'
import Cart from './pages/Cart'
import Admindashboard from './admin/Admindashboard'
import Adminproducts from './admin/Adminproducts'
import Addproduct from './admin/Addproduct'
import Editproduct from './admin/Editproduct'
import Adminquery from './admin/Adminquery'
import Queryreply from './admin/Queryreply'
import AdminLogin from './admin/AdminLogin'
import AdminReg from './admin/AdminReg'
import Products from './components/Products'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/query' element={<Query />} />
          <Route path='/login' element={<Login />} />
          <Route path='/reg' element={<Reg />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/admin/dashboard' element={<Admindashboard />} />
          <Route path='/admin/manageproducts' element={<Adminproducts />} />
          <Route path='/admin/addproduct' element={<Addproduct />} />
          <Route path='/admin/editproduct/:id' element={<Editproduct />} />
          <Route path='/admin/query' element={<Adminquery />} />
          <Route path='/admin/queryreply/:id' element={<Queryreply />} />
          <Route path='/adminlogin' element={<AdminLogin />} />
          <Route path='/adminreg' element={<AdminReg />} />
          <Route path='/products' element={<Products />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App