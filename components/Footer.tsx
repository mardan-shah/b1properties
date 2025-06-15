import React from 'react';
import Image from 'next/image';
import { FaFacebookSquare, FaInstagram } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { IoLogoLinkedin } from "react-icons/io5";
import { FaYoutube } from "react-icons/fa6";
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer
      className='px-5 pt-20 md:py-20 bg-cover bg-center bg-no-repeat w-full'
      style={{
        backgroundImage: "url('/footer.png')",
        height: 'auto',
      }}
    >
      {/* Top Section: Logo + Social */}
      <div className='flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0 pb-10 border-b border-white/10'>
        <Image 
          src='/Logo/logo-light.png'
          alt='Logo'
          width={150}
          height={123}
        />
        <div className='flex flex-wrap text-xl text-white gap-4 items-center justify-center'>
          <span className='hidden sm:block'>Follow Us</span>
          <Link href=''><FaFacebookSquare /></Link>
          <Link href=''><BsTwitterX /></Link>
          <Link href=''><FaInstagram /></Link>
          <Link href=''><IoLogoLinkedin /></Link>
          <Link href=''><FaYoutube /></Link>
        </div>
      </div>

      {/* Middle Section: Main Content */}
      <div className='my-5 md:my-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 text-[15px] leading-7 text-white'>
        {/* Subscribe */}
        <div className='lg:col-span-2'>
          <div className='mb-5 text-xl text-white/50 font-medium'>Subscribe</div>
          <div className='border-b border-white/10 flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-5 pb-2'>
            <input
              type="email"
              placeholder="Your email"
              className="w-full sm:w-auto bg-transparent text-white placeholder-white/50 appearance-none outline-none border-none focus:outline-none focus:ring-0"
            />
            <button className='bg-white/5 rounded-full py-3 px-6 flex items-center gap-2 text-white whitespace-nowrap'>
              <span>Subscribe</span>
              <ChevronRight className='w-5 h-5' />
            </button>
          </div>
          <div>Subscribe to get early access to our new listings.</div>
        </div>

        {/* Quick Links */}
        <div className='lg:col-span-1'>
          <div className='mb-5 text-xl text-white/50 font-medium'>Quick Links</div>
          <div className='flex flex-col gap-1'>
            <Link href='/about'>About Us</Link>
            <Link href='/contact'>Contact Us</Link>
            <Link href='/privacy'>Privacy Policy</Link>
            <Link href='/terms'>Terms & Conditions</Link>
          </div>
        </div>

        {/* Contact Info */}
        <div className='lg:col-span-1'>
          <div className='mb-5 text-xl text-white/50 font-medium'>Contact Us</div>
          <div className='flex flex-col gap-1'>
            <span>info@b1properties.ae</span>
            <span>+971 4 39 38 155</span>
            <span>+971 5 64 33 8399</span>
          </div>
        </div>

        {/* Address */}
        <div className='lg:col-span-1'>
          <div className='mb-5 text-xl text-white/50 font-medium'>Our Address</div>
          <div className='flex flex-col gap-1'>
            <span>M Floor, First Motors Building</span>
            <span>Al Waha St., Sheikh Zayed Rd. Al Qouz 1, Dubai, UAE.</span>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className='w-full text-white text-center border-t border-white/10 pt-10 text-[15px]'>
        <span>Copyright &copy; 2025. B1 Properties</span>
      </div>
    </footer>
  );
};

export default Footer;
