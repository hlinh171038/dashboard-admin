"use client"

import Image from "next/image"
import { FaCircleArrowUp } from "react-icons/fa6"
import { MdAttachFile } from "react-icons/md";
import { BsEmojiSmile } from "react-icons/bs";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { User } from "@prisma/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface HeaderProps {
    currentUser?: any
    user: User[] | any
}

const Header:React.FC<HeaderProps> = ({
    currentUser,
    user =[]
}) =>{
    const [text,setText] = useState('')
    const [userId,setUserId] =useState<any>([])
    const [isLoading,setIsLoading] = useState(false)
    const router = useRouter()
  
    //handle submit
    const handleSubmit = useCallback(() =>{
        if(text === ''){
            toast.warning('Type some comment !!!');
            return;
        }
        setIsLoading(true)
        axios.post('/api/add-new-comment',{
            userId: userId[0].id,
            userImage: userId[0].image,
            userName: userId[0].name,
            text,
            
        })
        .then((res:any)=>{
            router.refresh()
            toast.success("commented")
        })
        .catch((error:any)=>{
            toast.error("Some thing went wrong !!!")
        })
        .finally(()=>{
            setIsLoading(false)
            setText('')
        })
        
    },[text,userId,router])

    useEffect(()=>{
        if(!currentUser) {
            toast.warning("Loggin to comment !!!" );
            return;
        }
        const result = user && user.filter((item:any)=> item.email === currentUser.user.email);
        setUserId(result)
    },[currentUser,user])
    return (
        <div className="z-20">
            <div className="flex items-center justify-start gap-2 w-full">
                <div className=" rounded-md w-full  bg-slate-500/60 px-2 py-1">
                    <div className="flex items-center justify-start gap-1">
                    <Image 
                        src={currentUser?.user?.image ?currentUser?.user?.image:'/avatar.png'}
                        width={30}
                        height={30}
                        alt="avatar"
                        className="rounded-full aspect-square"
                        />
                        <div className="text-neutral-100 text-[14px]">{currentUser?.user?.name ?currentUser?.user?.name :"Anonymous"}</div>
                    </div>
                    <div className="w-full pt-1 ">
                        <textarea 
                            className=" text-neutral-100 outline-none bg-slate-500/10 w-full px-2 min-h-12 h-auto text-[14px] border-b border-white "
                            placeholder="comment"
                            value = {text}
                            onChange={(e)=>setText(e.target.value)}
                        
                        />
                    </div>
                    <div className="text-neutral-200 hover:text-neutral-400 flex items-center justify-end gap-2">
                        <MdAttachFile className="w-4 h-4 text-neutral-400"/>
                        <BsEmojiSmile className="w-4 h-4 text-neutral-400"/>
                        <button 
                            onClick={handleSubmit}  
                            className="text-neutral-200 hover:text-neutral-400 px-2 py-1 bg-slate-900 rounded-md flex items-center gap-1">
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