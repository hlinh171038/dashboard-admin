"use client"

import ItemTable from "@/components/team/item-table"
import Pagination from "@/components/team/paginnation-add"

import { Skeleton } from "@/components/ui/skeleton"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { FaUserSlash } from "react-icons/fa"
import { IoReturnDownBack, IoSearchSharp } from "react-icons/io5"
import { toast } from "sonner"
import { useDebounce } from "use-debounce"
import { CgArrowLongRight } from "react-icons/cg";
import { AiFillHome } from "react-icons/ai";
import { GrUserAdmin } from "react-icons/gr";
import { VscLaw } from "react-icons/vsc";
import { MdDone } from "react-icons/md";
import {IoMdPersonAdd } from 'react-icons/io'

interface AddProps {
    page:number;
    per_page:number;
    search: string;
}

const Add:React.FC<AddProps> = ({
    page,
    per_page,
    search
}) =>{
    const router = useRouter()
    const [text,setText] = useState('')
    const [query] = useDebounce(text,300)
    const [isLoading,setIsLoading] = useState(false)
    const [data,setData] = useState<any>([])
    const [status,setStatus] = useState(true);

    //pagination
    const max = Math.ceil (data.length /per_page);

    const start = (page *per_page) - per_page;
    const end = page*per_page;

    const updateData = data.slice(start,end)
    // search + skelton
    useEffect( ()=>{
        setIsLoading(true)
       // console.log(array)
        axios.post('/api/filter-user',{search:text})
            .then((res)=>{
                console.log(res.data)
                setData(res.data && res.data)
                //toast.success('search ');
                router.refresh()
               
            })
            .catch((err:any)=>{
                toast.error("Something went wrong !!!")
            }).finally(()=>{
                
                setIsLoading(false)
               
            })
     },[router,text])
    console.log(data)

    // handle loading
   const handleLoading = useCallback((value:boolean)=>{
    setStatus(value)
 },[])

     //handle back product
     const handleBack = useCallback(()=>{
        setText('')
        router.push(`/analytics/team/add?search=&page=1&per_page=10`);
    },[router])

    useEffect(()=>{
        router.push(`/analytics/team/add?search=${query}&page=1&per_page=10`)
    },[router,query])

    return (
        <div className="w-full h-auto px-2 text-[14px] text-neutral-400 ">
            <div className="bg-slate-600 rounded-md p-2">
            <div className="flex items-center justify-between text-[15px]">
                <div className="font-bold text-[15px] text-neutral-100">Step 1</div>
                <div className="flex items-center justify-end gap-2">
                    <span><AiFillHome  className="h-4 w-4 hover:text-white cursor-pointer" onClick={()=>router.push('/analytics/team?search_admin=&page_admin=1&per_page_admin=10')}/></span>
                    <span><CgArrowLongRight /></span>
                    <span className="border border-[#4FA29E] rounded-full text-white px-2 py-2 flex items-center justify-center hover:bg-[#4FA29E] cursor-pointer"><GrUserAdmin className="w-4 h-4"/></span>
                    <span><CgArrowLongRight /></span>
                    <span ><VscLaw className="w-4 h-4" /></span>
                    <span><CgArrowLongRight /></span>
                    <span><MdDone className="w-4 h-4"/></span>
                </div>
            </div>

            <div className="text-[15px] text-nutral-100 border-b border-t border-neutral-400 my-2 py-2 px-2" >
                <div>Choose user who will be administrator.</div>
                <div className="px-2">
                    <div>1. Search the user who will be admin.</div>
                    <div className="flex items-center justify-start gap-1">2. Click <span className="mt-[-2px]"><IoMdPersonAdd className="w-4 h-4"/></span> to add admin.</div>
                   
                </div>
            </div>
            <div className="w-full flex items-center justify-between">
            <div className="relative">
                <div className="absolute top-2 left-2 "><IoSearchSharp className="w-3 h-3 text-neutral-100"/></div>
                <div className="absolute top-1.5 right-2 text-[11px] text-neutral-400 flex items-center justify-start gap-1">
                    <div className="border border-neutral-400 px-1 py-[0.01rem] rounded-md flex items-center justify-center">Ctrl</div>
            
                    <div className="border border-neutral-400 px-1 py-[0.01rem] rounded-md flex items-center justify-center">M</div>
                </div>
                <input 
                    className="px-2 py-1 pl-8 rounded-md outline-none bg-slate-500/60 text-[14px] text-neutral-100 focus:outline-none  " 
                    placeholder="Search ... "
                    onChange={(e)=> setText(e.target.value)}
                    value={text}
                    />          
            </div>
        </div>
            

                <table className="w-full mt-4">
                <tr className="text-neutral-100 text-[15px] capitalize font-bold">
                    <td>Member</td>
                    <td>email</td>
                    <td>date</td>
                    <td>status</td>
                    <td>role</td>
                    <td></td>
                </tr>
                {isLoading || !status ? (
                
                [0,1,2,3,4,5,6,7,8,9].map((item:any)=>{
                        return (
                            <tr key={item} className="my-2">
                                    <td className="w-24 flex items-center justify-start gap-1 py-2" >
                                        <div className="flex items-center justify-start gap-1">
                                            <Skeleton className="h-6 w-6 rounded-full" />
                                            <Skeleton className="h-4 w-[70px]" />
                                            
                                        </div>
                                    </td>
                                    <td><Skeleton className="h-4 w-[100px]" /></td>
                                    <td><Skeleton className="h-4 w-[70px]" /></td>
                                    <td><Skeleton className="h-4 w-[70px]" /></td>
                                    <td><Skeleton className="h-4 w-[50px]" /></td>
                                    
                                    <td>
                                        <div className="flex justify-end items-start">
                                            <Skeleton className="h-6 w-[50px]" />
                                        </div>
                                    </td>
                            </tr>
                        )
                    })
                ):(updateData && updateData.map((item:any)=>{
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
                }))}
                    
               
                
            </table>  
            {!isLoading && data && data.length === 0 && (
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
                
          
            <Pagination
                search={search}
                page={page}
                per_page={per_page}
                max={max}
                handleLoading = {handleLoading}
            />
            
        </div>
        </div>
    )
}

export default Add