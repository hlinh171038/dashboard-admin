"use client"

import { Skeleton } from "@/components/ui/skeleton"

interface Props {
    product?: boolean;
    customer?: boolean;
    transaction?: boolean;
    team?: boolean;
}

export const TotalCardUserSkeleton:React.FC<Props> = ({
    product,
    customer,
    transaction,
    team
}) =>{
    return (
        <div className="bg-slate-600 rounded-md p-2 relative">
            {product && <div className="font-bold text-[15px] text-neutral-100">Product Manager</div> }
            {customer && <div className="font-bold text-[15px] text-neutral-100">User Manager</div> }
            {transaction && <div className="font-bold text-[15px] text-neutral-100">Transaction Manager</div> }
            {team && <div className="font-bold text-[15px] text-neutral-100">Team Manager</div> }
            
            <div className="flex items-center justify-start gap-2 my-2">
                <Skeleton className="w-8 h-8" />
                <div className="text-[12px] ">
                    <Skeleton className="w-20 h-4"/>
                    <div className="text-neutral-400">in this week</div>
                </div>
            </div>


            <div className="absolute bottom-1 right-1  text-neutral-100 text-[14px] flex items-end justify-end w-full">
                <Skeleton className="w-12 h-4"/>
            </div>
        </div>
    )
}