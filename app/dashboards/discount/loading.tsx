"use client"


import { TotalCardUserSkeleton } from "@/components/skeleton/customer/total-card"
import { CreateNewSkeleton } from "@/components/skeleton/discount/create-new"
import { TableSkeleton } from "@/components/skeleton/discount/table"
import { HotCouponSkeleton } from "@/components/skeleton/home/hot-coupon"
import { Skeleton } from "@/components/ui/skeleton"



const Loading = () =>{

    return (
        <div className="px-2 w-full">
            <div className="grid grid-cols-7 gap-2 mb-2">
              <div className="col-span-3 flex flex-col gap-2 ">
                <TotalCardUserSkeleton product />
                <CreateNewSkeleton />
              </div>
              <div className="col-span-4 bg-slate-600 rounded-md px-2">
                <HotCouponSkeleton discount />
              </div>
            </div>
            <div className="bg-slate-600 rounded-md px-2 py-2 w-full mb-2">
                <TableSkeleton />
            </div>
        </div>
    )
}

export default Loading