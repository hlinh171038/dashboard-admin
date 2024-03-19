"use client"

import axios from "axios"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { IoFilterSharp, IoSearchSharp } from "react-icons/io5"
import {useDebounce} from 'use-debounce'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { IoMdAdd } from "react-icons/io"
import Filter from "./filter"
import { User } from "@prisma/client"
interface HeaderProps {
    customer: User[] | any
}

const HeaderCustomer:React.FC<HeaderProps> = ({
    customer =[]
}) =>{
    const [text,setText] = useState('')
 
    const [query] = useDebounce(text, 300);
    const searchparams = useSearchParams()
    const pathname = usePathname()
    const {replace} = useRouter()
    

    const router = useRouter()

    const handleAddNew = () =>{
        router.push('/dashboards/customers/add')
    }

    useEffect(()=>{
        router.push(`/dashboards/customers/?search=${query}&page=1&per_page=10`)
    },[router,query])

    return (
        <div>
            <div className="flex justify-between items-center px-2 py-2">
            <div className="relative">
                        <div className="absolute top-2 left-2 "><IoSearchSharp className="w-3 h-3 text-white"/></div>
                        <input 
                            className="px-2 py-1 pl-8 rounded-md bg-slate-500/60 text-sm focus:outline-none" 
                            placeholder="Search ... "
                            onChange={(e)=> setText(e.target.value)}
                            value={text}
                            />
                            
                </div>
               <div>
               <Popover>
                        <PopoverTrigger  >
                            <IoFilterSharp 
                                
                                className="w-4 h-4 text-neutral-200 hover:text-white transition-all duration-300" 
                            />    
                        </PopoverTrigger>
                        <PopoverContent  
                            side="left" 
                            align="start" 
                            sideOffset={4}
                            className="bg-neutral-100 text-slate-600 text-[13px] px-4 py-2 rounded-md mr-2"
                            >
                                <Filter 
                                    customer = {customer}
                                />
                        </PopoverContent>
                    </Popover>
               <button 
                    onClick={handleAddNew}
                    className="hover:text-white text-neutral-200 px-2 py-1 text-[15px] rounded-md duration-300 transition-all"
                >
                     <IoMdAdd className="w-4 h-4" /> 
                </button>
               </div>
            </div>
        </div>
    )
}

export default HeaderCustomer