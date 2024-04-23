"use client"

import { User } from "@prisma/client"
import ItemTableQuantity from "./item-table-quantity"
import { useEffect, useState } from "react";

interface TableQuantityProps {
    users: User[] | any;
}

const TableQuantity:React.FC<TableQuantityProps> = ({
    users =[]
}) =>{
    const [admin,setAdmin] = useState<any>([])

    useEffect(()=>{
        const result = users && users.filter((item:any)=>item.role === 'yes');
        const re:any[] = [];

        result && result.forEach((item:any)=>{
            const index = re && re.findIndex((it:any)=>it.position === item.position)
            //console.log(index)
            if(index === -1) {
                // push new
                let obj ={position:item.position, count:1}
                re.push(obj)
            } else {
                // update count
                re[index].count ++;
            }
            //console.log(re)
        })
        setAdmin(re)
    },[users])
    return (
        <div 
                className="w-full flex flex-col gap-2"
            >
                <div >
                 <div className="text-[15px] text-neutral-100 font-bold">Memebers</div>
                 <div>A mount of member each Department</div>
                </div>
                <table 
                    id="trend-sale-table"
                    className="w-full my-1"
                    >
                    <tr className="text-neutral-200 text-[15px] ">
                        <td className="px-2 py-1">Department</td>
                        <td>
                            <div className="flex items-center justify-center">
                                Quantity
                            </div>
                        </td>
                        <td></td>
                    </tr>
                    {admin && admin.map((item:any)=>{
                        return <ItemTableQuantity
                                   key={item.id}
                                   position={item.position}
                                   count = {item.count}
                                />
                    })}
                </table>
            </div>
    )
}

export default TableQuantity