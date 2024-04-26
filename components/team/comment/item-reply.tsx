"use client"

import Image from "next/image"
import { FaHeart, FaRegHeart } from "react-icons/fa"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { BsThreeDotsVertical } from "react-icons/bs";
import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import OutsideClickHandler from "react-outside-click-handler";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { HeartReply, Relly, User } from "@prisma/client";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdDeleteOutline, MdOutlineKeyboardCommandKey, MdOutlineUpdate } from "react-icons/md";

  interface ItemReplyProps {
    content: string;
    userName: string;
    userImage: string;
    createdAt: string;
    id: string;
    heart: HeartReply[] | any,
    currentUser: any,
    userId: string,
    user: User[] | any;
    relly: Relly[] | any;
    heartRelly: HeartReply[] | any
  }

const ItemReply:React.FC<ItemReplyProps> = ({
    content,
    userName,
    userImage,
    createdAt,
    id,
    heart =[],
    user = [],
    relly = [],
    heartRelly =[],
    currentUser,
    userId
}) =>{
    const [update,setUpdate] = useState(false)
    const [textUpdate,setTextUpdate] = useState(content? content : '')
    const [isLoading,setIsLoading] = useState(false);
    const [heartObj,setHeartObj] = useState<any>(null)
    const [currentUserId,setCurrentUserId] = useState<any>(null)
    const [showHeart,setShowHeart] = useState<any>(null)
    const [numberic,setNumberic] = useState(0)
    const input2Ref = useRef<any>(null);
    const router = useRouter()
     //handle delete
     const handleDelete = useCallback((id:string)=>{
        setIsLoading(true)
        axios.post('/api/delete-reply',{id})
        .then((res:any)=>{
            toast.success('Deleted.')
            router.push(`/analytics/team?search_admin=&page_admin=1&per_page_admin=10&sort=&comment_page=${1}&comment_per_page=5&removed=${id}`)
            router.refresh();
        })
        .catch((error:any)=>{
            toast.error('Something went wrong !!!')
        })
        .finally(()=>{
            setIsLoading(false)
        })
    },[router])


    //handle update
    const handleUpdate = useCallback((e:any)=>{
        
        setIsLoading(true)
      
        if(e.code === 'Enter'){
            setUpdate(false)
            
            if(content === textUpdate) {
                toast.warning('Have no change !!!');
                return;
            }
            axios.post('/api/update-reply',{
                id,
                content: textUpdate,
                
            })
            .then((res:any)=>{
                toast.success("Updated.");
                router.push(`/analytics/team?search_admin=&page_admin=1&per_page_admin=10&sort=&comment_page=${1}&comment_per_page=5&updated=${id}`)
                router.refresh();
            })
            .catch((error:any)=>{
                toast.error('Some thing went wrong')
            })
            .finally(()=>{
                setIsLoading(false)
            })
        }
        
    },[id,textUpdate,router,content])

    //handle update heart
    const handleCreateHeart = useCallback((id:string)=>{
      
        setIsLoading(true)
            axios.post('/api/create-heart-reply',{
                userId:currentUserId?.id,
                rellyId:id,
            })
            .then((res:any)=>{
        
                toast.success("success");
                router.refresh();
            })
            .catch((error:any)=>{
                toast.error('Some thing went wrong')
            })
            .finally(()=>{
                setIsLoading(false)
            })
        
            axios.post('/api/create-notify',{
                userId: currentUserId?.id,
                userName:currentUserId?.name,
                userImage:currentUserId?.image,
                commentId: id,
                mark: false,
                type:'heartRelly'
            })
            .then((res:any)=>{
            
                router.refresh();
            })
            .catch((error:any)=>{
             
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

      // take heart by id item
      useEffect(()=>{
        heartRelly && heartRelly.forEach((item:any)=>{
            if(item.rellyId === id){
                setShowHeart(item)
            }
        })
      },[id,heartRelly])
   
      //reply heart
      useEffect(()=>{
        let result = heartRelly.filter((item:any)=>item.rellyId === id);
        setNumberic(result.length)
      },[heartRelly,id])

      // Focus on input if opened
      useEffect(()=>{
        if (update) {
            console.log(input2Ref)
            input2Ref.current.focus(); // Focus on input if opened
          }
      },[update])

    return (
        <div className="mt-1">
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
                <div className="border-l border-slate-950 ml-3 mt-1">
                    <div className="flex flex-col gap-1 ml-2 "> 
                            <div >
                            {update ?
                                (
                                    <div className="relative flex flex-col gap-1 text[14px] text-neutral-100">
                                        <div className="flex items-center justify-end px-2">
                                            <div className="text-neutral-100 text-[14px]"> Cancel: click outside.</div>
                                        </div>
                                      
                                        <OutsideClickHandler onOutsideClick={handleClickOutside}>
                                            <input 
                                               ref={input2Ref}
                                                type="text" 
                                                value={textUpdate} 
                                                onChange={(e)=>setTextUpdate(e.target.value)}
                                                onKeyDown={handleUpdate}
                                                className="bg-slate-500/60 px-2 py-1 pr-16 rounded-md outline-none w-full min-h-4"
                                            />
                                        </OutsideClickHandler>
                                        <div className="absolute top-[1.75rem] right-2 text-neutral-400 text-[13px] flex items-center justify-start gap-1 ">
                                            <MdOutlineKeyboardCommandKey className="w-4 h-4 " /> 
                                            <span>Enter</span>
                                        </div>
                                    </div>
                                )
                                :(
                                    <span>
                                        <span>{content && content}</span>
                                        {/* <span>{Icon !== null && (<Icon/>)}</span> */}
                                    </span>
                                )
                                }
                            </div>
                            <div className="flex items-center justify-start gap-2 text-[14px] text-neutral-400">
                                <div className="flex items-center justify-start gap-1">
                                { currentUserId?.id === userId && showHeart && showHeart.status === 'yes' ?(
                                        <FaHeart  className="w-3 h-3 " onClick={()=>handleCreateHeart(id)}/>
                                    ):(
                                        <FaRegHeart className="w-3 h-3 " onClick={()=>handleCreateHeart(id)}/>
                                    )}
                                     <span>{numberic}</span>
                                </div>
                                <div className="text-[13px] cursor-pointer underline">
                                    Reply
                                </div>
                        </div>
                    </div>
        </div>
        </div>
    )
}

export default ItemReply