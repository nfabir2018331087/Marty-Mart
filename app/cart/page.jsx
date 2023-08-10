'use client';


import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { faTrashCan, faBangladeshiTakaSign } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { verifyJwt } from "@/lib/jwt";
import { useState, useEffect } from "react";
import { 
  Spinner, 
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
  Select,
  Option } from "@material-tailwind/react";
import axios from "axios";
import Toast from "../providers/toast.jsx";
import { toast } from "react-hot-toast";
import moment from "moment/moment.js";


const Cart = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});
    const [count, setCount] = useState(1);
    let total = 0;
    const [countWithId, setCountWithId] = useState(new Map());
    const [open, setOpen] = useState(false);
    const [area, setArea] = useState("");
    const [city, setCity] = useState("");
    const [contact, setContact] = useState("");
    const [secret, setSecret] = useState("");
    const [account, setAccount] = useState({});

    const handleDialog = () => setOpen((cur) => !cur);

    const handlePlaceOrder = (areaN, cityN, contactI, secret) => {
      console.log(areaN, cityN, contactI, secret);
      setOpen((cur) => !cur);
      if(secret !== account.secret){
        toast.error("Invalid Account Secret!");
      }
      else if(total > account.balance) {
        toast.error("Insufficient Wallet Balance!");
      }
      else {
        items.map((item) => {
          let itemN = item.name;
          let itemQ = parseInt(countWithId.get(item._id)) || 1;
          let itemTotPrice = parseInt(item.price * itemQ);
          let sel = item.supplierId;
          let buy = item.userId;
          let aId = account._id;
          let newBalance = account.balance - total;
          let stat = "Ordered";
          console.log(itemN, itemQ, itemTotPrice, areaN, cityN, contactI, sel, buy, stat, newBalance);
          axios.post('api/placeOrder', {itemN, itemQ, itemTotPrice, areaN, cityN, contactI, sel, buy, stat})
              .then(() => {
                toast.success("Order Placed Successfully");
                deleteItem(item._id, item.name);
                axios.post('api/updateBalance', {aId, newBalance})
                .then(() => {
                    const state = "Item Purchase"
                    const date = moment().format("DD/MM/YYYY");
                    const time = moment().format("HH:mm");
                    const uId = data._id;
                    const amount = total;
                    console.log(date, time, state, amount, newBalance);
                    axios.post('api/transaction', {state, amount, newBalance, date, time, uId})
                        .then(() => {
                            toast.success("Transaction Successful");
                        }).catch((error) => {
                            toast.error("Transaction coudn't be completed");
                        })
                    window.location.href = '/cart';
                }).catch((error) => {
                    toast.error("Something went wrong");
                })
              }).catch((error) => {
                toast.error("Something went wrong");
              })
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
                setData(data);
                const fetchCartItems = async (id) => {
                    try{
                        const response = await axios.post('api/cartItems', {id});
                        setItems(response.data.cartItems);
                        const response2 = await axios.post('api/findAccount', {id});
                        setAccount(response2.data.account[0]);
                        // console.log(response.data.cartItems);
                        console.log(items);
                        console.log(account)
                    }catch(error){
                        console.log(error);
                    }
                }
                fetchCartItems(data._id);
            }
            else{ 
                localStorage.removeItem("token");
                return redirect('/signin');
            }
        }
        else return redirect('/signin');
        
    }, []);
    const handleCountChange = (iId, nCount) => {
      // setCount(nCount);
      setCountWithId((prevCountWithId) => new Map(prevCountWithId).set(iId, nCount));
    } 
    
    const deleteItem = (itemId, itemName) => {
      console.log(itemId, itemName);
      axios.post('api/deleteItem', {itemId})
            .then(() => {
              toast.success(`Removed ${itemName} from your cart`);
              window.location.href = '/cart';
            }).catch((error) => {
              toast.error("Something went wrong");
            })
  }

    items.map((item) => {
      total += item.price * (parseInt(countWithId.get(item._id)) || 1);
    })

    if(!loading){
    return ( 
        <>
        <Toast />
        <Navbar />
        <div className="h-5/6 bg-gray-100 pt-20">
        <h1 className="mx-auto text-emerald-400 text-center text-3xl w-fit border-2 font-bold border-gray-200 border-b-emerald-400 mb-10 bg-gray-100 p-5 rounded-lg"> Your Cart</h1>
        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
          <div className="rounded-lg md:w-2/3">
          { items && items.length > 0 ? (items.map((item) => (
            // countWithId.set(item._id, 1); 
            
            <div key={item._id} className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start transition duration-200 hover:scale-105 ">
              <img className="mt-5 h-20 w-28 rounded-md" src={item.image} />
              <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                <div className="mt-5 sm:mt-0">
                  <h2 className="text-lg font-bold text-gray-900">{item.name}</h2>
                  <p className="mt-1 text-xs text-gray-700">Category: {item.category}</p>
                  <p onClick={() => deleteItem(item._id, item.name)} className="py-2 px-4 mt-5 font-bold cursor-pointer bg-red-600 w-fit rounded-md text-white hover:bg-red-700">
                  <FontAwesomeIcon icon={faTrashCan} />
                  </p>
                </div>
                <div className="mt-4 flex justify-center sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                  <div className="flex items-center border-gray-100 pl-5">
                    {/* <span onClick={handleDecrement} className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-emerald-400 hover:text-white"> - </span> */}
                    <input onChange={(e) => handleCountChange(item._id, e.target.value)} className="h-8 w-20 border-2 border-gray-200 bg-white text-center text-xs outline-none focus:border-emerald-400 focus:ring-0 rounded-md" defaultValue = "1" type="number" min="1"/>
                    {/* <span onClick={handleIncrement} className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-200 hover:bg-emerald-400 hover:text-white"> + </span> */}
                  </div>
                  <div className="flex items-center justify-center space-x-4">
                    <p className="text-lg font-semibold"><FontAwesomeIcon icon={faBangladeshiTakaSign} /> {item.price}</p>  
                  </div>
                </div>
              </div>
            </div>
          ))): <div className="mt-20 text-xl text-center font-semibold">No products on your cart!</div>
          } 
          </div>
          <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
          { items && items.length > 0 ? (items.map((item) => (
            <div key={item._id} className="mb-2 flex justify-between">
            <p className="text-gray-700">{item.name} x{countWithId.get(item._id) || 1}</p>
            <p className="text-gray-700"><FontAwesomeIcon icon={faBangladeshiTakaSign} /> {item.price * (parseInt(countWithId.get(item._id)) || 1)}</p>
          </div>
          ))):
            <div className="mb-2 flex justify-between">
              <p className="text-gray-700">No Items</p>
              <p className="text-gray-700"><FontAwesomeIcon icon={faBangladeshiTakaSign} /> 0.0</p>
            </div>
          }
            {/* <div className="flex justify-between">
              <p className="text-gray-700">Shipping</p>
              <p className="text-gray-700">$4.99</p>
            </div> */}
            <hr className="my-4" />
            <div className="flex justify-between">
              <p className="text-lg font-bold">Total</p>
              <div className="">
                <p className="mb-1 text-lg font-bold"><FontAwesomeIcon icon={faBangladeshiTakaSign} /> {total} BDT</p>
                <p className="text-sm text-gray-700 flex justify-end">(including VAT)</p>
              </div>
            </div>
            <div>
            <button onClick={handleDialog} className="mt-6 w-full rounded-md bg-emerald-400 py-1.5 font-medium text-blue-50 hover:bg-emerald-600">
              Check Out
            </button>
            <Dialog size="md" open={open} handler={handleDialog} className="bg-transparent shadow-none">
                <Card className="mx-auto w-full max-w-[24rem]">
                    <CardHeader variant="gradient" className="mb-4 grid h-28 place-items-center bg-emerald-400">
                        <Typography variant="h3" color="white">
                            Address & Payment
                        </Typography>
                    </CardHeader>
                    <CardBody className="flex flex-col gap-4">
                        <Typography variant="h4" color="black">
                            Address & Contact Info
                        </Typography>
                        <Input label="Area" size="lg" onChange={(e) => setArea(e.target.value)}/> 
                        <Input label="City" size="lg" onChange={(e) => setCity(e.target.value)}/>
                        <Input label="Contact No" size="lg" onChange={(e) => setContact(e.target.value)}/>
                        <Typography variant="h4" color="black">
                            Account Info
                        </Typography>
                        <Input label="Account Secret" size="lg" onChange={(e) => setSecret(e.target.value)} />
                        <Typography variant="paragraph" color="black">
                            <span className="font-semibold"><FontAwesomeIcon icon={faBangladeshiTakaSign} />{total}</span> will be deducted from your wallet.
                        </Typography>
                    </CardBody>
                    <CardFooter className="pt-0">
                        <Button className="bg-emerald-400" onClick={() => handlePlaceOrder(area, city, contact, secret)} fullWidth>
                            Place Order
                        </Button>
                    </CardFooter>
                </Card>
            </Dialog>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center bg-gray-100">
        <button onClick={() => window.location.href = '/products'} className="mx-auto my-32 text-lg px-5 py-3 border-2 border-emerald-400 rounded-md hover:bg-emerald-400 hover:shadow-xl transition duration-300 hover:text-white hover:scale-105">Explore More Products</button>
      </div>
      <Footer />
        </>
     );
    }
    else return (
        <div className="pt-80 flex justify-center"><Spinner color ="green" className="h-14 w-14" />;</div>
    )
}
 
export default Cart;