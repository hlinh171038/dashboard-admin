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
  import ExportFile from "./export-file"
import { LuClipboardCopy } from "react-icons/lu"
import Filter from "./filter"
import { Product, User } from "@prisma/client"
import CopyLink from "../customers/copylink"
import { RxCross2 } from "react-icons/rx";
import { toast } from "sonner"

interface ProducHeaderProps {
    category: string
    brand: string
    price: string
    location: string
    stock: string
    search: string
    product: Product[] | any;
    product2: Product[] | any;
    currentUser: any;
    customer: User[] | any;
}

const ProductHeader:React.FC<ProducHeaderProps> = ({
    category,
    brand,
    price,
    location,
    stock,
    search,
    product = [],
    product2 = [],
    currentUser,
    customer = []
}) =>{
    const [text,setText] = useState('')
    const [query] = useDebounce(text, 300);
  
    const router = useRouter()
    const inputRef = useRef<any>(null)
    const [current,setCurrent] = useState<any>(null)

    const handleAddNew = useCallback(()=>{
        if(current.role === 'no'){
            toast.warning("Only create new user with exercute peremission !!!");
            return;
        }
        if(current.permission === 'read') {
            toast.warning("Only create new user with exercute permission !!!");
            return;
        }
        router.push('/dashboards/product/add')
    },[router,current])

    //handle reset
    const handleReset = useCallback(()=>{
        router.push(`/dashboards/product/?query=&category=&brand=&location=&price=&stock=&page=1&per_page=10`)
        setText('')
    },[router])

    useEffect(()=>{
        router.push(`/dashboards/product/?query=${query}&category=${category}&brand=${brand}&location=${location}&price=${price}&stock=${stock}&page=1&per_page=10`)
       
    },[query,category,price,location,stock,brand,router,])

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
                <div className="relative">
                        <div className="absolute top-2 left-2 "><IoSearchSharp className="w-3 h-3 text-white"/></div>
                        <div className="absolute top-1.5 right-2 text-[11px] text-neutral-400 flex items-center justify-start gap-1">
                            <div className="border border-neutral-400 px-1 py-[0.01rem] rounded-md flex items-center justify-center">Ctrl</div>
                    
                            <div className="border border-neutral-400 px-1 py-[0.01rem] rounded-md flex items-center justify-center">M</div>
                        </div>
                        {product.length < product2.length && (
                            <div className="absolute bottom-[-20px] left-0 text-[13px] text-green">
                                {product.length === 0 ? (
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
                                        <span>{product.length } item is finded</span>
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
                            className="px-2 py-1 pl-8 pr-16 rounded-md bg-slate-500/60 text-sm text-neutral-200 focus:outline-none" 
                            placeholder="Search ... "
                            value={text}
                            onChange={(e)=>setText(e.target.value)}
                        />
                </div>
                
                <div className="flex items-center justify-end gap-2">
                {/* export to SCV file */}
                <ExportFile
                    data = {product}
                     currentUser = {current}
                    filename='porduct'
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
                                    product2 = {product2}
                                    product = {product}
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

export default ProductHeader