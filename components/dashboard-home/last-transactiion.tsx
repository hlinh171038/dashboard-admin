"use client"

import { cn } from "@/lib/utils"
import { Transaction } from "@prisma/client"
import Image from "next/image"
import ItemLastTransaction from "./item-last-transaction"
import '@/app/globals.css'
import { useCallback } from "react"
import { useRouter } from "next/navigation"
import { MdOutlineCallMade } from "react-icons/md"


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
            <div >
                <div className="text-white text-[16px] font-bold flex items-center justify-between">
                    <div> Lastest  Transactiion</div>
                    <div onClick={handleNavigate} className="text-neutral-400 hover:text-neutral-100 font-thin text-[13px] flex items-center justify-start gap-0.5 cursor-pointer">View<MdOutlineCallMade className="w-4 h-4 "/></div>
                </div>
                <div className="text-neutral-400 font-normal text-[14px] ">
                    The list of lastest transaction in this week.
                </div>
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