import { getAllProduct } from "@/app/actions/getAllProduct"
import ProductHeader from "@/components/products/header"
import TableProduct from "@/components/products/table"



const Product = async({searchParams}:{searchParams:{[key:string]: string | string[] | undefined}}) =>{
    const query = typeof searchParams.query === 'string' ? searchParams.query : '';
    const category = typeof searchParams.category === 'string' ? searchParams.category : ''
    const brand = typeof searchParams.brand ==='string' ? searchParams.brand : ''
    const price = typeof searchParams.price ==='string' ? searchParams.price : ''
    const location = typeof searchParams.location ==='string' ? searchParams.location : ''
    const stock = typeof searchParams.stock === 'string' ? searchParams.stock : ''
    const product = await getAllProduct({query,category,brand,price,location,stock})
        console.log(searchParams)
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
                            data = {product}
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
                <div
                className="flex items-center justify-between px-2 py-2 text-[15px] "
                >
                    <button className="bg-neutral-200 text-slate-950 rounded-md px-2 py-0.5">
                        Privious
                    </button>
                    <button className="bg-neutral-200 text-slate-950 rounded-md px-2 py-0.5">
                        Next
                    </button>
                </div>
            </div>
           
        </div>
    )
}

export default Product