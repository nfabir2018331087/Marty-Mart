import { NextResponse } from 'next/server';
import db from '@/lib/db.js';
import CartItem from '@/models/CartItem.js';

export async function POST(request) {
  await db();

  const {pname, category, pprice, img, uid, supplierId, prodId} = await request.json();
  console.log(pname, category, pprice, uid, img, supplierId, prodId);
  try {
    const addedToCart = await CartItem.create({name: pname, category: category, price: pprice, image: img, userId: uid, supplierId: supplierId, productId: prodId});

    return NextResponse.json(
      {message: "OK", addedToCart},
      { status: 200}
    )
  } catch (error) {
    return NextResponse.json(
      { message: "Error", error},
      { status: 500}
      )
  }
  
}