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
 const TotalUserCard:React.FC<TotalUserCardProps> = ({
    totalUserThisWeek = [],
    totalUserLastWeek = [],
    users = []
 }) =>{
    const [percent,setPercent] = useState(0)
    useEffect(()=>{
        let thisWeek = 0;
        let lastWeek = 0;
         if(totalUserThisWeek && totalUserThisWeek.length > 0) {
            thisWeek = totalUserThisWeek.length;
         }
          if(totalUserLastWeek && totalUserLastWeek.length >0) {
            lastWeek = totalUserLastWeek.length;
         } 
         console.log(thisWeek); // 1
         console.log(lastWeek); // 0

         if(lastWeek === 0) {
            if(thisWeek === 0) {
                setPercent(0)
            }else {
                setPercent(100)
            }
           return;
         }
        const result = Math.round(((thisWeek - lastWeek) *100)/lastWeek);
       console.log(result);
        setPercent(result)
    },[totalUserLastWeek,totalUserThisWeek])

    useEffect(()=>{

    },[])
    return (
        <div className="bg-slate-600 rounded-md p-2 relative">
            <div className="font-semibold text-[16px] text-neutral-100">User Manager</div>
            <div className="flex items-center justify-start gap-2">
                <div className="text-[35px] text-neutral-400 ">{users && users.length && (users.length <10 && users.length>0) ? `0${users.length}`: users.length}</div>
                <div className="text-[12px] ">
                    <div className="mb-[-2px] text-green-500">+ {totalUserThisWeek &&totalUserThisWeek.length < 10 && users.length>0 ? `0${totalUserThisWeek.length}`: totalUserThisWeek.length }</div>
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

export default TotalUserCard