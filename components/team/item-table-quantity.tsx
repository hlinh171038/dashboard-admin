"use client"

import Image from "next/image";

interface ItemTableQuantityProps {
    count:number,
    position:string;
    
}

const ItemTableQuantity:React.FC<ItemTableQuantityProps> = ({
    count,
    position,
 
}) =>{
    return (
        <tr>
            <td className="capitalize px-2">{position}</td>
            <td>
                <div className="flex items-center justify-center">
                {count}
                </div>
            </td>
            <td className="underline ">
                <div className="flex items-center justify-center">
                    Detail
                </div>
            </td>
        </tr>
    )
}

export default ItemTableQuantity