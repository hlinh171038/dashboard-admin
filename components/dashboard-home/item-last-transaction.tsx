"use client"

import { cn } from "@/lib/utils"
import Image from "next/image"
import '@/app/globals.css'

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useEffect, useState } from "react";
interface ItemLastTransactionProps {
    name: string,
    image: string,
    status: string,
    date:string,
    price: number[],
    quantity: number[],
    id: string
}


const ItemLastTransaction:React.FC<ItemLastTransactionProps> = ({
    name,
    image,
    status,
    date,
    price = [],
    quantity = [],
    id
}) =>{
    const [total,setTotal] = useState<number>(0);

    useEffect(()=>{
        const priceArr = [...price];
        const quantityArr = [...quantity];
        let result = 0;
        priceArr.forEach((item:any,index:number)=>{
            result +=(item * quantityArr[index])
        });
        console.log(result);
        setTotal(result)
    },[price,quantity])
    return (
        <tr key={id} className="text-neutral-400 text-[15px]">
            <td  className="py-1">
                <div className="flex justify-start items-center gap-1 px-2">
                    <div>
                        <Image 
                            src={image ? image :'/avatar.png'}
                            width="30"
                            height="30"
                            alt="name"
                            className="rounded-full aspect-square object-cover"
                        />
                    </div>
                    <div className="capitalize">{name || <Skeleton/> }</div>
                </div>
                
            </td>
            <td
                
            >
                <div
                    className={cn("px-2 py-0.5 inline-block rounded-md text-[14px] capitalize",
                    status === "pending" && "text-yellow-600",
                    status === "done" && "text-green-600",
                    status === "cancel" && "text-red-600",
                )}
                >
                {status || <Skeleton/>}
                </div>
            </td>
            <td className="px-2">{new Date(date).toLocaleDateString()}</td>
            <td  className={cn("px-2",
                        status === 'cancel' && 'text-red-600'
                    )}>{status === "cancel" ? '-'+ total.toLocaleString('vi', {style : 'currency', currency : 'VND'}):total.toLocaleString('vi', {style : 'currency', currency : 'VND'})} </td>
        </tr>
    )
}

export default ItemLastTransaction