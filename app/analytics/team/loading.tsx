"use clinet"

import { TotalCardUserSkeleton } from "@/components/skeleton/customer/total-card"
import { OverViewSkeleton } from "@/components/skeleton/report/overview"
import { HeaderSkeleton } from "@/components/skeleton/team/header-leader"

import { LeaderSkeleton } from "@/components/skeleton/team/leader"
import { TableSkeleton } from "@/components/skeleton/team/table"
import { TableQuantitySkeleton } from "@/components/skeleton/team/table-quantity"
import { TopCategorySkeleton } from "@/components/skeleton/transaction/top-category"
import { Skeleton } from "@/components/ui/skeleton"
import { MdCopyAll } from "react-icons/md"
import { PiMoneyDuotone } from "react-icons/pi"

const array = [0,1,2,3,4,5,6,7,8,9]

const Loading = () =>{
    return (
        <div className="px-2 w-full flex flex-col gap-2">
        <div className="grid grid-cols-6 gap-2">
            <div className="col-span-2  flex flex-col gap-2 h-full w-full text-[14px] text-neutral-400" >
                {/* team manager card */}
               <div className="bg-slate-600 px-2  rounded-md">
                <div>
                    <TotalCardUserSkeleton team/>
                </div>
               </div>
               {/* admin  */}
                <div className="bg-slate-600 px-2 py-2 rounded-md">
                    <TableQuantitySkeleton
                       
                    />
                </div>
            </div>
            {/* statictical */}
            <div className="col-span-4 bg-slate-600 px-2 py-2 rounded-md flex flex-col gap-2 h-full w-full text-[14px] text-neutral-400 ">
               <div className="flex items-center justify-between ">
                <div>
                        <div className="text-[15px] text-neutral-100">Department & Employee</div>
                        <div>Statictical show the amount of memeber each department.</div>
                    </div>
                    <div className=" flex items-center justify-start gap-1 text-[14px] text-neutral-100 px-2">
                        <Skeleton className="w-12 h-6" />
                        <Skeleton className="w-20 h-6" />
                        <Skeleton className="w-20 h-6" />
                    </div>
               </div>
               <div className="w-full flex items-center justify-end text-[13px] text-neutral-400 mb-[-10px] p-2">Date: <Skeleton className="w-20 h-4" /></div>
                <Skeleton className="w-full h-[250px]" />
            </div>
        </div>
        <div className="bg-slate-600 px-2 py-2 rounded-md flex flex-col gap-2 h-full w-full">
            <div className="flex items-start justify-start">
                <Skeleton className="w-20 h-6" />
            </div>
            <HeaderSkeleton />
            <LeaderSkeleton />
            <TableSkeleton />
        </div>
        
    </div>
    )
}

export default Loading