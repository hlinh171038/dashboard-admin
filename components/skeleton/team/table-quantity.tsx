"use client"

import { Skeleton } from "@/components/ui/skeleton"

export const TableQuantitySkeleton = () =>{
    return (
        <div 
        className="w-full flex flex-col gap-2"
    >
        <div >
         <div className="text-[15px] text-neutral-100 ">Memebers</div>
         <div>A mount of member each Department</div>
        </div>
        <table 
            id="trend-sale-table"
            className="w-full my-1"
            >
            <tr className="text-neutral-200 text-[15px] ">
                <td className="px-2 py-1">Department</td>
                <td>
                    <div className="flex items-center justify-center">
                        Quantity
                    </div>
                </td>
                <td></td>
            </tr>
            {[0,1,2,3,4].map((item:any)=>{
                return (
                    <tr key={item} className="">
                        <td className="px-2 py-1"><Skeleton className="w-20 h-4"/></td>
                        <td className=""><div className="flex items-center justify-center"><Skeleton className="w-10 h-4"/></div></td>
                        <td className="px-2"><Skeleton className="w-16 h-4"/></td>
                    </tr>
                )
            })}
            
        </table>
    </div>
    )
}