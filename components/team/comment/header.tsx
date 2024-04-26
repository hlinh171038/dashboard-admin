"use client"

import Image from "next/image"
import { FaCircleArrowUp } from "react-icons/fa6"
import { MdAttachFile, MdOutlineKeyboardCommandKey } from "react-icons/md";
import { BsEmojiSmile } from "react-icons/bs";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Comment, User } from "@prisma/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaSmile } from "react-icons/fa";

interface HeaderProps {
    currentUser?: any
    user: User[] | any;
    handleLoading: (value:any) => void;
    comments: Comment[] | any;
}

const Header:React.FC<HeaderProps> = ({
    currentUser,
    user =[],
    comments = [],
    handleLoading
}) =>{
    const [text,setText] = useState('')
    const [userId,setUserId] =useState<any>([])
    const [isLoading,setIsLoading] = useState(false)
    const [addNewData,setAddNewData] = useState<any>([])
    const router = useRouter()
   
  
    //handle submit
    const handleSubmit = useCallback(() =>{
        if(text === ''){
            toast.warning('Type some comment !!!');
            return;
        }
        handleLoading(true)
        setIsLoading(true)
        axios.post('/api/add-new-comment',{
            userId: userId[0].id,
            userImage: userId[0].image,
            userName: userId[0].name,
            text,
           
        })
        .then((res:any)=>{
            router.refresh()
            //setAddNewData()
            toast.success("commented")
        })
        .catch((error:any)=>{
            toast.error("Some thing went wrong !!!")
        })
        .finally(()=>{
            setIsLoading(false)
           
            setText('')
        })
        
    },[text,userId,router,handleLoading])

    useEffect(()=>{
        if(!currentUser) {
            toast.warning("Loggin to comment !!!" );
            return;
        }
        const result = user && user.filter((item:any)=> item.email === currentUser.user.email);
        setUserId(result)
    },[currentUser,user])

    console.log(comments)
    return (
        <div className="z-20 ">
            <div className="flex items-center justify-start gap-1 text-neutral-100 text-[15px]">
                    <div>Comment</div>
                    <div>{`(${comments && comments.length})`}</div>
                </div>
            <div className="flex items-center justify-start gap-2 w-full">
                
                <div className="relative rounded-md w-full  bg-slate-500/60 px-2 py-1">
                    <div className="flex items-center justify-start gap-1">
                    <Image 
                        src={currentUser?.user?.image ?currentUser?.user?.image:'/avatar.png'}
                        width={30}
                        height={30}
                        alt="avatar"
                        className="rounded-full aspect-square"
                        />
                        <div className="text-neutral-100 text-[14px] capitalize">{currentUser?.user?.name ?currentUser?.user?.name :"Anonymous"}</div>
                    </div>
                    <div className="absolute top-[0.25rem] right-2 text-neutral-400 text-[13px] flex items-center justify-start gap-1 ">
                            <MdOutlineKeyboardCommandKey className="w-4 h-4 " /> 
                            <span>Enter</span>
                        </div>
                    <div className="w-full pt-1 ">
                        <textarea 
                           
                            className=" text-neutral-100 outline-none bg-slate-500/10 w-full px-2 min-h-6 h-auto text-[14px] border-b border-white "
                            placeholder="comment"
                            value = {text}
                            onChange={(e)=>setText(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  handleSubmit(); // Call the function on Enter press
                                }
                              }}
                        />
                       <div className="absolute top-[0.25rem] right-2 text-neutral-400 text-[13px] flex items-center justify-start gap-1 ">
                            <MdOutlineKeyboardCommandKey className="w-4 h-4 " /> 
                            <span>Enter</span>
                        </div>
                    </div>
                    <div className="text-neutral-200 hover:text-neutral-400 flex items-center justify-end gap-2">
                        <MdAttachFile className="w-4 h-4 text-neutral-400"/>
                        <BsEmojiSmile className="w-4 h-4 text-neutral-400"/>
                        <button 
                            onClick={handleSubmit}  
                            className="text-neutral-200 hover:text-neutral-400 px-2 py-1 bg-[#4FA29E] rounded-md flex items-center gap-1 text-[15px]">
                            {isLoading ?'Com...' : 'Comment'}
                            {isLoading &&  <AiOutlineLoading3Quarters className="animate-spin h-5 w-5 "/>}
                        </button>
                    </div>
                   
                </div>
            </div>
        </div>
    )
}

export default Header