"use client"

import { User } from "@prisma/client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { IoMdLink } from "react-icons/io";
import { toast } from "sonner";
import { useLocation } from 'react-router-dom';
import { usePathname } from "next/navigation";
import { FaArrowRightToBracket } from "react-icons/fa6";

interface CopyLinkProps {
    currentUser: any;
    customer: User[] | any;
}

const CopyLink:React.FC<CopyLinkProps> = ({
    currentUser,
    customer =[]
}) =>{

    const [current,setCurrent] = useState<any>([])
    const pathName = usePathname();


    const handleCopy =() =>{
        if(current && current.role === 'no') {
            toast.error("You just copy under admin role.");
            return;
        }
        navigator.clipboard.writeText(`http://localhost:3000${pathName}`)
        toast.success("coppied to clipboard")
      }

    useEffect(()=>{
       const result = customer && customer.find((item:any)=>item.email === currentUser.user.email);
      
       setCurrent(result)
    },[currentUser,customer])
    return (
        <div className="text-[14px] text-neutral-400 min-w-[300px]">
            <div className="flex flex-col gap-2">
                <div>Who has access</div>
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center justify-start gap-2">
                        <Image 
                            src={current ? current.image : '/avatar.png'}
                            width={40}
                            height={40}
                            alt="avatar"
                            className="rounded-full aspect-square"
                        />
                        <div>{current.name}</div>
                    </div>
                    <div>{current.role === 'yes' ?'Admin': 'User'}</div>
                </div>
                <div>You just copy under admin role</div>
                <div 
                    onClick={handleCopy}
                    className="inline-flex items-center text-neutral-100 justify-between bg-[#4FA29E] px-2 py-1 rounded-md hover:opacity-[0.7]">
                    <IoMdLink className="w-4 h-4 "/>
                    <div className="capitalize">copy link</div>
                    <FaArrowRightToBracket className="w-4 h-4 "/>
                </div>
            </div>
        </div>
    )
}

export default CopyLink