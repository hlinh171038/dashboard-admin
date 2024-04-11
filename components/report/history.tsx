"use client"

import { TempMail } from "@prisma/client"
import ItemHistoryMail from "./item-history-mail";
import { useCallback, useEffect, useState } from "react";
import { MdOutlineCallMade } from "react-icons/md";
import { useRouter } from "next/navigation";
import { LuMailWarning } from "react-icons/lu";

interface TempMailProps {
    tempMail: TempMail[] | any;
    currentUser: any;
}

const HistoryMail:React.FC<TempMailProps> = ({
    tempMail =[],
    currentUser
}) =>{
    const [data,setData] = useState<any>([])
    const router = useRouter()

    //handle navigate
    const handleNavigate = useCallback(()=>{
        router.push('/analytics/report/history')
    },[router])

    useEffect(()=>{
       const result =  tempMail && tempMail.filter((item:any)=>item.mailRecive === currentUser.user.email && item.history === true);
        console.log(result)
        setData(result)
    },[currentUser,tempMail])

    if(data && data.length ===0) {
        return (
            <div>
                <div className="flex items-center justify-center gap-2 text-[14px] py-4">
                    <LuMailWarning/>
                    <div>No Eamil History</div>
                </div>
            </div>
        )
    }
    return (
        <div className="p-2">
            <div  className="pb-4">
                <div className="text-white text-[15px] flex items-center justify-between">
                    <div> History Manager</div>
                    <div onClick={handleNavigate} className="text-neutral-400 hover:text-neutral-100 font-thin text-[13px] flex items-center justify-start gap-0.5 cursor-pointer">View<MdOutlineCallMade className="w-4 h-4 "/></div>
                </div>
                <div className="text-neutral-400 font-normal text-[14px] ">
                    The list of 10 lastest email removed 
                </div>
            </div>
                <table 
                    id="trend-sale-table"
                    className="w-full"
                    >
                    <tr className="text-neutral-200 text-[15px]">
                        <td className="px-2">Information</td>
                        <td  className="px-2">Email</td>
                        <td  className="px-2">Date</td>
                        <td  className="px-2">Status</td>
                    </tr>
                    {data && data.slice(0,7).map((item:any)=>{
                        return <ItemHistoryMail
                                    key={item.id}
                                    name = {item.userName}
                                    image = {item.userImage}
                                    email = {item.mailSend}
                                    date ={item.created_at}
                                    seen = {item.seen}
                                />
                    })}
                </table>
        </div>
    )
}

export default HistoryMail