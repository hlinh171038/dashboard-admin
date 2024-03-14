"use client"

import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

interface ItemCustomerProps {
    id: string,
   title: string,
   type: string,
   percent:number,
   count:number,
   created_at: string,
   startDate: string,
   endDate: string;
}

const Item:React.FC<ItemCustomerProps> = (
{
    id,
    title,
    type,
    percent,
    count,
    created_at,
    startDate,
    endDate
}

) =>{
    const [isLoading,setIsLoading] = useState(false)
    const [today,setToday] = useState(new Date().getTime());
    const [ isStatus,setIsStatus] = useState(false)


    const day = new Date(created_at).getDate()
    const triggerDay = day <10 ? "0"+ day: day
    const month = new Date(created_at).getMonth() + 1;
    const triggerMonth = month <10 ? "0"+ month: month
    const year = new Date(created_at).getFullYear().toString()
    
    const route = useRouter()
    const handleRouteDetailUser = useCallback(()=>{
        route.push(`/dashboards/customers/${id}`)
    },[id,route])

    // delete by id
    const handleDeleteUser = (id:string)=>{
        setIsLoading(true)
        axios.post(`/api/delete-user/`,{id})
            .then((res)=>{
                toast.success('deleted')
                route.refresh()
            })
            .catch((err:any)=>{
                toast.error('Some thing went wrong!!!')
            })
            .finally(()=>{
                setIsLoading(false)
            })
    }

    useEffect(()=>{
        const end = new Date(endDate).getTime()
        if(today >end) {
            setIsStatus(false)
        }else {
            setIsStatus(true)
        }
    },[endDate,today])
    return (
       <tr>
        <td>{title}</td>
        <td>{type}</td>
        <td>{percent}</td>
        <td>{count}</td>
        <td>
            <span>{triggerDay + "/" + 
                   triggerMonth + "-" + 
                   year} 
            </span>
        </td>
        <td>{isStatus ? "pending": "expirated"}</td>
        <td className="flex items-center justify-start gap-2">
            <button 
                onClick={handleRouteDetailUser}
                className="inline-block rounded-md text-neutral-200 bg-cyan-900  items-center justify-center px-2 py-0.5  hover:bg-cyan-800/40 hover:text-white transition-all duration-300 ">
                View
            </button>
            <button 
                disabled = {isLoading}
                onClick={()=>handleDeleteUser(id)}
                className=" inline-block rounded-md text-neutral-200 bg-red-600  items-center justify-center px-2 py-0.5 hover:bg-red-600/40 hover:text-white transition-all duration-300"
            >
                Delete
            </button>
        </td>
       </tr>
    )
}
export default Item