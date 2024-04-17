"use client"

import { Skeleton } from "@/components/ui/skeleton"

export const WeeklyStaticallySkeleton = () =>{
    return (
        <div>
            <div className="w-full bg-slate-600 rounded-md hover:bg-slate-500/40 transition p-2 text-[14px] text-neutral-100">
                <div className="text-white text-[16px] font-bold flex items-center justify-between">
                <div> Weekly Statictical</div>
                <Skeleton className="h-4 w-20" />
                </div>
                <div className="text-neutral-400 font-normal text-[14px] mb-2">
                    Total income in this week compared with last week.
                </div>
            
                <Skeleton className="h-60 w-[100%]"/>
            </div>
            <div className="w-full flex flex-col">
                <Skeleton className="w-full h-[100px]" />
                
            </div>
        </div>
    )
}