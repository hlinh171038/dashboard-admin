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
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import MemberItem from "./member-item";
import Department from "./department";
import HeaderTable from "./header-table";
import PaginationTable from "./paginatiion-table";

interface MemberProps {
    member: User[] | any
    user: User[] | any;
    userSearch: User[] | any;
    search: string;
    admin: string;
    page: number;
    per_page: number;
    max:number;
    currentUser: any;
    search_admin: string;
    page_admin: number;
    per_page_admin: number
}

const Member:React.FC<MemberProps> = ({
    member =[],
    user = [],
    userSearch = [],
    search,
    admin,
    page,
    per_page,
    page_admin,
    per_page_admin,
    max,
    currentUser,
    search_admin
}) =>{
    console.log(search_admin)

    const [filterArr,setFillterArr] = useState<any>([])


    //pagination
     // start
     const start =(per_page_admin * page_admin) -per_page_admin;  //0,5,10,15,...
    const end = per_page_admin * page_admin;               //5,10,15


     // updateFilterArr
     const updateFilterArr = filterArr && filterArr.slice(start,end);
     // max
     const maxTable = Math.ceil(member && member.length / per_page_admin);
     console.log(maxTable)

    useEffect(()=>{
       const result =  member && member.filter((item:any)=>item.email.includes(search_admin));
       console.log(result);
       setFillterArr(result)
    },[member,search_admin])
    console.log(filterArr)
    return (
        <div className=" px-2 w-full text-[14px] text-neutral-400">
            
            <div className="col-span-3 w-auto py-2">
            <div className="flex items-center justify-between ">
            <HeaderTable
                    customer = {filterArr}
                    user2={member}
                    currentUser={currentUser}
                    />
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
                        className="bg-neutral-100 text-slate-600 text-[13px]  rounded-md mr-2 "
                        >
                            {!admin ?(
                                <div className="p-2">
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
                                </div>
                            ):(
                                <Department 
                                    admin ={admin}
                                    users = {user}
                                />
                            )}
                          
                    </PopoverContent>
                </Popover>
                
                </div>
                <div className="flex flex-col gap-2 my-2">
                    
                    <table>
                        <tr className="text-[15px] text-neutral-100">
                            <td>Email</td>
                            <td>Department</td>
                            <td>Role</td>
                            <td>Permission</td>
                        </tr>
                        {updateFilterArr && updateFilterArr.map((item:any)=>{
                        return (
                            <MemberItem
                                key={item.id}
                                id={item.id}
                                email = {item.email}
                                position ={item.position}
                                isLeader = {item.isLeader}
                                permission = {item.permission}
                                user={user}
                                currentUser = {currentUser}
                            />
                        )
                    })}
                    </table>
                    <PaginationTable
                        page = {page}
                        per_page ={per_page}
                        search={search_admin}
                        max ={maxTable}
                    />
                </div>
                
                
            </div>
            
        </div>
    )
}

export default Member