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
import { FaRegSquare } from "react-icons/fa"
import { FaRegSquareCheck } from "react-icons/fa6"

interface MemberItemProps {
    id: string;
    email: string;
    user: User[] | any;
    currentUser: any;
    position: string;
    isLeader: boolean;
    permission: string;
    check: boolean;
    handleOtherCheck: (id:string) =>void;
}

const MemberItem:React.FC<MemberItemProps> = ({
    email,
    id,
    user = [],
    currentUser,
    position,
    isLeader,
    permission,
    check,
    handleOtherCheck
}) =>{
    const [isLoading,setIsLoading] = useState(false)
    const router = useRouter()
    const handleDeleteAdmin = useCallback(()=>{
        setIsLoading(true)
        axios.post(`/api/delete-admin`,{id})
            .then((res)=>{ 
                router.refresh()
                toast.success("deleted")
            })
            .catch((err:any)=>{
                toast.error('some thing went wrong')
            })
            .finally(()=>{
                setIsLoading(false)
            })
    },[router,id])
    return (
        <tr  >
            <td className="w-6" >
            <div className="flex items-center justify-start mt-2">
                {!check ?(
                    <FaRegSquare
                        className="w-4 h-4 text-neutral-100 font-thin"
                        onClick={()=>handleOtherCheck(id)}
                        />
                ):(
                    <FaRegSquareCheck 
                        className="w-4 h-4 text-neutral-100"
                        onClick={()=>handleOtherCheck(id)}
                        />
                )}
                
            </div>
            </td>
            <td
                onClick={()=>router.push(`/dashboards/customers/${id}`)} 
                className="cursor-pointer inline-flex  items-center justify-start gap-2 text-neutral-100 text-[14px] bg-slate-500/30 rounded-md px-2 py-1 ">
                <div>
                    <MdOutlineEmail className="w-4 h-4 text-neutral-100" />
                </div>
                <div>
                    {email}
                </div>
            </td>
            <td className="capitalize">
                {position}
            </td>
            <td className="capitalize">
                {isLeader ? (<span className="text-yellow-600">{`Leader`}</span>): 'member'}
            </td>
            <td >
                {permission === 'read' ? 'read only':(permission === 'all'?'all permission': permission)}
            </td>
            <td className="flex items-center justify-end gap-2">
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
               
            </td>
        </tr>
    )
}

export default MemberItem