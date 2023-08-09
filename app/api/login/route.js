// import { prisma } from "@/server/db/prismadb"
import bcrypt from 'bcrypt';
import { signJwtAccessToken } from "@/lib/jwt";
import { NextResponse } from "next/server";
import User from "@/models/User";
import db from "@/lib/db";

export async function POST(request) {
    await db();
    const { email, password } = await request.json();

    if (!email || !password) {
        throw new Error('Invalid credentials');
    }
    else {
        const user = await User.findOne({
            email: email
        })
        // const user = await prisma.user.findUnique({
        // where: {
        //     email: email
        // }
    // });

    if (!user || !user?.password) {
        throw new Error('Invalid credentials');
    }   
    else{
        const isCorrectPassword = await bcrypt.compare(
        password,
        user.password
    );

    if (!isCorrectPassword) {
        throw new Error('Invalid credentials');
    }
    else {
        const {password, ...userwithoutpass} = user;
        const token = signJwtAccessToken(userwithoutpass);
        // console.log(token);
        const result = {
            ...userwithoutpass,
            token
        }
        // console.log(result);
        return NextResponse.json({message: "OK", result},
        {status: 200});
    }
    }
    
 }
     
}