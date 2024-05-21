"use client"

import Image from "next/image";

interface ItemHostestProductProps {
    brand?: string;
    count: number;
    name?: string;
    image?: string;
    brand2?: string;
    category?: string;
}

const ItemHostestProduct:React.FC<ItemHostestProductProps> = ({
    brand,
    count,
    name,
    image,
    brand2,
    category
}) =>{
    if(image && name) {
        return (
            <tr className="text-neutral-400 text-[14px]">
                 <td className="px-2 capitalize">
                  <div className="flex items-center justify-start gap-1">
                    <Image 
                        src={image ? image : '/avatar.png'}
                        width={25}
                        height ={25}
                        alt="avatar"
                        objectFit="cover"
                        className="aspect-square object-cover"
                    />
                    <div>
                        <div className="text-neutral-100 mb-[-4px]">{name}</div>
                        <div className="text-neutral-400 text-[13px]">{brand2}</div>
                    </div>
                  </div>
                </td>
                <td className="px-2 capitalize">{category}</td>
                <td className="px-2 capitalize">{count && count <10 ? `0${count}`: count} items</td>
            </tr>
        )
    }
    return (
        <tr className="text-neutral-400 text-[14px]">
           <td className="capitalize px-2">{brand}</td>
           <td className="px-2">{count && count <10 ? `0${count}`: count} items</td>
           <td className="px-2">Instock</td>
        </tr>
    )
}
export default ItemHostestProduct