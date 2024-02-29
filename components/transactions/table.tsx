"use client"

import { Product, Transaction, User } from "@prisma/client"
import Item from "./item"
import { useEffect } from "react"

interface TableProps {
    transaction : Transaction[] | any

}

const Table:React.FC<TableProps> = ({
    transaction = [],
 
}) => {

    console.log(transaction)

    useEffect(()=>{
        
    },[])
    return (
        <table className="text-neutral-200 w-full text-[15px]">
            <tr>
                <td>
                    User
                </td>
                <td>
                    Payment
                </td>
                <td>
                    Date
                </td>
                <td>
                    Time
                </td>
               
                <td className="text-center">status</td>
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