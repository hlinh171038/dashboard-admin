"use client"


import TopCategory from "@/components/dashboard-home/top-category";
import ProductHeader from "@/components/products/header"
import HotestProduct from "@/components/products/hotest-product";
import Pagination from "@/components/products/pagination";
import TableProduct from "@/components/products/table"
import TotalProduct from "@/components/products/total-product";
import { Product, Transaction, User } from "@prisma/client";
import { useEffect, useState } from "react";

interface ProductProps {
    product: Product[] |any;
    query: string;
    page: number;
    per_page: number;
    category: string;
    location: string;
    brand: string;
    price: string;
    stock: string;
    transaction: Transaction[] | any;
    product2: Product[] | any;
    currentUser: any;
    customer: User[] | any;
}

const Product:React.FC<ProductProps> = ({
    product = [],
    query,
    page,
    per_page,
    category,
    location,
    brand,
    price,
    stock,
    transaction = [],
    product2 =[],
    currentUser,
    customer = []
}) =>{
    const [thisWeek,setThisWeek] = useState<Date[]>([])
    const [lastWeek,setLastWeek] = useState<Date[]>([])
    const [totalProductThisWeek,setTotalProductThisWeek] = useState<any>([]);
    const [totalProductLastWeek,setTotalProductLastWeek] = useState<any>([]);
    //  pagination
    const start = (page - 1) * per_page; // 0,5,10
    const end = start + per_page;//5,10,15
    const max = Math.ceil(product.length / per_page);
    
    const updateProduct = product.slice(start,end)

    // find out this week
    useEffect(()=>{
        const thisWeek = [];
        const today = new Date();
         console.log(today.getDay()) // thu ba
         console.log(today.getDay() -1)
        const monday = new Date(today.getFullYear(), today.getMonth(), today.getDate()-today.getDay())
        console.log(monday);
        for(let i =1;i<=7;i++) {
           let date =  new Date(monday.getFullYear(), monday.getMonth(), monday.getDate()+i)
            thisWeek.push(date)
        }
         console.log(thisWeek)
        setThisWeek(thisWeek)
    },[])
    // find out last week
    useEffect(()=>{
        const lastWeek:any[] = [];
        for(let i = 0;i<thisWeek.length;i++){
            let current = new Date(thisWeek[0]);
            const result = new Date(current.getFullYear(),current.getMonth(),current.getDate() - (i+1));
            lastWeek.push(result)
        }
        setLastWeek(lastWeek)
    },[thisWeek])
    console.log(thisWeek)
    console.log(lastWeek)

    // product this week
    useEffect(()=>{
        const array = [...product]
        const result:any[] = []
        array && array.forEach((item:any)=>{
            const day = new Date(item.created_at);
            if(day >=thisWeek[0] && day <= thisWeek[thisWeek.length -1]) {
                result.push(item)
            }
        });
        console.log(result);
        setTotalProductThisWeek(result);
    },[product,thisWeek])
    // product last week
    useEffect(()=>{
        const array = [...product]
        const result:any[] = []
        array && array.forEach((item:any)=>{
            const day = new Date(item.created_at);
            if(day <=lastWeek[0] && day >= lastWeek[lastWeek.length -1]) {
                result.push(item)
            }
        });
        console.log(result);
        setTotalProductLastWeek(result)
    },[product,lastWeek])
    return (
        <div className="w-full  px-2 flex flex-col gap-2">
            <div className="">
                <TotalProduct
                    product = {product2}
                    totalProductThisWeek = {totalProductThisWeek}
                    totalProductLastWeek = {totalProductLastWeek}
                />
            </div>
            <div className="grid grid-cols-9 gap-2">
                <div className="col-span-4 bg-slate-600 rounded-md p-2">
                    <TopCategory 
                        thisWeek={thisWeek}
                        lastWeek={lastWeek}
                        product ={product2}
                        transaction={transaction}
                        productCondition = {true}
                    />
                    
                </div>
                <div className="col-span-5 bg-slate-600 rounded-md p-2">
                    <HotestProduct 
                        thisWeek = {thisWeek}
                        lastWeek = {lastWeek}
                        product = {product2}
                        transaction = {transaction}
                    />
                </div>
               
            </div>
            <div className="relative bg-slate-600  rounded-md h-full">
                <div>
                    <ProductHeader
                        category ={category}
                        brand={brand}
                        price={price}
                        location={location}
                        stock={stock}
                        search={query}
                        product = {product}
                        product2 = {product2}
                        currentUser = {currentUser}
                        customer = {customer}
                    />
                    <div className="px-2">
                        <TableProduct
                            data = {updateProduct}
                            query = {query}
                            category ={category}
                            brand = {brand}
                            price = {price}
                            location = {location}
                            stock = {stock}
                        />
                    </div>
                </div>
                {/* check condition if page =1 / page = last page */}
                <Pagination 
                    page = {page}
                    per_page={per_page}
                    max ={max}
                    query ={query}
                    category ={category}
                    brand ={brand}
                    location ={location}
                    stock = {stock}
                    price ={price}
                />
               
            </div>
           
        </div>
    )
}

export default Product