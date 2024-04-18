"use clinet"

import { OverViewSkeleton } from "@/components/skeleton/report/overview"
import { TableSkeleton } from "@/components/skeleton/report/table"
import { TopCategorySkeleton } from "@/components/skeleton/transaction/top-category"
import { Skeleton } from "@/components/ui/skeleton"
import { MdCopyAll } from "react-icons/md"
import { PiMoneyDuotone } from "react-icons/pi"

const array = [0,1,2,3,4,5,6,7,8,9]

const Loading = () =>{
    return (
        <div className="flex flex-col gap-2 text-white px-2">
            <div className="grid grid-cols-6 gap-2">
                <div className="col-span-2 rounded-md bg-slate-500/60">
                    <OverViewSkeleton/>
                </div>
                <div className="col-span-4 rounded-md bg-slate-500/60">
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
            </div>
           <div>
            {/* customer report to admin */}
            <div className="col-span-2 rounded-md bg-slate-500/60 px-2 py-2">
                <TableSkeleton/>

            </div>
           </div>
            
        </div>
    )
}

export default Loading