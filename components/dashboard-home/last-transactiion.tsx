"use client"

import { cn } from "@/lib/utils"
import { Transaction } from "@prisma/client"
import Image from "next/image"
import ItemLastTransaction from "./item-last-transaction"
import '@/app/globals.css'
import { useCallback } from "react"
import { useRouter } from "next/navigation"


interface LastTransactionProps {
    transaction: Transaction[] | any;
}

const LastTransaction:React.FC<LastTransactionProps> = ({
    transaction = []
}) =>{
    const router = useRouter();


    const handleNavigate = useCallback(()=>{
        router.push('/dashboards/transaction')
    },[router])
    return (
        <div className="flex flex-col gap-4 text-white ">
            <div className="flex items-center justify-between">
                <div className="text-[16px]">Lastest Transactions</div>
                <div onClick={handleNavigate} className="text-[14px] text-neutral-400 underline cursor-pointer">View All</div>
            </div>
            <table id="trend-sale-table" className="w-full text-start text-sm gap-2 ">
                <tr >
                    <td className="text-neutral-100 px-2">Name</td>
                    <td className="text-neutral-100 px-2">Status</td>
                    <td className="text-neutral-100 px-2">Date</td>
                    <td className="text-neutral-100 px-2">Price</td>
                </tr>
                
                {transaction.slice(0,6).map((item:any) =>{
                    return (
                       <ItemLastTransaction
                        key={item.id}
                        id={item.id}
                        name={item.user.name}
                        image ={item.user.image}
                        status={item.status}
                        date ={item.date}
                        price ={item.totalPrice}
                       />
                    )
                })}
                
            </table>
        </div>
    )
}

export default LastTransaction