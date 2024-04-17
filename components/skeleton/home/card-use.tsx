"use client"

import { Skeleton } from "@/components/ui/skeleton"

export const CardUserSkeleton = () =>{
    return (
        <div className="bg-slate-600 rounded-md px-2 py-1">
        <div className="flex items-center justify-between mb-4">
            <Skeleton className="h-4 w-[30%]"/>
            <Skeleton className="h-4 w-[40px]"/>
        </div>
        <div className="space-y-1 mt-6">
            <Skeleton className="h-4 w-[60%]" />
            <Skeleton className="h-4 w-[80%]" />
        </div>
   </div>
    )
}