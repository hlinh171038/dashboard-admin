"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { MdLockPerson } from "react-icons/md"

export const LeaderSkeleton = () => {
    return (
        <div className="grid grid-cols-6 items-center justify-start gap-2 px-2 text-[14px] text-neutral-400">
            <div className="col-span-3 flex flex-col items-start justify-start gap-1 ">
                <div className="flex items-center justify-between gap-2 mt-2">
                    <MdLockPerson className="w-4 h-4 text-neutral-100"/>
                    <div className="text-[15px] text-neutral-100 mb-[-3px]">Team Leader</div>
                </div>
                <div className="text-justify ">
                    You can add new member as admin under your role, ensuring clear direction and effective leadership within your teams.
                </div>
            </div>
            <div className="col-span-3">
            
                <div className="flex items-center justify-between w-full">
                    <Skeleton className="w-44 h-6" />
                    
                </div>
            </div>
        </div>
    )
}