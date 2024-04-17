"use client"

import { Skeleton } from "@/components/ui/skeleton"

export const TotalCardUserAdminSkeleton = () =>{
    return (
        <div className="bg-slate-600 rounded-md p-2 relative">
            <div className="font-bold text-[15px] text-neutral-100">Administrator</div>
            <div className="flex flex-col gap-1 my-2">
                <div className="flex items-center justify-start gap-2 my-2">
                    <Skeleton className="w-8 h-8" />
                    <div className="text-[12px] ">
                        <Skeleton className="w-20 h-4"/>
                        <div className="text-neutral-400">in this week</div>
                    </div>
                </div>
                
                <Skeleton className="w-32 h-4"/>
                <Skeleton className="w-32 h-4"/>
            </div>

        </div>
    )
}