"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

interface ItemCustomerProps {
    id: string,
    name: string | any;
    img: string;
    email: string;
    created_at: string;
    role: string;
    action: boolean;

}

const ItemCustomer:React.FC<ItemCustomerProps> = (
{
    id,
    name,
    img,
    email,
    created_at,
    role,
    action
}

) =>{
    const day = new Date(created_at).getDate()
    const triggerDay = day <10 ? "0"+ day: day
    const month = new Date(created_at).getMonth() + 1;
    const triggerMonth = month <10 ? "0"+ month: month
    const year = new Date(created_at).getFullYear().toString()
    
    const route = useRouter()
    const handleRouteDetailUser = useCallback(()=>{
        route.push(`/dashboards/customers/${id}`)
    },[id,route])

    return (
       <tr>
        <td className="flex items-center justify-start gap-1 py-2">
                <Image 
                    src={img ? img :"/avatar.png"}
                    width="30"
                    height="30"
                    alt="avatar"
                    className="rounded-full aspect-square object-cover  "
                />
                <div>{name}</div>
        </td>
        <td>
            {email}
        </td>
        <td className="">
            <span>{triggerDay + "/" + 
                   triggerMonth + "-" + 
                   year} 
            </span>
            {/* <span>{new Date(created_at).getMonth()+1 + "-"}</span>
            <span>{new Date(created_at).getFullYear().toString()}</span> */}
        </td>
        <td>{role}</td>
            <td className="">{action  ? "yes": "no"}</td>
            <td className="">
                <button 
                    onClick={handleRouteDetailUser}
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
export default ItemCustomer