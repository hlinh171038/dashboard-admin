"use client"

import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { FaRegSquare } from "react-icons/fa";
import { FaRegSquareCheck } from "react-icons/fa6";
import { toast } from "sonner";

interface ItemCustomerProps {
    id: string,
    name: string | any;
    img: string;
    email: string;
    created_at: string;
    role: string;
    action: boolean;
    check: boolean;
    handleOtherCheck: (id:string) =>void;
}

const ItemCustomer:React.FC<ItemCustomerProps> = (
{
    id,
    name,
    img,
    email,
    created_at,
    role,
    action,
    check,
    handleOtherCheck
}

) =>{
    const [isLoading,setIsLoading] = useState(false)
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

    return (
       <tr>
        <td >
        <div className="flex items-center justify-start ">
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
                <Image 
                    src={img ? img :"/avatar.png"}
                    width="30"
                    height="30"
                    alt="avatar"
                    className="rounded-full aspect-square object-cover  "
                />
                <div className="capitalize">{name}</div>
        </td>
        <td>
            {email}
        </td>
        <td className="">
            <span>{triggerDay + "/" + 
                   triggerMonth + "-" + 
                   year} 
            </span>
          
        </td>
        <td>
            {new Date(created_at).toLocaleTimeString('en-US')}
        </td>
        <td>{role === 'yes' ? 'Admin': 'User'}</td>
        <td className="">
            <div className="flex items-center justify-center">
            {action  ?(
                    <span className="text-green-600 ">Active</span>
                ) : (
                    <span className=" ">InActive</span>
                )}
            </div>
        </td>
            <td >
                    <div className="flex justify-end items-start">
                        <button 
                            onClick={handleRouteDetailUser}
                            className="inline-block rounded-md text-neutral-200   items-center justify-center px-2 py-0.5  hover:opacity-[0.7] hover:text-white transition-all duration-300 mr-2" style={{backgroundColor:'#5EC0B5'}}>
                            View
                        </button>
                      
                    </div>
            </td>
       </tr>
    )
}
export default ItemCustomer