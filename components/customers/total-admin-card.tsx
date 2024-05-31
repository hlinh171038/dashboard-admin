"use client"

import { User } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { GoDotFill } from "react-icons/go";
import { MdOutlineCallMade } from "react-icons/md";

interface TotalUserCardProps {
    totalUserThisWeek: any;
    totalUserLastWeek: any;
    users: User[] | any
}

const TotalAdminCard:React.FC<TotalUserCardProps> = ({
    totalUserThisWeek = [],
    totalUserLastWeek = [],
    users = []
}) =>{
    const [total,setTotal] = useState<any>([]);
    const [increse,setIncrease] = useState<any>([]);
    const router = useRouter()

    useEffect(()=>{
        const result = users && users.filter((item:any)=>item.role === 'yes')
        setTotal(result)
    },[users])

    useEffect(()=>{
        const result = totalUserThisWeek && totalUserThisWeek.filter((item:any)=>item.role === 'yes')
        setIncrease(result)
    },[totalUserThisWeek])
    return (
        
        <div className= " bg-slate-600 rounded-md p-2 relative">
        <div className="flex items-center justify-between ">
            <div className="font-semibold text-[16px] text-neutral-100 ">Administrator </div>
            <div onClick={()=>router.push('/analytics/team?search_admin=&page_admin=1&per_page_admin=10&sort=&comment_page=1&comment_per_page=5')} className="text-neutral-400 hover:text-neutral-100 font-thin text-[13px] flex items-center justify-start gap-0.5 cursor-pointer" >View<MdOutlineCallMade className="w-4 h-4 "/></div>
        </div>
        
        <div className="flex items-center justify-between">
            <div className="">
                <div className="flex items-center justify-start gap-2">
                    <div className="text-[35px] text-neutral-400 ">{total && total.length && total.length <10 && total.length >0 ? `0${total.length}`: total.length}</div>
                    <div className="text-[12px] ">
                        <div className="mb-[-2px] text-green-500">+ {increse &&  increse.length && increse.length <10 && increse.length >0 ? `0${increse.length}`: increse.length}</div>
                        <div className="text-neutral-400">in this week</div>
                    </div>
                </div>
                <div className="flex flex-col gap-2 text-[14px] text-neutral-400">
                <div className="flex items-center justify-start gap-2">
                    <div>
                        <GoDotFill className="text-green-600 w-4 h-4" />
                    </div>
                    <div>
                        Active
                    </div>
                    <div> 02 member</div>
                </div>
                <div className="flex items-center justify-start gap-2">
                    <div>
                        <GoDotFill className="text-red-600 w-4 h-4" />
                    </div>
                    <div>
                        Inactive
                    </div>
                    <div>{total && (total.length -2) >0 &&  (total.length -2) <10 ?`0${total.length}`: total.length} member</div>
                </div>
            </div>
            </div>
            
        </div>
        
        {/* <div className="absolute top-4 right-4 flex items-center justify-end">
            <Image 
                src="/admin.png"
                width={100}
                height={100}
                alt="employee"
            />
        </div> */}
    </div>
    )
}

export default TotalAdminCard