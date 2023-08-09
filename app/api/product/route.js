import { NextResponse } from 'next/server';
import Product from "@/models/Product";
import db from "@/lib/db";

// export async function main(){
//     try {
//         await prisma.$connect();
//     } catch (error) {
//         return Error("Database Connection Unsuccessful");
//     }
// }
export async function GET(request) {  
  await db();
  try {
    // await main();
    const products = await Product.find({})
    // console.log(products)
    return NextResponse.json(
      {message: "OK", products},
      { status: 200}
    )
  } catch (error) {
    return NextResponse.json(
      { message: "Error", error},
      { status: 500}
      )
  } 
//   finally {
//     await prisma.$disconnect();
//   }
  
}