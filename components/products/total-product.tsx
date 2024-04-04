"use client"

import { Product, User } from "@prisma/client";
import { useEffect, useState } from "react";
import { PiArrowFatLinesUpFill } from "react-icons/pi";
import { TbArrowBigDownLines } from "react-icons/tb";
import ChartUser from "./chart-user";
import { GoDot } from "react-icons/go";

interface TotalProductProps {
   product:Product[] | any;
   totalProductThisWeek: Product[] | any;
   totalProductLastWeek: Product[] | any;
}
 const TotalProduct:React.FC<TotalProductProps> = ({
    product = [],
    totalProductThisWeek = [],
    totalProductLastWeek = []
 }) =>{
    const [percent,setPercent] = useState(0)

   
    useEffect(()=>{
        const result = Math.round(((totalProductThisWeek.length - totalProductLastWeek.length) *100)/totalProductLastWeek.length)
        setPercent(result)
    },[totalProductLastWeek,totalProductThisWeek])

    
    return (
        <div className="bg-slate-600 rounded-md p-2 relative">
            <div className="flex items-center justify-between">
            <div>
                <div className="font-bold text-[17px] text-neutral-100">Product Manager</div>
                <div className="flex items-center justify-start gap-2">
                    <div className="text-[35px] text-neutral-400 ">{product && product.length}</div>
                    <div className="text-[12px] ">
                        <div className="mb-[-2px] text-green-500">+ {totalProductThisWeek && totalProductThisWeek.length}</div>
                        <div className="text-neutral-400">in this week</div>
                    </div>
                </div>
            </div>
            {/*  */}
            <div className="text-[14px] text-neutral-400">
                <div className="text-slate-600">Product Statictical</div>
                <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-start gap-2">
                        <GoDot className="w-4 h-4 text-[#64D03E]"/>
                        <div>Product in this week</div>
                    </div>
                    <div className="flex items-center justify-start gap-2">
                        <GoDot className="w-4 h-4 text-[#CCEB24]"/>
                        <div>Product in last week</div>
                    </div>
                </div>
            </div>
            </div>
            <div>
                <ChartUser
                 totalProductThisWeek = {totalProductThisWeek}
                 totalProductLastWeek = {totalProductLastWeek}
                />
            </div>
            {/* percent */}
                {/* <div className="absolute bottom-1 right-1  text-neutral-100 text-[14px] flex items-end justify-end w-full">{percent && percent <0 ?(
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
                    </div> */}
        </div>
    )
}

export default TotalProduct