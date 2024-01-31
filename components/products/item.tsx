"use client"

import Image from "next/image";

interface ItemProductProps {
    title: string,
    img: string,
    description: string,
    price: number,
    created_at: string,
    stock: number,

}

const ItemProduct:React.FC<ItemProductProps> = (
{
    title,
    img,
    description,
    price,
    created_at,
    stock
}
) =>{
    return (
       <tr>
            <td className="flex items-center justify-start gap-1 py-2">
                <Image 
                    src={img}
                    width="30"
                    height="30"
                    alt="avatar"
                />
                <div>{title}</div>
            </td>
            <td>
                {description}
            </td>
            <td>{price}</td>
            <td>{created_at}</td>
            <td className="">{stock}</td>
            <td className="">
                <button className="inline-block rounded-md text-neutral-200 bg-cyan-900  items-center justify-center px-2 py-0.5  hover:bg-cyan-800/40 hover:text-white transition-all duration-300 mr-2">
                    View
                </button>
                <button className=" inline-block rounded-md text-neutral-200 bg-red-600  items-center justify-center px-2 py-0.5 hover:bg-red-600/40 hover:text-white transition-all duration-300">
                    Delete
                </button>
            </td>
       </tr>
    )
}
export default ItemProduct