// import Link from "next/link";
'use client';

import { useEffect, useState } from "react";
import { verifyJwt } from "@/lib/jwt";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket, faUser, faBagShopping, faBoxOpen, faCartShopping, faPlus } from "@fortawesome/free-solid-svg-icons";
import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
  } from "@material-tailwind/react";


const Navbar = ({button, url}) => {
    const targetRef = url;
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [data, setData] = useState({});

    useEffect(() => {
        const token = localStorage.getItem("token");
        if(token){
            const data = verifyJwt(token);
            if(data){
               setIsAuthenticated(true); 
               setData(data);
            }
        }
    },[]);

    const handleClick = () => {
        if(button === 'Get Started'){
            targetRef.current?.scrollIntoView({behavior:'smooth'});
        }
        else window.location.href = url;
    }

    const handleSignOut = () => {
        localStorage.removeItem("token");
        window.location.href = '/signin';
        return
    }

    const handleR = () =>{
        if(isAuthenticated) window.location.href = '/home';
        else window.location.href = '/';
    }
    return (  
        <div className="top-0 flex justify-between items-center w-full text-gray-700 bg-white dark-mode:text-gray-200 dark-mode:bg-gray-800 border-b border-gray-200">
            <div className="flex flex-row items-center justify-between p-4 cursor-pointer">
                <img src="mm.png" className="h-9 w-14"/>
                <a onClick={handleR} className="text-xl font-semibold tracking-widest text-gray-900 uppercase rounded-lg dark-mode:text-white focus:outline-none focus:shadow-outline">Marty Mart</a>
            </div>
            <div>
                <nav  className="flex-col flex-grow hidden pb-4 md:pb-0 md:flex md:justify-end md:flex-row">
                    { isAuthenticated ? 
                    (<>
                    { data.type === "Supplier" ?
                     <a className="px-4 py-2 mt-2 text-md font-semibold bg-transparent border border-gray rounded-lg md:mt-0 md:ml-4
                     hover:text-gray-900 focus:text-gray-900 hover:bg-emerald-300 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="/addProduct"><FontAwesomeIcon icon={faPlus}/>  Add Product</a>
                    :
                    <a className="px-4 py-2 mt-2 text-md font-semibold bg-transparent border border-gray rounded-lg md:mt-0 md:ml-4
                     hover:text-gray-900 focus:text-gray-900 hover:bg-emerald-300 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="/cart"><FontAwesomeIcon icon={faCartShopping}/>  Cart</a>
                    }
                    <a className="px-4 py-2 mt-2 text-md font-semibold bg-transparent border border-gray rounded-lg md:mt-0 md:ml-4
                     hover:text-gray-900 focus:text-gray-900 hover:bg-emerald-300 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="/products"><FontAwesomeIcon icon={faBoxOpen}/>  Products</a>
                    <Menu placement="bottom-end">
                        <MenuHandler>
                        <a className="px-4 py-2 mr-6 mt-2 text-md font-semibold bg-transparent border-2 border-emerald-500 rounded-lg md:mt-0 md:ml-4 cursor-pointer
                         hover:text-gray-900 focus:text-gray-900 hover:bg-emerald-300 focus:bg-gray-200 focus:outline-none focus:shadow-outline">{data.name}</a>
                        </MenuHandler>
                        <MenuList>
                        <MenuItem><a href="/orders"><FontAwesomeIcon icon={faBagShopping}/>  Your Orders</a></MenuItem>
                        <MenuItem><a href="/profile"><FontAwesomeIcon icon={faUser}/>  Your Profile</a></MenuItem>
                        <MenuItem><a onClick={handleSignOut}><FontAwesomeIcon icon={faRightFromBracket} />  Log Out</a></MenuItem>
                        </MenuList>
                        </Menu>
                    
                    </>) :
                    <a  onClick={ handleClick } className="inline-flex items-center justify-center transition duration-300 px-5 py-3 mr-6 text-base font-medium text-center text-white rounded-lg bg-emerald-400 hover:bg-emerald-600 focus:ring-4 focus:ring-blue-300 dark-mode:focus:ring-blue-900 cursor-pointer">
                        {button}
                    <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </a>
}
                </nav>
            </div>
        </div>
     );
}
 
export default Navbar;