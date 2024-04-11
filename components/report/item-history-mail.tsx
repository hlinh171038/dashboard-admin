"use client"


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
            <td>{name && name}</td>
            <td>{email && email}</td>
            <td>{new Date(date && date).toDateString()}</td>
            <td>{seen && seen ? 'Seen': 'Not Seen'}</td>
            <td>Detail</td>
        </tr>
    )
}

export default ItemHistoryMail