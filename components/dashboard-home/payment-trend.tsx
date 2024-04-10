"use client"

import { Transaction } from "@prisma/client";
import { useEffect, useState } from "react";
import { MdOutlineCallMade } from "react-icons/md";
import NoItem from "./no-item";

interface PaymentTrendProps {
    thisWeek:any;
    lastWeek:any;
    transaction: Transaction[] | any;
}

const PaymentTrend:React.FC<PaymentTrendProps> = ({
    thisWeek,
    lastWeek,
    transaction =[]
}) =>{
    const [transactionThisWeek,setTransactionThisWeek] = useState<any>([])
    //const [transactionLastWeek,setTransactionLastWeek] = useState<any>([])
    const [cardAmount,setCardAmount] = useState(0)
    const [cashAmount,setCashAmount] = useState(0)
    const [cardPercent,setCardPercent] = useState(0)
    const [cashPercent,setCashPercent] = useState(0)

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

    //card this week
    useEffect(()=>{
       const result = transactionThisWeek && transactionThisWeek.filter((item:any)=> item.transportation ==='card');
      setCardAmount(result.length)
      const result2 = transactionThisWeek && transactionThisWeek.filter((item:any)=> item.transportation ==='payment');
      setCashAmount(result2.length);
    },[transactionThisWeek])

    //percent
    useEffect(()=>{
        const cardPercent = Math.round((cardAmount *100) /(cardAmount +cashAmount));
    
        setCardPercent(cardPercent);
        const cashPercent = Math.round((cashAmount *100) /(cardAmount +cashAmount));
      
        setCashPercent(cashPercent);
    },[cashAmount,cardAmount])
    return (
       <div className="bg-slate-600 hover:bg-slate-500/40 text-[14px] text-neutral-100 rounded-md p-2">
        <div className="text-white text-[16px] font-bold flex items-center justify-between mb-2">
                       <div> Payment Method</div>
                        <div className="text-neutral-400 hover:text-neutral-100 font-thin text-[13px] flex items-center justify-start gap-0.5">View<MdOutlineCallMade className="w-4 h-4 "/></div>
                    </div>
         {transactionThisWeek && transactionThisWeek.length > 0 ?(
            <div className="w-full  text-[15px] text-neutral-100 flex  flex-col gap-1">
            {/* card */}
            <div>
                <div>Card</div>
                <div className="w-full h-5 bg-neutral-200 rounded-md ">
                    <div className={` h-5 rounded-md flex items-center justify-end px-1 text-neutral-400 text-[12px] `} style={{width:`${cardPercent}%`,backgroundColor:"#64D03E",color:"#CCEB24"}}>
                        {cardPercent !== 0 &&(
                            <span className="mt-1">{cardPercent}%</span>
                        )}
                        
                    </div>
                </div>
            </div>
            {/* cash */}
            <div>
            <div>Cash</div>
                <div className="w-full h-5 bg-neutral-200 rounded-md ">
                    <div className={` h-5  rounded-md flex items-center justify-end px-1 text-neutral-400 text-[12px]`} style={{width:`${cashPercent}%`,backgroundColor:'#CCEB24',color:"#64D03E"}}>
                        {cashPercent!== 0 &&(
                                <span className="mt-1">{cashPercent}%</span>
                            )}
                        
                    </div>
                </div>
            </div>
        </div>
         ):(
            <NoItem />
         )}
       </div>
    )
}

export default PaymentTrend