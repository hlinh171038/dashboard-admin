"use client"

import axios from "axios";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { toast } from "sonner";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { Heart, HeartReply, Relly, User } from "@prisma/client";
import ItemReply from "./item-reply";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import OutsideClickHandler from 'react-outside-click-handler';
import { useRouter } from "next/navigation";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import { MdOutlineUpdate } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { cn } from "@/lib/utils";

interface CommentItemProps {
    content: string;
    createdAt: string;
    userId: string;
    userName: string;
    userImage: string;
    currentUser?: any;
    id: string;
    rellyComment?: Relly[] | any;
    heart: Heart[] | any;
    user: User[] | any;
    relly: Relly[] | any;
    heartRelly: HeartReply[] | any;
}
const CommentItem:React.FC<CommentItemProps> = ({
    currentUser,
    content,
    createdAt,
    id,
    userId,
    userName,
    userImage,
    rellyComment =[],
    heart = [],
    user = [],
    relly = [],
    heartRelly = []
}) =>{
    const [text,setText] = useState('')
    const [isLoading,setIsLoading] = useState(false);
    const [openReply,setOpenReply] = useState(false);
    const [isHeart,setIsHeart]  = useState(heart === 'no' ? false : true)
    const [heartObj,setHeartObj] = useState<any>(null)
    const [currentUserId,setCurrentUserId] = useState<any>(null)
    
    const [textUpdate,setTextUpdate] = useState(content? content : '')
    const [update,setUpdate] = useState(false)

    const router = useRouter()
   
    const handleSubmit = ()=>{
        if(!currentUser) {
            toast.warning('Login');
            return;
        }
        setIsLoading(true)

        axios.post('/api/add-new-item',{
           content:'text',
           userId:currentUserId?.id,
           userImage: currentUser.user.image,
           userName: currentUser.user.name,
           commentId:id,
          
        })
        .then((res:any)=>{
            toast.success('New reply.')
            router.refresh()
        })
        .catch((error:any)=>{
            toast.error('Some thing went wrong !!!')
        })
        .finally(()=>{
            setIsLoading(false)
        })
        
    }
    //handle delete
    const handleDelete = useCallback((id:string)=>{
        setIsLoading(true)
        axios.post('/api/delete-comment',{id})
        .then((res:any)=>{
            toast.success("Deleted.")
            router.refresh();
        })
        .catch((error:any)=>{
            toast.error("Something went wrong !!!")
        })
        .finally(()=>{
            setIsLoading(false)
        })
    },[router])

    //handle update
    const handleUpdate = useCallback((e:any)=>{
        
        setIsLoading(true)
        console.log(textUpdate)
        if(e.code === 'Enter'){
            setUpdate(false)
            
            if(content === textUpdate) {
                toast.warning('Have no change !!!');
                return;
            }
            axios.post('/api/update-comment',{
                id,
                content: textUpdate,
                heart:isHeart === true ? 'yes': 'no' 
            })
            .then((res:any)=>{
                toast.success("Updated.");
                router.refresh();
            })
            .catch((error:any)=>{
                toast.error('Some thing went wrong')
            })
            .finally(()=>{
                setIsLoading(false)
            })
        }
        
    },[id,textUpdate,router,content,isHeart])
   
    //handle update heart
    const handleCreateHeart = useCallback((id:string)=>{
        console.log(currentUserId)
        setIsLoading(true)
            axios.post('/api/create-heart',{
                userId:currentUserId?.id,
                commentId:id,
            })
            .then((res:any)=>{
                console.log(res.data)
                toast.success("success");
                router.refresh();
            })
            .catch((error:any)=>{
                toast.error('Some thing went wrong')
            })
            .finally(()=>{
                setIsLoading(false)
            })
        
        
    },[router,currentUserId])

    //handle out side input
    const handleClickOutside = () => {
        toast.warning("cancel update comment");
        setUpdate(false)
      };
   
      useEffect(()=>{
        heart.forEach((item:any)=>{
            if(item.commentId === id){
                setHeartObj(item)
            }
        })
      },[heart,id])

      // take currentUser
      useEffect(()=>{
        user && user.forEach((item:any)=>{
            if(item.email === currentUser.user.email){
                setCurrentUserId(item);
            }
        })
      },[currentUser.user.email,user])

      useEffect(()=>{
       console.log(createdAt)
      },[createdAt])
      console.log(relly)
    return (
        <div className="flex flex-col gap-2 mt-1">
                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-start gap-2 text-[14px] text-neutral-100">
                        <Image 
                            src={userImage ? userImage : '/avatar.png'}
                            width={30}
                            height={30}
                            alt="avatar"
                            className="rounded-full aspect-square"
                        />
                        <div>
                            
                            {userName && userName}
                        </div>
                        
                        <div className="text-neutral-400 text-[12px] font-thin flex items-center justify-center mt-1">{new Date(createdAt).toLocaleString()}</div>
                            
                    </div>
                    <div>
                        <span>
                            
                            <Popover>
                                        <PopoverTrigger>
                                            <BsThreeDotsVertical className="w-4 h-4 "/>
                                        </PopoverTrigger>
                                        <PopoverContent
                                            side="bottom"
                                            className=" rounded-md shadow-md mr-10 bg-slate-600"
                                        >   
                                           <div className="flex flex-col gap-2 px-4 py-2 ">
                                            <button onClick={()=>handleDelete(id)} disabled={isLoading} className="flex items-center justify-start gap-1 px-2 py-1 bg-slate text-neutral-100 bg-slate-900 cursor-pointer hover:bg-slate-800 rounded-md text-[14px]">
                                                Delete
                                                {isLoading ?  <AiOutlineLoading3Quarters className="animate-spin h-5 w-5 "/>:<div className="w-5 h-5 flex items-center justify-center"><MdDeleteOutline className="w-4 h-4 " /></div>}
                                            </button> 
                                            <button onClick={()=>setUpdate(!update)} className="flex items-center justify-start gap-1 px-2 py-1 bg-slate text-neutral-100 bg-slate-900 cursor-pointer hover:bg-slate-800 rounded-md text-[14px]">
                                                Update
                                                <div className="w-5 h-5 flex items-center justify-center"><MdOutlineUpdate  className="w-4 h-4 " /></div>
                                            </button> 
                                           </div>
                                        </PopoverContent>
                                    </Popover>
                        </span>
                    </div>
                </div>
                <div className="border-l border-slate-950 ml-3 ">
                    <div className="flex flex-col gap-1 ml-2 "> 
                            <div >
                                {update ?
                                (
                                    <div className="flex flex-col gap-1 text[14px] text-neutral-100">
                                        <div><strong>Enter</strong> to update , click outside to cancel</div>
                                        <OutsideClickHandler onOutsideClick={handleClickOutside}>
                                            <input 
                                               
                                                type="text" 
                                                value={textUpdate} 
                                                onChange={(e)=>setTextUpdate(e.target.value)}
                                                onKeyDown={handleUpdate}
                                                className="bg-slate-500/60 px-2 py-1 rounded-md outline-none w-full min-h-4"
                                            />
                                        </OutsideClickHandler>
                                    </div>
                                )
                                :content && content}
                            </div>
                            <div className="flex items-center justify-start gap-2 text-neutral-400">
                                <div className="flex items-center justify-start gap-1">
                                   
                                    { currentUserId?.id === userId && heartObj && heartObj.status === 'yes' ?(
                                        <FaHeart  className="w-3 h-3 " onClick={()=>handleCreateHeart(id)}/>
                                    ):(
                                        <FaRegHeart className="w-3 h-3 " onClick={()=>handleCreateHeart(id)}/>
                                    )}
                                     <span>{heart.length}</span>
                                </div>
                                <div className="flex items-center justify-start gap-2"  onClick={()=>setOpenReply(!openReply)}>
                                    <Popover>
                                        <PopoverTrigger>
                                            <span className="flex items-center justify-start gap-2">
                                               <span className="text-[13px] underline"> Reply <span>{rellyComment.length}</span></span>
                                               
                                            </span>
                                        </PopoverTrigger>
                                        <PopoverContent
                                            side="bottom"
                                            className="mr-2 min-w-[30rem] rounded-r-md shadow-md"
                                        >
                                            <input 
                                                type="text" 
                                                className="w-full px-2 py-1 rounded-md  "
                                                value = {text}
                                                onChange={(e)=>setText(e.target.value)}
                                            />
                                            <input type="submit" value="reply" onClick={handleSubmit} />
                                        </PopoverContent>
                                    </Popover>
                                    <span>{openReply ? (
                                            <IoIosArrowUp className="w-3 h-3 text-neutral-400 ml-2" />
                                        ): (
                                            <IoIosArrowDown className="w-3 h-3 text-neutral-400 ml-2" />
                                        )}</span>
                            </div>
                        </div>
                    </div>
                        {rellyComment && rellyComment.length>0 && (
                            rellyComment.map((item:any)=>{
                                return <div key={item.id} className={cn(" ",
                                                                        openReply ? 'flex flex-col gap-2 ml-1 my-1': 'hidden'
                                                                    )}>
                                            <ItemReply 
                                                key={item.id}
                                                content ={item.content}
                                                userName = {item.userName}
                                                userImage = {item.userImage}
                                                createdAt = {item.createdAt}
                                                id={item.id}
                                                heart = {item.heartRelly}
                                                currentUser= {currentUser}
                                                userId = {item.userId}
                                                user = {user}
                                                relly = {relly}
                                                heartRelly = {heartRelly}
                                            />
                                        </div>
                            })
                        )}
                </div>
           </div> 
    )
}
export default CommentItem