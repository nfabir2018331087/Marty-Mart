'use client';

import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import Image from 'next/image'
import bgimg from '../public/com.jpg'
import Head from 'next/head'
import { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilePen, faRightToBracket } from '@fortawesome/free-solid-svg-icons'
// import Link from 'react-scroll'

export default function Home() {
    const button = "Get Started";
    const url = '#getStarted';

    const targetRef = useRef(null);

    const handleClick = () => {
        window.location.href = '/signin';
    }

  return (
    <>
    <Navbar button={button} url = {targetRef}/>

    <section className="flex justify-around font-sans px-20 m-auto h-screen pt-20">
        <div className="px-2 pt-36 w-full lg:w-3/5">
            <div className="mb-8 text-center">
                <h2 className="mb-4 text-4xl font-bold text-left lg:text-5xl">
                    Welcome to <span className="text-5xl text-emerald-400"> Marty Mart</span>. Most trusted and authentic place for you.
                </h2>

                <p className="visible mx-0 mt-3 mb-0 pr-16 text-sm leading-relaxed text-left text-slate-400">
                    You can sell your products and earn money from here. You can also buy products
                    from here. As your e-commerce partner, we are here for you all the time with full transparency.
                </p>
            </div>
        </div>

        <div className="px-3 mb-12 w-full lg:mb-0 lg:w-2/5">
            <div className="flex justify-center">
            <Image src={'/ecom.svg'} alt='picture' width={500} height={500} /> 
            </div>
        </div>
    </section>

    <section id ='getStarted' ref={targetRef}
        className="flex flex-col w-full h-screen bg-cover bg-fixed bg-center justify-center items-center"
        style={{backgroundImage : `url(${bgimg.src})`}}>

        <h1 className=" text-white text-5xl font-semibold my-20">
            Get Started With Us
        </h1>

        <div className="container mx-auto px-48">
          <div className="flex flex-wrap">
          <div className="pt-6 w-full md:w-6/12 px-12 text-center transform duration-300 hover:scale-105">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-xl">
                <div className="px-4 py-5 flex-auto">
                  <div className="text-white p-3 text-center inline-flex items-center justify-center w-auto h-12 mb-5 rounded-full">
                  <a href="/signup">
                        <button className="bg-emerald-400 transition duration-300 px-4 py-3 rounded-full  border border-[#F0F0F6] shadow-xl mt-4 hover:bg-emerald-600">
                            <FontAwesomeIcon icon={faFilePen}/> Register
                        </button>						
                        </a>
                  </div>
                  <h6 className="text-xl font-semibold">Join with us Now!</h6>
                  <p className="mt-2 mb-4 text-blueGray-500">
                    If you are looking for a trusted place to sell or buy your preferred products.
                     Then register to our website and enjoy tons of features.
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full pt-6 md:w-6/12 px-12 text-center transform duration-300 hover:scale-105">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-xl">
                <div className="px-4 py-5 flex-auto">
                  <div className="text-white p-3 text-center inline-flex items-center justify-center w-auto h-12 mb-5 rounded-full bg-lightBlue-400">
                  {/* <a href="/signin"> */}
                        <button onClick={handleClick} className="bg-blue-500 transition duration-300 px-4 py-3 rounded-full  border border-[#F0F0F6] shadow-xl mt-4 hover:bg-blue-700">
                            <FontAwesomeIcon icon={faRightToBracket} />  Log In
                        </button>						
                        {/* </a> */}
                  </div>
                  <h6 className="text-xl font-semibold">Welcome Back!</h6>
                  <p className="mt-2 mb-4 text-blueGray-500">
                    Sell your own products or browse some interesting products. Add them to your cart. And buy them. 
                    Make fluent transaction through your bank account.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
    </section>
  
    <Footer />
    </> 
  )
}