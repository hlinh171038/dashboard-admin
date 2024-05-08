"use client"

import { Skeleton } from "@/components/ui/skeleton"


const Loading = () =>{

    return (
        <div className="px-2">
            <div className="bg-slate-600 rounded-md px-2 py-4 grid grid-cols-2">
                <div className="col-span-2 flex flex-col gap-6">
                   
                  <Skeleton className="w-full h-6" />
                  <Skeleton className="w-full h-6" />
                  <Skeleton className="w-full h-6" />
                    <div className="grid grid-cols-2 gap-2">
                        <Skeleton className="w-full h-6" />
                        <Skeleton className="w-full h-6" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Skeleton className="w-20 h-6" />
                        <Skeleton className="w-24 h-6" />
                        <Skeleton className="w-16 h-6" />
                        <Skeleton className="w-24 h-6" />
                    </div>
                  <Skeleton className="w-full h-6" />
                  <Skeleton className="w-full h-20" />
                  <Skeleton className="w-full h-6 mt-2" />
            
                </div>
            </div>
        </div>
    )
}

export default Loading