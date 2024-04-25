"use client"

import { MdAutoDelete, MdOutlineEmail } from "react-icons/md"
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
import { Skeleton } from "../ui/skeleton";

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
    per_page_admin: number;
    status: boolean
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
    search_admin,
    status
}) =>{
    //console.log(search_admin)

    //const [filterArr,setFillterArr] = useState<any>([])
    const router = useRouter()
    const [checkId,setCheckId] = useState<any>([])
    const [isLoading,setIsLoading] = useState(false)
    const [data,setData] = useState<any>([])
    const [dele,setDele] = useState(false)
   
    
    //handle orther check
    const handleOtherCheck = useCallback((id:string)=>{
        const tempArr = [...checkId];
        const index = tempArr.includes(id);
        console.log(index);
       if(!index) {
        tempArr.push(id)
       } else {
        const position = tempArr.indexOf(id)
        tempArr.splice(position,1)
       }
        console.log(tempArr);
        setCheckId(tempArr)
    },[checkId])


    const handleUpdate = useCallback(()=>{
        axios.post('/api/filter-team',{})
                .then((res)=>{
                    console.log(res.data)
                    setData(res.data && res.data)
                    toast.success('removed ');
                    router.refresh()
                   
                })
                .catch((err:any)=>{
                    toast.error("Something went wrong !!!")
                }).finally(()=>{
                    //setCheckId([]);
                    setIsLoading(false)
                   
                })
    },[router])

    //handle delete
    const handleDelete = useCallback((array:any[])=>{
        setIsLoading(true)
       // console.log(array)
        axios.post('/api/delete-admin',{checkId:array})
            .then((res)=>{
                console.log(res.data)
                setData(res.data && res.data)
                router.refresh()
                //toast.success('removed ');
            })
            .catch((err:any)=>{
                toast.error("Something went wrong !!!")
            }).finally(()=>{
                setCheckId([]);
                setIsLoading(false)
                setDele(true)
                router.push('/analytics/team?search_admin=&page_admin=1&per_page_admin=10')
            })
            //handleUpdate()
    },[router])
console.log(data)



    //pagination
     // start

     
     const start =(per_page_admin * page_admin) -per_page_admin;  //0,5,10,15,...
    const end = per_page_admin * page_admin;               //5,10,15

     const updateData = data && data.slice(start,end);

    
  
    // search + skelton
    useEffect( ()=>{
        setIsLoading(true)
       // console.log(array)
        axios.post('/api/filter-team',{search:search_admin})
            .then((res)=>{
                console.log(res.data)
                setData(res.data && res.data)
                //toast.success('search ');
                router.refresh()
               
            })
            .catch((err:any)=>{
                toast.error("Something went wrong !!!")
            }).finally(()=>{
                setCheckId([]);
                setIsLoading(false)
               
            })
     },[search_admin,router])
    console.log(data)
    console.log(user)

  
    
    return (
        <div className="relative px-2 w-full text-[14px] text-neutral-400">
            
            <div className="col-span-3 w-auto py-2">
            <div className="flex items-center justify-between ">
            <HeaderTable
                    customer = {data}
                    user2={member}
                    currentUser={currentUser}
                    />
            
                <div onClick={()=>router.push('/analytics/team/add')} className="cursor-pointer ">Add +</div>
                </div>
                <div className=" flex flex-col gap-2 my-2">
                    {checkId.length >0 && (
                    <button
                            disabled ={isLoading}
                            onClick={()=>handleDelete(checkId)}
                            className="absolute top-3 left-[35%] text-neutral-100 px-2 py-1 bg-red-600 rounded-md text-[14px] flex items-center justify-start gap-0.5">
                            Delete
                            {isLoading ?  <AiOutlineLoading3Quarters className="animate-spin h-5 w-5 "/>:<div className="flex items-center justify-end"><MdAutoDelete className="w-4 h-4"/></div>}
                        </button>
                        
                    )}
                    <table>
                        <tr className="text-[15px] text-neutral-100">
                            <td></td>
                            <td>Email</td>
                            <td>Department</td>
                            <td>Is Group Leader</td>
                            <td>Permission</td>
                        </tr>
                        {isLoading || !status ? (
                
                            [0,1,2,3,4,5,6,7,8,9].map((item:any)=>{
                                    return (
                                        <tr key={item} className="my-2">
                                            <td className="w-6 h-6">
                                                <Skeleton className="h-4 w-4" />
                                            </td>
                                            <td className="max-w-20" >
                                                <div className="flex items-center justify-start gap-1">
                                                    <Skeleton className="h-6 w-6 rounded-full" />
                                                    <Skeleton className="h-4 w-[70px]" />
                                                    
                                                </div>
                                            </td>
                                            <td><Skeleton className="h-4 w-[100px]" /></td>
                                            <td><Skeleton className="h-4 w-[70px]" /></td>
                                            <td><Skeleton className="h-4 w-[70px]" /></td>
                                            <td><Skeleton className="h-4 w-[50px]" /></td>
                                            <td><Skeleton className="h-4 w-[50px]" /></td>
                                            <td><Skeleton className="h-4 w-[50px]" /></td>
                                        </tr>
                                    )
                                })
                            ):(updateData && updateData.map((item:any)=>{
                                return (<MemberItem
                                    key={item.id}
                                    id={item.id}
                                    email = {item.email}
                                    position ={item.position}
                                    isLeader = {item.isLeader}
                                    permission = {item.permission}
                                    user={user}
                                    currentUser = {currentUser}
                                    check={checkId && checkId.includes(item.id)}
                                    handleOtherCheck = {(id:string)=>handleOtherCheck(id)}
                                />
                                )
                            }))}
                      
                    </table>
                    
                </div>
                
                
            </div>
            
        </div>
    )
}

export default Member