"use client"

import { Comment, HeartReply, Relly, User } from "@prisma/client"
import Content from "./content"
import Header from "./header"

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
    return (
        <div className="w-full px-2 py-1 ">
            <Header 
                currentUser ={currentUser}
                user ={user}
            />
            <Content
                user ={user}
                currentUser ={currentUser}
                comments ={comments}
                relly = {relly}
                heartRelly ={heartRelly}
            />
        </div>
    )
}

export default CommentSection