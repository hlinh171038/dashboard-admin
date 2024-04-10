"use client"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { cn } from "@/lib/utils";
import { Transaction } from "@prisma/client"
import { useCallback, useEffect, useState } from "react"

interface PaymentMethodProps {
    guestThisWeek: Transaction[] | any;
    guestLastWeek: Transaction[] | any;
    transaction: Transaction[] | any
}

const PaymentMethod:React.FC<PaymentMethodProps> = ({
    guestThisWeek = [],
    guestLastWeek = [],
    transaction = []
}) =>{

    const [cash,setCash] = useState(0)
    const [card,setCard] = useState(0)
    const [cardPercent,setCardPercent] = useState(0)
    const [cashPercent,setCashPercent] = useState(0)
  
    const handleThisWeek = useCallback(()=>{
        const array = [...guestThisWeek];
        let card = 0;
        let cash = 0;
        const result = array.forEach((item)=>{
            if(item.transportation === 'card'){
                    card +=item.totalPrice
            }else {
                cash += item.totalPrice
            }
        })
   
        setCard(card)
        setCash(cash)
        const total = card + cash;
        const cardPercent = Math.round((card *100)/total)
        const cashPercent = Math.round((cash *100)/total)
        setCardPercent(cardPercent)
        setCashPercent(cashPercent)
    },[guestThisWeek])

    // last week
    const handleLastWeek = useCallback(()=>{
        const array = [...guestLastWeek];
        let card = 0;
        let cash = 0;
        const result = array.forEach((item)=>{
            if(item.transportation === 'card'){
                    card +=item.totalPrice
            }else {
                cash += item.totalPrice
            }
        })
       
        setCard(card)
        setCash(cash)
        const total = card + cash;
        const cardPercent = Math.round((card *100)/total)
        const cashPercent = Math.round((cash *100)/total)
        setCardPercent(cardPercent)
        setCashPercent(cashPercent)
    },[guestLastWeek])

    //handle push date
    const handlePushDate = useCallback((value:any)=>{
        if(value ==='thisweek') {
            handleThisWeek()
        }else {
            handleLastWeek()
        }
    },[handleLastWeek,handleThisWeek])
  

    useEffect(()=>{
        handleThisWeek()
    },[handleThisWeek])
    return (
        <div>
            <div 
            className="flex items-center justify-between px-2 py-4 text-[15px] text-neutral-100"
        >
            <div>Method </div>
            <div>
            <Select
                onValueChange={(e) =>handlePushDate(e)}
            >
                <SelectTrigger className=" ">
                    Date In Week
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="thisweek">Rate In Week</SelectItem>
                    <SelectItem value="lastweek">Rate Last Week</SelectItem>
                
                </SelectContent>
            </Select>
            </div>
        </div>
        <div className="w-full px-2 text-[15px] text-neutral-100 flex  flex-col gap-4">
            {/* card */}
            <div>
                <div
                    className="flex items-center justify-between"
                >
                    <div>Card</div>
                    <div className="text-neutral-300 text-[14px]">{card.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</div>
                </div>
                <div
                    className="w-full bg-slate-400 h-6 relative"

                >
                    <div className="absolute bottom-0 right-1 z-20 text-neutral-300">{cardPercent+'%'}</div>
                    <div 
                        className={cn(" h-6 absolute top-0 left-0 ",
                            cardPercent > 0 ?`w-[${cardPercent+'%'}]`: 'w-0'
                        )}
                        style={{background:"#E96F28"}}
                    ></div>
                </div>
            </div>
            {/* cash */}
            <div>
                <div
                    className="flex items-center justify-between"
                >
                    <div>Cash</div>
                    <div className="text-neutral-300 text-[14px]">{cash.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</div>
                </div>
                <div
                    className="w-full bg-slate-400 h-6 relative"

                >
                    <div className="absolute bottom-0 right-1 z-20 text-neutral-300">{cashPercent+'%'}</div>
                    <div 
                        className={cn(" h-6 absolute top-0 left-0 ",
                            cashPercent > 0 ?`w-[${cashPercent+'%'}]`: 'w-0'
                        )}
                        style={{background:"#EEB316"}}
                    ></div>
                </div>
            </div>
        </div>
        </div>
    )
}

export default PaymentMethod