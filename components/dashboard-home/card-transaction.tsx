"use client"

import { useCallback, useEffect, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { GiReceiveMoney } from "react-icons/gi";
import { PiArrowFatLinesUpFill } from "react-icons/pi";
import { TbArrowBigDownLines } from "react-icons/tb";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
interface CardTransactionProps {
    thisWeek: any;
    lastWeek: any;
    transaction: any;
}

const CardTransaction:React.FC<CardTransactionProps> = ({
    thisWeek = [],
    lastWeek = [],
    transaction = []
}) =>{
    const [transactionThisWeek,setTransactionThisWeek] = useState<any>([])
    const [transactionLastWeek,setTransactionLastWeek] = useState<any>([])
    const [totalThisWeek,setTotalThisWeek] = useState<any>([])
    const [totalLastWeek,setTotalLastWeek] = useState<any>([])
    const [percent,setPercent] = useState<any>([])

    const router = useRouter()

    //handle route manager
    const handleRouteManager = useCallback(()=>{
        router.push('/dashboards/transaction')
    },[router])

    // income this week
    useEffect(()=>{
        let array = [...thisWeek]
        let result:any[] = [];
        transaction && transaction.forEach((ele:any) => {
                let day = new Date(ele.date);
                if(day >=array[0] && day<=array[array.length -1]) {
                    result.push(ele)
                }
        });
  
        const done = result && result.filter((item:any)=>item.status === 'done')
        setTransactionThisWeek(done)
    },[thisWeek,transaction])

    // income last week
    useEffect(()=>{
        let array = [...lastWeek]
        let result:any[] = [];
        transaction && transaction.forEach((ele:any) => {
                let day = new Date(ele.date);
                if(day <=array[0] && day>=array[array.length -1]) {
                    result.push(ele)
                }
        });
     
        // income done ststus
       const done = result && result.filter((item:any)=>item.status === 'done')
        setTransactionLastWeek(done);
    },[lastWeek,transaction])

    //total income this week
    useEffect(()=>{
       const result = transactionThisWeek && transactionThisWeek.reduce((accumulator:any, currentValue:any)=> accumulator + currentValue.totalPrice,0);
   
       setTotalThisWeek(result)
    },[transactionThisWeek])

    //total income last week
    useEffect(()=>{
        const result = transactionLastWeek && transactionLastWeek.reduce((accumulator:any, currentValue:any)=> accumulator + currentValue.totalPrice,0);

        setTotalLastWeek(result)
     },[transactionLastWeek])

     //percent
     useEffect(()=>{
      
        if(totalThisWeek=== 0){
            setPercent(0);
            return;
        } 
        if(totalLastWeek === 0){
            setPercent(100);
            return;
        } 
        const result = Math.round(((totalThisWeek - totalLastWeek)*100)/totalLastWeek);
 
     
        setPercent(result)

     },[totalLastWeek,totalThisWeek])

    return (
        <div className="relative  group bg-slate-600 hover:bg-slate-500/40 px-2 py-1 rounded-md cursor-pointer flex flex-col justify-between ">
            <div className="flex justify-start items-start gap-4 mt-1">
                <div className="bg-slate-500/80 w-12 h-12 rounded-md shadow-md flex items-center justify-center"> 
                    <GiReceiveMoney className="w-4 h-4 text-white " />
                </div>
                <div>
                <div className="font-bold text-[16px] text-neutral-100">Total Income</div>
                <div className=" text-[14px] text-neutral-100">{totalThisWeek.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</div>
                </div>
            </div>
            <div className="text-white hover:text-200 flex flex-col gap-2 text-[15px] w-full">
                
                <div className="flex justify-start items-end  gap-1 text-[12px] text-muted  w-full">

                     <div className=" text-neutral-100 text-[14px] flex ">{percent && percent <0 ?(
                                <div className="flex items-center justify-start gap-0.5 bg-red-200 rounded-md px-1 py-0.5">
                                    <TbArrowBigDownLines className="w-3 h-4 text-red-600" />
                                    <span className="text-[13px] text-red-600 mb-[-1px] ">{percent * -1 + '%'}</span>
                                </div>
                            ):(
                                <div className="flex items-end justify-start gap-0.5 bg-green-200 rounded-md px-1  ">
                                    <PiArrowFatLinesUpFill className="w-3 h-4 text-green-600" />
                                    <div className="text-[12px] text-green-800 mb-[-1px]    ">{percent + '%'}</div>
                                </div>
                            )}
                    </div>
                    <div className="mb-[-1px] ">compare last week.</div>
                </div>
            </div>
            <div className=" absolute top-0 left-0 text-[14px] w-0 h-full group-hover:bg-gray-900/80 group-hover:w-full text-neutral-400  hover:text-neutral-100 transition-all duration-300 flex flex-col justify-start rounded-md overflow-hidden ">
                
                <div onClick={handleRouteManager} className="flex items-center justify-end py-1 px-2">
                    <span>Manager</span>
                    <MdOutlineKeyboardArrowRight  className="w-4 h-4 mb-[-2px]"/>  
                </div>
                <div
                    className={cn('text-thin text-[13px] p-2',
                              )}  
                >
                    
                    <div className="text-justify">Total price have left after all taxes and deductions have been taken out.</div>
                </div>
                
            </div>
        </div>
    )
}

export default CardTransaction