"use client"

import { Comment, HeartReply, Relly, User } from "@prisma/client";
import Image from "next/image"
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import CommentItem from "./comment-item";
import { useCallback, useEffect, useState } from "react";
import { MdOutlineCommentsDisabled } from "react-icons/md";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

interface ContentProps {
    user: User[] | any
    currentUser?: any;
    comments : Comment[] | any;
    relly: Relly[] | any;
    heartRelly: HeartReply[] | any
}

const Content:React.FC<ContentProps> = ({
    user =[],
    currentUser,
    comments =[],
   relly =[],
   heartRelly = [],
}) =>{

    const [commentArr,setCommentArr] = useState<any>(comments &&comments)


    const handleSelected = (item:any)=>{
        let result:any[] = []
        if(item === 'featured') {
            result = comments.sort((a:any,b:any)=>{
                if(a.heart.length > b.heart.length) return -1;
                if(a.heart.length < b.heart.length) return 1;
                return 0
            })
        
        }
         else {
            result = comments.sort((a:any,b:any)=>{
                if(a.createdAt > b.createdAt) return 1;
                if(a.createdAt < b.createdAt) return -1;
                return 0
            })
         
            
        }
        setCommentArr([...result])
    }
    useEffect(()=>{
        setCommentArr(comments && comments) 
    },[comments])
    
    return (
        <div  >
            {comments.length === 0 ?(
            <div className="flex items-center justify-center w-full h-full">
                <div className="flex items-center justify-center  gap-1 text-neutral-100 text-[15px]">
                    <MdOutlineCommentsDisabled className="w-4 h-4 "/>
                    <span>No comment here !!!</span>
                </div>
            </div>
            ):(
                <div className="text-[14px] text-neutral-100 ">
                 <div className="flex items-center justify-end ">
                    <div className="bg-slate-500/60 rounded-md mt-2 px-2 py-1 w-[20%]">
                    <Select onValueChange={handleSelected}>
                        <SelectTrigger className="w-full ">
                            <SelectValue placeholder="Sort comment"  className="text-[14px] text-neutral-400"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="featured">Featured comments</SelectItem>
                            <SelectItem value="latest">Latest Comment</SelectItem>
                        </SelectContent>
                    </Select>
                    </div>
                    </div>
                    <div className="h-[50vh] overflow-x-hidden ">
                        {
                            commentArr && commentArr.map((item:any)=>{
                                return <CommentItem 
                                            currentUser ={currentUser}
                                            key={item.id}
                                            id={item.id}
                                            content ={item.content}
                                            createdAt ={item.createdAt}
                                            userId = {item.userId}
                                            userImage = {item.userImage}
                                            userName = {item.userName}    
                                            rellyComment = {item.relly}
                                            heart = {item.heart}
                                            user = {user}
                                            relly ={relly}
                                            heartRelly ={heartRelly}
                                        />
                            })
                        }
                    </div>
                </div>
            )}
          
          
        
        
           
        </div>
    )
}

export default Content