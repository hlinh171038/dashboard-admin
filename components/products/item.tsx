"use client"

import { cn } from "@/lib/utils";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { useCallback, useEffect, useState } from "react";
import { FaRegSquare } from "react-icons/fa";
import { FaRegSquareCheck } from "react-icons/fa6";
import { toast } from "sonner";

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
    check: boolean;
    handleOtherCheck: (id:string) =>void;
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
    id,
    check,
    handleOtherCheck
}
) =>{

    const router = useRouter()
   const [result,setResult] = useState('')
   const [isLoading,setIsLoading] = useState(false)

   const day = new Date(created_at).getDate()
   const triggerDay = day <10 ? "0"+ day: day
   const month = new Date(created_at).getMonth() + 1;
   const triggerMonth = month <10 ? "0"+ month: month
   const year = new Date(created_at).getFullYear().toString()

   //handle view detail

   const handleViewDetail =useCallback(()=>{
    router.push(`/dashboards/product/${id}`)
   },[router,id])

   //handle delete
   const handleDelete = useCallback(()=>{
    setIsLoading(true)
    axios.post('/api/delete-product',{id})
        .then((res)=>{
            toast.success('Deleted product')
            router.refresh()
        })
        .catch((error:any)=>{
           toast.error('Something went wrong !')
        })
        .finally(()=>{
            setIsLoading(false)
        })
   },[id,router])

    useEffect(()=>{
       if(location.includes('ho chi minh') || location.includes('hồ ')){
            setResult('sothern')
       }else if(location.includes('ha noi') || location.includes('hà ')){
            setResult('north')
       } else {
            setResult('other')
       }
    },[location])
    
    return (
       <tr>
            <td className="w-6">
            <div className="flex items-center justify-start mt-[-5px]">
                {!check ?(
                    <FaRegSquare
                        className="w-4 h-4 text-neutral-100 font-thin"
                        onClick={()=>handleOtherCheck(id)}
                        />
                ):(
                    <FaRegSquareCheck
                        className="w-4 h-4 text-neutral-100"
                        onClick={()=>handleOtherCheck(id)}
                        />
                )}
                
            </div>
            </td>
            <td className="flex items-center justify-start gap-1 py-2">
                <div>{title}</div>
            </td>
            <td>
                {brand}
            </td>
            <td>
                {price.toLocaleString('vi', {style : 'currency', currency : 'VND'})}
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
            <td className="">
                <div className="flex items-center justify-center">
                    <div>{stock}</div>
                </div>
            </td>
            <td className="">
                <div className="flex items-center justify-end gap-2">
                    <button 
                        onClick={handleViewDetail}
                        className="inline-block rounded-md text-neutral-200 bg-[#4FA29E]  items-center justify-center px-2 py-0.5  hover:opacity-[0.7] hover:text-white transition-all duration-300 mr-2">
                        View
                    </button>
                
                </div>
            </td>
       </tr>
    )
}
export default ItemProduct