"use clinet"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import Image from "next/image"
import { useCallback, useState } from "react"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { BsThreeDotsVertical } from "react-icons/bs"
import { HiOutlineMailOpen } from "react-icons/hi"
import { MdDeleteOutline, MdOutlineReportGmailerrorred } from "react-icons/md"
import { RiChatDeleteLine } from "react-icons/ri";
import { IoMdCheckmark } from "react-icons/io";
import { MdModeComment } from "react-icons/md";
import { IoIosHeart } from "react-icons/io";
import { useRouter } from "next/navigation"
import axios from "axios"
import { toast } from "sonner"

interface CommentItemProps {
    userName: string;
    userImage: string;
    createdAt: string;
    id: string;
    type: string;
    mark: boolean;
}

const CommentItemReply:React.FC<CommentItemProps> = ({
    userName,
    userImage,
    createdAt,
    id,
    type,
    mark
}) =>{

    const [isLoading,setIsLoading] = useState(false)
    const router = useRouter()

    //handle navigate comment
    const handleRouteComment = useCallback(()=>{
        router.push('/analytics/team')
    },[router])

     //handle delete
     const handleDelete = useCallback((id:string)=>{
        setIsLoading(true);
        axios.post('/api/delete-notify',{id})
        .then((res)=>{
            
            toast.success('Deleted.');
            router.refresh();
        })
        .catch((err:any)=>{
            toast.error("Something went wrong !!!")
        }).
        finally(()=>{
            setIsLoading(false)
        })
    },[router])
    //handle go to mail
    const handleMarkAsSeen = useCallback((id:string)=>{
        if(mark ) {
            toast.warning('Have marked as seen');
            return;
        }
        axios.post('/api/update-notify',{id})
            .then((res)=>{
                toast.success('Have marked ');
                router.refresh();
            })
            .catch((err:any)=>{
                toast.error("Something went wrong !!!")
            })
            
    },[mark,router])

    //handle spam
    const handleSpam = useCallback((id:string)=>{

    },[])
    return (
        <div onClick={handleRouteComment} className="flex items-start justify-between hover:bg-neutral-100 duration-300 transition-all cursor-pointer px-2 py-2 rounded-md">
                <div className="relative flex items-center justify-start gap-2">
                    <Image
                        width={40}
                        height={40}
                        src={userImage ? userImage : '/avatar.png'}
                        alt="avatar"
                        objectFit="cover"
                        className="rounded-full aspect-square "
                    />
                    {type === 'relly'?(
                        <div className="absolute bottom-[-4px] left-5 rounded-full bg-green w-5 h-5 bg-green-600 flex items-center justify-center">
                            <MdModeComment className="w-3 h-3 text-neutral-100"/>
                        </div>
                    ):(
                        <div className="absolute bottom-[-4px] left-5 rounded-full bg-green w-5 h-5 bg-pink-600 flex items-center justify-center">
                            <IoIosHeart className="w-3 h-3 text-neutral-100"/>
                        </div>
                    )}
                    
                    <div className="flex flex-col gap-0.5">
                        <div>{userName} {type === 'heart' ? 'liked your comment':(type ==='relly'? 'replied your comment': 'likeed your reply')}</div>
                        <div className="text-neutral-400 text-[13px]">{new Date(createdAt).toLocaleString()}</div>
                    </div>
                </div>
                <div>
                    <Popover>
                        <PopoverTrigger>
                            <BsThreeDotsVertical className="w-4 h-4 "/>
                        </PopoverTrigger>
                        <PopoverContent
                            side="bottom"
                            className=" rounded-md shadow-md mr-2"
                        >   
                            <div className="flex flex-col gap-0.5 px-2 py-2 ">
                            <button onClick={()=>handleDelete(id)} disabled={isLoading} className="flex items-center justify-start gap-1 py-0.5 px-2 bg-slate  cursor-pointer hover:bg-slate-100 rounded-md text-[14px]">
                                <div className="flex items-center justify-start gap-2">
                                    <RiChatDeleteLine className="w-4 h-4 " />
                                    <span>Delete this Notify.</span>
                                </div>
                                {isLoading ?  <AiOutlineLoading3Quarters className="animate-spin h-5 w-5 "/>:<div className="w-5 h-5 flex items-center justify-center"></div>}
                            </button> 
                            <button onClick={()=>handleMarkAsSeen(id)} className="flex items-center justify-start gap-1 py-0.5 px-2 bg-slate  cursor-pointer hover:bg-slate-100 rounded-md text-[14px]">
                               
                                <div className="flex items-center justify-start gap-2">
                                    <IoMdCheckmark   className="w-4 h-4 " />
                                    <span>Mark as seen</span>
                                </div>
                            </button> 
                            <button onClick={()=>handleSpam('id')} className="flex items-center justify-start gap-1 py-0.5 px-2 bg-slate  cursor-pointer hover:bg-slate-100 rounded-md text-[14px]">
                                
                            <div className="flex items-center justify-start gap-2">
                                    <MdOutlineReportGmailerrorred  className="w-4 h-4 " />
                                    <span> Report </span>
                                </div>
                            </button> 
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
    )
}
export default CommentItemReply