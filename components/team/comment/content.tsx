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
import axios from "axios";
import { useRouter } from "next/navigation";
import Pagination from "./pagination";


interface ContentProps {
    user: User[] | any
    currentUser?: any;
    comments : Comment[] | any;
    relly: Relly[] | any;
    heartRelly: HeartReply[] | any;
    loading: boolean;
    comment_page: number;
    comment_per_page:number;
    sort: string;
    add:string;
    handleLoading: (value:any) =>void;
    removed: string
    updated: string
    heart:string
}

const Content:React.FC<ContentProps> = ({
    user =[],
    currentUser,
    comments =[],
   relly =[],
   heartRelly = [],
   loading,
   comment_page,
   comment_per_page,
   sort,
   add,
   handleLoading,
   removed,
   updated,
   heart
}) =>{

    const [commentArr,setCommentArr] = useState<any>([])
    const [openSort,setOpenSort] = useState(false)
    const [textSort,setTextSort] = useState('sort by ...')
    const boxRef = useRef<any>(null);
    const [show,setShow] = useState<any>(5)
    const updateComment = commentArr && commentArr.slice(0,show)
    const [isLoading,setIsLoading] = useState(false)
    const router = useRouter()
    //

const max = Math.ceil(comments && comments.length/comment_per_page);

    const handleSelected = (item:any)=>{
        let result:any[] = []
        switch(item) {
          
            case 'lastest': 
                        router.push(`/analytics/team?search_admin=&page_admin=1&per_page_admin=10&sort=desc&comment_page=${1}&comment_per_page=5`)
                        ;setTextSort('Lastest Comment');break;
            default: 
                router.push(`/analytics/team?search_admin=&page_admin=1&per_page_admin=10&sort=asc&comment_page=${1}&comment_per_page=5`)
                ;setTextSort('Oldest Comment');break;        
        }
        setOpenSort(false)
        setCommentArr([...result])
    }
   

console.log(commentArr)
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
    
  
    
     useEffect(()=>{
        if(loading) {
            router.push(`/analytics/team?search_admin=&page_admin=1&per_page_admin=10&sort=&comment_page=${1}&comment_per_page=5&add=${crypto.randomUUID()}`) 
             
            handleLoading(false)
        }
     },[router,loading,handleLoading])

     //console.log(comment)
     useEffect(()=>{
        setIsLoading(true)
        axios.post('/api/all-comment',{page:comment_page,per_page:comment_per_page,sort})
            .then((res:any)=>{
                console.log(res.data);
                setCommentArr(res.data && res.data)
            }).catch((error:any)=>{
                console.log(error)
            }).finally(()=>{
                setIsLoading(false)
            })
    },[comment_page,comment_per_page,sort,add,removed,updated,heart])
   
    return (
        <div  >
            {/* 
            ):( */}
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
                        {isLoading || loading ?(
                                    [0,1,2,3,4,].map((item:any)=>{
                                        return (
                                            <div key={item} className="mt-2">
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
                                            </div></div>
                                        )
                                    })
                                ):(
                                    commentArr && commentArr.map((item:any)=>{
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
                                    })
                                )}
                        
                        {/* {

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
                                 {commentArr && commentArr.map((item:any)=>{
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
                                commentArr && commentArr.map((item:any)=>{
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
                            
                        } */}
                    </div>
                    {/* <div className="flex items-center justify-end px-2">
                        <div className="underline cursor-pointer" >{(comment_page +1) * comment_per_page >= comments.length ? (
                            <span onClick={()=>handleUpdateLengthComment(comment_page,'collapse')}>collapse {`(${updateComment.length})`}</span>
                        ) : (
                            <span onClick={()=>handleUpdateLengthComment(comment_page,'show')}>show more {`(${updateComment.length})`}</span>
                        )}
                        </div>
                    </div> */}

                    {commentArr.length === 0 && !isLoading  &&(
                        <div className="flex items-center justify-center w-full h-full">
                            <div className="flex items-center justify-center  gap-1 text-neutral-100 text-[15px]">
                                <MdOutlineCommentsDisabled className="w-4 h-4 "/>
                                <span>No comment here !!!</span>
                            </div>
                        </div>
                    )}
                    <Pagination 
                        page ={comment_page}
                        per_page = {comment_per_page}
                        max = {max}
                    />
                </div>
       
          
          
        
        
           
        </div>
    )
}

export default Content