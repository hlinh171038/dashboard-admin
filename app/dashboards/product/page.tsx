import { getAllProduct } from "@/app/actions/getAllProduct"
import ProductHeader from "@/components/products/header"
import TableProduct from "@/components/products/table"



const Product = async() =>{
    const product = await getAllProduct()
    console.log(product)
    return (
        <div className="w-full h-screen px-2">
            <div className=" bg-slate-600  rounded-md ">
                <div>
                    <ProductHeader/>
                    <div className="px-2">
                        <TableProduct
                            data = {product}
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