"use client"

import { Comment, HeartReply, Relly, User } from "@prisma/client"
import Content from "./content"
import Header from "./header"
import { useCallback, useEffect, useState } from "react";
import { comment } from "postcss";
import axios from "axios";

interface CommentProps {
    currentUser?: any,
    user: User[] | any,
    comments: Comment[] | any;
    relly:Relly[] | any;
    heartRelly :HeartReply[] | any;
    comment_page: number;
    comment_per_page: number;
    sort: string
    add:string
    removed: string;
    heart:string
    updated:string;
}

const CommentSection:React.FC<CommentProps> = ({
    currentUser,
    user = [],
    comments =[],
    relly = [],
    heartRelly = [],
    comment_page,
    comment_per_page,
    sort,
    add,
    removed,
    heart,
    updated
}) =>{
    const [loading,setLoading] = useState(false)
    //const [comments,setComments] = useState<any>([])
    const handleLoading = useCallback((value:any)=>{
        setLoading(value)
    },[])

   
    return (
        <div className="w-full px-2 py-1 ">
            <Header 
                currentUser ={currentUser}
                user ={user}
                handleLoading = {handleLoading}
                comments = {comments}
            />
            <Content
                user ={user}
                currentUser ={currentUser}
                comments ={comments}
                comment_page ={comment_page}
                comment_per_page = {comment_per_page}
                 relly = {relly}
                heartRelly ={heartRelly}
                loading = {loading}
                sort = {sort}
                handleLoading = {handleLoading}
                add = {add}
                removed ={removed}
                updated = {updated}
                heart ={heart}
            />
        </div>
    )
}

export default CommentSection