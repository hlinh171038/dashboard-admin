'use client'

import { Skeleton } from "@/components/ui/skeleton"

const Loading = () =>{
    return (
        <div
            className=" flex flex-col gap-2"
        >

            <div  className="px-2 grid grid-cols-6 gap-2">
                <div className="col-span-4">
                    <div className="grid grid-cols-3 gap-2">
                        <Skeleton className="col-span-4 w-full h-[200px] rounded-full" />
                        <Skeleton className="col-span-2 w-full h-[200px] rounded-full" />
                        <Skeleton className="col-span-2 w-full h-[200px] rounded-full" />
                    </div>
                    <div></div>
                </div>
                <Skeleton className="col-span-4 w-full h-[50%] rounded-full" />
                <Skeleton className="col-span-2 w-full h-[50%] rounded-full" />
            </div>
            <div className="mt-4">
                
            </div>
        </div>
    )
}

export default Loading