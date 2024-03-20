"use client"

import Image from "next/image"
import { FaRegHeart } from "react-icons/fa"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"

  interface ItemReplyProps {
    content: string;
    userName: string;
    userImage: string
  }

const ItemReply:React.FC<ItemReplyProps> = ({
    content,
    userName,
    userImage
}) =>{
    return (
        <div>
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
                <div className="border-l border-slate-950 ml-3">
                    <div className="flex flex-col gap-1 ml-2 "> 
                            <div >{content && content}</div>
                            <div className="flex items-center justify-start gap-2">
                                <div>
                                    <FaRegHeart className="w-3 h-3 "/>
                                </div>
                                <div >
                                    Reply
                                </div>
                        </div>
                    </div>
        </div>
        </div>
    )
}

export default ItemReply