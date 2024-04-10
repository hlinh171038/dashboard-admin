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
import { IoBasketOutline, IoReturnDownBackOutline } from "react-icons/io5"
import { useRouter } from "next/navigation"



interface TableProps {
    discount: Discount[] | any;
   
}

const Table:React.FC<TableProps> = ({
    discount =[],
    
}) =>{

    const [cateType,setCateType] = useState<any>([])
    const router = useRouter()
 

    const handlePushType = useCallback((value:string)=>{

    },[])


    // filter type
    useEffect(()=>{
        const result : any[] = [];
        for(let i=0;i<discount.length;i++){
            if(!result.includes(discount[i].type)){
             
                result.push(discount[i].type)
            
            }
        }
       setCateType(result)
    },[discount])

    //handle back product
    const handleBackProduct = useCallback(()=>{
        router.push(`/dashboards/discount?search=&type=&percent=&dayStart=&dayEnd=&countFrom=&countTo=&page=1&per_page=10`)
    },[router])
    return (
       <div>
            <table className="w-full text-[15px] text-neutral-400 ">
                <tr className="font-bold text-neutral-100">
                    <td>Title</td>
                    <td>
                        Type
                    </td>
                    <td>Percent </td>
                    <td>Count</td>
                    <td>Created</td>
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
        {discount && discount.length === 0 &&(
            <div className="w-full flex flex-col items-center justify-center gap-1 text-neutral-100 text-[14px] h-[60vh]">
               
                   
                    <div className="flex flex-col gap-1 items-center justify-center">
                        <div className="flex items-center justify-start gap-2">
                        <IoBasketOutline  className="w-6 h-6 text-neutral-100 font-thin"/>
                        <div className=" text-[14px] uppercase">No result found !!!</div>
                        </div>
                        <div className="flex items-center justify-start gap-2">
                            <span className="text-thin text-[14px] text-neutral-400 flex items-center justify-center gap-1">Click here  <span><IoReturnDownBackOutline onClick={handleBackProduct} className="text-neutral-200 w-4 h-4 cursor-pointer hover:text-white transition-all duration-300"/></span> to back to all discount</span> 
                        </div>
                    </div>
            </div>
            
        )}
       </div>
    )
}

export default Table
