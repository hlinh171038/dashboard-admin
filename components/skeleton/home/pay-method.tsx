"use client"

import { Skeleton } from "@/components/ui/skeleton"

export const PayMethodSkeleton = () =>{
    return (
        <div className="bg-slate-600  text-[14px] text-neutral-100 rounded-md p-2">
        <div className="text-white text-[16px] font-bold flex items-center justify-between mb-2">
            <div> Payment Method</div>
            <Skeleton className="h-4 w-12" />
        </div>
         <div className="w-full flex flex-col gap-2">
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-full h-4" />
         </div>
       </div>
    )
}