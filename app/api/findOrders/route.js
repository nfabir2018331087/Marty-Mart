import { NextResponse } from 'next/server';
import db from "@/lib/db";
import Order from '@/models/Order';

export async function POST(request) {  
  await db();
  try {
    // await main();
    const { id, type } = await request.json();
    let orders = [];
    if(type === "Customer"){
      orders = await Order.find({buyer: id}).populate("seller");
    }
    else {
      orders = await Order.find({seller: id});
    }
    console.log(orders);
    return NextResponse.json(
      {message: "OK", orders},
      { status: 200}
    )
  } catch (error) {
    return NextResponse.json(
      { message: "Error", error},
      { status: 500}
      )
  } 
}