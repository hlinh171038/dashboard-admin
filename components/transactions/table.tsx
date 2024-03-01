"use client"

import { Product, Transaction, User } from "@prisma/client"
import Item from "./item"
import { useCallback, useEffect } from "react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { useRouter } from "next/navigation"

interface TableProps {
    transaction : Transaction[] | any
    search : string;
    status: string;
    payment: string;
}

const Table:React.FC<TableProps> = ({
    transaction = [],
    search,
    status,
    payment
}) => {

    const router = useRouter()

    //handle push payment
    const handlePushPayment = useCallback((value: string)=>{
        router.push(`/dashboards/transaction?search=${search}&payment=${value}&status=${status}`)
    },[router,search,status])

    //handle push status
    const handlePushStatus = useCallback((value:string)=>{
        router.push(`/dashboards/transaction?search=${search}&payment=${payment}&status=${value}`)
    },[router,payment,search])
    return (
        <table className="text-neutral-200 w-full text-[15px]">
            <tr>
                <td>
                    User
                </td>
                <td>
                    <Select
                        onValueChange={(e) =>handlePushPayment(e)}
                    >
                        <SelectTrigger className=" ">
                            Payment
                        </SelectTrigger>
                        <SelectContent className="text-[14px] text-slate-600">
                            <SelectItem value="all" defaultChecked={true}>All Brand</SelectItem>
                            <SelectItem value="online">Online</SelectItem>
                            <SelectItem value="offline">Offline</SelectItem>
                        </SelectContent>
                    </Select>
                </td>
                <td>
                    Date
                </td>
                <td>
                    Time
                </td>
               
                <td className="text-center">
                    <Select
                        onValueChange={(e) =>handlePushStatus(e)}
                    >
                        <SelectTrigger className=" ">
                            Status
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all" defaultChecked={true}>All Status</SelectItem>
                            <SelectItem value="cancel">Cancel</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="done">Done</SelectItem>
                        </SelectContent>
                    </Select>
                </td>
                <td className="text-end">
                    Total Price
                </td>
                <td className="text-end">View Detail</td>
            </tr>
            {transaction && transaction.map((item:any)=>{
                return <Item 
                            key={item.id}
                            productId = {item.id}
                            userName = {item.user.name}
                            userImage = {item.user.image}
                            userId = {item.userId}
                            payment = {item.transportation}
                            date = {item.date}
                            quantity ={item.amount}
                            status = {item.status}
                            total = {item.totalPrice}
                        />
            })}
        </table>
    )
}

export default Table