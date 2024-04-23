"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { AiOutlineTeam } from "react-icons/ai"

export const HeaderSkeleton = () =>{
    return (
        <div 
        className="text-[14px] text-neutral-400 px-2 flex items-center justify-between"
    >
        <div
            className="flex flex-col ga-0.5"
        >
            <div 
                className=" flex items-center justify-start gap-2"
            >
                <div><AiOutlineTeam className="w-4 h-4 text-neutral-100" /></div>
                <div className="text-[15px] text-neutral-100">Team Manager</div>
            </div>
            <div 
                className="text-neutral-400 "
            >Overview of all teams without your organization</div>
        </div>
        <Skeleton className="w-12 h-6" />
    </div>
    )
}