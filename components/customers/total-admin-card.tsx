"use client"

import { User } from "@prisma/client";
import { useEffect, useState } from "react";
import { GoDotFill } from "react-icons/go";

interface TotalUserCardProps {
    totalUserThisWeek: any;
    totalUserLastWeek: any;
    users: User[] | any
}

const TotalAdminCard:React.FC<TotalUserCardProps> = ({
    totalUserThisWeek = [],
    totalUserLastWeek = [],
    users = []
}) =>{
    const [total,setTotal] = useState<any>([]);
    const [increse,setIncrease] = useState<any>([]);

    useEffect(()=>{
        const result = users && users.filter((item:any)=>item.role === 'yes')
        setTotal(result)
    },[users])

    useEffect(()=>{
        const result = totalUserThisWeek && totalUserThisWeek.filter((item:any)=>item.role === 'yes')
        setIncrease(result)
    },[totalUserThisWeek])
    return (
        
        <div className="bg-slate-600 rounded-md p-2 relative">
        <div className="font-bold text-[15px] text-neutral-100">Administrator </div>
        <div className="flex items-center justify-start gap-2">
            <div className="text-[35px] text-neutral-400 ">{total && total.length}</div>
            <div className="text-[12px] ">
                <div className="mb-[-2px] text-green-500">+ {increse.length}</div>
                <div className="text-neutral-400">in this week</div>
            </div>
        </div>
        <div className="flex flex-col gap-2 text-[14px] text-neutral-400">
            <div className="flex items-center justify-start gap-2">
                <div>
                    <GoDotFill className="text-green-600 w-4 h-4" />
                </div>
                <div>
                    Active
                </div>
                <div>2 member</div>
            </div>
            <div className="flex items-center justify-start gap-2">
                <div>
                    <GoDotFill className="text-red-600 w-4 h-4" />
                </div>
                <div>
                    Inactive
                </div>
                <div>{total && total.length -2} member</div>
            </div>
        </div>
       
    </div>
    )
}

export default TotalAdminCard