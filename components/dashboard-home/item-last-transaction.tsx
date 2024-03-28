"use client"

import { cn } from "@/lib/utils"
import Image from "next/image"
import '@/app/globals.css'
interface ItemLastTransactionProps {
    name: string,
    image: string,
    status: string,
    date:string,
    price: number,
    id: string
}

const ItemLastTransaction:React.FC<ItemLastTransactionProps> = ({
    name,
    image,
    status,
    date,
    price,
    id
}) =>{
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
                            className="rounded-full aspect-square"
                        />
                    </div>
                    <div className="capitalize">{name}</div>
                </div>
                
            </td>
            <td
                
            >
                <div
                    className={cn("px-2 py-0.5 inline-block rounded-md text-[12px] capitalize",
                    status === "pending" && "text-yellow-600",
                    status === "done" && "text-blue-600",
                    status === "cancel" && "text-red-600",
                )}
                >
                {status}
                </div>
            </td>
            <td className="px-2">{new Date(date).toLocaleDateString()}</td>
            <td  className={cn("px-2",
                        status === 'cancel' && 'text-red-600'
                    )}>{price.toLocaleString('vi', {style : 'currency', currency : 'VND'})} </td>
        </tr>
    )
}

export default ItemLastTransaction