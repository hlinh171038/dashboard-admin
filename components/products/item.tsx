"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";

import { useCallback, useEffect, useState } from "react";

interface ItemProductProps {
    title: string,
    img: string,
    description: string,
    price: number,
    brand: string,
    category: string,
    location: string,
    created_at: any,
    stock: number,
    id: string,
}

const ItemProduct:React.FC<ItemProductProps> = (
{
    title,
    img,
    description,
    price,
    brand,
    category,
    location,
    created_at,
    stock,
    id
}
) =>{

    const router = useRouter()
   const [result,setResult] = useState('')

   const day = new Date(created_at).getDate()
   const triggerDay = day <10 ? "0"+ day: day
   const month = new Date(created_at).getMonth() + 1;
   const triggerMonth = month <10 ? "0"+ month: month
   const year = new Date(created_at).getFullYear().toString()

   //handle view detail

   const handleViewDetail =useCallback(()=>{
    router.push(`/dashboards/product/${id}`)
   },[router,id])

    useEffect(()=>{
       if(location.includes('ho chi minh') || location.includes('hồ ')){
            setResult('sothern')
       }else if(location.includes('ha noi') || location.includes('hà ')){
            setResult('north')
       } else {
            setResult('other')
       }
    },[])
    
    return (
       <tr>
            <td className="flex items-center justify-start gap-1 py-2">
                <div>{title}</div>
            </td>
            <td>
                {brand}
            </td>
            <td>
                {price}
            </td>
            <td>
                {category}
            </td>
            <td>{result}</td>
            <td>
                {triggerDay + "/" + 
                   triggerMonth + "-" + 
                   year} 
            </td>
            <td className="">{stock}</td>
            <td className="">
                <button 
                    onClick={handleViewDetail}
                    className="inline-block rounded-md text-neutral-200 bg-cyan-900  items-center justify-center px-2 py-0.5  hover:bg-cyan-800/40 hover:text-white transition-all duration-300 mr-2">
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