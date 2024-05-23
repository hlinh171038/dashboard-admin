"use client"
import React from 'react'
import { FaRegSquare } from 'react-icons/fa';
import { FaRegSquareCheck } from 'react-icons/fa6';

interface ItemCategoryProps {
    name: string;
    quantity: number;
    stt: number;
    check: boolean;
    id:string;
    handleOtherCheck: (id:string) =>void;
}

const ItemCategory:React.FC<ItemCategoryProps> = ({
    name,
    quantity,
    check,
    stt,
    id,
    handleOtherCheck
}) => {
  return (
    <tr>
        <td>
        <div className="flex items-center justify-start ">
            {!check ?(
                <FaRegSquare
                    className="w-4 h-4 text-neutral-100 font-thin"
                    onClick={()=>handleOtherCheck(id)}
                    />
            ):(
                <FaRegSquareCheck 
                    className="w-4 h-4 text-neutral-100"
                    onClick={()=>handleOtherCheck(id)}
                    />
            )}
            
        </div>
        </td>
        <td>{stt}</td>
        <td>{name}</td>
        <td></td>
        <td>{quantity}</td>
   </tr>
  )
}

export default ItemCategory
