"use client"
import { cn } from "@/lib/utils";
import { MdOutlineManageAccounts } from "react-icons/md";
import { MdOutlinePhoneIphone } from "react-icons/md";
import { BsCart4 } from "react-icons/bs";
import { MdOutlineDiscount } from "react-icons/md";
import { GiBlackBook } from "react-icons/gi";
import { useRouter } from "next/navigation";

const array = [
    {
        icon:<MdOutlinePhoneIphone className="w-8 h-8"/>,
        title:'account',
        content:'Update your account information and manager your subscription',
        color:'border-[#FFFFFF]',
        link: '/dashboards/customers'
    },
    {
        icon:<MdOutlineManageAccounts className="w-6 h-6 "/>,
        title:'app',
        content:'There is not support in app',
        color:'border-[#FFFFFF]',
    },
    {
        icon:<BsCart4 className="w-6 h-6 "/>,
        title:'Create and manager product',
        content:'Click here to create nad manager your product',
        color:'border-[#FFFFFF]',
        link: '/dashboards/product'
    },
    {
        icon:<MdOutlineDiscount className="w-6 h-6 "/>,
        title:'discount code',
        content:'Create discount code to attack your customer',
        color:'border-[#FFFFFF]',
        link: 'dashboards/discount'
    },
    {
        icon:<GiBlackBook className="w-6 h-6 "/>,
        title:'Book',
        content:'Support for books you have purchase or download',
        color:'border-[#FFFFFF]'
    },
]

const ListHelp = () =>{
    const router = useRouter()
    return (
        <div className="flex flex-col gap-2">
            {array.map((item)=>{
                return (
                    <button 
                        className={cn(`grid grid-cols-3 items-center gap-2 border rounded-md shadow-md px-2 py-1 cursor-pointer ${item.color}`,{

                                    })}
                        key={item.title}
                        disabled ={!item.link}
                        onClick={()=>router.push(`${item.link}`)}
                    >
                        <div className="col-span-1 px-4">
                            {item.icon}
                        </div>
                        <div className="col-span-2 flex flex-col gap-0.5  justify-start items-start text-start">
                            <div className="text-[14px] capitalize">{item.title}</div>
                            <div className="text-[13px] text-thin text-neutral-400">{item.content}</div>
                        </div>
                    </button>
                )
            })}
        </div>
    )
}

export default ListHelp