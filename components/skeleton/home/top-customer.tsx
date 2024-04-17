"use client"

import { Skeleton } from "@/components/ui/skeleton"
const array = [0,1,2,3,4,5,6]

export const TopCustomerSkeleton = () =>{
    return (
        <div className="text-[14px] text-neutral-100 ">
             <div className="text-white text-[16px] font-bold flex items-center justify-between">
                       <div> Customer Service</div>
                       <Skeleton className="h-4 w-20" />
                    </div>
                    <div className="text-neutral-400 font-normal text-[14px] mb-2">
                       
Customer service is the assistance and support provided by a company to its customers, both before and after they purchase or use a product or service.
                    </div>
            <div className="font-bold text-[15px] my-2 mb-4">Top 6 Best Customer</div>
            <div className="flex flex-col gap-2">
                {array.map((item:any)=>{
                    return (
                        <div key={item} className="flex items-center justify-start gap-2">
                            <Skeleton className="h-8 w-8 rounded-full" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-[250px]" />
                                <Skeleton className="h-4 w-[200px]" />
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}