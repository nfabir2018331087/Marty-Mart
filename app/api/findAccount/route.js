import { NextResponse } from 'next/server';
import db from "@/lib/db";
import Account from '@/models/Account';

export async function POST(request) {  
  await db();
  try {
    const { id } = await request.json();
    const account = await Account.find({userId: id});
    console.log(account);
    return NextResponse.json(
      {message: "OK", account},
      { status: 200}
    )
  } catch (error) {
    return NextResponse.json(
      { message: "Error", error},
      { status: 500}
      )
  } 

}