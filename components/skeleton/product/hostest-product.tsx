"use client"

import { Skeleton } from "@/components/ui/skeleton"

const array = [0,1,2,3,4,5,6]

export const HostestProductSkeleton = () =>{
    return (
        <div>
            <div className="w-full pb-2 flex items-center justify-between text-neutral-100 text-[14px]">
               <div className="flex items-center justify-start gap-2">
                    <Skeleton className="w-12 h-6" />
                    <Skeleton className="w-12 h-6" />
                </div> 
                <div className="flex items-center justify-start gap-2">
                    <Skeleton className="w-6 h-6" />
                    <Skeleton className="w-12 h-6" />
                    <Skeleton className="w-10 h-6" />
                </div>
            </div>
            <div>
                <table id="trend-sale-table" className="w-full text-start text-[14px] gap-2 text-neutral-400 ">
                    <tr>
                        <td>Product</td>
                        <td>Category</td>
                        <td>Quantity</td>
                    </tr>
                    {array.map((item:any)=>{
                        return (
                            <tr key={item}>
                                <td className="px-2 py-1">
                                    <div className="flex items-center justify-start gap-1">
                                        <Skeleton className="w-4 h-4" />
                                        <Skeleton className="w-14 h-4" />
                                    </div>
                                </td>
                                <td className="px-2 py-1">
                                    <Skeleton className="w-14 h-4" />
                                </td>
                                <td className="px-2 py-1">
                                    <Skeleton className="w-10 h-4" />
                                </td>
                            </tr>
                        )
                    })}
                    
                </table>
            </div>
        </div>
    )
}