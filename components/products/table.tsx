"use client"

import { Product } from "@prisma/client"
import ItemProduct from "./item"

// const table = [
//     {
//         title: "iphone",
//         img: "/avatar-empty.png",
//         description: "Desc",
//         price: 999,
//         created_at: "30/12/2023",
//         stock: 72,
//     },
//     {
//         title: "iphone",
//         img: "/avatar-empty.png",
//         description: "Desc",
//         price: 999,
//         created_at: "30/12/2023",
//         stock: 72,
//     },
//     {
//         title: "iphone",
//         img: "/avatar-empty.png",
//         description: "Desc",
//         price: 999,
//         created_at: "30/12/2023",
//         stock: 72,
//     },
// ]
interface TableProductProps {
    data?: Product[] | undefined
}

const TableProduct:React.FC<TableProductProps> = ({
    data =[]
}) =>{
    return (
       <table className="w-full text-[15px] text-white ">
            <tr className="font-bold ">
                <td>Title</td>
                <td>Brand</td>
                <td>Price</td>
                <td>Category</td>
                <td>location</td>
                <td>Created At</td>
                <td>Stock</td>
                <td>Action</td>
            </tr>
            {data.map((item)=>{
                return (
                    <ItemProduct
                        key={item.id}
                        title={item.title as string }
                        brand = {item.brand as string}
                        category = {item.category as string}
                        location = {item.location as string}
                        description={item.description as string }
                        img={item.image as string}
                        price={item.defaultPrice as number }
                        created_at={item.created_at }
                        stock={item.stock as number}
                        
                    />
                )
            })}
       </table>
    )
}

export default TableProduct