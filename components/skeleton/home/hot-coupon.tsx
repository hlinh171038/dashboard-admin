"use client"

import { Skeleton } from "@/components/ui/skeleton"

const array = [0,1,2,3,4,5,6]

export const HotCouponSkeleton = () =>{
    return (
        <div className="text-[14px] text-neutral-100 rounded-md p-2 bg-slate-600">
            <div className="mb-2">
            <div className="text-white text-[16px] font-bold flex items-center justify-between ">
            <div> Hot Coupon</div>
            <Skeleton className="h-4 w-12 " />

            </div>
            </div>
            <div className="flex flex-col gap-2">
                {array.map((item:any)=>{
                    return (
                        <div key={item} className="flex items-center justify-between">
                            
                            <div className="space-y-0.5">
                                <Skeleton className="h-4 w-[150px]" />
                                <Skeleton className="h-4 w-[100px]" />
                            </div>
                            <Skeleton className="h-4 w-2 rounded-sm" />
                        </div>
                    )
                })}
            </div>
            

            </div>
    )
}