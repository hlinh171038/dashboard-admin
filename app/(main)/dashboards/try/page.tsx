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
        <div className="w-full h-auto px-2 text-neutral-400 text-[14px]">
            
            <div className="p-2 bg-slate-600 rounded-md">
                {/* header */}
            <div className="flex items-center justify-between text-[15px]">
                <div className="font-bold text-[15px] text-neutral-100">Step 2</div>
                <div className="flex items-center justify-end gap-2">
                    <span><AiFillHome  className="h-4 w-4 hover:text-white cursor-pointer" /></span>
                    <span><CgArrowLongRight /></span>
                    <span ><GrUserAdmin className="w-4 h-4 hover:text-white cursor-pointer" /></span>
                    <span><CgArrowLongRight /></span>
                    <span className="border border-[#4FA29E] rounded-full text-white px-2 py-2 flex items-center justify-center hover:bg-[#4FA29E] cursor-pointer"><VscLaw className="w-4 h-4" /></span>
                    <span><CgArrowLongRight /></span>
                    <span className="border border-[#4FA29E] rounded-full text-white px-2 py-2 flex items-center justify-center hover:bg-[#4FA29E] cursor-pointer"><MdDone className="w-4 h-4"/></span>
                </div>
            </div>
                {/* 2 */}
            <div className="text-[15px] text-nutral-100 border-b border-t border-neutral-400 my-2 py-2 px-2" >
                <div>Department and permission for administrator.</div>
                <div className="px-2">
                    <div>1. Choose department. </div>
                    <div >2.Choose permission.</div>

                </div>
            </div>
           
                <div>
                        <div className="text-[15px] text-neutral-100 font-bold">Choose Department</div>
                        <div></div>
                    </div>
                    
                    <table
                        id="trend-sale-table"
                        className="w-full my-1"
                    >
                        <tr className="font-bold text-[15px] text-neutral-100">
                            <td></td>
                            <td className="px-2">Department</td>
                            <td className="px-2">Member</td>
                            <td className="px-2">Leader</td>
                        </tr>
                       
                        {[0,1,2,3,4,5].map((item:any)=>{
                            return (
                                <tr key={item}  >
                                    <td className="w-12 ">
                                        <Skeleton className="w-4 h-4" />
                                    </td>
                                    <td className="px-2 capitalize">
                                        <Skeleton className="w-20 h-4"/>
                                    </td>
                                    <td className="px-2">
                                        <Skeleton className="w-16 h-4"/>

                                    </td>
                                    <td  className="px-2">
                                    <Skeleton className="w-32 h-4"/>

                                    </td>
                                </tr>
                            )
                        })}
                      
                    </table>
                <div>
                <div className="text-[15px] text-neutral-100 font-bold">Permission</div>
                <div>
                    <Skeleton className="w-32 h-4"/>
                    <Skeleton className="w-20 h-4"/>
                    <Skeleton className="w-48 h-4"/>
                </div>
                </div>
                <Skeleton className="w-full h-4"/>
            </div>
               

                
            </div>
           
       
    )
}

export default LoadingCustomer