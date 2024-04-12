"use client"

import { cn } from "@/lib/utils";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { FaRegSquare } from "react-icons/fa";
import { FaRegSquareCheck } from "react-icons/fa6";
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
   check: boolean;
   handleOtherCheck: (id:string) =>void;

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
    endDate,
    check,
    handleOtherCheck
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
    const handleRouteDetail = useCallback(()=>{
        route.push(`/dashboards/discount/${id}`)
    },[id,route])

    // delete by id
    // const handleDeleteUser = (id:string)=>{
    //     setIsLoading(true)
    //     axios.post(`/api/delete-user/`,{id})
    //         .then((res)=>{
    //             toast.success('deleted')
    //             route.refresh()
    //         })
    //         .catch((err:any)=>{
    //             toast.error('Some thing went wrong!!!')
    //         })
    //         .finally(()=>{
    //             setIsLoading(false)
    //         })
    // }

    useEffect(()=>{
        const end = new Date(endDate).getTime()
        if(today >end) {
            setIsStatus(false)
        }else {
            setIsStatus(true)
        }
    },[endDate,today])
    return (
       <tr className={cn('',
                            new Date(endDate) < new Date() ?'text-red-500': 'text-neutral-400'
                        )} 
       >
        <td className="w-6">
           
            <div className="flex items-start justify-start mt-[-5px] ">
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
        <td className="capitalize">{title}</td>
        <td className="capitalize">{type}</td>
        <td>{percent} %</td>
        <td>{count}</td>
        <td>
            <span>{triggerDay + "/" + 
                   triggerMonth + "-" + 
                   year} 
            </span>
        </td>
        <td>{isStatus ? "Pending": "Expirated"}</td>
        <td >
            <div className="flex items-center justify-end gap-2">
                <button 
                    onClick={handleRouteDetail}
                    className="inline-block rounded-md text-neutral-200 bg-[#5EC0B5] items-center justify-center px-2 py-0.5  hover:opacity-[0.7] hover:text-white transition-all duration-300 ">
                    View
                </button>
                {/* <button 
                    disabled = {isLoading}
                    onClick={()=>handleDeleteUser(id)}
                    className=" inline-block rounded-md text-neutral-200 bg-red-600  items-center justify-center px-2 py-0.5 hover:bg-red-600/40 hover:text-white transition-all duration-300"
                >
                    Delete
                </button> */}
            </div>
        </td>
       </tr>
    )
}
export default Item