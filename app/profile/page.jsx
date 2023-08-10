'use client';

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { useEffect, useState } from "react";
import { verifyJwt } from "@/lib/jwt.js";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faWallet, faBangladeshiTakaSign, faLock, faFileInvoiceDollar, faBuildingColumns } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Toast from "../providers/toast.jsx";
import { toast } from "react-hot-toast";
import moment from "moment/moment.js";


const Profile = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData ] = useState({});
    const [isAccount, setIsAccount] = useState(false);
    const [open, setOpen] = useState(false);
    const [acNo, setAcNo] = useState(0);
    const [acSecret, setAcSecret] = useState(0);
    const [bank, setBank] = useState("");
    const [balance, setBalance] = useState(0);
    const [amount, setAmount] = useState(0);
    const [account, setAccount] = useState({});
    const [state, setState] = useState("");
    const [acc, setAcc] = useState([]);
    const [transactions, setTransactions] = useState([])

    const handleDialog = () => setOpen((cur) => !cur);
    const handleStateD = () => {
        setState("deposit");
        setOpen((cur) => !cur);
    }
    const handleStateW = () => {
        setState("withdraw");
        setOpen((cur) => !cur);
    }
    const handleAccount = (acNum, acSec, bankN, usrId) => {
        setOpen((cur) => !cur);
        console.log(acNum, acSec, bankN, usrId);
        axios.post('api/addAccount', {acNum, acSec, bankN, usrId})
              .then(() => {
                setIsAccount(true);
                // setAccount(response.data.addedAccount);
                // console.log(response.data.addedAccount);
                toast.success("Your Account Added Successfully");
                window.location.href = '/profile';

              }).catch((error) => {
                toast.error("Something went wrong");
              })

    }
    const handleUpdate = (aId, accountSecret, newBalance) => {
        setOpen((cur) => !cur);
        console.log(aId, accountSecret, newBalance);
        console.log(moment().format("DD/MM/YYYY"));
        console.log(moment().format("HH:mm"));
        if(accountSecret !== account.secret) {
            toast.error("Invalid account secret!");
        }
        else if(newBalance < 0) {
            toast.error("Insufficient Wallet Balance!");
        }
        else {
            axios.post('api/updateBalance', {aId, newBalance})
                .then(() => {
                    const date = moment().format("DD/MM/YYYY");
                    const time = moment().format("HH:mm");
                    const uId = data._id;
                    console.log(date, time, state, amount, newBalance);
                    axios.post('api/transaction', {state, amount, newBalance, date, time, uId})
                        .then(() => {
                            toast.success("Transaction Successful");
                        }).catch((error) => {
                            toast.error("Transaction coudn't be completed");
                        })
                    window.location.href = '/profile';
                }).catch((error) => {
                    toast.error("Something went wrong");
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
                const fetchAccounts = async (id) => {
                    try{
                        const response = await axios.post('api/findAccount', {id});
                        const res = await axios.post('api/findTrx', {id}); 
                        setAcc(response.data.account);
                        setAccount(response.data.account[0]);  
                        setTransactions(res.data.transactions);
                        console.log(transactions);
                        if(acc.length !== 0) setIsAccount(true);
                        setLoading(false);
                        // console.log(response.data.cartItems);
                        console.log(account);
                    }catch(error){
                        console.log(error);
                        setLoading(false);
                    }
                }
                fetchAccounts(data._id);
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
        <h1 className="text-center text-5xl bg-gray-100 py-5 font-semibold tracking-wider">{data.name}'s Dashboard</h1>
        <div className="mx-20">
            <h2 className="mx-auto text-center text-3xl w-fit border-2 font-bold border-gray-200 border-b-emerald-400 mt-10 bg-gray-100 p-5 rounded-lg text-emerald-400"><FontAwesomeIcon icon={faUser}/> Your Profile Information</h2>
            <div className="flex justify-around">
            <div className="mt-10">
                <p className="text-xl font-semibold py-5">Name: <span className="text-3xl ml-5 border border-gray-200 p-2 rounded-md bg-gray-100">{data.name}</span></p>
                <p className="text-xl font-semibold py-5">Email: <span className="ml-5 border border-gray-200 p-2 rounded-md bg-gray-100">{data.email}</span></p>
                <p className="text-md font-semibold py-5">You are a <span className="text-emerald-400 border border-gray-200 p-2 rounded-md bg-gray-100">{data.type}</span></p>
            </div>
            <img className="rounded-full h-56 w-56 my-5" src="AnonymousProfilePic.jpg" alt="profile pic" />
            </div>
        </div>
        { !isAccount && acc.length === 0 ?
        <div>
        <div className="flex justify-center">
            <div className="my-28">
                <p className="text-center pb-2">Haven't set up your wallet yet?</p>
                <button onClick={handleDialog} className=" text-lg px-5 py-3 border-2 border-emerald-400 rounded-md hover:bg-emerald-400 hover:shadow-xl transition duration-300 hover:text-white">Enter Your Account Information <FontAwesomeIcon icon={faFileInvoiceDollar}/></button>
            </div>
        </div>
        <Dialog size="md" open={open} handler={handleDialog} className="bg-transparent shadow-none">
            <Card className="mx-auto w-full max-w-[24rem]">
                <CardHeader variant="gradient" className="mb-4 grid h-28 place-items-center bg-emerald-400">
                    <Typography variant="h3" color="white">
                        Enter Account Details
                    </Typography>
                </CardHeader>
                <CardBody className="flex flex-col gap-4">
                    <Input label="Account No" size="lg" onChange={(e) => setAcNo(e.target.value)}/>
                    <Input label="Account Secret" size="lg" onChange={(e) => setAcSecret(e.target.value)}/>
                    <div className="w-full">
                        <Select required label="Select your Bank" onChange={(e) => setBank(e)}>
                            <Option value="Sonali Bank Ltd">Sonali Bank Ltd</Option>
                            <Option value="Dutch Bangla Bank Ltd">Dutch Bangla Bank Ltd</Option>
                            <Option value="Prime Bank Ltd">Prime Bank Ltd</Option>
                            <Option value="BRACK Bank Ltd">BRACK Bank Ltd</Option>
                            <Option value="Agrani Bank Ltd">Agrani Bank Ltd</Option>
                            <Option value="Islami Bank Ltd">Islami Bank Ltd</Option>
                            <Option value="City Bank Ltd">City Bank Ltd</Option>
                        </Select>
                    </div>
                </CardBody>
                <CardFooter className="pt-0">
                    <Button className="bg-emerald-400" onClick={() => handleAccount(acNo, acSecret, bank, data._id)} fullWidth>
                        Save
                    </Button>
                </CardFooter>
            </Card>
        </Dialog>
        </div>
        :
        <div>
        <div className="mx-20 mt-28">
            <h2 className="mx-auto text-center text-3xl w-fit border-2 font-bold border-gray-200 border-b-emerald-400 mt-10 bg-gray-100 p-5 rounded-lg text-emerald-400"><FontAwesomeIcon icon={faWallet}/> Your Wallet Information</h2>
            <div className="flex justify-around">
            <div className="mt-10">
                <p className="text-lg font-semibold py-5">Account Number: <span className="ml-5 border border-gray-200 p-2 rounded-md bg-gray-100"><FontAwesomeIcon icon={faFileInvoiceDollar}/> {account?.accountNo}</span></p>
                <p className="text-lg font-semibold py-5">Account Secret: <span className="ml-5 border border-gray-200 p-2 rounded-md bg-gray-100"><FontAwesomeIcon icon={faLock}/> {account?.secret}</span></p>
                <p className="text-lg font-semibold py-5">Bank Name: <span className="ml-5 border border-gray-200 p-2 rounded-md bg-gray-100"><FontAwesomeIcon icon={faBuildingColumns}/> {account?.bank}</span></p>
            </div>
            <div className="text-center border-[6px] border-emerald-400 rounded-full px-10 py-24 m-5">Your Account Balance: <p className="font-bold text-lg"><FontAwesomeIcon icon={faBangladeshiTakaSign}/> {account?.balance} BDT</p></div>
            </div>
            <div className="mx-96 my-10 flex justify-around">
                <button onClick={handleStateD} className="px-5 py-3 border-2 border-emerald-400 rounded-md hover:bg-emerald-400 hover:shadow-xl transition duration-200 hover:text-white">Deposit</button>
                <button onClick={handleStateW} className="px-5 py-3 border-2 border-emerald-400 rounded-md hover:bg-emerald-400 hover:shadow-xl transition duration-200 hover:text-white">Withdraw</button>
            </div>
        </div>
        { state === "deposit" ?
        <Dialog size="md" open={open} handler={handleDialog} className="bg-transparent shadow-none">
            <Card className="mx-auto w-full max-w-[24rem]">
                <CardHeader variant="gradient" className="mb-4 grid h-28 place-items-center bg-emerald-400">
                    <Typography variant="h3" color="white">
                        Add Money
                    </Typography>
                </CardHeader>
                <CardBody className="flex flex-col gap-4">
                    <Input label="Amount of Money" type="number" className="focus:ring-0" size="lg" onChange={(e) => {
                        setBalance(account.balance + +e.target.value);
                        setAmount(e.target.value);
                    }
                    }/>
                    <Input label="Account Secret" size="lg" onChange={(e) => setAcSecret(e.target.value)}/>
                </CardBody>
                <CardFooter className="pt-0">
                    <Button className="bg-emerald-400" onClick={() => handleUpdate(account._id, acSecret, balance)} fullWidth>
                        Deposit
                    </Button>
                </CardFooter>
            </Card>
        </Dialog>
        :
        <Dialog size="md" open={open} handler={handleDialog} className="bg-transparent shadow-none">
            <Card className="mx-auto w-full max-w-[24rem]">
                <CardHeader variant="gradient" className="mb-4 grid h-28 place-items-center bg-emerald-400">
                    <Typography variant="h3" color="white">
                        Withdraw Money
                    </Typography>
                </CardHeader>
                <CardBody className="flex flex-col gap-4">
                    <Input label="Amount of Money" type="number" className="focus:ring-0" size="lg" onChange={(e) => {
                        setBalance(account.balance - e.target.value);
                        setAmount(e.target.value);
                    }
                    }/>
                    <Input label="Account Secret" size="lg" onChange={(e) => setAcSecret(e.target.value)}/>
                </CardBody>
                <CardFooter className="pt-0">
                    <Button className="bg-emerald-400" onClick={() => handleUpdate(account._id, acSecret, balance)} fullWidth>
                        Withdraw
                    </Button>
                </CardFooter>
            </Card>
        </Dialog>
        }
        <h1 className="mx-auto text-emerald-400 text-center text-3xl w-fit border-2 font-bold border-gray-200 border-b-emerald-400 mt-20 bg-gray-100 p-5 rounded-lg"> Your Transaction History</h1>
        <div className="m-20">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-500 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Transaction ID
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Transaction Type
                            </th>
                            <th scope="col" className="px-6 py-3"> 
                                Amount
                            </th>
                            <th scope="col" className="px-6 py-3">
                                New Balance
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Time & Date
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        { transactions && transactions.length > 0 ? transactions.map((trx) => (
                        <tr key={trx._id} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                            {/* <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {order.itemName}
                            </th> */}
                            <td className="px-6 py-4">
                                {trx?._id}
                            </td>
                            <td className="px-6 py-4">
                               {trx?.type}
                            </td>
                            <td className="px-6 py-4">
                                <FontAwesomeIcon icon={faBangladeshiTakaSign} /> {trx?.amount}
                            </td>
                            <td className="px-6 py-4">
                            <FontAwesomeIcon icon={faBangladeshiTakaSign} /> {trx?.currentBalance}
                            </td>
                            <td className="px-6 py-4">
                                {trx?.date} at {trx?.time}
                            </td>  
                        </tr>
                        ))
                        : <div className="mx-auto my-5 text-2xl text-center font-semibold">No Transaction History!</div>
                        }
                    </tbody>
                </table>
            </div> 
            </div>
        </div>
        }

        <Footer />
        </>
     );
    }
    else return (
        <div className="pt-80 flex justify-center"><Spinner color ="green" className="h-14 w-14" />;</div>
    )
}
 
export default Profile;