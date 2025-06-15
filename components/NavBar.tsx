'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { FaWhatsapp, FaBars, FaTimes } from 'react-icons/fa'
import { ChevronDown } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const NavBar = () => {
  const whatsappNumber = "YOUR_WHATSAPP_NUMBER_HERE"

  const navLinks = [
    { href: "/private-listings", label: "Private Listings" },
    { href: "/new-opportunities", label: "New Opportunities" },
    { href: "/sold-properties", label: "Sold Properties" },
    { href: "/agents", label: "Find An Agent" },
    { href: "/booking", label: "Book Appointment" },
  ]

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (!isMobileMenuOpen) return
    
    const handleClickOutside = (e: MouseEvent) => {
      if (!e.target || (!(e.target as Element).closest('.mobile-menu') && !(e.target as Element).closest('.menu-button'))) {
        setIsMobileMenuOpen(false)
      }
    }
    
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [isMobileMenuOpen])

  return (
    <nav className={`sticky top-0 left-0 right-0 z-50 flex items-center justify-between text-white sm:px-3 md:px-10 
        ${scrolled ? 'bg-[#181616f5]' : 'bg-gradient-to-r from-[#181616c5] to-[#241622b9]'} 
        backdrop-blur-sm transition-all duration-300 shadow-lg font-lora max-h-28`}>
      {/* Logo */}
      <div className="flex-shrink-0">
        <Link href="/" className="block">
          <Image 
            src="/Logo/logo-light.png" 
            alt="Logo" 
            width={120} 
            height={60} 
            className="w-28 sm:w-32 md:w-36 lg:w-40 h-auto transition duration-300 hover:opacity-90" 
            priority 
          />
        </Link>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden xl:flex items-center justify-end gap-2 text-xs xl:text-sm xl:gap-8 lg:px-8 md:px-6 sm:px-4">
        {navLinks.slice(0, 4).map((link) => (
          <Link 
            key={link.label} 
            href={link.href} 
            className="group relative py-2 tracking-wide hover:text-gray-200 transition-colors duration-300">
            {link.label}
            <span
              className="block transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-out h-0.5 bg-white absolute bottom-0 left-0 right-0"
            ></span>
          </Link>
        ))}

        {/* Dropdown: Who We Are */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="group relative py-2 tracking-wide flex items-center gap-1 hover:text-gray-200 transition-colors duration-300">
              <span>Who We Are</span>
              <ChevronDown className="w-4 h-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
              <span
                className="block transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-out h-0.5 bg-white absolute bottom-0 left-0 right-0"
              ></span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white text-gray-800 mt-2 rounded-md shadow-lg p-1 min-w-[160px] border border-gray-200">
            <DropdownMenuItem asChild>
              <Link href="/about-us" className="w-full px-4 py-2 rounded hover:bg-gray-100 transition-colors">About Us</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/contact-us" className="w-full px-4 py-2 rounded hover:bg-gray-100 transition-colors">Contact Us</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Book Appointment */}
        <Link href="/booking" className="group relative py-2 tracking-wide hover:text-gray-200 transition-colors duration-300">
          Book Appointment
          <span
            className="block transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-out h-0.5 bg-white absolute bottom-0 left-0 right-0"
          ></span>
        </Link>

        {/* WhatsApp Button */}
        <div className='ml-4'>
          <Link
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 bg-white text-green-600 py-3 px-5 rounded-full transition duration-300 ease-in-out border-2 border-green-500 hover:bg-green-500 hover:text-white hover:border-green-600 transform hover:scale-[1.02]"
            aria-label="Chat with us on WhatsApp"
          >
            <FaWhatsapp size={18} />
            <span>WhatsApp</span>
          </Link>
        </div>
      </div>

      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="xl:hidden text-white focus:outline-none p-2 menu-button"
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Mobile Menu Dropdown */}
      <div
        className={`xl:hidden fixed top-[5.5rem] left-0 right-0 ${scrolled ? 'bg-[#181616f5]' : 'bg-gradient-to-r from-[#181616d6] to-[#241622b9]'} 
                  backdrop-blur-sm shadow-xl z-50 max-h-[calc(100vh-60px)] overflow-y-auto 
                  transition-all duration-300 ease-in-out mobile-menu
                  ${isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}
      >
        <div className="flex flex-col py-4 px-6 space-y-2">
          {navLinks.slice(0, 4).map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-white text-sm py-2 border-b border-gray-700 hover:text-gray-300 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          {/* Who We Are - Mobile version */}
          <div className="space-y-3 border-b border-gray-700 pb-3">
            <div className="text-white text-sm py-2">
              Who We Are
            </div>
            <div className="flex flex-col space-y-1 pl-4">
              <Link
                href="/about-us"
                className="text-gray-300 hover:text-white transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About Us
              </Link>
              <Link
                href="/contact-us"
                className="text-gray-300 hover:text-white transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact Us
              </Link>
            </div>
          </div>

          {/* Book Appointment */}
          <Link
            href="/booking"
            className="text-white text-sm py-2 border-b border-gray-700 hover:text-gray-300 transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Book Appointment
          </Link>

          {/* WhatsApp Button - Mobile - Now matches desktop style */}
          <Link
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-full space-x-2 bg-white text-green-600 py-2.5 px-5 rounded-full transition duration-300 ease-in-out border-2 border-green-500 hover:bg-green-500 hover:text-white hover:border-green-600 mt-4 mx-auto"
            aria-label="Chat with us on WhatsApp"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <FaWhatsapp size={18} />
            <span>WhatsApp</span>
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
