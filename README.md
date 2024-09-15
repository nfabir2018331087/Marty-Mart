# Marty Mart
Full-fledged e-commerce website. Users are of two types. Supplier and Customer. Built-in wallet system for transactions. Developed with **Next.js**, **MongoDB**, and **Tailwind CSS**. This project was for an academic task of building a full-fledged e-commerce website. This project is deployed using **Vercel**. Here is the live website [link](https://marty-mart.vercel.app/).

## Functionalities and Descriptions
This is an e-commerce website. If you are looking to buy different types of products and are a seller who wants to sell products then this place is for you. You can register as a seller and as a buyer. The website is responsive across different sizes of screens.

#### As a Seller, you can
*  Add your products
*  View them
*  Connect your bank information to your wallet
*  See the orders you have
*  Accept/Decline them
*  Deposit/Withdraw money
*  Can't buy/add products to a cart

#### As a Buyer, you can
* View all the products
* Add products to your cart
* Checkout them
* See the status of your orders
* Connect your bank information to your wallet
* Deposit/Withdraw money
* Can't add any products

## Instructions
You can use it on this [link](https://marty-mart.vercel.app/). But if you want to run this project on your device and tweak functionalities on your own then here are the instructions to do so, 
* First of all, clone this repository to your local machine
* Make sure you have **Node** installed on your computer
* Go to the project directory and install all the necessary packages
* Create a .env file
* Use any string and initiate SECRET_KEY and NEXT_PUBLIC_SECRET_KEY
* Go to MongoDB Atlas, create a cluster, and grab the connecting URL. It should look like this  
mongodb+srv://(username):(password)@(your cluster info).mongodb.net/
* Initiate MONGO_URL
* Set NEXT_PUBLIC_BASEURL=http://localhost:3000
* Run the project on dev mode and enjoy

## Technologies
* **Next.js** as a full-stack framework
* **MongoDB/MongoDB Atlas** as a database
* **Tailwind CSS** as a tailwind framework
* **JWT** for authentication
* **Vercel** for deployment
  
