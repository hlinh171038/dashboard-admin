"use client"

import ItemProduct from "./item"

const table = [
    {
        title: "iphone",
        img: "/avatar-empty.png",
        description: "Desc",
        price: 999,
        created_at: "30/12/2023",
        stock: 72,
    },
    {
        title: "iphone",
        img: "/avatar-empty.png",
        description: "Desc",
        price: 999,
        created_at: "30/12/2023",
        stock: 72,
    },
    {
        title: "iphone",
        img: "/avatar-empty.png",
        description: "Desc",
        price: 999,
        created_at: "30/12/2023",
        stock: 72,
    },
]

const TableProduct = () =>{
    return (
       <table className="w-full text-[15px] text-white ">
            <tr className="font-bold ">
                <td>Title</td>
                <td>Description</td>
                <td>Price</td>
                <td>Created At</td>
                <td>Stock</td>
                <td>Action</td>
            </tr>
            {table.map((item)=>{
                return (
                    <ItemProduct
                        key={item.title}
                        title={item.title}
                        description={item.description}
                        img={item.img}
                        price={item.price}
                        created_at={item.created_at}
                        stock={item.stock}
                        
                    />
                )
            })}
       </table>
    )
}

export default TableProduct