import { NextResponse } from 'next/server';
import db from "@/lib/db";
import Account from '@/models/Account';

export async function POST(request) {  
  await db();
  try {
    const { aId, newBalance } = await request.json();
    const updatedAccount = await Account.findByIdAndUpdate(aId, {balance: newBalance}, {new: true});
    console.log(updatedAccount);
    return NextResponse.json(
      {message: "OK", updatedAccount},
      { status: 200}
    )
  } catch (error) {
    return NextResponse.json(
      { message: "Error", error},
      { status: 500}
      )
  } 

}