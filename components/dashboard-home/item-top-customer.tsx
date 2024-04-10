"use clinet"

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaMedal } from "react-icons/fa6";

interface ItemTopCustomerProps {
    name:string;
    image: string;
    total: number;
    location: string;
    index: number;
}

export const ItemTopCustomer:React.FC<ItemTopCustomerProps> = ({
    name,
    image,
    total,
    location,
    index
}) =>{
const [convertTotal,setConvertTotal] = useState(0)
    useEffect(()=>{
        let result:any =total;
     
        if(result >1000 && result<1000000){
            result = `${total/1000} K`;
  
            setConvertTotal(result);
            return;
        }
        if(result >1000000 && result<1000000000){

            result =`${total/1000000} M`;
            setConvertTotal(result);
            return;
        }
        if(result >1000000000){

            result =`${total/1000000000} B`;
            setConvertTotal(result);
            return;
        }
        
    },[total])

    return (
        <div className="flex justify-between items-center gap-1 cursor-pointer">
            <div className=" relative flex items-center justify-start gap-2">
                <div className={cn("text-neutral-400",
                                    index === 0 &&"text-yellow-400 text-[20px]",
                                    index === 1 && 'text-gray-200 text-[18px]',
                                    index === 2 && 'text-yellow-600 text-[16px]'
                                )}      
                >
                                    {index+1} 
                </div>
                <Image 
                    src={image ? image: '/avatar.png'}
                    width={40}
                    height={40}
                    alt="avatar"
                    className="rounded-full aspect-square"
                />
                <div>
                    <div>{name}</div>
                    <div className="text-neutral-400 font-thin">{location}</div>
                </div>
                {index === 0 && (
                    <div className="absolute bottom-[-7px] left-8">
                    <Image 
                        src={ '/gold-medal.png'}
                        width={30}
                        height={30}
                        alt="avatar"
                        className="rounded-full aspect-square"
                    />
                    </div>
                )}
                {index === 1  && (
                    <div className="absolute bottom-[-7px] left-8">
                    <Image 
                        src={ '/silver-medal.png'}
                        width={30}
                        height={30}
                        alt="avatar"
                        className="rounded-full aspect-square"
                    />
                    </div>
                )}
                { index ===2 && (
                    <div className="absolute bottom-[-7px] left-8">
                    <Image 
                        src={ '/medal-2.png'}
                        width={30}
                        height={30}
                        alt="avatar"
                        className="rounded-full aspect-square"
                    />
                    </div>
                )}
                
            </div>
            <div className="text-green-600">
                {convertTotal}
            </div>
        </div>
    )
}

