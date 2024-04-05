"use client"

import { cn } from "@/lib/utils"
import { Transaction } from "@prisma/client"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface ItemProps {
    userName: string,
    payment: string,
    date: string,
    quantity: number,
    status: string,
    total: number,
    userImage: string
    userId: string
    productId: string
}

const Item:React.FC<ItemProps> = ({
    userName,
    payment,
    date,
    quantity,
    status,
    total,
    userImage,
    userId,
    productId
}) => {
    const router = useRouter()
    const [statusColor,setStatusColor] = useState('')
   
    const day = new Date(date).getDate()
    const triggerDay = day <10 ? "0"+ day: day
    const month = new Date(date).getMonth() + 1;
    const triggerMonth = month <10 ? "0"+ month: month
    const year = new Date(date).getFullYear().toString() 
    const event = new Date(date);
    const r=event.toLocaleTimeString('en-US')
// Expected output: "1:15:30 AM"

    useEffect(()=>{
        if(status === 'cancel') {
            setStatusColor('bg-red-600')
        }else if(status === 'pending'){
            setStatusColor('bg-yellow-600')
        }else {
            setStatusColor('bg-green-600')
        }
    },[status])
    
    return (
        <tr className="text-[14px] text-thin">
            <td 
            onClick={()=>router.push(`/dashboards/customers/${userId}`)}
            className="flex items-center justify-start gap-1 py-1 cursor-pointer hover:text-white bg-ye">
                <Image 
                    src={userImage ? userImage :"/avatar.png"}
                    width="30"
                    height="30"
                    alt="avatar"
                    className="rounded-full aspect-square object-cover  "
                />
                <div className="capitalize">{userName}</div>
            </td>
            <td>{payment}</td>
            <td> 
                <span>{triggerDay + "/" + 
                   triggerMonth + "-" + 
                   year} 
                </span>
            </td>
            <td>{r}</td>
            
            <td >
                <div className={`${statusColor} rounded-md  py-1 flex items-center justify-center capitalize hover:opacity-75 hover:text-white text-neutral-100 cursor-pointer transition-all duration-300`}>
                {status}
                </div>
            </td>
            <td className="text-end">{total.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</td>
            <td className="">
                <div className="w-full flex justify-end items-center px-2">
                    <button 
                        onClick={()=>router.push(`/dashboards/transaction/${productId}`)}
                        className="bg-[#4FA29E] rounded-md text-neutral-100 text-[15px] flex items-center justify-center capitalize px-2 py-1 hover:opacity-[0.7] transition-all duration-300">
                        View 
                    </button>
                </div>
            </td>
        </tr>
    )
}

export default Item