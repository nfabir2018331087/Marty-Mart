import { NextResponse } from 'next/server';
import db from '@/lib/db.js';
import CartItem from '@/models/CartItem.js';

export async function POST(request) {
  await db();

  const { itemId } = await request.json();
  console.log(itemId);
  try {
    const newCart = await CartItem.findByIdAndRemove(itemId);
    return NextResponse.json(
      {message: "OK", newCart},
      { status: 200}
    )
  } catch (error) {
    return NextResponse.json(
      { message: "Error", error},
      { status: 500}
      )
  }
  
}