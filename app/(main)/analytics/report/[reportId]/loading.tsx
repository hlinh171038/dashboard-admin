"use client"

import { Skeleton } from "@/components/ui/skeleton"

const Loading = () =>{
    return (
        <div className="grid grid-cols-3 gap-2 px-2">
            
           <div className=" rounded-md col-span-1 flex flex-col items-center justify-start gap-4">
            <Skeleton className="w-full h-full rounded-full aspect-square" />
            <Skeleton className="w-full h-6 " />
           </div>
           <div className="bg-slate-600 rounded-md col-span-2 px-2 py-4 flex flex-col gap-6">
            <Skeleton className="w-full h-6" />
            <Skeleton className="w-full h-6" />
            <Skeleton className="w-full h-6" />
            <Skeleton className="w-full h-6" />
            <Skeleton className="w-full h-6" />
            <Skeleton className="w-full h-6" />
            <Skeleton className="w-full h-6" />
                
           </div>
        </div>
    )
}

export default Loading