"use client"

import { Discount } from "@prisma/client"
import Item from "./item"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { useCallback, useEffect, useState } from "react"



interface TableProps {
    discount: Discount[] | any
}

const Table:React.FC<TableProps> = ({
    discount =[]
}) =>{

    const [cateType,setCateType] = useState<any>([])
    console.log(discount)

    const handlePushType = useCallback((value:string)=>{
        console.log(value)
    },[])


    // filter type
    useEffect(()=>{
        const result : any[] = [];
        for(let i=0;i<discount.length;i++){
            if(!result.includes(discount[i].type)){
                console.log(discount[i].type)
                result.push(discount[i].type)
                console.log(result)
            }
        }
       setCateType(result)
    },[discount])
    return (
       <table className="w-full text-[15px] text-white ">
            <tr className="font-bold ">
                <td>Title</td>
                <td>
                    Type
                </td>
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
