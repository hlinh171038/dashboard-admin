"use client"

import { Skeleton } from "@/components/ui/skeleton"

export const AdminSkeleton = () =>{
    return (
        <div className="flex flex-col gap-2">
            <div>
            <div className="text-white text-[16px] font-bold flex items-center justify-between">
                <div> Employee</div>
                <Skeleton className="h-4 w-12" />
            </div>
            <div className="text-neutral-400 font-normal text-[14px] mb-2">
                All Positiion and role of administrator.
            </div>
            <div className="flex items-center justify-between ">
                <div>
                    <div className="flex items-center justify-start gap-1">
                        <div>Total:</div>
                        <Skeleton className="h-4 w-20" />
                    </div>
                    <div className="flex items-center justify-start gap-1">
                        <div>Active:</div>
                        <Skeleton className="h-4 w-20" />
                    </div>
                    <div className="flex items-center justify-start gap-1">
                        <div>Inactive:</div>
                        <Skeleton className="h-4 w-20" />
                    </div>
                </div>
                <Skeleton className="w-[150px] h-[150px] rounded-full aspect-square" />
            </div>
        </div>
            <Skeleton className="w-full h-[300px]" />
        </div>
    )
}