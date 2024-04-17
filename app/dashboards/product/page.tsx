import { getAllProduct } from "@/app/actions/getAllProduct"

import ProductHeader from "@/components/products/header"
import Pagination from "@/components/products/pagination";
import TableProduct from "@/components/products/table"
import TotalProduct from "@/components/products/total-product";
import Product from "./Product";
import { getAllTransaction2 } from "@/app/actions/getAllTransaction2";
import { getAllProduct2 } from "@/app/actions/getAllProduct2";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getAllUser2 } from "@/app/actions/getAllUser2";



const page = async({searchParams}:{searchParams:{[key:string]: string | string[] | undefined}}) =>{
    const query = typeof searchParams.query === 'string' ? searchParams.query : '';
    const category = typeof searchParams.category === 'string' ? searchParams.category : ''
    const brand = typeof searchParams.brand ==='string' ? searchParams.brand : ''
    const price = typeof searchParams.price ==='string' ? searchParams.price : ''
    const location = typeof searchParams.location ==='string' ? searchParams.location : ''
    const stock = typeof searchParams.stock === 'string' ? searchParams.stock : ''
    const page = typeof searchParams.page === 'string' ? Number(searchParams.page) : 1;
    const per_page = typeof searchParams.per_page === 'string' ? Number(searchParams.per_page) : 10
    const start = typeof searchParams.start === 'string' ? searchParams.start : ''
    const end = typeof searchParams.end === 'string' ? searchParams.end : ''
    const product = await getAllProduct({query,category,brand,price,location,stock,start,end})
    const product2 = await getAllProduct2()
    const currentUser = await getServerSession(authOptions);
    const customer = await getAllUser2()
    const transaction = await getAllTransaction2()

    // const start = (page - 1) * per_page; // 0,5,10
    // const end = start + per_page;//5,10,15
    // const max = Math.ceil(product.length / per_page);
    
    // const updateProduct = product.slice(start,end)
    return (
        <div>
            <Product 
                product ={product}
                query = {query}
                category = {category}
                brand = {brand}
                price = {price}
                location = {location}
                stock = {stock}
                start = {start}
                end = {end}
                page = {page}
                per_page = {per_page}
                transaction = {transaction}
                product2 = {product2}
                currentUser = {currentUser}
                customer = {customer}
             />
        </div>
    )
}

export default page