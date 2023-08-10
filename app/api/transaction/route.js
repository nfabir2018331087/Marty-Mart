import { NextResponse } from 'next/server';
import db from '@/lib/db.js';
import Transaction from '@/models/Transaction';

export async function POST(request) {
  await db();

  const {state, amount, newBalance, date, time, uId} = await request.json();
  let type = "";
  if (state === "deposit") type = "Deposit";
  else if (state === "withdraw") type = "Withdraw";
  else type = state;
  console.log(state, amount, newBalance, date, time, uId);
  try {
    const transaction = await Transaction.create({type: type, amount: amount, currentBalance: newBalance, date: date, time: time, userId: uId});
    return NextResponse.json(
      {message: "OK", transaction},
      { status: 200}
    )
  } catch (error) {
    return NextResponse.json(
      { message: "Error", error},
      { status: 500}
      )
  }
  
}