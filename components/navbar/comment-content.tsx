"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCallback, useEffect, useState } from "react"

import CommentItemReply from "./comment-item-reply";
import { Notify } from "@prisma/client";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { IoIosNotificationsOff } from "react-icons/io";
import { Skeleton } from "../ui/skeleton";
import { LuMailWarning } from "react-icons/lu";
import PaginationTempMail from "./pagination-temp-mail";


interface CommentContentProps {
    // arrHeart: any;
    // arrRelly: any;
    // arrRellyHeart: any;
    // notify:Notify[] | any;
    userId: string;
}

const CommentContent:React.FC<CommentContentProps> = ({
    // arrHeart =[],
    // arrRelly = [],
    // arrRellyHeart = [],
    //notify = []
    userId
}) =>{
    const [isLoading,setIsLoading] = useState(false);
    const [notify,setNotify] = useState<any>([])
    const [notifySeen,setNotifySeen] = useState<any>([])
    const router = useRouter()
    //const [allArr,setAllArr] = useState<any>([])

    const [page,setPage] = useState(1)
    const [perPage,setPerPage] = useState(5); 

    //pagination

    const start = (page*perPage) - perPage;
    const end = page * perPage;
 
    const updateNotify = notify && notify.slice(start,end)
    console.log(updateNotify)
    const pagin:any[] = [];
    for(let i= 1; i<=Math.ceil(notify.length / perPage); i++) {
        pagin.push(i)
    }

    const updateNotifySeen = notifySeen && notifySeen.slice(start,end)
    //pagin seen 
    const paginSeen:any[] = [];
    for(let i= 1;i<=(Math.ceil(notifySeen && notifySeen.length /perPage));i++) {
        paginSeen.push(i)
    }
    console.log()
    console.log(paginSeen)
     //handle click
     const handleClick = () => {
        
        setPage(1)
    }

    const handleDeleteAll = useCallback(()=>{
        setIsLoading(true);
        axios.post('/api/delete-all-notify')
        .then((res)=>{
            
            toast.success('Deleted.');
            router.refresh();
        })
        .catch((err:any)=>{
            toast.error("Something went wrong !!!")
        }).
        finally(()=>{
            setIsLoading(false)
        })
    },[router])

     // search + skelton
     useEffect( ()=>{
        setIsLoading(true)
       // console.log(array)
        axios.post('/api/find-all-notify',{userId})
            .then((res)=>{
                console.log(res.data)
                setNotify(res.data && res.data)
                //toast.success('search ');
                router.refresh()
               
            })
            .catch((err:any)=>{
                toast.error("Something went wrong !!!")
            }).finally(()=>{
                setIsLoading(false)
               
            })
     },[router,userId])

     console.log(notify)

     useEffect(()=>{
        const result = notify && notify.filter((item:any)=>item.mark === true)
        setNotifySeen(result)
     },[notify])
 
    return (
        <div className="text-[14px] flex flex-col gap-2 px-2 py-2 rounded-md">
            <div className="flex items-center justify-between">
                <div className="text-[16px] font-bold">Total Comment <span className="font-normal">{`(${notify && notify.length}) `}</span></div>
                <div onClick={handleDeleteAll} className="underline text-[14px] text-neutral-400 cursor-pointer">Delete All</div>
            </div>
            <Tabs defaultValue="account" className="w-full">
            <TabsList>
                <TabsTrigger value="account" className="text-neutral-400 text-[15px] cursor-pointer" onClick={handleClick}>Total</TabsTrigger>
                <TabsTrigger value="password" className="text-neutral-400 text-[15px] cursor-pointer"  onClick={handleClick}>Seen</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
            {/* <div className="text-[14px] flex flex-col ">
                {notify && notify.map((item:any) =>{
                    return <CommentItemReply 
                                key={item.id}
                                userName ={item.userName}
                                userImage={item.userImage}
                                id ={ item.id}
                                createdAt={item.createdAt}
                                type = {item.type}
                                mark ={item.mark}
                            />
                })}
            </div> */}
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
                    updateNotify ? updateNotify.map((item:any) =>{
                        return <CommentItemReply 
                                    key={item.id}
                                    userName ={item.userName}
                                    userImage={item.userImage}
                                    id ={ item.id}
                                    createdAt={item.createdAt}
                                    type = {item.type}
                                    mark ={item.mark}
                                />
                    }):(
                        <div>
                            <div className="flex items-center justify-center gap-2 text-[14px] py-4">
                                <LuMailWarning/>
                                <div>No Notify</div>
                            </div>
                     </div> 
                    )
                   )}
                {/* pagination */}
                <PaginationTempMail pagin= {pagin} setPage ={setPage} isLoading ={isLoading}/>
               
                </div>
            </TabsContent>
            <TabsContent value="password">
            <div className="text-[14px] flex flex-col ">
                {updateNotifySeen && updateNotifySeen.map((item:any) =>{
                    return <CommentItemReply 
                                key={item.id}
                                userName ={item.userName}
                                userImage={item.userImage}
                                id ={ item.id}
                                createdAt={item.createdAt}
                                type = {item.type}
                                mark ={item.mark}
                            />
                })}
                <PaginationTempMail pagin ={paginSeen} setPage={setPage} isLoading ={isLoading}/>
            </div>
            </TabsContent>
            </Tabs>

            
          
        </div>
    )
}

export default CommentContent