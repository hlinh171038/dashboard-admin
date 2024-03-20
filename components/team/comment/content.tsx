"use client"

import { Comment, User } from "@prisma/client";
import Image from "next/image"
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import CommentItem from "./comment-item";
import { useEffect } from "react";

interface ContentProps {
    user: User[] | any
    currentUser?: any;
    comments : Comment[] | any
}

const Content:React.FC<ContentProps> = ({
    user =[],
    currentUser,
    comments =[]
}) =>{
    console.log(comments)

    
    return (
        <div className="text-[14px] text-neutral-100 " >
           <div className="flex items-center justify-end px-2">
            <div>Sort by date</div>
           </div>
           <div className="h-[50vh] overflow-x-hidden ">
                {
                    comments && comments.map((item:any)=>{
                        return <CommentItem 
                                    currentUser ={currentUser}
                                    key={item.id}
                                    id={item.id}
                                    content ={item.content}
                                    created_at ={item.created_at}
                                    userId = {item.userId}
                                    userImage = {item.userImage}
                                    userName = {item.userName}    
                                    relly = {item.relly}
                                    heart = {item.heart}
                                    user = {user}
                                />
                    })
                }
           </div>
          
        
        
           
        </div>
    )
}

export default Content