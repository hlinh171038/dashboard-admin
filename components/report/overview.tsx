"use client"

import { Transaction, User } from "@prisma/client";
import { useEffect, useState } from "react";
import { TbArrowBigDownLines } from "react-icons/tb";
import { PiArrowFatLinesUpFill } from "react-icons/pi";

interface OverViewProps {
    revenue: number;
    guest: Transaction[] | any;
    thisWeek: Date[] | any;
    lastWeek: Date[] | any;
    newUser: User[] | any;
    revenueLastWeek: number;
    newUserLastWeek: User[] | any;
    guestLast: Transaction[] | any
}

const OverView:React.FC<OverViewProps> = ({
    revenue,
    guest = [],
    thisWeek = [],
    lastWeek = [],
    newUser = [],
    revenueLastWeek,
    newUserLastWeek =[],
    guestLast = []
}) =>{
    const [revenuePercent,setRevenuePercent] = useState(0)
    const [userPercent,setuserPercent] = useState(0)
    const [orderPercent,setOrderPercent] = useState(0)
    // % incresing or descresing
    useEffect(()=>{
        console.log(revenue)
        console.log(revenueLastWeek)
       const result = Math.round((revenue - revenueLastWeek)/revenueLastWeek *100)
    
       setRevenuePercent(result)
    },[revenue,revenueLastWeek])
    // % guest
    useEffect(()=>{
       const user = newUser.length;
       const userLast = newUserLastWeek.length;
       console.log(user) //1
       console.log(userLast)// 0
       if(userLast === 0) {
        setuserPercent(100);
        return;
       }
       if(user === 0) {
        setuserPercent(0);
        return;
       }
       const result = Math.round((user - userLast)/userLast *100)
       console.log(result)
      setuserPercent(result)
    },[newUser,newUserLastWeek])

    //% order
    useEffect(()=>{
        const orderThis = guest.length;
        const orderLast = guestLast.length;
        console.log(orderThis)// 2
        console.log(orderLast) // 15
        if(orderLast === 0) {
            setOrderPercent(100);
            return;
           }
           if(orderThis === 0) {
            setOrderPercent(0);
            return;
           }
           const result:number = Math.round((orderThis - orderLast)/orderLast *100)
           console.log(result)
           setOrderPercent(result)
    },[guest,guestLast.length])
  
    return (
        <div className=" grid grid-cols-2 gap-4 px-2 py-2 "
                    >
                    <div className="col-span-2 ">
                        <div>Total Overview</div>
                        <div className="text-neutral-400 text-thin text-[14px] mt-[-2px]">update every week</div>
                    </div>
                    <div className="col-span-2 grid grid-cols-2 gap-2">
                        <div 
                            className="col-span-1 flex flex-col gap-1 text-white px-4 py-4 pb-1 rounded-md"
                            style={{background:"#448D97"}}
                            >
                            <div className="text-neutral-100 text-[15px]">Revenue</div>
                            <div className="text-neutral-100 text-[15px]">{revenue.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</div>
                            <div className="text-neutral-100 text-[15px] flex items-end justify-end w-full">{revenuePercent <1 ?(
                                <div className="flex items-center justify-start gap-0.5">
                                    <TbArrowBigDownLines className="w-3 h-4 text-red-600" />
                                    <div className="text-[13px]">{revenuePercent * -1 + '%'}</div>
                                </div>
                            ):(
                                <PiArrowFatLinesUpFill className="w-3 h-4 text-green-600" />
                            )}</div>
                        </div>
                        <div 
                            className="col-span-1 flex flex-col gap-1 text-white px-4 py-4 pb-1 rounded-md"
                            style={{background:"#E96F28"}}
                            >
                            <div className="text-neutral-100 text-[15px]">Guest</div>
                            <div className="text-neutral-100 text-[15px]">{newUser.length}</div>
                            <div className="text-neutral-100 text-[15px] flex items-end justify-end w-full">{userPercent <1 ?(
                                <div className="flex items-center justify-start gap-0.5">
                                    <TbArrowBigDownLines className="w-3 h-4 text-red-600" />
                                    <div className="text-[13px]">{userPercent * -1 + '%'}</div>
                                </div>
                            ):(
                                <div className="flex items-center justify-start gap-0.5">
                                    <PiArrowFatLinesUpFill className="w-3 h-4 text-green-600" />
                                    <div className="text-[13px]">{userPercent + '%'}</div>
                                </div>
                                
                            )}</div>
                        </div>
                        <div 
                            className="col-span-1 flex flex-col gap-1 text-white px-4 py-4 pb-1 rounded-md"
                            style={{background:"#EEB316"}}
                            >
                            <div className="text-neutral-100 text-[15px]">Orders</div>
                            <div className="text-neutral-100 text-[15px]">{guest.length}</div>
                            <div className="text-neutral-100 text-[15px] flex items-end justify-end w-full">{orderPercent <1 ?(
                                <div className="flex items-center justify-start gap-0.5">
                                    <TbArrowBigDownLines className="w-3 h-4 text-red-600" />
                                    <div className="text-[13px]">{orderPercent * -1 + '%'}</div>
                                </div>
                            ):(
                                <div className="flex items-center justify-start gap-0.5">
                                    <PiArrowFatLinesUpFill className="w-3 h-4 text-green-600" />
                                    <div className="text-[13px]">{orderPercent + '%'}</div>
                                </div>
                                
                            )}</div>
                        </div>
                        <div 
                            className="col-span-1 flex flex-col gap-1 text-white px-4 py-4 pb-1 rounded-md"
                            style={{background:"#A42221"}}
                            >
                            <div className="text-neutral-100 text-[15px]">Waiting time</div>
                            <div className="text-neutral-100 text-[15px]">21 minute</div>
                            <div className="text-neutral-100 text-[15px] flex items-end justify-end w-full">
                                <div className="flex items-center justify-start gap-0.5">
                                    <TbArrowBigDownLines className="w-3 h-4 text-red-600" />
                                    <div className="text-[13px]">{orderPercent * -1 + '%'}</div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
    )
}

export default OverView