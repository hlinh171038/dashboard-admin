"use client"

import { Product, Transaction } from "@prisma/client"
import HistoryItem from "./history-item"

interface HistoryProps {
    product: Product[] | any
    history: Transaction[] | any
}

const History:React.FC<HistoryProps> =({
    product =[],
    history =[]
}) =>{
    
    return (
        <div className="text-neutral-200 text-[15px] px-2">
            <div className="text-[18px] capitalize mx-2 mt-2">History </div>
            <hr/>
            <div
                className="flex flex-col gap-2 px-2"
            >
                {history.map((item:any)=>{
                    return <HistoryItem
                                key={item.id} 
                                time = {item.date}
                                status = {item.status}
                                payment={item.transportation}
                                id = {item.id}
                            />
                })}
            </div>
            
           
        </div>
    )
}

export default History