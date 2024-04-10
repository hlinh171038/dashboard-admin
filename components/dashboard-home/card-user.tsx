"use client"

import { User } from "@prisma/client";
import { useEffect, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import LineChartUser from "./line-chart-user";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { TbArrowBigDownLines } from "react-icons/tb";
import { PiArrowFatLinesUpFill } from "react-icons/pi";

interface CardUserProps {
    totalUserThisWeek: User[] | any
    totalUserLastWeek: User[] | any
    users: User[] | any
}

const CardUser:React.FC<CardUserProps> = ({
    totalUserThisWeek =[],
    totalUserLastWeek =[],
    users = [],
}) =>{
    const [percent,setPercent] = useState<number>()



    useEffect(()=>{
        //Phần trăm tăng trưởng = ((Giá trị hiện tại - Giá trị tuần trước) / Giá trị tuần trước) x 100
        ///console.log(totalUserLastWeek.length)//4
        //console.log(totalUserThisWeek.length)//7

        if(totalUserLastWeek.length === 0){
            setPercent(100);
            return;
        }
        if(totalUserThisWeek.length === 0) {
            setPercent(0);
            return;
        }
        let result = Math.round(((totalUserThisWeek.length - totalUserLastWeek.length)*100)/totalUserLastWeek.length);
       
        setPercent(Number(result))
    },[totalUserLastWeek,totalUserThisWeek])
   
    
    return (
        <div className="bg-slate-600 hover:bg-slate-500/40 px-2 py-0.5 flex flex-col justify-between gap-1 rounded-md cursor-pointer ">
            <div>
                <div className="text-white hover:text-200 grid grid-cols-2 items-center justify-between gap-2 text-[15px] w-full ">
                    <div className="font-bold col-span-1 text-[16px]">New Users</div>
                    
                    {/* <div>{totalUserThisWeek && totalUserThisWeek.length <10 ? `0${totalUserThisWeek.length}`:totalUserThisWeek.length}</div> */}
                    <div className="col-span-1 text-neutral-100 text-[14px] flex items-end justify-end w-full">{percent && percent <0 ?(
                                <div className="flex items-center justify-start gap-0.5">
                                    <TbArrowBigDownLines className="w-3 h-4 text-red-600" />
                                    <span className="text-[13px]">{percent * -1 + '%'}</span>
                                </div>
                            ):(
                                <div className="flex items-center justify-start gap-0.5 ">
                                    <PiArrowFatLinesUpFill className="w-3 h-4 text-green-600" />
                                    <span className="text-[13px]">{percent + '%'}</span>
                                </div>
                            )}
                    </div>
                    
                </div>
            </div>
            {totalUserThisWeek.length >0 ?(
                <div className="w-full ">
                    <LineChartUser 
                        totalUserThisWeek = {totalUserThisWeek}
                    />
                </div>
            ):(
                <div className="w-full ">
                    <div className="text-neutral-400 text-thin text-[14px] ">No Users create in this week !</div>
                </div>
            )}
            
            {totalUserThisWeek.length>0 ?(
                <div className=" w-full flex items-end justify-start ">
               
                {
                    //map user this week
                    totalUserThisWeek && totalUserThisWeek.slice(0,6).map((item:any,index:any)=>{
                        return (
                                <div key={item.id} className={`w-7 h-7 ml-[-8px]`}>
                                    <Image 
                                        key={item.id}
                                        src={item.image}
                                        width={40}
                                        height={40}
                                        alt="avatar"
                                        objectFit="cover"
                                        className={`rounded-full aspect-square border-2 border-slate-600 `}
                                    />
                                </div>
                        )
                    })
                }
                {
                  totalUserThisWeek.length >6 && (
                    <span className="flex items-end justify-end gap-0.5 text-neutral-400 text-[13px]"> {`...+${(totalUserThisWeek.length - 6) <10 ? `0${totalUserThisWeek.length - 6}` : totalUserThisWeek.length - 6}`}</span>
                  )  
                }
              
                                 
            </div>
            ):(
                <div className=" w-full flex items-end justify-start ">
               
                    {
                        //map user this week
                        users && users.slice(0,6).map((item:any,index:any)=>{
                            return (
                                    <div key={item.id} className={`w-7 h-7 ml-[-8px]`}>
                                        <Image 
                                            key={item.id}
                                            src={item.image}
                                            width={40}
                                            height={40}
                                            alt="avatar"
                                            objectFit="cover"
                                            className={`rounded-full aspect-square border-2 border-slate-600 `}
                                        />
                                    </div>
                            )
                        })
                    }
                    {
                      users.length >6 && (
                        <span className="flex items-end justify-end gap-0.5 text-neutral-400 text-[13px]"> {`...+${(users.length - 6) <10 ? `0${users.length - 6}` : users.length - 6}`} all the tine</span>
                      )  
                    }
                  
                                     
                </div>
            )}
            
             
        </div>
    )
}

export default CardUser