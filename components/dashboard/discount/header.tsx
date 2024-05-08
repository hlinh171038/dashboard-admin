"use client"

import { useRouter } from "next/navigation"
import { useCallback, useEffect, useRef, useState } from "react"
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
import { Discount, User } from "@prisma/client"
import { IoMdAdd } from "react-icons/io";
import { IoFilterSharp } from "react-icons/io5";
//import ExportFile from "@/components/customers/export-file"
import { LuClipboardCopy } from "react-icons/lu"
import CopyLink from "@/components/customers/copylink"
import { RxCross2 } from "react-icons/rx"

interface HeaderProps {
    discount: Discount[];
    discount2: Discount[] | any;
    search: string;
    currentUser:any;
    customer: User[] | any;
}


const Header:React.FC<HeaderProps> = ({
    discount = [],
    discount2 = [],
    search,
    currentUser,
    customer = []
}) =>{
    const [text,setText] = useState('')
    const [query] = useDebounce(text,300)
    const inputRef = useRef<any>(null)
    const router = useRouter()

    //handle reset
    const handleReset = useCallback(()=>{
        router.push(`/dashboards/discount?search=&type=&percent=&dayStart=&dayEnd=&countFrom=&countTo=&page=1&per_page=10`);
        setText('')
    },[router])

    
    //handle add new
    const handleAddNew = useCallback(()=>{
        router.push('/dashboards/discount/add')
    },[router])

    useEffect(()=>{
        const handleKeyDown = (event:any) =>{
            if(event.ctrlKey && event.key === 'm'){
                inputRef.current && inputRef.current.focus()
            }
        };
        document.addEventListener('keydown',handleKeyDown);

        return () =>{
            document.removeEventListener('keydown',handleKeyDown)
        }
    },[])

    useEffect(()=>{
        router.push(`/dashboards/discount?search=${query}&page=1&per_page=10`)
    },[router,query])
    return (
        <div>
            <div className="flex justify-between items-center pb-2 ">
                <div className="flex items-end justify-start gap-2">
                    <div className="relative">
                            <div className="absolute top-2 left-2 "><IoSearchSharp className="w-3 h-3 text-white"/></div>
                            <div className="absolute top-1.5 right-2 text-[11px] text-neutral-400 flex items-center justify-start gap-1">
                            <div className="border border-neutral-400 px-1 py-[0.01rem] rounded-md flex items-center justify-center">Ctrl</div>
                    
                            <div className="border border-neutral-400 px-1 py-[0.01rem] rounded-md flex items-center justify-center">M</div>
                        </div>
                        {discount.length < discount2.length && (
                            <div className="absolute bottom-[-20px] left-0 text-[13px] text-green">
                                {customer.length === 0 ? (
                                    <span className="text-red-600 flex items-center justify-start gap-8" >
                                        <span>No item matching</span>
                                        <span >
                                            <RxCross2 
                                                onClick={handleReset}
                                                className="w-3 h-3 text-red-600 cursor-pointer"/>
                                        </span>
                                    </span>
                                ) : (
                                    <span className="text-green-600 flex items-center justify-start gap-8">
                                        <span>{discount.length } item is finded</span>
                                        <span >
                                            <RxCross2 
                                                onClick={handleReset}
                                                className="w-3 h-3 text-red-600 cursor-pointer"/>
                                        </span>
                                    </span>
                                )}
                            </div>
                        )}
                            <input
                                ref={inputRef} 
                                className="px-2 py-1 pl-8 rounded-md bg-slate-500/60 text-[14px] text-neutral-100 focus:outline-none" 
                                placeholder="Search ... "
                                onChange={(e)=> setText(e.target.value)}
                                value={text}
                                />
                                
                    </div>
                    {/* filter */}
                    <div>
                   
                       
                    </div>
                </div>
                <div className="flex items-center justify-end gap-2">
                    {/* export to SCV file */}
                {/* <ExportFile
                    data = {discount}
                    filename='discount'
                    currentUser={currentUser}
                /> */}
                {/* coppy link */}
                    <Popover>
                        <PopoverTrigger  >
                            <LuClipboardCopy  
                                
                                className="w-4 h-4 text-neutral-400 hover:text-white transition-all duration-300" 
                            />    
                        </PopoverTrigger>
                        <PopoverContent  
                            side="bottom" 
                            align="start" 
                            sideOffset={4}
                            className="bg-neutral-100 text-slate-600 text-[13px] px-4 py-2 rounded-md mr-2"
                            >
                                <CopyLink
                                    currentUser ={currentUser}
                                    customer = {customer}
                                />
                        </PopoverContent>
                    </Popover>
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