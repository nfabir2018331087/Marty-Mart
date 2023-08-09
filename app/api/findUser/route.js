import { NextResponse } from 'next/server';
import db from "@/lib/db";
import User from '@/models/User';

export async function POST(request) {  
  await db();
  try {
    const { userId } = await request.json();
    const user = await User.find({_id: userId});
    console.log(user);
    return NextResponse.json(
      {message: "OK", user},
      { status: 200}
    )
  } catch (error) {
    return NextResponse.json(
      { message: "Error", error},
      { status: 500}
      )
  } 

}