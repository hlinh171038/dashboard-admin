"use client"

import { useCallback, useEffect, useState } from "react"
import { FaRegSquare } from "react-icons/fa"
import { FaRegSquareCheck } from "react-icons/fa6"

interface ItemTypeProps {
    item: any;
    onClick: (value:any) =>void;
    value: string
}

const ItemType:React.FC<ItemTypeProps> = ({
    item,
    onClick,
    value
}) =>{
    const [check,setCheck] = useState(false)
     //handle check
     const handleCheck = useCallback(()=>{
        setCheck(!check)
        onClick(item)
     },[check,item,onClick])

     useEffect(()=>{
       
        if(value === item){
            setCheck(true)
        }else {
            setCheck(false)
        }
     },[value,item])
    return (
        <div 
            key={item}
            className="bg-slate-900 text-neutral-100 px-2 py-1 flex items-center justify-center rounded-md"
        >
            <span> {item}</span>
            <span className="flex items-center justify-start gap-2">
            
            {!check ?(
                <FaRegSquare
                    className="w-3 h-3 text-neutral-100 font-thin ml-2"
                    onClick={handleCheck}
                    />
            ):(
                <FaRegSquareCheck
                    className="w-3 h-3 text-neutral-100 ml-2"
                    onClick={handleCheck}
                    />
            )}
        
            </span>
        </div>
    )
}

export default ItemType