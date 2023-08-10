import { NextResponse } from 'next/server';
import db from "@/lib/db";
import Transaction from '@/models/Transaction';

export async function POST(request) {  
  await db();
  try {
    // await main();
    const { id } = await request.json();
    const transactions = await Transaction.find({userId: id});
    console.log(transactions);
    return NextResponse.json(
      {message: "OK", transactions},
      { status: 200}
    )
  } catch (error) {
    return NextResponse.json(
      { message: "Error", error},
      { status: 500}
      )
  } 
}