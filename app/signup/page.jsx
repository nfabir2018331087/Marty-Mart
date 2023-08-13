'use client';

import Navbar from "@/components/navbar.jsx";
import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
    Select,
    Option,
    Spinner,
  } from "../mattail.js";

import Footer from "@/components/footer.jsx";
import axios from "axios";
import { useEffect, useState } from "react";
import Toast from "../providers/toast.jsx";
import { toast } from "react-hot-toast";
import { redirect, useRouter } from "next/navigation.js";
import { verifyJwt } from "@/lib/jwt.js";


export default function SignUp() {
  const button = "Sign In";
  const url = '/signin';
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [type, setType] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  const { push } = useRouter();

  const handleSubmit =  async (e) => {
    e.preventDefault();
    // console.log(name, email, password, type);
    const res = await axios.post('/api/register', {name, email, password, type
    }).then(() => {
      setIsSuccess(true);
      toast.success("Registered succcessfully!");
    }).catch((error) => {
      toast.error("Something went wrong!");
    })
  }

  useEffect(() => {
    if (isSuccess) push('/signin');
  },[isSuccess]);

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
  if(!loading){
  return (
      <>
      <Toast />
      <Navbar button={button} url={url}/>
      <div className="flex justify-center my-20">
    <Card color="transparent" shadow={false} className="border border-slate p-5 shadow-md">
      <Typography variant="h3" color="blue-gray" className="text-center text-emerald-500">
        Sign Up
      </Typography>
      <Typography color="gray" className="mt-1 font-normal text-center" >
        Enter your details to register.
      </Typography>
      <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleSubmit}>
        <div className="mb-4 flex flex-col gap-6">
          <Input required size="lg" label="Name" onChange={(e) => {setName(e.target.value)}}/>
          <Input required size="lg" label="Email" type = "email" className="focus:ring-0" onChange={(e) => {setEmail(e.target.value)}}/>
          <Input required size="lg" label="Password" type = "password" className="focus:ring-0" onChange={(e) => {setPassword(e.target.value)}}/>
        </div>
        <div className="w-full">
          <Select required label="Select Designation" onChange={(e) => {setType(e)}}>
              <Option value="Supplier">Supplier</Option>
              <Option value="Customer">Customer</Option>
          </Select>
        </div>
        <Button type="submit" className="mt-6 bg-emerald-400 hover:bg-emerald-500 transition duration-300" fullWidth>
          Register
        </Button>
        <Typography color="gray" className="mt-4 text-center font-normal">
          Already have an account?{" "}
          <a
            href="/signin"
            className="font-medium text-emerald-300 transition-colors hover:text-emerald-500"
          >
            Sign In
          </a>
        </Typography>
      </form>
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
 
// export default function SignUp () {
//     return(
//         <>
//         <h1>This is a signup page!</h1>
//         </>
//     )
// }
