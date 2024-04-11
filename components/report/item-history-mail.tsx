"use client"

import Image from "next/image";


interface ItemHistoryMailProps {
    name: string;
    image: string;
    email: string;
    date: string;
    seen: boolean;
}

const ItemHistoryMail:React.FC<ItemHistoryMailProps> = ({
    name, 
    email,
    image,
    date,
    seen
}) =>{
    return (
        <tr className="text-neutral-400 text-[14px]">
            <td className="px-2">
                <div className="flex items-center justify-start gap-0.5">
                    <Image 
                        src={image ? image : '/avatar.webp'}
                        width={30}
                        height={30}
                        alt="avatar"
                        className="rounded-full aspect-square"
                    />
                    <span  className="px-2">{name && name}</span>
                </div>
            </td>
            <td  className="px-2">{email && email}</td>
            <td  className="px-2">{new Date(date && date).toDateString()}</td>
            <td  className="px-2">{seen && seen ? 'Seen': 'Not Seen'}</td>
        
        </tr>
    )
}

export default ItemHistoryMail