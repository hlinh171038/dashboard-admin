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
import { useCallback, useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { HiOutlineMailOpen } from "react-icons/hi";
import { MdOutlineReportGmailerrorred } from "react-icons/md";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';


interface MailItemProps {
    mailSend: string
    mailRecive: string
    created_at:string
    userName: string
    userImage : string
    mailId: string
    userId:string
    setData:any;
}

const MailItem:React.FC<MailItemProps> = ({
    mailSend,
    created_at,
    userImage,
    userName,
    mailId,
    userId,
    mailRecive,
    setData
}) =>{
    const [isLoading,setIsLoading] = useState(false)
    const [day,setDay] = useState<any>(0)
    const [house,setHouse] = useState<any>(0)
    const [minute,setMinute] = useState<any>(0)
    const router = useRouter()

    //handle delete and create history
    const handleDelete = useCallback((id:string)=>{
        if(userId === '') {
            toast.warning('Loggin ');
            return;
        }
        setIsLoading(true);
        axios.post('/api/delete-tempMail',{mailId})
        .then((res)=>{
            setData(res.data && res.data)
           // toast.success('Deleted');
            router.refresh();
        })
        .catch((err:any)=>{
            toast.error("Something went wrong !!!")
        }).
        finally(()=>{
            //setIsLoading(false)
        })

        axios.post('/api/create-new-history',{
            userId,
            title:mailSend,
            type: 'removed email'
        })
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
    },[mailId,router,userId,mailSend,setData])
    //handle go to mail
    const handleGoToEmail = useCallback((id:string)=>{
        if(userId === '') {
            toast.warning('Loggin ');
            return;
        }
        axios.post('/api/update-tempMail',{mailId})
            .then((res)=>{
               // toast.success('check your mail');
               setData(res.data && res.data)
                router.refresh();
            })
            .catch((err:any)=>{
                toast.error("Something went wrong !!!")
            })
            // create history
            axios.post('/api/create-new-history',{
                userId,
                title:`go to ${mailRecive && mailRecive}`,
                type: 'check email'
            })
            .then((res)=>{
                
                toast.success('check your mail');
                router.refresh();
            })
            .catch((err:any)=>{
                toast.error("Something went wrong !!!")
            }).
            finally(()=>{
                setIsLoading(false)
            })
    },[mailId,router,mailRecive,userId,setData])

    //handle spam
    const handleSpam = useCallback((id:string)=>{
        router.push('/users/help')
    },[router])

    // timer
     useEffect(()=>{
        const now:any = new Date(); // current
        const end:any = new Date(created_at) // commnet day
        const diff = now - end;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setDay(days);
        setHouse(hours);
        setMinute(minutes);
    },[created_at])
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
                        <div>{mailSend || <Skeleton/>}</div>
                        <div className="text-neutral-400 text-[13px]">{day > 0 ? day + ' day ago':(house >0 ? house + ' hours ago': minute + ' minute ago')}</div>
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