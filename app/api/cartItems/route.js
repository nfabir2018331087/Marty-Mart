import { NextResponse } from 'next/server';
import CartItem from "@/models/CartItem.js";
import db from "@/lib/db";

export async function POST(request) {  
  await db();
  try {
    // await main();
    const { id } = await request.json();
    const cartItems = await CartItem.find({userId: id});
    console.log(cartItems);
    return NextResponse.json(
      {message: "OK", cartItems},
      { status: 200}
    )
  } catch (error) {
    return NextResponse.json(
      { message: "Error", error},
      { status: 500}
      )
  } 
}