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
    action: string;

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

    const route = useRouter()
    const handleRouteDetailUser = useCallback(()=>{
        route.push(`/dashboards/customers/${id}`)
    },[id,route])
    return (
       <tr>
            <td className="flex items-center justify-start gap-1 py-2">
                <Image 
                    src={img}
                    width="30"
                    height="30"
                    alt="avatar"
                />
                <div>{name}</div>
            </td>
            <td>
                {email}
            </td>
            <td>{created_at}</td>
            <td>{role}</td>
            <td className="">{action}</td>
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