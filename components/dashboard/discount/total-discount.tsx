"use client"

import { Discount, User } from "@prisma/client";
import { use, useEffect, useState } from "react";
import { PiArrowFatLinesUpFill } from "react-icons/pi";
import { TbArrowBigDownLines } from "react-icons/tb";

interface TotalUserCardProps {
    totalDiscountThisWeek:any;
    totalDiscountLastWeek:any;
    discount: Discount[] | any;
}
 const TotalDiscount:React.FC<TotalUserCardProps> = ({
    totalDiscountThisWeek,
    totalDiscountLastWeek,
    discount = []
 }) =>{
    const [percent,setPercent] = useState(0)
    useEffect(()=>{
        const result = Math.round(((totalDiscountThisWeek.length - totalDiscountLastWeek.length) *100)/totalDiscountLastWeek.length);
       
        setPercent(result)
    },[totalDiscountThisWeek,totalDiscountLastWeek])

    useEffect(()=>{

    },[])
    return (
        <div className="bg-slate-600 rounded-md p-2 relative ">
            <div className="font-bold text-[15px] text-neutral-100">Discount Manager</div>
            <div className="flex items-center justify-start gap-2">
                <div className="text-[35px] text-neutral-400 ">{discount && discount.length}</div>
                <div className="text-[12px] ">
                    <div className="mb-[-2px] text-green-500">+ {totalDiscountThisWeek.length}</div>
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

export default TotalDiscount

