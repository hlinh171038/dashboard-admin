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
import { FaSmile } from "react-icons/fa";
import { IconType } from "react-icons/lib";
import { Skeleton } from "@/components/ui/skeleton";
import { MdOutlineKeyboardCommandKey } from "react-icons/md";

interface CommentItemProps {
    content: string;
    title?: IconType;
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
    title:Icon,
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
    const [isLoadingHeart,setIsLoadingHeart] = useState(false);
    const [isLoadingReply,setIsLoadingReply] = useState(false);
    const [openReply,setOpenReply] = useState(false);
    const [isHeart,setIsHeart]  = useState(heart === 'no' ? false : true)
    const [heartObj,setHeartObj] = useState<any>(null)
    const [heartStatus,setHeartStatus] = useState<any>(false)
    const [currentUserId,setCurrentUserId] = useState<any>(null)

    const input2Ref = useRef<any>(null);
   
    
    const [textUpdate,setTextUpdate] = useState(content? content : '')
    const [update,setUpdate] = useState(false)

    const router = useRouter()
   
    const handleSubmit = ()=>{
        
        if(!currentUser) {
            toast.warning('Login');
            return;
        }
        setIsLoadingReply(true)

        axios.post('/api/add-new-item',{
           content:text,
           userId:currentUserId?.id,
           userImage: currentUser.user.image,
           userName: currentUser.user.name,
           commentId:id,
          
        })
        .then((res:any)=>{
            toast.success('New reply.')
            router.push(`/analytics/team?search_admin=&page_admin=1&per_page_admin=10&sort=&comment_page=${1}&comment_per_page=5&add=${crypto.randomUUID()}`) 
            router.refresh()
        })
        .catch((error:any)=>{
            toast.error('Some thing went wrong !!!')
        })
        .finally(()=>{
            setIsLoadingReply(false)
            setText('')
        })

        axios.post('/api/create-notify',{
            userId: currentUserId?.id,
                userName:currentUserId?.name,
                userImage:currentUserId?.image,
                commentId: id,
                mark: false,
                type:'relly'
           
         })
         .then((res:any)=>{
             
             router.refresh()
         })
         .catch((error:any)=>{
           
         })
         .finally(()=>{
            setIsLoadingReply(false)
         })
        
    }
    //handle delete
    const handleDelete = useCallback((id:string)=>{
        setIsLoading(true)
        axios.post('/api/delete-comment',{id})
        .then((res:any)=>{
            toast.success("Deleted.")
            router.push(`/analytics/team?search_admin=&page_admin=1&per_page_admin=10&sort=&comment_page=${1}&comment_per_page=5&removed=${id}`) 
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
        
    },[id,textUpdate,router,content,isHeart])
 
   
    //handle update heart
    const handleCreateHeart = useCallback((id:string)=>{
        setHeartStatus(true)
        setIsLoadingHeart(true)
            axios.post('/api/create-heart',{
                userId:currentUserId?.id,
                userName:currentUserId?.name,
                userImage:currentUserId?.image,
                commentId:id,
            })
            .then((res:any)=>{
                router.push(`/analytics/team?search_admin=&page_admin=1&per_page_admin=10&sort=&comment_page=${1}&comment_per_page=5&heart=${id}`)
                router.refresh();
                toast.success("success");
            })
            .catch((error:any)=>{
                toast.error('Some thing went wrong')
            })
            .finally(()=>{
                //setIsLoadingHeart(false)
            })
            
            axios.post('/api/create-notify',{
                userId: currentUserId?.id,
                userName:currentUserId?.name,
                userImage:currentUserId?.image,
                commentId: id,
                mark: false,
                type:'heart'
            }).then((res:any)=>{
            
                router.refresh();
                
            })
            .catch((error:any)=>{
               setHeartStatus(false)
            })
            .finally(()=>{
                setIsLoadingHeart(false)
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
        if( currentUserId?.id === userId && heartObj && heartObj.status === 'yes' ) {
            setHeartStatus(false)
        } else {
            setHeartStatus(false)
        }
        
      },[heart,id,currentUserId,userId,heartObj])

      const handleFocusUpdate = useCallback(()=>{
       setUpdate(!update)
       console.log(update)
       
      },[update])

      // take currentUser
      useEffect(()=>{
        user && user.forEach((item:any)=>{
            if(item.email === currentUser.user.email){
                setCurrentUserId(item);
            }
        })
      },[currentUser.user.email,user])

      useEffect(()=>{
        if (update) {
            console.log(input2Ref)
            input2Ref.current.focus(); // Focus on input if opened
          }
      },[update])

      console.log(update)

     

    
     

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
                        <div className="text-[15px] capitalize">
                            
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
                                            <button onClick={()=>handleDelete(id)} disabled={isLoading} className="flex items-center justify-start gap-1 px-2 py-1 bg-slate text-neutral-100 bg-[#4FA29E] cursor-pointer hover:bg-slate-800 rounded-md text-[14px]">
                                                Delete
                                                {isLoading ?  <AiOutlineLoading3Quarters className="animate-spin h-5 w-5 "/>:<div className="w-5 h-5 flex items-center justify-center"><MdDeleteOutline className="w-4 h-4 " /></div>}
                                            </button> 
                                            <button onClick={handleFocusUpdate} className="flex items-center justify-start gap-1 px-2 py-1 bg-slate text-neutral-100 bg-[#4FA29E] cursor-pointer hover:bg-slate-800 rounded-md text-[14px]">
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
                            <div className=" flex items-center justify-start gap-2 text-neutral-400">
                                <div className="flex items-center justify-start gap-1">
                                   
                                    { heartStatus ?(
                                        <FaHeart  className="w-3 h-3 " onClick={()=>handleCreateHeart(id)}/>
                                    ):(
                                        <FaRegHeart className="w-3 h-3 " onClick={()=>handleCreateHeart(id)}/>
                                    )}
                                     <span>{isLoadingHeart ?heart.length + 1 : heart.length}</span>
                                </div>
                                <div className=" group flex items-center justify-start text-[14px] gap-2 cursor-pointer hover:text-neutral-100"  onClick={()=>setOpenReply(!openReply)}>
                                   
                                        Reply {`(${rellyComment && rellyComment.length})`} <span>{openReply ? (
                                            <IoIosArrowUp className="w-3 h-3 text-neutral-400 ml-2   group-hover:text-neutral-100" />
                                        ): (
                                            <IoIosArrowDown className="w-3 h-3 text-neutral-400 ml-2 group-hover:text-neutral-100" />
                                        )}</span>
                            </div>
                        
                        </div>
                        <div className={cn("relative",
                                        openReply ? 'block' : 'hidden'
                                     )}>
                            <label htmlFor="">
                                <span className="text-neutral-100 text-[14px]">Reply : {userName}</span>
                                <input 
                                    type="text" 
                                    className="w-full px-2 pr-32 py-1 rounded-md border border-slate-500/60 bg-slate-500/60 h-auto  outline-none text-[14px] text-neutral-100"
                                    value = {text}
                                    onChange={(e)=>setText(e.target.value)}
                                    placeholder="Reply..."
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                          handleSubmit();
                                        }
                                      }}
                                />
                            </label>
                            <div className="absolute top-[1.55rem] right-16 text-neutral-400 text-[13px] flex items-center justify-start gap-1 ">
                                <MdOutlineKeyboardCommandKey className="w-4 h-4 " /> 
                                <span>Enter</span>
                            </div>
                            <input type="submit" value="Reply" onClick={handleSubmit} className="absolute top-[0.9rem] cursor-pointer right-1 bg-[#4FA29E] px-2 py-0.5 text-[13px] flex items-center justify-center  text-neutral-100 rounded-md mt-2" />
                        </div>
                    </div>

                    {

                            isLoadingReply ?(
                                <div>
                                    <div className=" flex flex-col gap-1 px-2 mt-2">
                                    <div className="flex items-center justify-start gap-2">
                                        <Skeleton className="w-7 h-7 rounded-full aspect-square" />
                                        <Skeleton className="w-14 h-4" />
                                        <Skeleton className="w-20 h-4" />
                                    </div>
                                    <div className="px-6">
                                        <Skeleton className="w-full h-8" />
                                    </div>
                                    <div className="px-6">
                                        <Skeleton className="w-20 h-4" />

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
                            )
                            :
                            (
                                rellyComment && rellyComment.length>0 && (
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
                                )
                            )

                            }
                       
                </div>
           </div> 
    )
}
export default CommentItem