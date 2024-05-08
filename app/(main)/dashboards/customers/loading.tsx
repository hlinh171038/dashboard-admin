"use client"

import { CreateNewSkeleton } from "@/components/skeleton/customer/create-new"
import { TableSkeleton } from "@/components/skeleton/customer/table"
import { TotalCardUserSkeleton } from "@/components/skeleton/customer/total-card"
import { TotalCardUserAdminSkeleton } from "@/components/skeleton/customer/total-card-admin"
import { WeeklyStaticallySkeleton } from "@/components/skeleton/home/weekly-statically"



const LoadingCustomer  =() =>{
    return (
        <div className="w-full  px-2">
        <div className="grid grid-cols-3 gap-2 mb-2">
            <div className="col-span-1 flex flex-col gap-2 ">
                <TotalCardUserSkeleton customer/>
                <TotalCardUserAdminSkeleton />
                <CreateNewSkeleton />
            </div>
            <div className="col-span-2 bg-slate-600 rounded-md">
                <WeeklyStaticallySkeleton customer/>
            </div>
        </div>
        
        <TableSkeleton />
       
    </div>
    )
}

export default LoadingCustomer