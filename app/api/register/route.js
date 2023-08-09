import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import db from '@/lib/db.js';
import User from '@/models/User.js';

export async function POST(request) {
  await db();
  const {name, email, password, type } = await request.json();
  const hashedPass = await bcrypt.hash(password, 12);
  try {
    const savedUser = await User.create({name: name, email: email, password: hashedPass, type: type});
    // const savedUser = await prisma.user.create({ data: {name: name, email: email, pasword: hashedPass, type: type}, });
  // res.status(200).json(savedUser);
    return NextResponse.json(
      {message: "OK", savedUser},
      { status: 200}
    )
  } catch (error) {
    return NextResponse.json(
      { message: "Error", error},
      { status: 500}
      )
  }
  
}