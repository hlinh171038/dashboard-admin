"use client"

import Image from "next/image"
import MailItem from "./mail-item"
import { Suspense, useCallback, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import axios from "axios"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { User } from "@prisma/client"
import { LuMailWarning } from "react-icons/lu"





interface MailContentProps {
    mail: any;
   userId: string;
 
}
const MailContent:React.FC<MailContentProps> = ({
    mail,
   userId,
 
}) =>{

    const [isLoading,setIsLoading] = useState(false)
    const router = useRouter()

    //handle delete
    const handleDeleteAll = useCallback((id:string)=>{
        setIsLoading(true);
        axios.post('/api/delete-all-tempMail',{id})
        .then((res)=>{
            
           // toast.success('Deleted');
            router.refresh();
        })
        .catch((err:any)=>{
            toast.error("Something went wrong !!!")
        }).
        finally(()=>{
            setIsLoading(false)
        })
        axios.post('/api/create-new-history',{
            userId,
            title:'remove-all',
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
    },[router,userId])

    if(mail.length ===0) {
        return (
            <div>
                <div className="flex items-center justify-center gap-2 text-[14px] py-4">
                    <LuMailWarning/>
                    <div>No Eamil</div>
                </div>
            </div>
        )
    }
    
    return (
        <div className="text-[14px] flex flex-col gap-2 px-2 py-2 rounded-md">
            <div className="flex items-center justify-between">
                <div className="text-[16px] font-bold">Total email <span className="font-normal">{`(${mail.length}) `}</span></div>
                <div onClick={()=>handleDeleteAll(mail.id)} className="underline text-[14px] text-neutral-400 cursor-pointer">Delete All</div>
            </div>
            <div className="text-[14px] ">
            <Tabs defaultValue="account"  className="text-[14px] ">
                <TabsList className="font-thin text-[14px]">
                    <TabsTrigger value="all" className="text-[14px] font-thin">New</TabsTrigger>
                    <TabsTrigger value="unread" className="text-[14px] font-thin">Seen</TabsTrigger>
                    
                </TabsList>
                <TabsContent value="all">
                <div>
                   
                    {mail && mail.length>0 && mail.map((item:any)=>{
                        return <MailItem 
                                    key={item.id}
                                    mailSend = {item.mailSend}
                                    mailRecive ={item.mailRecive}
                                    created_at = {item.created_at}
                                    userName = {item.userName}
                                    userImage = {item.userImage}
                                    mailId = {item.id}
                                    userId ={userId}
                                />
                    })}
                
                </div>
                </TabsContent>
                <TabsContent value="unread">
                <div>
                    {mail && mail.length>0 && mail.filter((item:any)=>item.seen === true && item.history !== true) .map((item:any)=>{
                        return <MailItem 
                                    key={item.id}
                                    mailSend = {item.mailSend}
                                    mailRecive ={item.mailRecive}
                                    created_at = {item.created_at}
                                    userName = {item.userName}
                                    userImage = {item.userImage}
                                    mailId = {item.id}
                                    userId ={userId}
                                />
                    })}
                </div>
                </TabsContent>
            </Tabs>
            </div>
          
        </div>
    )
}

export default MailContent

