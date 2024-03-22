"use client"

import Image from "next/image"
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdDeleteOutline, MdOutlineUpdate } from "react-icons/md";
import { useCallback, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { HiOutlineMailOpen } from "react-icons/hi";
import { MdOutlineReportGmailerrorred } from "react-icons/md";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";


interface MailItemProps {
    mailSend: string
    created_at:string
    userName: string
    userImage : string
    mailId: string
}

const MailItem:React.FC<MailItemProps> = ({
    mailSend,
    created_at,
    userImage,
    userName,
    mailId
}) =>{
    const [isLoading,setIsLoading] = useState(false)
    const router = useRouter()

    //handle delete
    const handleDelete = useCallback((id:string)=>{
        setIsLoading(true);
        axios.post('/api/delete-mail',{mailId})
        .then((res)=>{
            
            toast.success('Deleted');
            router.refresh();
        })
        .catch((err:any)=>{
            toast.error("Something went wrong !!!")
        }).
        finally(()=>{
            setIsLoading(false)
        })
    },[mailId,router])
    //handle go to mail
    const handleGoToEmail = useCallback((id:string)=>{
        axios.post('/api/update-mail',{mailId})
            .then((res)=>{
                toast.success('check your mail');
                router.refresh();
            })
            .catch((err:any)=>{
                toast.error("Something went wrong !!!")
            })
            
    },[mailId,router])

    //handle spam
    const handleSpam = useCallback((id:string)=>{

    },[])
    return(
        <div className="flex items-start justify-between ">
                <div className="flex items-center justify-start gap-2">
                    <Image 
                        width={40}
                        height={40}
                        src={userImage ? userImage : '/avatar.png'}
                        alt="avatar"
                        objectFit="cover"
                        className="rounded-full aspect-square "
                    />
                    <div className="flex flex-col gap-0.5">
                        <div>{mailSend}</div>
                        <div className="text-neutral-400 text-[13px]">{new Date(created_at).toLocaleString()}</div>
                    </div>
                </div>
                <div>
                    <Popover>
                        <PopoverTrigger>
                            <BsThreeDotsVertical className="w-4 h-4 "/>
                        </PopoverTrigger>
                        <PopoverContent
                            side="bottom"
                            className=" rounded-md shadow-md mr-2"
                        >   
                            <div className="flex flex-col gap-0.5 px-2 py-2 ">
                            <button onClick={()=>handleDelete(mailId)} disabled={isLoading} className="flex items-center justify-start gap-1 py-0.5 px-2 bg-slate  cursor-pointer hover:bg-slate-100 rounded-md text-[14px]">
                                <div className="flex items-center justify-start gap-2">
                                    <MdDeleteOutline className="w-4 h-4 " />
                                    <span>Delete this Notify</span>
                                </div>
                                {isLoading ?  <AiOutlineLoading3Quarters className="animate-spin h-5 w-5 "/>:<div className="w-5 h-5 flex items-center justify-center"></div>}
                            </button> 
                            <button onClick={()=>handleGoToEmail(mailId)} className="flex items-center justify-start gap-1 py-0.5 px-2 bg-slate  cursor-pointer hover:bg-slate-100 rounded-md text-[14px]">
                               
                                <div className="flex items-center justify-start gap-2">
                                    <HiOutlineMailOpen  className="w-4 h-4 " />
                                    <span> Go to email</span>
                                </div>
                            </button> 
                            <button onClick={()=>handleSpam('id')} className="flex items-center justify-start gap-1 py-0.5 px-2 bg-slate  cursor-pointer hover:bg-slate-100 rounded-md text-[14px]">
                                
                            <div className="flex items-center justify-start gap-2">
                                    <MdOutlineReportGmailerrorred  className="w-4 h-4 " />
                                    <span> Report </span>
                                </div>
                            </button> 
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
    )
}

export default MailItem