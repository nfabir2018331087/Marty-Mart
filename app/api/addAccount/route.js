import { NextResponse } from 'next/server';
import db from '@/lib/db.js';
import Account from '@/models/Account.js';

export async function POST(request) {
  await db();

  const {acNum, acSec, bankN, usrId} = await request.json();
  console.log(acNum, acSec, bankN, usrId);
  try {
    const addedAccount = await Account.create({accountNo: acNum, secret: acSec, bank: bankN, userId: usrId});

    return NextResponse.json(
      {message: "OK", addedAccount},
      { status: 200}
    )
  } catch (error) {
    return NextResponse.json(
      { message: "Error", error},
      { status: 500}
      )
  }
  
}