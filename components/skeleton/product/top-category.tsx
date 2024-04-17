"use client"

import { Skeleton } from "@/components/ui/skeleton"

export const TopCategorySkeleton = () =>{
    return (
        <div className="bg-slate-600 rounded w-full p-2  transition-all duration-300 relative">
            <div className="text-[15px] text-neutral-100 font-bold ">Popular Category</div>
            <div className="text-[14px] text-neutral-400">List of hotest category sort by quanity of transaction.</div>
           <div className="flex justify-start gap-8 mt-4 ">
            <Skeleton className="w-[150px] h-[150px] rounded-full aspect-square" />
            <div className="flex flex-col gap-2 mt-2">
                <Skeleton className="w-12 h-4" />
                <Skeleton className="w-10 h-4" />
                <Skeleton className="w-12 h-4" />
                <Skeleton className="w-10 h-4" />
                <Skeleton className="w-12 h-4" />
            </div>
           </div>
            <div className="absolute bottom-1 right-1 text-[14px] text-neutral-100 flex items-center justify-end gap-1">Total:<Skeleton className="w-12 h-4"/></div>
        </div>
    )
}