'use client';
import Navbar from "@/components/navbar.jsx";
import {
    Card,
    Input,
    Button,
    Typography,
    Tab,
    Tabs,
    TabsHeader,
    TabPanel,
    TabsBody,
    Spinner,
} from "../mattail.js";

import Footer from "@/components/footer.jsx";
import { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation.js";
import Toast from "../providers/toast.jsx";
import { toast } from "react-hot-toast";
import { verifyJwt } from "@/lib/jwt.js";

export default function SignIn() {
    const button = "Register";
    const url = '/signup';

    const { push } = useRouter();
    
    const [type, setType] = useState('customer');
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if(token){
            const data = verifyJwt(token);
            if(data){
                return redirect('/home');
            }
        }
        else setLoading(false);
    },[]);

    const handleCustomerSubmit = async (e) => {
        e.preventDefault();
        setType('Customer');
        // console.log(type, email, password);
        try{
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/api/login`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  email: email,
                  password: password,
                }),
              });
            //   console.log(await res.json());
              const data = await res.json();
              const token = data.result.token;
              localStorage.setItem("token",token);
              toast.success("Logged In Successfully");
              push('/home');
            }catch(error){
                console.log(error);
                toast.error("Invalid Credentials");
            }
    }
    const handleSupplierSubmit = async (e) => {
        e.preventDefault();
        setType("Supplier");
        try{
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/api/login`, {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      email: email,
                      password: password,
                    }),
                  });
                //   console.log(await res.json());
                  const data = await res.json();
                  const token = data.result.token;
                  localStorage.setItem("token",token);
                  toast.success("Logged In Successfully");
                  push('/home');
                }catch(error){
                    console.log(error);
                    toast.error("Invalid Credentials");
                }
    }
    if(!loading){
    return (
        <>
        <Toast />
        <Navbar button={button} url = {url}/>
        <div className="flex justify-center my-28">
            <Card color="transparent" shadow={false} className="border border-slate p-5 shadow-md">
                <Typography variant="h3" color="blue-gray" className="text-center text-emerald-400 mb-5">
                    Sign In
                </Typography>
                <Tabs value={type} className="overflow-visible">
                    <TabsHeader className="relative z-0 ">
                        <Tab value="customer" onClick={() => setType("customer")}>
                            As a Customer
                        </Tab>
                        <Tab value="supplier" onClick={() => setType("supplier")}>
                            As a Supplier
                        </Tab>
                    </TabsHeader>
                    <TabsBody className="!overflow-x-hidden !overflow-y-visible"
                        animate={{
                            initial: {
                                x: type === "customer" ? 400 : -400,
                            },
                            mount: {
                                x: 0,
                            },
                            unmount: {
                                x: type === "customer" ? 400 : -400,
                            },
                        }} >
        <TabPanel value="customer" className="p-0">
            <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleCustomerSubmit}>
                <div className="mb-4 flex flex-col gap-6">
                    <Input size="lg" label="Email" type = "email" className="focus:ring-0" onChange={(e) => {setEmail(e.target.value)}}/>
                    <Input size="lg" label="Password" type = "password" className="focus:ring-0" onChange={(e) => {setPassword(e.target.value)}}/>
                </div>
            <Button type="submit" className="mt-6 bg-emerald-400 hover:bg-emerald-500 transition duration-300" fullWidth>
                Customer Login
            </Button>
            <Typography color="gray" className="mt-4 text-center font-normal">
                Do not have an account?{" "}
            <a href="/signup" className="font-medium text-emerald-300 transition-colors hover:text-emerald-500">
                Register
            </a>
            </Typography>
            </form>
        </TabPanel>
        <TabPanel value="supplier" className="p-0">
            <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleSupplierSubmit}>
                <div className="mb-4 flex flex-col gap-6">
                    <Input size="lg" label="Email" type = "email" className="focus:ring-0" onChange={(e) => {setEmail(e.target.value)}}/>
                    <Input size="lg" label="Password" type = "password" className="focus:ring-0" onChange={(e) => {setPassword(e.target.value)}}/>
                </div>
            <Button type="submit" className="mt-6 bg-emerald-400 hover:bg-emerald-500 transition duration-300" fullWidth>
                Supplier Login
            </Button>
            <Typography color="gray" className="mt-4 text-center font-normal">
                Do not have an account?{" "}
            <a href="/signup" className="font-medium text-emerald-300 transition-colors hover:text-emerald-500">
                Register
            </a>
            </Typography>
            </form>
        </TabPanel>
        </TabsBody>
        </Tabs>
        </Card>
        </div>
        <Footer name={"fixed"}/>
        </>
        );
                    }
                    else return (
                        <div className="pt-80 flex justify-center"><Spinner color ="green" className="h-14 w-14" />;</div>
                    )
    }
    
    
