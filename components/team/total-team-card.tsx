"use client"

import { User } from "@prisma/client";
import { use, useEffect, useState } from "react";
import { PiArrowFatLinesUpFill } from "react-icons/pi";
import { TbArrowBigDownLines } from "react-icons/tb";

interface TotalUserCardProps {
    totalUserThisWeek: any;
    totalUserLastWeek: any;
    users: User[] | any
}
 const TotalTeamCard:React.FC<TotalUserCardProps> = ({
    totalUserThisWeek = [],
    totalUserLastWeek = [],
    users = []
 }) =>{
    const [adminThisWeek,setAdminThisWeek] = useState<any>([]);
    const [adminLastWeek,setAdminLastWeek] = useState<any>([]);
    const [admin,setAdmin] =useState<any>([])
    // admin all the time

    // admin this week
    useEffect(()=>{
        const result = totalUserThisWeek && totalUserThisWeek.filter((item:any)=>item.role === 'yes')
        setAdminThisWeek(result);
    },[totalUserThisWeek])
    // admin last week
    useEffect(()=>{
        const result = totalUserLastWeek && totalUserLastWeek.filter((item:any)=>item.role === 'yes')
        setAdminLastWeek(result);
    },[totalUserLastWeek])
    // admin all the time
    useEffect(()=>{
        const result = users && users.filter((item:any)=>item.role === 'yes')
        setAdmin(result);
    },[users])
    const [percent,setPercent] = useState(0)
    useEffect(()=>{

        if(adminThisWeek.length === 0) {
            setPercent(0);
            return;
        }
        if(adminLastWeek.length === 0) {
            setPercent(100);
            return;
        }
        const result = Math.round(((adminThisWeek.length - adminLastWeek.length) *100)/adminLastWeek.length);
       
        setPercent(result)
    },[adminThisWeek,adminLastWeek])




    useEffect(()=>{

    },[])
    return (
        <div className="bg-slate-600 rounded-md p-2 relative">
            <div className="text-[15px] text-neutral-100 font-bold">Team manager</div>
            <div className="flex items-center justify-start gap-2">
                <div className="text-[35px] text-neutral-400 ">{admin && admin.length}</div>
                <div className="text-[12px] ">
                    <div className="mb-[-2px] text-green-500">+ {adminThisWeek.length}</div>
                    <div className="text-neutral-400">in this week</div>
                </div>
            </div>
            <div className="absolute bottom-1 right-1  text-neutral-100 text-[14px] flex items-end justify-end w-full">{percent && percent <0 ?(
                                <div className="flex items-center justify-start gap-0.5">
                                    <TbArrowBigDownLines className="w-3 h-4 text-red-600" />
                                    <span className="text-[13px]">{percent * -1 + '%'}</span>
                                </div>
                            ):(
                                <div className="flex items-center justify-start gap-0.5 ">
                                    <PiArrowFatLinesUpFill className="w-3 h-4 text-green-600" />
                                    <span className="text-[13px]">{percent + '%'}</span>
                                </div>
                            )}
                    </div>
        </div>
    )
}

export default TotalTeamCard