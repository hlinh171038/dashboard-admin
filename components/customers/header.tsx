"use client"

import axios from "axios"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useEffect, useRef, useState } from "react"
import { IoFilterSharp, IoSearchSharp } from "react-icons/io5"
import {useDebounce} from 'use-debounce'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
  import { LuClipboardCopy } from "react-icons/lu";
import { IoMdAdd } from "react-icons/io"
import Filter from "./filter"
import { User } from "@prisma/client"
import CopyLink from "./copylink"
import ExportFile from "./export-file"
import { toast } from "sonner"
import { RxCross2 } from "react-icons/rx"
interface HeaderProps {
    customer: User[] | any;
    user2: User[] | any;
    currentUser: any;
    handleLoading: (value:boolean) => void;
}

const HeaderCustomer:React.FC<HeaderProps> = ({
    customer =[],
    user2 = [],
    currentUser,
    handleLoading,
}) =>{
    const [text,setText] = useState('')
    const [current,setCurrent] = useState<any>(null)
 
    const [query] = useDebounce(text, 300);
    const inputRef = useRef<any>(null)
  
   
    

    const router = useRouter()

     //handle reset
     const handleReset = useCallback(()=>{
        router.push(`/dashboards/customers?search=&role=&action=&start=&end=&page=1&per_page=10`);
        setText('')
    },[router])

    const handleAddNew = () =>{
        if(current.role === 'no'){
            toast.warning("Only create new user with exercute peremission !!!");
            return;
        }
        if(current?.permission && current?.permission === 'read') {
            toast.warning("Only create new user with exercute permission !!!");
            return;
        }
        router.push('/dashboards/customers/add')
    }

    useEffect(()=>{
        handleLoading(true)
        router.push(`/dashboards/customers/?search=${query}&page=1&per_page=10`)
    },[router,query,handleLoading])
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
        const result = customer && customer.find((item:any)=>item.email === currentUser.user.email);
        setCurrent(result)
     },[currentUser,customer])
    return (
        <div>
            <div className="flex justify-between items-center px-2 py-2">
            <div className="relative w-[31.5%]">
                        <div className="absolute top-2 left-2 "><IoSearchSharp className="w-3 h-3 text-white"/></div>
                        <div className="absolute top-1.5 right-2 text-[11px] text-neutral-400 flex items-center justify-start gap-1">
                            <div className="border border-neutral-400 px-1 py-[0.01rem] rounded-md flex items-center justify-center">Ctrl</div>
                    
                            <div className="border border-neutral-400 px-1 py-[0.01rem] rounded-md flex items-center justify-center">M</div>
                        </div>
                        {customer.length < user2.length && (
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
                                        <span>{customer.length } item is finded</span>
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
                            className="w-full px-2 py-1 pl-8 pr-16 rounded-md text-neutral-100 bg-slate-500/60 text-[14px] focus:outline-none" 
                            placeholder="Search ... "
                            onChange={(e)=> setText(e.target.value)}
                            value={text}
                            />
                            
                </div>
               <div className="flex items-center justify-end gap-2">
                {/* export to SCV file */}
                <ExportFile
                    data = {customer}
                    currentUser = {current}
                    filename='customer'
                />
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
                {/* filter */}
               <Popover>
                        <PopoverTrigger  >
                            <IoFilterSharp 
                                
                                className="w-4 h-4 text-neutral-400 hover:text-white transition-all duration-300" 
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
                    className="hover:text-white text-neutral-400  py-1 text-[15px] rounded-md duration-300 transition-all"
                >
                     <IoMdAdd className="w-4 h-4" /> 
                </button>
               </div>
            </div>
        </div>
    )
}

export default HeaderCustomer