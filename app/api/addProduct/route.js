import { NextResponse } from 'next/server';
import db from '@/lib/db.js';
import Product from '@/models/Product.js';

export async function POST(request) {
  await db();

  const defImg = 'https://firebasestorage.googleapis.com/v0/b/forimage-52197.appspot.com/o/images%2Fmm2.jpg?alt=media&token=a4f57278-2d4e-4ee8-a85d-d72366e013bc';
  const {prodName, category, price, desc, url, supplierId } = await request.json();
  let img = null;
  if(url === null) img = defImg;
  else img = url;
  console.log(prodName, category, price, desc, img, supplierId);
  try {
    const addedProduct = await Product.create({name: prodName, category: category, price: price, description: desc, image: img, supplierId: supplierId});

    return NextResponse.json(
      {message: "OK", addedProduct},
      { status: 200}
    )
  } catch (error) {
    return NextResponse.json(
      { message: "Error", error},
      { status: 500}
      )
  }
  
}