"use client"

import { User } from "@prisma/client"

import ItemTable from "./item-table"
import { FaUserSlash } from "react-icons/fa6";
import { IoReturnDownBack, IoSearchSharp } from "react-icons/io5";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDebounce } from "use-debounce";

interface TableProps {
    //user: User[] | any;
    userSearch: User[] | any
}

const Table:React.FC<TableProps> = ({
   // user = [],
    userSearch = []
}) =>{
    const router = useRouter()
    const [text,setText] = useState('')
    const [query] = useDebounce(text, 300);

    //handle back
    const handleBack = useCallback(()=>{
        setText('')
    },[])

    useEffect(()=>{
        router.push(`/analytics/team?search=${query}&page=1&per_page=10`)
    },[query,router])
    return (
        <div className="w-[100%] min-w-[71.2vw]">
            <div className="w-full flex items-center justify-between">
            <div className="relative">
            <div className="absolute top-2 left-2 "><IoSearchSharp className="w-3 h-3 text-slate-900"/></div>
            <input 
                className="px-2 py-1 pl-8 rounded-md border border-slate-900 text-sm focus:outline-none text-[14px] " 
                placeholder="Search ... "
                onChange={(e)=> setText(e.target.value)}
                value={text}
                />          
            </div>
        </div>
            {userSearch.length >0 ?(

                <table className="w-full">
                <tr>
                    <td>Member</td>
                    <td>email</td>
                    <td>date</td>
                    <td>status</td>
                    <td>role</td>
                    <td></td>
                </tr>
              
                    {userSearch && userSearch.map((item:any)=>{
                        return <ItemTable
                                    key={item.id}
                                    id={item.id}
                                    name = {item.name}
                                    image = {item.image}
                                    email = {item.email}
                                    status = {item.action}
                                    role = {item.role}
                                    createdAt = {item.createdAt}
                                />
                    })}
               
                
            </table>  
            ):(
                <div className="w-full min-h-10 flex items-center justify-center">
                <div className="flex flex-col  gap-0.5">
                    <div className="flex items-center justify-start gap-2">
                        <FaUserSlash  className="w-4 h-4 text-neutral-700"/>
                        <div className="font-bold text-[15px]">Not Found !!!</div>
                    </div>
                    <div>Click <button onClick={handleBack} className="hover:text-neutral-700 cursor-pointer"><IoReturnDownBack className="w-3 h-3"/></button> to back !!!</div>
                </div>
                
            </div>
            )}
            
            
        </div>
    )
}

export default Table