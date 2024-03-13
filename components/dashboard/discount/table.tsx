"use client"

import { Discount } from "@prisma/client"
import Item from "./item"



interface TableProps {
    discount: Discount[] | any
}

const Table:React.FC<TableProps> = ({
    discount =[]
}) =>{
    console.log(discount)
    return (
       <table className="w-full text-[15px] text-white ">
            <tr className="font-bold ">
                <td>Title</td>
                <td>Type</td>
                <td>Percent </td>
                <td>Count</td>
                <td>created</td>
                <td>Status</td>
                <td></td>
            </tr>
            {discount && discount.map((item:any)=>{
                return (<Item
                        key={item.id}
                        id={item.id}
                        title = {item.title}
                        type={item.type}
                        percent ={item.percent}
                        count = {item.count}
                        created_at={item.created_at}
                        startDate = {item.startDate}
                        endDate = {item.endDate}
                    />
                )
            })}
       </table>
    )
}

export default Table
