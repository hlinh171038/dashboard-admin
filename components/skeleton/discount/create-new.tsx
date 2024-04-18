"use client"

import { Skeleton } from "@/components/ui/skeleton"

export const CreateNewSkeleton = () => {
    return (
        <div className="bg-slate-600 rounded-md p-2 relative">
            <div className="font-bold text-[15px] text-neutral-100">Action</div>
            <div className="text-neutral-400 text-[14px]">1. You only create new discount by administrator role.</div>
            <div className="text-neutral-400 text-[14px]">2. This is discount which is created by the shop owner.</div>
            <div className="text-neutral-400 text-[14px]">3. You should regularly manager quantity.</div>
            <div className="text-neutral-400 text-[14px]">4. The Discount code can be stolen or generate by third parties.</div>
            <div className="text-neutral-400 text-[14px]">5. Report immediately if have any problem.</div>
            <Skeleton className="w-full h-6 mt-2" />
        </div>
    )
}