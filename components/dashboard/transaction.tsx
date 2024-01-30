"use client"

import { cn } from "@/lib/utils"
import Image from "next/image"


const transactions = [
    {
        name:"John",
        status: "pending",
        date: "14.02.2023",
        amount: "3.200"
    },
    {
        name:"Doe",
        status: "done",
        date: "14.02.2023",
        amount: "3.200"
    },
    {
        name:"Gina",
        status: "cancelled",
        date: "14.02.2023",
        amount: "3.200"
    },
    {
        name:"John",
        status: "pending",
        date: "14.02.2023",
        amount: "3.200"
    },
    {
        name:"Doe",
        status: "done",
        date: "14.02.2023",
        amount: "3.200"
    },
    {
        name:"Gina",
        status: "cancelled",
        date: "14.02.2023",
        amount: "3.200"
    },
]

const Transaction = () =>{
    return (
        <div className="flex flex-col gap-4 text-white ">
            <div className="text-lg">Lastest Transactions</div>
            <table className="w-full text-start text-sm gap-2">
                <tr className="">
                    <td>Name</td>
                    <td>Status</td>
                    <td>Date</td>
                    <td>Amount</td>
                </tr>
                
                {transactions.map((item) =>{
                    return (
                       <tr key={item.name} className="">
                            <td className="flex justify-start items-center gap-1">
                                <div >
                                    <Image 
                                        src={'/logo2.png'}
                                        width="20"
                                        height="20"
                                        alt="name"
                                    />
                                </div>
                                <div>{item.name}</div>
                            </td>
                            <td
                               
                            >
                               <div
                                 className={cn("px-2 py-0.5 inline-block rounded-md text-[12px] capitalize",
                                 item.status === "pending" && "bg-yellow-600",
                                 item.status === "done" && "bg-blue-600",
                                 item.status === "cancelled" && "bg-red-600",
                             )}
                               >
                                {item.status}
                               </div>
                            </td>
                            <td>{item.date}</td>
                            <td>{item.amount} </td>
                       </tr>
                    )
                })}
                
            </table>
        </div>
    )
}

export default Transaction