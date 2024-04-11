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
            <td>
                <div className="flex items-center justify-start gap-0.5">
                    <Image 
                        src={image ? image : '/avatar.webp'}
                        width={30}
                        height={30}
                        alt="avatar"
                        className="rounded-full aspect-square"
                    />
                    <span>{name && name}</span>
                </div>
            </td>
            <td>{email && email}</td>
            <td>{new Date(date && date).toDateString()}</td>
            <td>{seen && seen ? 'Seen': 'Not Seen'}</td>
        
        </tr>
    )
}

export default ItemHistoryMail