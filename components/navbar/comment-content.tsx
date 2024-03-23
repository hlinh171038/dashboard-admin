"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCallback } from "react"
import CommentItemLike from "./comment-item-like";
import CommentItemReply from "./comment-item-reply";

interface CommentContentProps {
    arrHeart: any;
    arrRelly: any;
}

const CommentContent:React.FC<CommentContentProps> = ({
    arrHeart =[],
    arrRelly = [],
}) =>{
    console.log(arrHeart)
    const handleDeleteAll = useCallback((id:string)=>{

    },[])
    return (
        <div className="text-[14px] flex flex-col gap-2 px-2 py-2 rounded-md">
            <div className="flex items-center justify-between">
                <div className="text-[16px] font-bold">Total Comment <span className="font-normal">{`(${arrHeart && arrHeart.length}) `}</span></div>
                <div onClick={()=>handleDeleteAll('mail.id')} className="underline text-[14px] text-neutral-400">Delete All</div>
            </div>
            <div className="text-[14px] ">
            <Tabs defaultValue="account"  className="text-[14px] ">
                <TabsList className="font-thin text-[14px]">
                    <TabsTrigger value="all" className="text-[14px] font-thin">New</TabsTrigger>
                    <TabsTrigger value="unread" className="text-[14px] font-thin">Seen</TabsTrigger>
                    
                </TabsList>
                <TabsContent value="all">
                <div>
                    {arrHeart && arrHeart.map((item:any)=>{
                        return <CommentItemLike
                                    key={item.id}
                                    userName = {item.userName}
                                    createdAt = {item.createdAt}
                                    userImage = {item.userImage}
                                    id = {item.id}
                                />
                    })}
                </div>
                </TabsContent>
                <TabsContent value="unread">
                <div>
                    {arrRelly && arrRelly.map((item:any)=>{
                        return <CommentItemReply
                                    key={item.id}
                                    userImage={item.userImage}
                                    userName = {item.userName}
                                    createdAt={item.createdAt}
                                    id = {item.id}
                                    // mailSend = {item.mailSend}
                                    // created_at = {item.created_at}
                                    // userName = {item.userName}
                                    // userImage = {item.userImage}
                                    // mailId = {item.id}
                                />
                    })}
                </div>
                </TabsContent>
            </Tabs>
            </div>
          
        </div>
    )
}

export default CommentContent