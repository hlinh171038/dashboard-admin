"use client"

import { CardRevenueSkeleton } from "@/components/skeleton/home/card-revunue"
import { CardUserSkeleton } from "@/components/skeleton/home/card-use"
import { LastTransactionSkeleton } from "@/components/skeleton/home/last-transaction"
import { Skeleton } from "@/components/ui/skeleton"

const Loading  =() =>{
    return (
        <div className="grid grid-col-4 gap-2 px-2 ">
           <div className="col-span-3 flex flex-col gap-2">
            {/* new user */}
                <div className="grid grid-cols-3 gap-2 ">
                  <CardUserSkeleton />
                  <CardRevenueSkeleton />
                  <CardRevenueSkeleton />
                </div>
                {/* last transaction */}
                <LastTransactionSkeleton />
                {/* Weekly Statictical */}
        </div>
           <div className="col-span-1"></div>
        </div>
    )
}

export default Loading