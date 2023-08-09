import { NextResponse } from 'next/server';
import db from '@/lib/db.js';
import Order from '@/models/Order.js';

export async function POST(request) {
  await db();

  const {itemN, itemQ, itemTotPrice, areaN, cityN, contactI, sel, buy, stat} = await request.json();
  console.log(itemN, itemQ, itemTotPrice, areaN, cityN, contactI, sel, buy, stat);
  try {
    const placedOrder = await Order.create({itemName: itemN, itemQty: itemQ, area: areaN, city: cityN, contact: contactI, buyer: buy, seller: sel, orderPrice: itemTotPrice, orderStat: stat});
    return NextResponse.json(
      {message: "OK", placedOrder},
      { status: 200}
    )
  } catch (error) {
    return NextResponse.json(
      { message: "Error", error},
      { status: 500}
      )
  }
  
}