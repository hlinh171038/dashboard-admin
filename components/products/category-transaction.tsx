"use client"
import { cn } from "@/lib/utils";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

interface TransactionProps {
    handleAddTransaction: (transaction:any,value:string) =>void;
    transaction: any
}

const Transaction:React.FC<TransactionProps> = ({
    handleAddTransaction,
    transaction = [],
})=>{
    const [array,setArray] =useState([])
    const [open,setOpen] = useState(false)
    return (
        <div className="relative">
            <div className="text-neutral-200 text-[15px]">Transportation</div>
            <div className="flex items-center justify-between text-neutral-200 bg-slate-500/60 rounded-md text-[14px] px-2 py-1">
                <div
                    className="flex items-center justify-start gap-1"
                >{transaction.length >0 ?(
                    transaction.map((item:any)=>{
                        return <div 
                                className="cursor-pointer"
                                key={item}>
                                    {item} |
                                </div>
                    })
                ):"Transaction..."}
                </div>
                <IoIosArrowDown 
                    onClick={()=>setOpen(!open)}
                    className="w-4 h-4 cursor-pointer text-neutral-200 hover:text-white"
                />
            </div>
            <div
                className={cn("absolute top-14 left-0 bg-neutral-200 text-slate-900 w-full rounded-md z-20 ",
                    open ?"flex flex-col items-start justify-start px-2 py-2":"hidden"
                )}
            >
                <div className="cursor-pointer hover:bg-slate-500/60 w-full rounded-md px-2 transition-all duration-300" onClick={()=>handleAddTransaction(array,'payment on delivery')}>payment on delivery</div>
                <div className="cursor-pointer hover:bg-slate-500/60 w-full rounded-md px-2 transition-all duration-300" onClick={()=>handleAddTransaction(array,'payment on card')}>payment on card</div>
            </div>
        </div>
    )
}

export default Transaction