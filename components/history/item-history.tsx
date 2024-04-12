"use client"

import { useCallback, useState } from "react";
import { FaRegSquare } from "react-icons/fa";
import { FaRegSquareCheck } from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";

interface ItemHistoryProps {
    date: string;
    title: string;
    type:string;
    id:string;
    check: boolean,
    handleOtherCheck: (id:string) =>void;
}

const ItemHistory:React.FC<ItemHistoryProps> = ({
    date,
    title,
    type,
    id,
    check,
    handleOtherCheck
} ) =>{

    return (
        <div className="flex items-center justify-between text-[14px] text-neutral-400">
            <div className="flex items-center justify-start gap-6">
                <div  className="flex items-center justify-start gap-4">
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
                    {/* time */}
                    <div className="flex flex-col text-[13px] mt-[7px]">
                        <span className="mb-[-3px]">{new Date(date).toLocaleDateString()}</span>
                        <span className ='text-[12px] text-neutral-100'>{new Date(date).toLocaleTimeString()}</span>
                    </div>
                </div>
                <div className="flex items-start justify-start mt-[-10px]">
                    {title} - {type}
                </div>
            </div>
            <div>
                <BsThreeDotsVertical className="w-4 h-4 " />
             </div>
        </div>
    )
}

export default ItemHistory