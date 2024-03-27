"use client"

import { useEffect, useState } from "react";

interface ItemCategoryProps {
    category: string;
    amount: number;
   categories: any;
}

const ItemCategory:React.FC<ItemCategoryProps> = ({
    category,
    amount,
   categories =[]
}) =>{
    const [percent,setPercent] = useState(0)
    useEffect(() =>{
        const initialValue = 0;
        const total = categories.reduce(
        (accumulator:number, currentValue:any) => accumulator + currentValue.count,
        initialValue,
        );
        //console.log(total)
      const result =  Math.round(( amount*100) /Number(total));
      //console.log(result)
      setPercent(result)
    },[categories,amount])
    return (
        <tr className="text-[14px] text-neutral-400">
            <td>{category}</td>
            <td>{amount}</td>
            <td>{percent + '%'}</td>
        </tr>
    )
}

export default ItemCategory