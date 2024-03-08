"use client"
import { cn } from "@/lib/utils";
import { MdOutlineManageAccounts } from "react-icons/md";
import { MdOutlinePhoneIphone } from "react-icons/md";
import { BsCart4 } from "react-icons/bs";
import { MdOutlineDiscount } from "react-icons/md";
import { GiBlackBook } from "react-icons/gi";

const array = [
    {
        icon:<MdOutlinePhoneIphone className="w-8 h-8"/>,
        title:'account',
        content:'Update your account information and manager your subscription',
        color:'border-[#FFFFFF]'
    },
    {
        icon:<MdOutlineManageAccounts className="w-6 h-6 "/>,
        title:'app',
        content:'There is not support in app',
        color:'border-[#FFFFFF]'
    },
    {
        icon:<BsCart4 className="w-6 h-6 "/>,
        title:'Create and manager product',
        content:'click here to create nad manager your product',
        color:'border-[#FFFFFF]'
    },
    {
        icon:<MdOutlineDiscount className="w-6 h-6 "/>,
        title:'discount code',
        content:'Create discount code to attack your customer',
        color:'border-[#FFFFFF]'
    },
    {
        icon:<GiBlackBook className="w-6 h-6 "/>,
        title:'Book',
        content:'support for books you have purchase or download',
        color:'border-[#FFFFFF]'
    },
]

const ListHelp = () =>{
    return (
        <div className="flex flex-col gap-2">
            {array.map((item)=>{
                return (
                    <div 
                        className={cn(`flex items-center justify-start gap-2 border rounded-md shadow-md px-2 py-1 ${item.color}`,{

                                    })}
                        key={item.title}
                    >
                        <div className="px-4">
                            {item.icon}
                        </div>
                        <div className="flex flex-col gap-0.5">
                            <div className="text-md capitalize">{item.title}</div>
                            <div className="text-[14px] text-thin text-neutral-400">{item.content}</div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default ListHelp