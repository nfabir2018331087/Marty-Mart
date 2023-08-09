import { NextResponse } from 'next/server';
import db from "@/lib/db";
import Order from '@/models/Order.js';

export async function POST(request) {  
  await db();
  try {
    const { oId, newStat } = await request.json();
    const updatedOrder = await Order.findByIdAndUpdate(oId, {orderStat: newStat}, {new: true});
    console.log(updatedOrder);
    return NextResponse.json(
      {message: "OK", updatedOrder},
      { status: 200}
    )
  } catch (error) {
    return NextResponse.json(
      { message: "Error", error},
      { status: 500}
      )
  } 

}