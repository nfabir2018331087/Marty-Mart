"use client";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { useEffect, useState } from "react";
import { verifyJwt } from "@/lib/jwt";
import axios from "axios";
import { faTrashCan, faBangladeshiTakaSign } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Spinner } from "@material-tailwind/react";
import moment from "moment/moment.js";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});

    const handleAction = (action, id, price, oId) => {
        let newStat = "";
        if(action === "a") {
            newStat = "Shipped";
        }
        else if(action === "s") {
            newStat = "Delivered";
            axios.post('api/findAccount', {id})
                .then((response) => {
                let account = response.data.account[0];
                console.log(account);
                if(account){
                let aId = account._id;
                let newBalance = account.balance + +price;
                console.log(aId, newBalance);
                axios.post('api/updateBalance', {aId, newBalance})
                .then(() => {
                    const state = "Item Sell";
                    const date = moment().format("DD/MM/YYYY");
                    const time = moment().format("HH:mm");
                    const uId = id;
                    const amount = price;
                    console.log(date, time, state, amount, newBalance);
                    axios.post('api/transaction', {state, amount, newBalance, date, time, uId})
                        .then(() => {
                            toast.success("Transaction Successful");
                        }).catch((error) => {
                            toast.error("Transaction coudn't be completed");
                        })
                }).catch((error) => {
                    console.log(error);
                })
                }
                }) 
                .catch((error) => console.log(error))      
        }
        else { 
            newStat = "Cancelled";
            axios.post('api/findAccount', {id})
                .then((response) => {
                let account = response.data.account[0];
                console.log(account);
                if(account){
                let aId = account._id;
                let newBalance = account.balance + +price;
                console.log(aId, newBalance);
                axios.post('api/updateBalance', {aId, newBalance})
                .then(() => {
                    const state = "Order Cancel";
                    const date = moment().format("DD/MM/YYYY");
                    const time = moment().format("HH:mm");
                    const uId = id;
                    const amount = price;
                    console.log(date, time, state, amount, newBalance);
                    axios.post('api/transaction', {state, amount, newBalance, date, time, uId})
                        .then(() => {
                            toast.success("Transaction Successful");
                        }).catch((error) => {
                            toast.error("Transaction coudn't be completed");
                        })
                }).catch((error) => {
                    console.log(error); 
                })
                } 
                })
                .catch((error) => console.log(error))

        }
        axios.post('api/updateStat', {oId, newStat})
            .then(() => {
                window.location.href = '/orders';
            }).catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        const token = localStorage.getItem("token");  
        if(token){
            const data = verifyJwt(token);
            console.log(data);
            if(data){
                setLoading(false);
                setData(data);
                const fetchOrders = async (id, type) => {
                    try{
                        const response = await axios.post('api/findOrders', {id, type});
                        setOrders(response.data.orders); 
                        // ord = response.data.orders;
                        console.log(orders);
                        // setLoading(false); 
                    } catch(error) {
                        console.error(error);
                    }
                }
                fetchOrders(data._id, data.type);
            }
            else{ 
                localStorage.removeItem("token");
                return redirect('/signin');
            }
        }
        else return redirect('/signin');
        
    }, []);

    

    if(!loading) {
    return ( 
        <>
        <Navbar />
        <h1 className="mx-auto text-emerald-400 text-center text-3xl w-fit border-2 font-bold border-gray-200 border-b-emerald-400 mt-10 bg-gray-100 p-5 rounded-lg"> Your Order History</h1>
        <div className="m-10">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-500 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Product name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Quantity
                            </th>
                            {data.type ==="Customer" ?
                            <th scope="col" className="px-6 py-3"> 
                                Seller
                            </th>
                            :
                            <th scope="col" className="px-6 py-3">
                                Address
                            </th>
                            }
                            <th scope="col" className="px-6 py-3">
                                Contact
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Price
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        { orders && orders.length > 0 ? orders.map((order) => (
                        <tr key={order._id} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {order.itemName}
                            </th>
                            <td className="px-6 py-4">
                                {order.itemQty}
                            </td>
                            { data.type === "Customer"
                            ?
                            <td className="px-6 py-4">
                               {order.seller.name} 
                            </td>
                            :
                            <td className="px-6 py-4">
                                {order.area},{order.city}
                            </td>
                            }
                            <td className="px-6 py-4">
                                {data.type === "Customer" ? order.seller.email : order.contact}
                            </td>
                            <td className="px-6 py-4">
                                <FontAwesomeIcon icon={faBangladeshiTakaSign} />{order.orderPrice} 
                            </td>
                            <td className="px-6 py-4">
                                {order.orderStat}
                            </td>
                            { data.type === "Customer"
                            ?
                            <td className="px-6 py-4">
                                { order.orderStat === "Ordered"
                                ?
                                <button onClick={() => handleAction("r", order.buyer, order.orderPrice, order._id)} className="py-2 px-4 font-bold cursor-pointer bg-red-600 w-fit rounded-md text-white hover:bg-red-700">Cancel Order</button>
                                :
                                order.orderStat === "Shipped"
                                ?
                                <button onClick={() => handleAction("s", order.seller, order.orderPrice, order._id)} className="py-2 px-4 font-bold cursor-pointer bg-emerald-500 w-fit rounded-md text-white hover:bg-emerald-700">Recieved?</button>
                                :
                                <div className="font-bold">None</div>
                                }
                            </td> 
                            :
                            <td className="px-6 py-4">
                                { order.orderStat === "Ordered"
                                ?
                                <div className="flex justify-around">
                                <button onClick={() => handleAction("a", order.seller, order.orderPrice, order._id)} className="py-2 px-4 font-bold cursor-pointer bg-emerald-500 w-fit rounded-md text-white hover:bg-emerald-700">Accept & Ship</button>
                                <button onClick={() => handleAction("r", order.buyer, order.orderPrice, order._id)} className="py-2 px-4 font-bold cursor-pointer bg-red-600 w-fit rounded-md text-white hover:bg-red-700">Reject</button>
                                </div>
                                :
                                <div className="font-semibold">None</div> 
                                }
                            </td>
                            }
                        </tr>
                        ))
                        : <div className="mx-auto my-5 text-2xl text-center font-semibold">No order history!</div>
                        }
                    </tbody>
                </table>
            </div> 
            <div className="flex justify-center">
                <button onClick={() => window.location.href = '/products'} className="mx-auto my-32 text-lg px-5 py-3 border-2 border-emerald-400 rounded-md hover:bg-emerald-400 hover:shadow-xl transition duration-300 hover:text-white hover:scale-105">Explore More Products</button>
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
 
export default Orders;