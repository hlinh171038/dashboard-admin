"use client"

import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { IoSearchSharp } from "react-icons/io5"
import { useDebounce } from "use-debounce"
import { FaFilter } from "react-icons/fa";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { BsFillQuestionOctagonFill } from "react-icons/bs"
import Filter from "./filter"
import { Discount } from "@prisma/client"
import { IoMdAdd } from "react-icons/io";
import { IoFilterSharp } from "react-icons/io5";

interface HeaderProps {
    discount: Discount[];
    search: string
}


const Header:React.FC<HeaderProps> = ({
    discount = [],
    search
}) =>{
    const [text,setText] = useState('')
    const [query] = useDebounce(text,300)
    const router = useRouter()
    

    console.log(query)

    
    //handle add new
    const handleAddNew = useCallback(()=>{
        router.push('/dashboards/discount/add')
    },[router])

    useEffect(()=>{
        router.push(`/dashboards/discount?search=${query}`)
    },[router,query])
    return (
        <div>
            <div className="flex justify-between items-center px-2 py-2">
                <div className="flex items-end justify-start gap-2">
                    <div className="relative">
                            <div className="absolute top-2 left-2 "><IoSearchSharp className="w-3 h-3 text-white"/></div>
                            <input 
                                className="px-2 py-1 pl-8 rounded-md bg-slate-500/60 text-sm focus:outline-none" 
                                placeholder="Search ... "
                                onChange={(e)=> setText(e.target.value)}
                                value={text}
                                />
                                
                    </div>
                    {/* filter */}
                    <div>
                   
                       
                    </div>
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
                                    discount ={discount}
                                    search = {search}
                                />
                        </PopoverContent>
                    </Popover>
                    <button 
                        onClick={handleAddNew}
                        className="  hover:text-white text-neutral-200 px-2 py-1 text-[15px] rounded-md duration-300 transition-all"
                    >
                    <IoMdAdd className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Header