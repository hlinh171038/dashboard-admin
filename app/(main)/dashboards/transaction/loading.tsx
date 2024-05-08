"use clinet"

import { TotalCardUserSkeleton } from "@/components/skeleton/customer/total-card"
import { TableSkeleton } from "@/components/skeleton/transaction/table"
import { TopCategorySkeleton } from "@/components/skeleton/transaction/top-category"
import { Skeleton } from "@/components/ui/skeleton"

const Loading = () =>{
    return (
        <div className="flex flex-col items-start justify-start gap-2 w-full  px-2 ">
        {/* header */}
        <div
            className="grid grid-cols-3 items-start justify-between gap-2 w-full "
        >
            {/* col-1 */}
            <div className="col-span-1  flex flex-col gap-2 ">
                {/* total */}
                <TotalCardUserSkeleton transaction/>
                {/* weekly statatitical */}
                <div className="bg-slate-600 rounded-md">
                    <TopCategorySkeleton/>
                </div>
            </div>
            {/* col-2 */}
           <div
            className="col-span-2 bg-slate-600 rounded-md min-h-[200px] px-2  flex flex-col justify-between"
           >
            <div className="pl-2 py-2 flex items-center justify-between">
                <div>
                    <div className="text-[15px] text-neutral-100 font-bold ">Weekly Statictical</div>
                    <Skeleton className="w-32 h-4" />
                </div>
                <div className=" flex items-center justify-start gap-1 text-[14px] text-neutral-100 px-2">
                    <Skeleton className="w-6 h-6" /> 
                    <Skeleton className="w-10 h-6" /> 
                    <Skeleton className="w-12 h-6" /> 
                </div>
            </div>
            <div className="w-full flex items-center justify-end text-[13px] text-neutral-400">
                Date: <Skeleton className="w-12 h-4" />
            </div>
            <div className="w-full rounded-md bg-slate-600 p-2  flex flex-col gap-2">
             <Skeleton className="w-full h-[270px] " />

            </div>
            </div>
        </div>
        {/* table */}
        <div className="w-full rounded-md bg-slate-600 p-2  flex flex-col gap-2">
            <TableSkeleton />
        </div>
    </div>
    )
}

export default Loading