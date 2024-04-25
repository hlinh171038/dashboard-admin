"use client"

import { cn } from "@/lib/utils";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { RiAdminFill } from "react-icons/ri";
import { IoMdPersonAdd } from "react-icons/io";
import { toast } from "sonner";

interface ItemUserProps {
    id: string;
    name: string;
    image: string;
    email:string;
    status: boolean;
    role: string;
    createdAt:string;
}

const ItemTable:React.FC<ItemUserProps> = ({
    id,
    name,
    image,
    email,
    status,
    role,
    createdAt
}) =>{
    const [isLoading,setIsLoading] = useState(false)
    const router = useRouter()
    const day = new Date(createdAt).getDate()
    const triggerDay = day <10 ? "0"+ day: day
    const month = new Date(createdAt).getMonth() + 1;
    const triggerMonth = month <10 ? "0"+ month: month
    const year = new Date(createdAt).getFullYear().toString()
  


    //handle add admin
    const handleAddAdmin = useCallback(()=>{
        if(role === 'yes'){
            toast.warning(`${name} is an admin.`);
            return;
        }
        router.push(`/analytics/team/add/${id}`)
     
    },[router,role,name,id])
    return (
        <tr>
            <td className="flex items-center justify-start gap-1 py-2">
                <Image 
                    src={image ? image :"/avatar.png"}
                    width="30"
                    height="30"
                    alt="avatar"
                    className="rounded-full aspect-square object-cover"
                />
                <div>{name}</div>
            </td>
            <td>
                {email}
            </td>
            <td>
            <span>
                {triggerDay + "/" + 
                   triggerMonth + "-" + 
                   year} 
            </span>
            </td>
            <td>{status===true ? 'active' : 'offline'}</td>
            <td className="">
                {role ==='yes'  ? "admin": "user"}
            </td>
            
            <td className="cursor-pointer underline">
                <div className="flex items-center justify-end">
                <button
                    disabled={isLoading}
                     onClick={handleAddAdmin}
                     className="flex items-center justify-start gap-2"
                >

                    {role === 'yes' ? (
                        <RiAdminFill className="w-4 h-4" />
                    ): (
                        <IoMdPersonAdd 
                       
                        className={cn("w-4 h-4" )}
                    />
                    )}
                    
                    {isLoading ?  <AiOutlineLoading3Quarters className="animate-spin h-5 w-5 "/>:<div className="w-5 h-5"></div>}
                    
                </button>
                </div>
            </td>
        </tr>
    )
}

export default ItemTable