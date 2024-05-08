"use client"

import { CreateNewSkeleton } from "@/components/skeleton/customer/create-new"
import { TableSkeleton } from "@/components/skeleton/customer/table"
import { TotalCardUserSkeleton } from "@/components/skeleton/customer/total-card"
import { TotalCardUserAdminSkeleton } from "@/components/skeleton/customer/total-card-admin"
import { WeeklyStaticallySkeleton } from "@/components/skeleton/home/weekly-statically"
import { Skeleton } from "@/components/ui/skeleton"
import { MdHistory } from "react-icons/md"



const LoadingCustomer  =() =>{
    return (
        <div className="px-2">
            <div className=" relative bg-slate-600 rounded-md p-2  text-[14px] text-neutral-400 flex flex-col gap-2">
            <div className="text-[15px] text-neutral-100 flex items-center justify-between">
                <div className="flex items-center justify-start gap-1">
                    <MdHistory className="w-4 h-4"/>
                    <span>History</span>
                </div>
                <div className="flex items-center justify-start gap-1">
                <div className=" text-[11px] text-neutral-400 flex items-center justify-start gap-1">
                    <div className="border border-neutral-400 px-1 py-[0.01rem] rounded-md">Ctrl</div>
            
                    <div className="border border-neutral-400 px-1 py-[0.01rem] rounded-md">Z</div>
                </div>
            </div>
            </div>
            
            <div className="flex items-center justify-between">
                <Skeleton className="w-44 h-6" />
                <div className="flex items-center justify-end gap-2">
                    <Skeleton className="w-6 h-6"/>
                    <Skeleton className="w-6 h-6"/>
                </div>
                
            </div>
            {[0,1,2,3,4,5,6,7,8,9].map((item:any)=>{
                return (
                    <div key={item} className="flex items-center justify-start gap-2">
                        <div className="w-6 h-4 flex items-start justify-start">
                            <Skeleton className="h-4 w-4 mt-[-10px]" />
                        </div>
                        <div className=" flex flex-col gap-1 pt-0.5" >
                            <Skeleton className="h-4 w-[100px]" />
                            <Skeleton className="h-4 w-[60px]" />
                        </div>
                        <div className="flex items-start justify-start ml-2"><Skeleton className="h-4 w-[150px] mt-[-19px]" /></div>
                    </div>
                )
            })}
            
        </div>
        </div>
    )
}

export default LoadingCustomer