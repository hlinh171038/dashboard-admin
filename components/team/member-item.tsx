"use client"

import axios from "axios"
import { useRouter } from "next/navigation"
import { useCallback, useState } from "react"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { MdDeleteForever, MdOutlineEmail } from "react-icons/md"
import { RiMailSendLine } from "react-icons/ri"
import { toast } from "sonner"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { ContactUs } from "./contact"
import { ContactUsMember } from "./contact-member"
import { User } from "@prisma/client"

interface MemberItemProps {
    id: string;
    email: string;
    user: User[] | any;
    currentUser: any

}

const MemberItem:React.FC<MemberItemProps> = ({
    email,
    id,
    user = [],
    currentUser
}) =>{
    const [isLoading,setIsLoading] = useState(false)
    const router = useRouter()
    const handleDeleteAdmin = useCallback(()=>{
        setIsLoading(true)
        axios.post(`/api/delete-admin`,{id})
            .then((res)=>{
                console.log(res.data)
                router.refresh()
                toast.success("deleted")
            })
            .catch((err:any)=>{
                console.log(err)
                toast.error('some thing went wrong')
            })
            .finally(()=>{
                setIsLoading(false)
            })
    },[router,id])
    return (
        <div className="flex items-center justify-between" >
            <div
                onClick={()=>router.push(`/dashboards/customers/${id}`)} 
                className="cursor-pointer inline-flex  items-center justify-start gap-2 text-neutral-100 text-[14px] bg-slate-500/30 rounded-md px-2 py-1 ">
                <div>
                    <MdOutlineEmail className="w-4 h-4 text-neutral-100" />
                </div>
                <div>
                    {email}
                </div>
            </div>
            <div className="flex items-center justify-end gap-2">
                <div 
                    className="group text-neutral-100 px-2 py-1 rounded-md cursor-pointer"
                    
                    >
                        <Popover>
                            <PopoverTrigger>
                                <RiMailSendLine className="w-4 h-4 text-neutral-200 group-hover:text-white transition-all duration-300"/>
                            </PopoverTrigger>
                            <PopoverContent
                                side="bottom"
                                className="mr-2 min-w-[30rem] rounded-md shadow-md"
                            >
                                <ContactUsMember
                                    currentUser = {currentUser}
                                    users = {user}
                                    emailRecive ={email}
                                />
                            </PopoverContent>
                        </Popover>
                </div>
                <button 
                    onClick={handleDeleteAdmin}
                    className="group text-neutral-100 px-2 py-1 rounded-md cursor-pointer flex items-center justify-start gap-2">
                        <MdDeleteForever className="w-4 h-4 text-neutral-200 group-hover:text-red-600 transition-all duration-300"/>
                        {isLoading ?  <AiOutlineLoading3Quarters className="animate-spin h-5 w-5 "/>:<div className="w-5 h-5"></div>}
                </button>
            </div>
        </div>
    )
}

export default MemberItem