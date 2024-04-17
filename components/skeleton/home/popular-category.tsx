"use client"

import { Skeleton } from "@/components/ui/skeleton"


const array = [0,1,2,3,4]
export const PopularCategorySkeleton =() =>{
    return (
        <div className="bg-slate-600 rounded w-full p-2  transition-all duration-300 relative">
            <div className="text-[15px] text-neutral-100 font-bold ">Popular Category</div>
            <div className="text-[14px] text-neutral-400">List of hotest category sort by quanity of transaction.</div>
           <div className="flex flex-col gap-2  w-full my-4">
            <Skeleton className="w-[160px] h-[160px] rounded-full aspect-square " />
            <div className="w-full flex flex-col gap-1">
               {array.map((item:any)=>{
                return <div key={item} className="flex items-center space-x-4">
                            <Skeleton className="h-6 w-6 rounded-sm aspect-square" />
                            <Skeleton className="h-4 w-[100px]" />
                        </div>
               })}
            </div>
           </div>
            <div className="absolute bottom-1 right-1 text-[14px] text-neutral-100 ">
                <Skeleton className="h-4 w-12" />
                </div>
        </div>
    )
}