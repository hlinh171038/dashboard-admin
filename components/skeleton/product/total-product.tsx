"use client"

import { Skeleton } from "@/components/ui/skeleton"

export const TotalProductSkeleton = () =>{
    return (
        <div className="bg-slate-600 rounded-md p-2 relative">
            <div className="flex items-center justify-between">
            <div>
                <div className="font-bold text-[17px] text-neutral-100">Product Manager</div>
                <div className="flex items-center justify-start gap-2 my-2">
                <Skeleton className="w-8 h-8" />
                <div className="text-[12px] ">
                    <Skeleton className="w-20 h-4"/>
                    <div className="text-neutral-400">in this week</div>
                </div>
            </div>
            </div>
            {/*  */}
            <div className="text-[14px] text-neutral-400">
                <div className="text-slate-600">Product Statictical</div>
                <div className="flex flex-col gap-2">
                    <Skeleton className="w-20 h-4" />
                    <Skeleton className="w-20 h-4" />
                </div>
            </div>
            </div>
            <Skeleton className="w-full h-40" />
           
        </div>
    )
}