"use client"

import { useRouter } from "next/navigation"
import { useCallback, useEffect, useRef, useState } from "react"
import { IoMdAdd } from "react-icons/io"
import { IoFilterSharp, IoSearchSharp } from "react-icons/io5"
import { useDebounce } from "use-debounce"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
//import ExportFile from "../customers/export-file"
import { LuClipboardCopy } from "react-icons/lu"

import { Mail, Product, User } from "@prisma/client"
import CopyLink from "../customers/copylink"
import { RxCross2 } from "react-icons/rx";
import Filter from "./filter"

interface ProducHeaderProps {
   mail: Mail[] | any;
   mail2: Mail[] | any;
   search: string;
   page: number;
   per_page: number;
   currentUser: any;
   user: User[] | any;
}

const ReportHeader:React.FC<ProducHeaderProps> = ({
    mail = [],
    mail2 =[],
    user = [],
    currentUser,
    search,
    page,
    per_page
}) =>{
    const [text,setText] = useState('')
    const [query] = useDebounce(text, 300);
    
    const router = useRouter()
    const inputRef = useRef<any>(null)

    const handleAddNew = useCallback(()=>{
        router.push('/dashboards/product/add')
    },[router])

    //handle reset
    const handleReset = useCallback(()=>{
        router.push(`/analytics/report?search=&status=&role=&start=&end=&page=1&per_page=10`);
        setText('')
    },[router])

    useEffect(()=>{
        router.push(`/analytics/report?search=${query}&page=1&per_page=10`)
       
    },[query,router])

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

    return (
        <div className="mb-4">
            <div className="flex justify-between items-center ">
                <div className="relative">
                        <div className="absolute top-2 left-2 "><IoSearchSharp className="w-3 h-3 text-white"/></div>
                        <div className="absolute top-1.5 right-2 text-[11px] text-neutral-400 flex items-center justify-start gap-1">
                            <div className="border border-neutral-400 px-1 py-[0.01rem] rounded-md flex items-center justify-center">Ctrl</div>
                    
                            <div className="border border-neutral-400 px-1 py-[0.01rem] rounded-md flex items-center justify-center">M</div>
                        </div>
                        {mail.length < mail2.length && (
                            <div className="absolute bottom-[-20px] left-0 text-[13px] text-green">
                                {mail.length === 0 ? (
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
                                        <span>{mail.length } item is finded</span>
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
                            className="px-2 py-1 pl-8 pr-16 rounded-md bg-slate-500/60 text-[14px] text-neutral-200 focus:outline-none" 
                            placeholder="Search ... "
                            value={text}
                            onChange={(e)=>setText(e.target.value)}
                        />
                </div>
                
                <div className="flex items-center justify-end gap-2">
                {/* export to SCV file */}
                {/* <ExportFile
                    data = {mail}
                    filename='Mail'
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
                                    customer = {user}
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
                                mail = {mail}
                               />
                        </PopoverContent>
                    </Popover>
              
               </div>
            </div>
        </div>
    )
}

export default ReportHeader