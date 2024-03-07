"use client"

import { cn } from "@/lib/utils";
import Image from "next/image";
import { IoMdPersonAdd } from "react-icons/io";

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
    const day = new Date(createdAt).getDate()
    const triggerDay = day <10 ? "0"+ day: day
    const month = new Date(createdAt).getMonth() + 1;
    const triggerMonth = month <10 ? "0"+ month: month
    const year = new Date(createdAt).getFullYear().toString()
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
                <IoMdPersonAdd className={cn("w-4 h-4",
                                                role !== 'yes' ? 'text-neutral-600': 'text-red-600'
                                            )}/>
            </td>
        </tr>
    )
}

export default ItemTable