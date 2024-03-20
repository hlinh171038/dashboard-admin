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
import { Heart, Relly, User } from "@prisma/client";
import ItemReply from "./item-reply";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import OutsideClickHandler from 'react-outside-click-handler';
import { useRouter } from "next/navigation";

interface CommentItemProps {
    content: string;
    created_at: string;
    userId: string;
    userName: string;
    userImage: string;
    currentUser?: any;
    id: string;
    relly?: Relly[] | any;
    heart: Heart[] | any;
    user: User[] | any;
}
const CommentItem:React.FC<CommentItemProps> = ({
    currentUser,
    content,
    created_at,
    id,
    userId,
    userName,
    userImage,
    relly =[],
    heart = [],
    user = []
}) =>{
    const [text,setText] = useState('')
    const [isLoading,setIsLoading] = useState(false);
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

        axios.post('/api/add-new-item',{
           content:'text',
           userImage: currentUser.user.image,
           userName: currentUser.user.name,
           commentId:id,
           heart:'no'
        })
        .then((res:any)=>{
            console.log(res.data)
        })
        .catch((error:any)=>{
            console.log(error)
        })
        
    }
    //handle delete
    const handleDelete = useCallback((id:string)=>{
        axios.post('/api/delete-comment',{id})
        .then((res:any)=>{
            console.log(res.data)
        })
        .catch((error:any)=>{
            console.log(error)
        })
    },[])

    //handle update
    const handleUpdate = useCallback((e:any)=>{
        
        setIsLoading(true)
        console.log(textUpdate)
        if(e.code === 'Enter'){
            setUpdate(false)
            console.log(textUpdate)
            
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

      console.log(userId)
      console.log(currentUser)
      // take currentUser
      useEffect(()=>{
        user && user.forEach((item:any)=>{
            if(item.email === currentUser.user.email){
                setCurrentUserId(item);
            }
        })
      },[currentUser.user.email,user])
    return (
        <div className="flex flex-col gap-2 ">
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
                        
                        <div>6 phut truoc</div>
                            
                    </div>
                    <div>
                        <span>
                            
                            <Popover>
                                        <PopoverTrigger>
                                            <BsThreeDotsVertical className="w-4 h-4 "/>
                                        </PopoverTrigger>
                                        <PopoverContent
                                            side="bottom"
                                            className=" rounded-md shadow-md"
                                        >   
                                           <div className="flex flex-col gap-2">
                                            <button onClick={()=>handleDelete(id)}>delete</button> 
                                            <button onClick={()=>setUpdate(!update)}>update</button> 
                                           </div>
                                        </PopoverContent>
                                    </Popover>
                        </span>
                    </div>
                </div>
                <div className="border-l border-slate-950 ml-3">
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
                                <div>
                                    {heart.length}
                                    {heartObj && heartObj.status === 'yes' ?(
                                        <FaHeart  className="w-3 h-3 " onClick={()=>handleCreateHeart(id)}/>
                                    ):(
                                        <FaRegHeart className="w-3 h-3 " onClick={()=>handleCreateHeart(id)}/>
                                    )}
                                    
                                </div>
                                <div >
                                    <Popover>
                                        <PopoverTrigger>
                                            Reply
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
                            </div>
                        </div>
                    </div>
                        {relly && relly.length>0 && (
                            relly.map((item:any)=>{
                                return <div key={item.id} className="flex flex-col gap-2 ml-1">
                                            <ItemReply 
                                                key={item.id}
                                                content ={item.content}
                                                userName = {item.userName}
                                                userImage = {item.userImage}
                                            />
                                        </div>
                            })
                        )}
                </div>
           </div> 
    )
}
export default CommentItem