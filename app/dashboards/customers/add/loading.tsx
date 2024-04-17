"use client"

import { Skeleton } from "@/components/ui/skeleton"

const Loading = () =>{
    return (
        <div className="px-2 ">
            
            <div className="bg-slate-600 w-full h-auto rounded-md px-2 py-4 flex flex-col gap-2">
            <div className="grid grid-cols-2 gap-8">
                    <div className="col-span-1 flex flex-col ">
                        {/* upload image */}
                           <Skeleton className="w-full h-full" />
                            
                    </div>
                    <div className="col-span-1 flex flex-col gap-8">
                        {/* user name */}
                        <Skeleton className="w-full h-6" />
                        <Skeleton className="w-full h-6" />
                        <Skeleton className="w-full h-6" />
                        <Skeleton className="w-full h-6" />
                        <Skeleton className="w-full h-6" />
                        <Skeleton className="w-full h-6" />
                        <Skeleton className="w-full h-20" />
                       
                    </div>
            </div>
            
            </div>
            <Skeleton className="w-full h-6 mt-2" />
        </div>
    )
}

export default Loading