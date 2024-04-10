"use client"

import { Discount } from "@prisma/client"
import { useCallback, useEffect, useState } from "react";
import ItemDiscount from "./item-discount";
import { toast } from "sonner";
import { any } from "zod";
import { MdOutlineCallMade } from "react-icons/md";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface DiscountTrendProps {
    discount: Discount[] | any;
    discountCondition?: boolean;
}

const DiscountTrend:React.FC<DiscountTrendProps> = ({
    discount = [],
    discountCondition
}) =>{
    const [data,setData] = useState<any>([])
    const router = useRouter()
  
    useEffect(()=>{
        const result = discount && discount.filter((item:any)=> item.endDate >= new Date())
        const re = result && result.sort((a:any,b:any)=>{
            if(a.endDate >b.endDate) return -1;
            if(a.endDate <b.endDate) return 1;
            return 0
        })
        
        setData(re)
    },[discount])


    //handle navigate
    const handleNavigate = useCallback(()=>{
        router.push('/dashboards/discount')
    },[router])
    
    return (
        <div className={cn("text-[14px] text-neutral-100 rounded-md p-2",
                            discountCondition ? 'bg-none': 'bg-slate-600 hover:bg-slate-500/40 '
                        )}>
             <div className="mb-2">
                <div className="text-white text-[16px] font-bold flex items-center justify-between ">
                    <div> Hot Coupon</div>
                    {!discountCondition && (
                        <div onClick={handleNavigate} className="text-neutral-400 hover:text-neutral-100 font-thin text-[13px] flex items-center justify-start gap-0.5">View<MdOutlineCallMade className="w-4 h-4 "/></div>
                    )}
                    
                </div>
             </div>
             {data && data.length >0?(
                <div className="flex flex-col gap-2">
                    {data && data.slice(0,5).map((item:any)=>{
                        return (
                            <ItemDiscount
                                title = {item.title}
                                key={item.id}
                                startDate ={item.startDate}
                                endDate ={item.endDate}
                                percent = {item.percent}
                                code = {item.code}
                            />
                        )
                    })}
                </div>
             ):(
                <div className="w-full text-start text-sm flex items-center justify-center">
                    <div className="text-[14px] text-neutral-400"> All Coupon are expired !</div>
                </div>
             )}
            
        </div>
    )
}
export default DiscountTrend