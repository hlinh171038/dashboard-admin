"use client"

import { User } from "@prisma/client"
import ItemCustomer from "./item"
import { IoBasketOutline, IoReturnDownBackOutline } from "react-icons/io5"
import { useRouter } from "next/navigation"
import { useCallback } from "react"


interface TableCustomerProps {
    users?: User[] | null
}

const TableCustomer:React.FC<TableCustomerProps> = ({
    users =[]
}) =>{
    console.log(users)
    const router = useRouter()
    //handle back product
    const handleBackProduct = useCallback(()=>{
        router.push(`/dashboards/customers?search=&role=&action=&start=&end=&page=1&per_page=10`);
    },[router])
    return (
        <div>
            <table className="w-full text-[15px] text-neutral-400 mt-2">
            <tr className="font-bold text-neutral-100">
                <td>Name</td>
                <td>Email</td>
                <td>Created at</td>
                <td>Role</td>
                <td>
                    <div className="flex items-center justify-center">
                        <div>
                         Action
                        </div>
                    </div>
                </td>
                <td></td>
            </tr>
            {users && users.map((item:any)=>{
                return (<ItemCustomer 
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        img={item.image}
                        email={item.email}
                        created_at={item.createdAt}
                        role={item.role}
                        action={item.action}
                    />
                )
            })}
       </table>
            {users && users.length === 0 &&(
            <div className="w-full flex flex-col items-center justify-center gap-1 text-neutral-100 text-[14px] h-[60vh]">
               
                   
                    <div className="flex flex-col gap-1 items-center justify-center">
                        <div className="flex items-center justify-start gap-2">
                        <IoBasketOutline  className="w-6 h-6 text-neutral-100 font-thin"/>
                        <div className=" text-[14px] uppercase">No result found !!!</div>
                        </div>
                        <div className="flex items-center justify-start gap-2">
                            <span className="text-thin text-[14px] text-neutral-400 flex items-center justify-center gap-1">Click here  <span><IoReturnDownBackOutline onClick={handleBackProduct} className="text-neutral-200 w-4 h-4 cursor-pointer hover:text-white transition-all duration-300"/></span> to back to all customer</span> 
                        </div>
                    </div>
            </div>
            
        )}
        </div>
       
    )
}

export default TableCustomer