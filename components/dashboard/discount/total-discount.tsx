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
        let thisWeek = 0;
        let lastWeek = 0;
         if(totalDiscountThisWeek && totalDiscountThisWeek.length > 0) {
            thisWeek = totalDiscountThisWeek.length;
         }
          if(totalDiscountLastWeek && totalDiscountLastWeek.length >0) {
            lastWeek = totalDiscountLastWeek.length;
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
    },[totalDiscountThisWeek,totalDiscountLastWeek])

    useEffect(()=>{

    },[])
    return (
        <div className="bg-slate-600 rounded-md p-2 relative ">
            <div className="font-semibold text-[16px] text-neutral-100">Discount Manager</div>
            <div className="flex items-center justify-start gap-2">
                <div className="text-[35px] text-neutral-400 ">{discount && discount.length <10 &&  discount.length >0 ? `0${discount.length}`:discount.length}</div>
                <div className="text-[12px] ">
                    <div className="mb-[-2px] text-green-500">+ {totalDiscountThisWeek && totalDiscountThisWeek.length <10 && totalDiscountThisWeek.length >0? `0${totalDiscountThisWeek.length}`:totalDiscountThisWeek.length}</div>
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

