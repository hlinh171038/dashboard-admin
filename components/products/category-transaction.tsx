"use client"
import { cn } from "@/lib/utils";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

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

    const handleadd =(value:string) =>{

    }
    return (
        <div className="relative">
            <div className="text-neutral-200 text-[15px]">Transportation</div>
            <Select>
            <SelectTrigger className="w-full bg-slate-500/60 rounded-md px-2 py-1 text-[15px] text-neutral-400">
            {transaction.length >0 ?(
                    transaction.map((item:any)=>{
                        return <div 
                                className="cursor-pointer"
                                key={item}>
                                    {item} |
                                </div>
                    })
                ):"Transaction..."}
            </SelectTrigger>
            <SelectContent>
                <div className="cursor-pointer hover:bg-slate-500/60 w-full rounded-md px-2 transition-all duration-300 text-[14px]" onClick={()=>handleAddTransaction(array,'payment on delivery')}>Payment on delivery</div>
                <div className="cursor-pointer hover:bg-slate-500/60 w-full rounded-md px-2 transition-all duration-300 text-[14px]" onClick={()=>handleAddTransaction(array,'payment on card')}>Payment on card</div>
            </SelectContent>
            </Select>
           
        </div>
    )
}

export default Transaction