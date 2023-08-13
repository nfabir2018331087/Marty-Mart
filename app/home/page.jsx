'use client';

import Navbar from "@/components/navbar.jsx";
import Toast from "../providers/toast.jsx";
import Footer from "@/components/footer.jsx";
import { redirect } from "next/navigation.js";
import { useEffect, useState } from "react";
import { verifyJwt } from "@/lib/jwt.js";
import { Carousel, Spinner } from "@material-tailwind/react";
import bgimg from '@/public/cartbgr.jpg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faRightFromBracket, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
export default function Home() {
    const button = "Log Out";
    const url = "/";

    const [loading, setLoading] = useState(true);
    const [data, setData ] = useState({});

    const handleSignOut = () =>{
        localStorage.removeItem("token");
        window.location.href = '/signin';
        return
    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        if(token){
            const data = verifyJwt(token);
            console.log(data);
            if(data){
                setLoading(false);
                setData(data);
            }
            else{ 
                localStorage.removeItem("token");
                return redirect('/signin');
            }
        }
        else return redirect('/signin');
    },[]);
    if (!loading){    
    return ( 
        <>
        <Toast />
        <Navbar button={button} url = {url}/>

        <div className="p-10">
        <Carousel className="rounded-xl h-[500px]">
        <img
            src={"carousel/acces3.jpg"}
            alt="image 1"
            className="h-full w-full object-cover"
        />
        <img
            src={"carousel/shoe2.jpg"}
            alt="image 2"
            className="h-full w-full object-cover"
        />
        <img
            src={"carousel/pant.jpg"}
            alt="image 3"
            className="h-full w-full object-cover"
        />
        <img
            src={"carousel/acces2.jpg"}
            alt="image 3"
            className="h-full w-full object-cover"
        />
        <img
            src={"carousel/cap.jpg"}
            alt="image 3"
            className="h-full w-full object-cover"
        />
        <img
            src={"carousel/acces1.jpg"}
            alt="image 3"
            className="h-full w-full object-cover"
        />
        </Carousel>
        </div>
        <div className="p-5">
            <h1 className="text-center text-5xl font-semibold">Welcome to <span className="text-emerald-500">Marty Mart</span>.</h1>
            <p className="text-center text-3xl pt-10 font-semibold">Explore the Greatness!</p>
        </div>

        <div className="grid place-items-center grid-cols-3 gap-4 py-10 px-32 mx-auto">
            <div onClick={() => window.location.href = '/profile'} className="bg-emerald-300 w-60 h-72 m-8 static rounded-lg ">
                <div className="bg-white w-60 h-72 hover:m-2 cursor-pointer border border-emerald-200 absolute rounded-lg shadow-xl hover:shadow-2xl transition-all duration-150 ease-out hover:ease-in ">
                    <h1 className="m-4 text-2xl font-bold">Go to your Profile <FontAwesomeIcon icon={faArrowRight}/></h1>
                    <hr className="m-4 rounded-2xl border-t-2"/>
                    <p className="m-4 text-sm">Go to your profile page. You can view your information there. Your wallet option will also be on your profile. You can check and update your wallet status. And also can view your wallet&apos;s transactions.</p>
                </div>
            </div>
            <div className="bg-emerald-300 w-60 h-72 m-8 static rounded-lg ">
                <div onClick={() => window.location.href = '/products'} className="bg-white w-60 h-72 hover:-m-2 cursor-pointer border border-emerald-200 absolute rounded-lg shadow-xl hover:shadow-2xl transition-all duration-150 ease-out hover:ease-in ">
                    <h1 className="m-4 text-2xl font-bold">Browse Products <FontAwesomeIcon icon={faArrowRight}/></h1>
                    <hr className="m-4 rounded-2xl border-t-2"/>
                    <p className="m-4 text-sm">Go to products page and dive deep into the huge amount of authentic products. You can explore them. You can add them to your cart. You can buy products using your wallet and keep the track of your orders.</p>
                </div>
            </div>
            <div className="bg-emerald-300 w-60 h-72 m-8 static rounded-lg ">
                <div onClick={() => window.location.href = '/orders'} className="bg-white w-60 h-72 hover:m-2 cursor-pointer border border-emerald-200 absolute rounded-lg shadow-xl hover:shadow-2xl transition-all duration-150 ease-out hover:ease-in ">
                    <h1 className="m-4 text-2xl font-bold">See your Orders <FontAwesomeIcon icon={faArrowRight}/></h1>
                    <hr className="m-4 rounded-2xl border-t-2"/>
                    <p className="m-4 text-sm">Go to your order page. You can see the status of your order there. If you are a customer you can get updated about your orders&apos; states. If you are a supplier you can view how many orders you&apos;ve got and take actions on that.</p>
                </div>
            </div>
        </div>        
        <Footer />
        </>      
     );
    }

    else return (
        <div className="pt-80 flex justify-center"><Spinner color ="green" className="h-14 w-14" />;</div>
    )

}


