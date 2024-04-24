"use client"

import { Comment, HeartReply, Relly, User } from "@prisma/client"
import Content from "./content"
import Header from "./header"
import { useCallback, useState } from "react";
import { comment } from "postcss";

interface CommentProps {
    currentUser?: any,
    user: User[] | any,
    comments: Comment[] | any;
    relly:Relly[] | any;
    heartRelly :HeartReply[] | any;
}

const CommentSection:React.FC<CommentProps> = ({
    currentUser,
    user = [],
    comments =[],
    relly = [],
    heartRelly = [],
}) =>{
    const [loading,setLoading] = useState(false)
    const handleLoading = useCallback((value:any)=>{
        setLoading(value)
    },[])

    console.log(comment)
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
                relly = {relly}
                heartRelly ={heartRelly}
                loading = {loading}
            />
        </div>
    )
}

export default CommentSection