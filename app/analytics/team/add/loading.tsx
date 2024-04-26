"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { AiFillHome } from "react-icons/ai"
import { CgArrowLongRight } from "react-icons/cg"
import { GrUserAdmin } from "react-icons/gr"
import { IoMdPersonAdd } from "react-icons/io"
import { MdDone, MdHistory } from "react-icons/md"
import { VscLaw } from "react-icons/vsc"



const LoadingCustomer  =() =>{
    return (
        <div className="w-full h-auto px-2 text-[14px] text-neutral-400 ">
            <div className="bg-slate-600 rounded-md p-2">
            <div className="flex items-center justify-between text-[15px]">
                <div className="font-bold text-[15px] text-neutral-100">Step 1</div>
                <div className="flex items-center justify-end gap-2">
                    <span><AiFillHome  className="h-4 w-4 hover:text-white cursor-pointer" /></span>
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
            <div className="">
                <Skeleton className="w-40 h-6"/>          
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
               {
                
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
                }
                    
               
                
            </table>  
            <div className="flex items-center justify-end ">
                <Skeleton className="w-32 h-6" />
            </div>
            
        </div>
        </div>
    )
}

export default LoadingCustomer