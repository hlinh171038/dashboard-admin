"use client"

import { useCallback, useEffect, useState } from "react";
import { MdCopyAll } from "react-icons/md";
import { toast } from "sonner";

interface ItemDiscountProps {
    title: string;
    startDate: string;
    endDate: string;
    percent: string;
    code: string;
}

const ItemDiscount:React.FC<ItemDiscountProps> = ({
    title,
    startDate,
    endDate,
    percent,
    code
}) =>{

    const [day,setDay] = useState<any>(0)
    const [house,setHouse] = useState<any>(0)
    const [minute,setMinute] = useState<any>(0)

    // handle copy code

    const handleCopy =(id:string) =>{
        navigator.clipboard.writeText(id)
        toast.success("coppied to clipboard")
      }
    

    // time
    useEffect(()=>{
        const now:any = new Date();
        const end:any = new Date(endDate)
        const diff = end -now;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setDay(days);
        setHouse(hours);
        setMinute(minutes);
    },[endDate])
    return (
        <div className="flex flex-col border-b border-slate-900/50">
            <div className="flex items-center justify-between text-[14px] text-neutral-100 ">
                <div className="capitalize">{title}</div>
                <div className="text-[13px] text-neutral-400 font-thin  ">
                    <MdCopyAll onClick={()=>handleCopy(code)} className="w-4 h-4 text-neutrl-400 hover:text-neutral-100"/>
                </div>
            </div>
          
                <div className="flex items-center justify-between text-[13px] text-neutral-400">
                    <div className="text-[13px] text-neutral-400 font-thin  ">{code}</div>
                   <div className="flex items-center justify-end gap-1 font-thin text-[12px]">
                    {day >0 && (
                            <div>{`${day} day-`}</div>
                        )}
                        {house>0 && (
                            <div>{`${house} h left`}</div>
                        )}
                        {house === 0 && (
                            <div className="text-red-600">expired</div>
                        )}
                   </div>
                    
                </div>
                
          
            
        </div>
    )
}

export default ItemDiscount