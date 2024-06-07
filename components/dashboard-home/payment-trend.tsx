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
    const [paymentAmount,setPaymentAmount] = useState(0)
    const [wallettAmount,setWalletAmount] = useState(0)
    const [cardAmount,setCardAmount] = useState(0)
    const [CODAmount,setCODAmount] = useState(0)
    const [cardPercent,setCardPercent] = useState(0)
    const [paymentPercent,setPaymentPercent] = useState(0)
    const [walletPercent,setWalletPercent] = useState(0)
    const [CODPercent,setCODPercent] = useState(0)

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
       const result = transactionThisWeek && transactionThisWeek.filter((item:any)=> item.transportation ==='Payment');
       setPaymentAmount(result.length)
      const result2 = transactionThisWeek && transactionThisWeek.filter((item:any)=> item.transportation ==='E-wallet');
      setWalletAmount(result2.length);
      const result3 = transactionThisWeek && transactionThisWeek.filter((item:any)=> item.transportation !=='Card');
      setCardAmount(result3.length)
      const result4 = transactionThisWeek && transactionThisWeek.filter((item:any)=> item.transportation ==='COD');
      setCODAmount(result4.length);
    },[transactionThisWeek])

    //percent
    useEffect(()=>{
        const payment = Math.round((paymentAmount *100) /(paymentAmount + wallettAmount + cardAmount +CODAmount));
        setPaymentPercent(payment)
       
        const wallet = Math.round((wallettAmount *100) /(paymentAmount + wallettAmount + cardAmount +CODAmount));
        setWalletPercent(wallet)

        const card = Math.round((cardAmount *100) /(paymentAmount + wallettAmount + cardAmount +CODAmount));
        setCardPercent(card)

        const COD = Math.round((CODAmount *100) /(paymentAmount + wallettAmount + cardAmount +CODAmount));
        setCODPercent(COD)
      
       
    },[paymentAmount,wallettAmount,cardAmount,CODAmount])
    return (
       <div className="bg-slate-600 hover:bg-slate-500/40 text-[14px] text-neutral-100 rounded-md p-2">
        <div className="text-white text-[16px] font-semibold flex items-center justify-between mb-2">
                       <div> Payment Method</div>
                        <div className="text-neutral-400 hover:text-neutral-100 font-thin text-[13px] flex items-center justify-start gap-0.5">View<MdOutlineCallMade className="w-4 h-4 "/></div>
                    </div>
         {transactionThisWeek && transactionThisWeek.length > 0 ?(
            <div className="w-full  text-[15px] text-neutral-100 flex  flex-col gap-1">
            {/* payment */}
            <div>
                <div>Payment</div>
                <div className="w-full h-5 bg-neutral-200 rounded-md ">
                    <div className={` h-5 rounded-md flex items-center justify-end px-1 text-neutral-400 text-[12px] `} style={{width:`${paymentPercent}%`,backgroundColor:"#64D03E",color:"#CCEB24"}}>
                        {paymentPercent !== 0 &&(
                            <span className="mt-[0.13rem]">{paymentPercent}%</span>
                        )}
                        
                    </div>
                </div>
            </div>
            {/* cash */}
            <div>
            <div>E-Wallet</div>
                <div className="w-full h-5 bg-neutral-200 rounded-md ">
                    <div className={` h-5  rounded-md flex items-center justify-end px-1 text-neutral-400 text-[12px]`} style={{width:`${walletPercent}%`,backgroundColor:'#EC8D4B',color:"#64D03E"}}>
                        {walletPercent!== 0 &&(
                                <span className="mt-1">{walletPercent}%</span>
                            )}
                        
                    </div>
                </div>
            </div>
            {/* card */}
            <div>
            <div>Card</div>
                <div className="w-full h-5 bg-neutral-200 rounded-md ">
                    <div className={` h-5  rounded-md flex items-center justify-end px-1 text-neutral-400 text-[12px]`} style={{width:`${cardPercent}%`,backgroundColor:'#468AE2',color:"#64D03E"}}>
                        {cardPercent!== 0 &&(
                                <span className="mt-1">{cardPercent}%</span>
                            )}
                        
                    </div>
                </div>
            </div>
            {/* COD */}
            <div>
            <div>COD</div>
                <div className="w-full h-5 bg-neutral-200 rounded-md ">
                    <div className={` h-5  rounded-md flex items-center justify-end px-1 text-neutral-400 text-[12px]`} style={{width:`${CODPercent}%`,backgroundColor:'#DB2B78',color:"#64D03E"}}>
                        {CODPercent!== 0 &&(
                                <span className="mt-1">{CODPercent}%</span>
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