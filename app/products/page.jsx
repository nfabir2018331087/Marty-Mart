'use client';

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faBangladeshiTakaSign } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { Spinner } from "@material-tailwind/react";
import { verifyJwt } from "@/lib/jwt";
import Toast from "../providers/toast.jsx";
import { toast } from "react-hot-toast";

const Products = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});

    const addToCart = (img, pname, category, pprice, supplierId, uid, prodId) => {
        console.log(img, pname, category, pprice, uid, supplierId);
        if(data.type === "Customer"){
        const res = axios.post('api/addToCart', {pname, category, pprice, img, uid, supplierId, prodId})
              .then(() => {
                toast.success(`Added ${pname} to the cart`);
              }).catch((error) => {
                toast.error("Something went wrong");
              })
            }
        else toast.error("Supplier can't buy products. Create a customer account to buy.");
    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        if(token){
            const data = verifyJwt(token);
            console.log(data);
            if(data){
                // setLoading(false);
                setData(data);
                const fetchProducts = async () => {
                    try{
                        const response = await axios.get('/api/product');
                        setProducts(response.data.products);
                        console.log(products);
                        setLoading(false);
                    } catch(error) {
                        console.error(error);
                    }
                }
                fetchProducts();
            }
            else{ 
                localStorage.removeItem("token");
                return redirect('/signin'); 
            }
        }
        else return redirect('/signin');  
        
    }, []);
    
    if(!loading){
    return (
        <> 
        <Toast />
        <Navbar />
        <div className="mt-10 pl-10 ">
            <h1 className="w-auto text-4xl font-semibold">All the available Products:</h1>
        </div>
        <div className="grid grid-cols-4">
        { products && products.length > 0 ? (products.map((prod) => (
        <div key = {prod._id} className="mx-auto my-11 w-80 border border-gray-200 transform overflow-hidden rounded-lg bg-white dark:bg-slate-800 shadow-md duration-300 hover:scale-105 hover:shadow-lg">
            <img className="h-48 w-full object-cover object-center" src={prod.image} alt="Product Image" />
            <div className="p-4">
                <h2 className="mb-2 text-lg font-semibold dark:text-white text-gray-900">{prod.name}</h2>
                <p className="h-20 mb-2 text-base dark:text-gray-300 text-gray-700 text-ellipsis overflow-hidden ">{prod.description}</p>
                    <div className="flex items-center">
                        <p className="mr-2 text-lg font-semibold text-gray-900 dark:text-white"><FontAwesomeIcon icon={faBangladeshiTakaSign} /> {prod.price}</p>
                        {/* <p className="text-base  font-medium text-gray-500 line-through dark:text-gray-300">$25.00</p> */}
                        <button onClick={() => addToCart(prod.image, prod.name, prod.category, prod.price, prod.supplierId, data._id, prod._id)} className="ml-auto text-base font-medium text-white bg-emerald-400 p-2 rounded-lg hover:bg-emerald-600"><FontAwesomeIcon icon={faCartPlus} /> Add to cart</button>
                    </div>
            </div>
        </div>  
        )))
    : <div>Loading...</div> 
    } 
        </div>
        <Footer /> 
        </>
     );
    }
    else return (
        <div className="pt-80 flex justify-center"><Spinner color ="green" className="h-14 w-14" />;</div>
    )
}
 
export default Products;