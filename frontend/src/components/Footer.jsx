import React from 'react'
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom';
import { FaFacebook, FaWhatsapp, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-purple-100 to-white via-white border border-t-2 border-gray-200">
            <div className='max-w-7xl mx-auto  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 md:gap-32 sm:gap-16 py-10 px-6 text-gray-700'>
                {/*Logo & content*/}
                <div >
                    <img src={logo} alt="" className='w-auto h-28' />
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum dolores pariatur facilis provident nulla, repellendus ipsum aliquam fugiat qui reiciendis impedit minus obcaecati voluptatum autem corrupti. Odit exercitationem veniam error.</p>
                </div>
                {/*Quick Links*/}
                <div>
                    <h3 className='text-lg font-bold mb-3'>Quick Links</h3>
                    <ul className='space-y-2 text-sm'>
                        <ol><Link to={"/"} className='hover:text-purple-500 font-semibold'>Home</Link></ol>
                        <ol><Link className='hover:text-purple-500 font-semibold'>About</Link></ol>
                        <ol><Link to={"/query"} className='hover:text-purple-500 font-semibold'>Contact</Link></ol>
                        <ol><Link className='hover:text-purple-500 font-semibold'>T&C</Link></ol>
                    </ul>
                </div>
                {/*Follow us*/}
                <div>
                    <h3 className='text-lg font-bold mb-3'>Follow Us</h3>
                    <div className='flex space-x-4 text-2xl'>
                        <Link><FaFacebook className='hover:text-blue-500' /></Link>
                        <Link><FaWhatsapp className='hover:text-green-400' /></Link>
                        <Link><FaTwitter className='hover:text-sky-400' /></Link>
                        <Link><FaInstagram className='hover:text-red-600' /></Link>
                    </div>
                </div>

            </div>
            <div className='text-center text-sm text-gray-700 py-4 border-t border-gray-400'>
                ©{new Date().getFullYear()} copyright by MAJ Developer
            </div>
        </footer>
    )
}

export default Footer