"use client"

import Image from "next/image"
import MailItem from "./mail-item"
import { Suspense, useCallback, useEffect, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import axios from "axios"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { User } from "@prisma/client"
import { LuMailWarning } from "react-icons/lu"

import { getAllUser2 } from "@/app/actions/getAllUser2"
import { Skeleton } from "../ui/skeleton"





interface MailContentProps {
    //mail: any;
   userId: string;
 
}
const MailContent:React.FC<MailContentProps> = ({
    //mail,
   userId,
   
}) =>{

    const [isLoading,setIsLoading] = useState(false)
    const [data,setData] = useState<any>([])
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

     // search + skelton
     useEffect( ()=>{
        setIsLoading(true)
       // console.log(array)
        axios.post('/api/find-all-tempMail',{userId})
            .then((res)=>{
                console.log(res.data)
                setData(res.data && res.data)
                //toast.success('search ');
                router.refresh()
               
            })
            .catch((err:any)=>{
                toast.error("Something went wrong !!!")
            }).finally(()=>{
                setIsLoading(false)
               
            })
     },[router,userId])
    console.log(data)
     console.log(userId)
  
    
    return (
        <div className="text-[14px] flex flex-col gap-2 px-2 py-2 rounded-md">
            <div className="flex items-center justify-between">
                <div className="text-[16px] font-bold">Total email <span className="font-normal">{`(${data.length}) `}</span></div>
                <div onClick={()=>handleDeleteAll(data && data.id)} className="underline text-[14px] text-neutral-400 cursor-pointer">Delete All</div>
            </div>
            <div className="text-[14px] ">
            <Tabs defaultValue="all"  className="text-[14px] ">
                <TabsList className="font-thin text-[14px]">
                    <TabsTrigger value="all" className="text-[14px] font-thin">New</TabsTrigger>
                    <TabsTrigger value="unread" className="text-[14px] font-thin">Seen</TabsTrigger>
                    
                </TabsList>
                <TabsContent value="all">
                <div>
                   {isLoading ?(
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-start gap-2">
                                <Skeleton className="h-8 w-8 rounded-full aspect-square" />
                                <div className="space-y-1">
                                    <Skeleton className="h-3 w-[200px]" />
                                    <Skeleton className="h-3 w-[150px]" />
                                </div>
                        </div>
                        <div className="flex items-center justify-start gap-2">
                                <Skeleton className="h-8 w-8 rounded-full aspect-square" />
                                <div className="space-y-1">
                                    <Skeleton className="h-3 w-[200px]" />
                                    <Skeleton className="h-3 w-[150px]" />
                                </div>
                        </div>
                        <div className="flex items-center justify-start gap-2">
                                <Skeleton className="h-8 w-8 rounded-full aspect-square" />
                                <div className="space-y-1">
                                    <Skeleton className="h-3 w-[200px]" />
                                    <Skeleton className="h-3 w-[150px]" />
                                </div>
                        </div>
                    </div>
                    
                   ):(
                     data?.length>0 ? data.map((item:any)=>{
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
                    }):(
                        <div>
                            <div className="flex items-center justify-center gap-2 text-[14px] py-4">
                                <LuMailWarning/>
                                <div>No Eamil</div>
                            </div>
                     </div> 
                    )
                   )}
                
                </div>
                </TabsContent>
                <TabsContent value="unread">
                <div>
                   {isLoading ?(
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-start gap-2">
                                <Skeleton className="h-8 w-8 rounded-full aspect-square" />
                                <div className="space-y-1">
                                    <Skeleton className="h-3 w-[200px]" />
                                    <Skeleton className="h-3 w-[150px]" />
                                </div>
                        </div>
                        <div className="flex items-center justify-start gap-2">
                                <Skeleton className="h-8 w-8 rounded-full aspect-square" />
                                <div className="space-y-1">
                                    <Skeleton className="h-3 w-[200px]" />
                                    <Skeleton className="h-3 w-[150px]" />
                                </div>
                        </div>
                        <div className="flex items-center justify-start gap-2">
                                <Skeleton className="h-8 w-8 rounded-full aspect-square" />
                                <div className="space-y-1">
                                    <Skeleton className="h-3 w-[200px]" />
                                    <Skeleton className="h-3 w-[150px]" />
                                </div>
                        </div>
                    </div>
                   ):(
                    data.filter((item:any)=>item.seen === true && item.history !== true).length>0 ? data.filter((item:any)=>item.seen === true && item.history !== true).map((item:any)=>{
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
                    }):(
                        <div>
                            <div className="flex items-center justify-center gap-2 text-[14px] py-4">
                                <LuMailWarning/>
                                <div>No Readed Eamil </div>
                            </div>
                     </div> 
                    )
                   )}
                
                </div>
                <div>
                    {data && data.length>0 && data.filter((item:any)=>item.seen === true && item.history !== true) .map((item:any)=>{
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

