import { getAllProduct } from "@/app/actions/getAllProduct"

import ProductHeader from "@/components/products/header"
import Pagination from "@/components/products/pagination";
import TableProduct from "@/components/products/table"



const Product = async({searchParams}:{searchParams:{[key:string]: string | string[] | undefined}}) =>{
    const query = typeof searchParams.query === 'string' ? searchParams.query : '';
    const category = typeof searchParams.category === 'string' ? searchParams.category : ''
    const brand = typeof searchParams.brand ==='string' ? searchParams.brand : ''
    const price = typeof searchParams.price ==='string' ? searchParams.price : ''
    const location = typeof searchParams.location ==='string' ? searchParams.location : ''
    const stock = typeof searchParams.stock === 'string' ? searchParams.stock : ''
    const page = typeof searchParams.page === 'string' ? Number(searchParams.page) : 1;
    const per_page = typeof searchParams.per_page === 'string' ? Number(searchParams.per_page) : 10
    const product = await getAllProduct({query,category,brand,price,location,stock})

    const start = (page - 1) * per_page; // 0,5,10
    const end = start + per_page;//5,10,15
    const max = product.length
    
    const updateProduct = product.slice(start,end)
    return (
        <div className="w-full h-screen px-2">
            <div className=" bg-slate-600  rounded-md ">
                <div>
                    <ProductHeader
                        category ={category}
                        brand={brand}
                        price={price}
                        location={location}
                        stock={stock}
                        
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