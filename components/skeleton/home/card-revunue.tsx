"use client"

import { Skeleton } from "@/components/ui/skeleton"

export const CardRevenueSkeleton = () =>{
    return (
        <div className="bg-slate-600 rounded-md px-2 py-1">
                        <div className="flex items-center justify-start gap-2 mb-4">
                            <Skeleton className="h-12 w-12 rounded-md" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-[60px]" />
                                <Skeleton className="h-4 w-[80px]" />
                            </div>
                        </div>
                       <Skeleton className="h-4 w-[80%]"/>
                   </div>
    )
}