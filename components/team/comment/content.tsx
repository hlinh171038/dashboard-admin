"use client"

import { Comment, HeartReply, Relly, User } from "@prisma/client";
import Image from "next/image"
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import CommentItem from "./comment-item";
import { useCallback, useEffect, useRef, useState } from "react";
import { MdOutlineCommentsDisabled } from "react-icons/md";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface ContentProps {
    user: User[] | any
    currentUser?: any;
    comments : Comment[] | any;
    relly: Relly[] | any;
    heartRelly: HeartReply[] | any;
    loading: boolean
}

const Content:React.FC<ContentProps> = ({
    user =[],
    currentUser,
    comments =[],
   relly =[],
   heartRelly = [],
   loading
}) =>{

    const [commentArr,setCommentArr] = useState<any>(comments &&comments)
    const [openSort,setOpenSort] = useState(false)
    const [textSort,setTextSort] = useState('sort by ...')
    const boxRef = useRef<any>(null);
    const [updateComment,setUpdateComment] = useState<any>(comments.slice(0,5))



    const handleSelected = (item:any)=>{
        let result:any[] = []
        switch(item) {
            case 'featured': result = comments.sort((a:any,b:any)=>{
                        if(a.heart.length > b.heart.length) return -1;
                        if(a.heart.length < b.heart.length) return 1;
                        return 0
                        }); setTextSort('Featured Comment');break;
            case 'lastest': result = comments.sort((a:any,b:any)=>{
                        if(a.createdAt < b.createdAt) return -1;
                        if(a.createdAt > b.createdAt) return 1;
                        return 0
                        });setTextSort('Lastest Comment');break;
            default: result = comments.sort((a:any,b:any)=>{
                    if(a.createdAt > b.createdAt) return -1;
                    if(a.createdAt < b.createdAt) return 1;
                    return 0
                    });setTextSort('Oldest Comment');break;        
        }
        setOpenSort(false)
        setCommentArr([...result])
    }
    useEffect(()=>{
        setCommentArr(comments && comments) 
    },[comments])

console.log(comments)
    //handle click outside
    const handleClickOutside = (event:any) => {
        if (boxRef.current && !boxRef?.current?.contains(event.target)) {
          setOpenSort(false);
        }
      };
     
    // click outside the box
    useEffect(() => {
        if (openSort) {
          document.addEventListener('click', handleClickOutside);
          return () => document.removeEventListener('click', handleClickOutside);
        }
      }, [openSort]);
    
     const handleUpdateLengthComment = useCallback((pre: number)=>{
        setUpdateComment(comments.slice(0,pre+5))
     },[comments])
    
    
    return (
        <div  >
            {comments.length === 0 ?(
            <div className="flex items-center justify-center w-full h-full">
                <div className="flex items-center justify-center  gap-1 text-neutral-100 text-[15px]">
                    <MdOutlineCommentsDisabled className="w-4 h-4 "/>
                    <span>No comment here !!!</span>
                </div>
            </div>
            ):(
                <div className="text-[14px] text-neutral-100 ">
                 <div className="flex items-center justify-end ">
                    <div className="relative w-[20%]">
                   
                        <div  ref={boxRef} className="bg-slate-500/60 rounded-md mt-2 px-2 py-1 w-full cursor-pointer" onClick={()=>setOpenSort(!openSort)}>{textSort}</div>
                        <div className={cn("absolute top-[2.6rem] right-0 bg-slate-500/60 rounded-md w-full duration-300 transition-all cursor-pointer ",
                                        openSort ? 'flex flex-col gap-1 px-2 py-1' : 'hidden'
                                    )}>
                            <div onClick={()=>handleSelected('featured')} className="text-[14px] text-neutral-400 hover:text-neutral-100 ">Featured Comment</div>
                            <div onClick={()=>handleSelected('lastest')} className="text-[14px] text-neutral-400 hover:text-neutral-100 ">lastest Comment</div>
                            <div onClick={()=>handleSelected('oldest')} className="text-[14px] text-neutral-400 hover:text-neutral-100 ">Oldest Comment</div>
                        </div>
                    </div>
                    </div>
                    <div className=" ">
                        {

                            loading ?(
                                <div>
                                    <div className=" flex flex-col gap-1">
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
                                 {updateComment && updateComment.map((item:any)=>{
                                    return <CommentItem 
                                                currentUser ={currentUser}
                                                key={item.id}
                                                id={item.id}
                                                content ={item.content}
                                                title ={item?.title}
                                                createdAt ={item.createdAt}
                                                userId = {item.userId}
                                                userImage = {item.userImage}
                                                userName = {item.userName}    
                                                rellyComment = {item.relly}
                                                heart = {item.heart}
                                                user = {user}
                                                relly ={relly}
                                                heartRelly ={heartRelly}
                                            />
                                })}
                                </div>
                            )
                            :
                            (
                                updateComment && updateComment.map((item:any)=>{
                                    return <CommentItem 
                                                currentUser ={currentUser}
                                                key={item.id}
                                                id={item.id}
                                                content ={item.content}
                                                title = {item?.title}
                                                createdAt ={item.createdAt}
                                                userId = {item.userId}
                                                userImage = {item.userImage}
                                                userName = {item.userName}    
                                                rellyComment = {item.relly}
                                                heart = {item.heart}
                                                user = {user}
                                                relly ={relly}
                                                heartRelly ={heartRelly}
                                            />
                                })
                            )
                            
                        }
                    </div>
                    <div className="flex items-center justify-end px-2">
                        <div className="underline" onClick={()=>handleUpdateLengthComment(updateComment.length)}>{updateComment.length >= commentArr.length ? 'collapse' : 'show more'}</div>
                    </div>
                </div>
            )}
          
          
        
        
           
        </div>
    )
}

export default Content