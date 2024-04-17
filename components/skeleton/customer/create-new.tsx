"use client"

import { Skeleton } from "@/components/ui/skeleton"

export const CreateNewSkeleton = () =>{
    return (
        <div className="bg-slate-600 rounded-md p-2 relative">
        <div className="font-bold text-[15px] text-neutral-100">Action</div>
        <div className="text-neutral-400 text-[14px]">You just create new user by admin role</div>
        <Skeleton className="w-full h-6 mt-2" />
    </div>
    )
}