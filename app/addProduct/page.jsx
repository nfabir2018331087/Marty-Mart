'use client';

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Typography, Spinner } from "../mattail.js";
import { useEffect, useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebaseConfig.js";
import axios from "axios";
import Toast from "../providers/toast.jsx";
import { toast } from "react-hot-toast";
import { verifyJwt } from "@/lib/jwt.js";

const AddProduct = () => {
  const [prodName, setProdName] = useState(null);
  const [category, setCategory] = useState(null);
  const [price, setPrice] = useState(null);
  const [desc, setDesc] = useState(null);
  const [img, setImg] = useState(null);
  const [url, setUrl] = useState(null);
  const [supplierId, setSupplierId] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    if(img) {
      const imgRef = ref(storage, `images/${img.name}`);
      uploadBytes(imgRef, img).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          // setUrl(url);
          console.log(prodName, category, price, desc, url, supplierId);
          const res = axios.post('api/addProduct', {prodName, category, price, desc, url, supplierId})
              .then(() => {
                toast.success("Product added successfully");
                // setLoading(false);
                window.location.href = '/home';
              }).catch((error) => {
                // setLoading(false)
                toast.error(error + "happend while adding product")
              })
          }).catch((error) => {
            console.log(error)
            // setLoading(false)
          })
      }).catch((error) => {
        console.log(error);
        // setLoading(false);
      })
    }
    else {
      const res = axios.post('api/addProduct', {prodName, category, price, desc, url, supplierId})
              .then(() => {
                toast.success("Product added successfully");
                // setLoading(false);
                window.location.href = '/home';
              }).catch((error) => {
                // setLoading(false)
                toast.error(error + "happend while adding product")
              })
    }
    
    
  }
  useEffect(() => {
    const token = localStorage.getItem("token");
    if(token){
        const data = verifyJwt(token);
        console.log(data);
        if(data){
            setLoading(false);
            // setData(data);
            setSupplierId(data._id);
        }
        else{ 
            localStorage.removeItem("token");
            return redirect('/signin');
        }
    }
    else return redirect('/signin');
},[]);
if(!loading){
    return (
      <>
      <Toast />
      <Navbar />
        
      <div className="p-20 mx-auto my-20 border border-gray-200 rounded-2xl shadow-lg w-2/3 ">
      <Typography variant="h2" color="blue-gray" className="text-center text-emerald-500">
        Add a Product
      </Typography>
      <Typography color="gray" className="mt-2 font-normal text-center mb-10" >
        Enter your product details here and attach an image of your Product.
      </Typography>
        <form onSubmit={handleSubmit}>
            {/* <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                    <label for="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First name</label>
                    <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required/>
                </div>
                <div>
                    <label for="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last name</label>
                    <input type="text" id="last_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Doe" required/>
                </div>
                <div>
                    <label for="company" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Company</label>
                    <input type="text" id="company" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Flowbite" required/>
                </div>  
                <div>
                    <label for="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone number</label>
                    <input type="tel" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="123-45-678" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required/>
                </div>
                <div>
                    <label for="website" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Website URL</label>
                    <input type="url" id="website" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="flowbite.com" required/>
                </div>
                <div>
                    <label for="visitors" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Unique visitors (per month)</label>
                    <input type="number" id="visitors" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required/>
                </div>
            </div> */}
            <div className="mb-6">
                <label for="product_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Name</label>
                <input type="text" id="product_name" onChange={(e) => {setProdName(e.target.value)}} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter product name" required/>
            </div> 
            <div className="mb-6">               
                <label htmlFor="categories" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                <select id="category" onChange={(e) => {setCategory(e.target.value)}} className="cursor-pointer bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option>Choose a category</option>
                  <option value="Technology">Technology</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Household">Household</option>
                  <option value="Sports">Sports</option>
                  <option value="Others">Others</option>
                </select>
            </div> 
            <div className="mb-6">
                <label for="confirm_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                <input type="number" id="price" onChange={(e) => {setPrice(e.target.value)}} className="h-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter product's price" required/>
            </div> 
            <div className="mb-6">
                <label for="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                <textarea id="message" rows="4" onChange={(e) => {setDesc(e.target.value)}} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write some description about your product here..."></textarea>
            </div>
            <div className="mb-6"> 
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Upload a photo of your product</label>
                <input id="file_input" type="file" accept="image/*" onChange={(e) => {setImg(e.target.files[0])}}   className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"/>
            </div>
            <div className="flex justify-center mt-10">
                <button type="submit" className="text-white bg-emerald-500 hover:bg-emerald-700 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-lg w-full sm:w-auto px-8 py-4 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add Product</button>
            </div>
        </form>
      </div> 

      <Footer />
      </>
      );
          }
          else return (
            <div className="pt-80 flex justify-center"><Spinner color ="green" className="h-14 w-14" />;</div>
        )
}
 
export default AddProduct;