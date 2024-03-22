"use client"

import { MdOutlineEmail } from "react-icons/md"
import QuestionNotified from "../question-notified"
import { GoPlus } from "react-icons/go";
import { User } from "@prisma/client";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import Table from "./table";
import Pagination from "./pagination";
import { RiMailSendLine } from "react-icons/ri";
import { MdDeleteForever } from "react-icons/md";
import { useCallback, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import MemberItem from "./member-item";

interface MemberProps {
    member: User[] | any
    user: User[] | any;
    userSearch: User[] | any;
    search: string;
    page: number;
    per_page: number;
    max:number;
    currentUser: any
}

const Member:React.FC<MemberProps> = ({
    member =[],
    user = [],
    userSearch = [],
    search,
    page,
    per_page,
    max,
    currentUser
}) =>{
    
    return (
        <div className="grid grid-cols-6 items-start justify-start gap-2 px-2 w-auto">
            <div className="col-span-3 flex flex-col items-start justify-start gap-1 text-neutral-100 text-[15px]">
                <div className="text-lg">Team Members</div>
                <div className="text-justify text-neutral-400">
                Manage your team compositions seamlessly in this section, Add or remove team members, assign roles, and set permissions to encourage productive collaboration among your workforce.
                </div>
            </div>
            <div className="col-span-3 w-auto py-6">
            <div className="flex items-center justify-end ">
                    
                    <QuestionNotified
                        title="team leader"
                        content= "admin member under the leader team"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    {member && member.map((item:any)=>{
                        return (
                            <MemberItem
                                key={item.id}
                                id={item.id}
                                email = {item.email}
                                user={user}
                                currentUser = {currentUser}
                            />
                        )
                    })}
                </div>
                
                <Popover>
                    <PopoverTrigger  >
                    <div>
                        <div className="inline-flex px-2 py-1 rounded-md items-center justify-start gap-2 text-neutral-100 mt-2 hover:bg-slate-500/30 cursor-pointer ">
                            <GoPlus className="w-4 h-4 text-neutral-100" />
                            <div className="text-[14px]">Add other</div>
                        </div>
                    </div>    
                    </PopoverTrigger>
                    <PopoverContent  
                        side="bottom" 
                        align="start" 
                        sideOffset={4}
                        className="bg-neutral-100 text-slate-600 text-[13px] px-4 py-2 rounded-md mr-2 "
                        >
                          <Table 
                                //user = {user}
                                userSearch ={userSearch}
                            />
                            <Pagination 
                                search={search}
                                page={page}
                                per_page={per_page}
                                max={max}
                            />
                    </PopoverContent>
                </Popover>
            </div>
            
        </div>
    )
}

export default Member