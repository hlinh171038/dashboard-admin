"use client"

import { Comment, User } from "@prisma/client"
import Content from "./content"
import Header from "./header"

interface CommentProps {
    currentUser?: any,
    user: User[] | any,
    comments: Comment[] | any;
}

const CommentSection:React.FC<CommentProps> = ({
    currentUser,
    user = [],
    comments =[]
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
            />
        </div>
    )
}

export default CommentSection