"use client"

import { Comment, Mail, Transaction, User } from "@prisma/client";
import { useEffect, useState } from "react";
import { TbArrowBigDownLines } from "react-icons/tb";
import { PiArrowFatLinesUpFill } from "react-icons/pi";

interface OverViewProps {
   thisWeek: any;
   lastWeek:any;
   transaction:Transaction[] | any;
   comment: Comment[] | any;
   mail:Mail[] | any;
}

const OverView:React.FC<OverViewProps> = ({
    thisWeek,
    lastWeek,
    transaction = [],
    comment =[],
    mail = []
}) =>{

   const [totalMailThisWeek,setTotalMailThisWeek] = useState<any>([]);
   const [totalMailLastWeek,setTotalMailLastWeek] = useState<any>([]);
   const [mailPercent,setMailPercent] = useState<number>()
   const [proccedThisWeek,setProccedThisWeek] = useState<any>([]);
   const [proccedLastWeek,setProccedLastWeek] = useState<any>([]);
   const [proccedPercent,setProccedPercent] = useState<number>();
   const [pendingThisWeek,setPendingThisWeek] = useState<any>([]);
   const [pendingLastWeek,setPendingLastWeek] = useState<any>([]);
   const [pendingPercent,setPendingPercent] = useState<number>();
   const [helpThisWeek,setHelpThisWeek] = useState<any>([]);
   const [helpLastWeek,setHelpLastWeek] = useState<any>([]);
   const [helpPercent,setHelpPercent] = useState<number>();
    //---------------------------------------------mail------------------------------------
    // mail this week
    useEffect(()=>{
        const array = [...mail]
        const result:any[] = []
        array && array.forEach((item:any)=>{
            const day = new Date(item.created_at);
            if(day >=thisWeek[0] && day <= thisWeek[thisWeek.length -1]) {
                result.push(item)
            }
        });
        //console.log(result);
        setTotalMailThisWeek(result);
    },[mail,thisWeek])
    //mail last week
    useEffect(()=>{
        const array = [...mail]
        const result:any[] = []
        array && array.forEach((item:any)=>{
            const day = new Date(item.created_at);
            if(day <=lastWeek[0] && day >= lastWeek[lastWeek.length -1]) {
                result.push(item)
            }
        });
        //console.log(result);
        setTotalMailLastWeek(result);
    },[mail,lastWeek])

    
     //percent
     useEffect(()=>{
        //Phần trăm tăng trưởng = ((Giá trị hiện tại - Giá trị tuần trước) / Giá trị tuần trước) x 100
        //console.log(totalMailLastWeek.length)//4
        //console.log(totalMailThisWeek.length)//7

        // if(totalMailLastWeek.length === 0){
        //     setMailPercent(100);
        //     return;
        // }
        // if(totalMailThisWeek.length === 0) {
        //     setMailPercent(0);
        //     return;
        // }
        // let result = Math.round(((totalMailThisWeek.length - totalMailLastWeek.length)*100)/totalMailLastWeek.length);
       
        // setMailPercent(Number(result))
        let thisWeek = 0;
        let lastWeek = 0;
         if(totalMailThisWeek && totalMailThisWeek.length > 0) {
            thisWeek = totalMailThisWeek.length;
         }
          if(totalMailLastWeek && totalMailLastWeek.length >0) {
            lastWeek = totalMailLastWeek.length;
         } 
         console.log(thisWeek); // 1
         console.log(lastWeek); // 0

         if(lastWeek === 0) {
            if(thisWeek === 0) {
                setMailPercent(0)
            }else {
                setMailPercent(100)
            }
           return;
         }
        const result = Math.round(((thisWeek - lastWeek) *100)/lastWeek);
       console.log(result);
       setMailPercent(result)
    },[totalMailThisWeek,totalMailLastWeek])

    //----------------------------procced --------------------------------------------------------------
    //procced this week
    useEffect(()=>{
        const array = [...mail]
        const result:any[] = []
        array && array.forEach((item:any)=>{
            const day = new Date(item.created_at);
            if(day >=thisWeek[0] && day <= thisWeek[thisWeek.length -1] && item.status ==='done') {
                result.push(item)
            }
        });
        //console.log(result);
        setProccedThisWeek(result);
    },[mail,thisWeek])
    //procced last week
    useEffect(()=>{
        const array = [...mail]
        const result:any[] = []
        array && array.forEach((item:any)=>{
            const day = new Date(item.created_at);
            //console.log(item.status)
            if(day <=lastWeek[0] && day >= lastWeek[lastWeek.length -1]  && item.status ==='done') {
               // console.log('try')
                result.push(item)
            }
        });
        //console.log(result);
        setProccedLastWeek(result);
    },[mail,lastWeek])
    //percent
    useEffect(()=>{
        //Phần trăm tăng trưởng = ((Giá trị hiện tại - Giá trị tuần trước) / Giá trị tuần trước) x 100

        // if(proccedThisWeek.length === 0){
        //     setProccedPercent(100);
        //     return;
        // }
        // if(proccedLastWeek.length === 0) {
        //     setProccedPercent(0);
        //     return;
        // }
        // let result = Math.round(((proccedThisWeek.length - proccedLastWeek.length)*100)/proccedLastWeek.length);
       
        // setProccedPercent(Number(result))
        let thisWeek = 0;
        let lastWeek = 0;
         if(proccedThisWeek && proccedThisWeek.length > 0) {
            thisWeek = proccedThisWeek.length;
         }
          if(proccedLastWeek && proccedLastWeek.length >0) {
            lastWeek = proccedLastWeek.length;
         } 
         console.log(thisWeek); // 1
         console.log(lastWeek); // 0

         if(lastWeek === 0) {
            if(thisWeek === 0) {
                setProccedPercent(0)
            }else {
                setProccedPercent(100)
            }
           return;
         }
        const result = Math.round(((thisWeek - lastWeek) *100)/lastWeek);
       console.log(result);
       setProccedPercent(result)
    },[proccedThisWeek,proccedLastWeek])
    
    //----------------------------------------------------------------------pending--------------------------------------------------
    //procced this week
    useEffect(()=>{
        const array = [...mail]
        const result:any[] = []
        array && array.forEach((item:any)=>{
            const day = new Date(item.created_at);
            if(day >=thisWeek[0] && day <= thisWeek[thisWeek.length -1] && item.status ==='pending') {
                result.push(item)
            }
        });
        //console.log(result);
        setPendingThisWeek(result);
    },[mail,thisWeek])
    //procced last week
    useEffect(()=>{
        const array = [...mail]
        const result:any[] = []
        array && array.forEach((item:any)=>{
            const day = new Date(item.created_at);
            if(day <=lastWeek[0] && day >= lastWeek[lastWeek.length -1]  && item.status ==='pending') {
                result.push(item)
            }
        });
        //console.log(result);
        setPendingLastWeek(result);
    },[mail,lastWeek])
    //percent
    useEffect(()=>{
        //Phần trăm tăng trưởng = ((Giá trị hiện tại - Giá trị tuần trước) / Giá trị tuần trước) x 100

        // if(pendingThisWeek.length === 0){
        //     setPendingPercent(100);
        //     return;
        // }
        // if(pendingLastWeek.length === 0) {
        //     setPendingPercent(0);
        //     return;
        // }
        // let result = Math.round(((pendingThisWeek.length - pendingLastWeek.length)*100)/pendingLastWeek.length);
       
        // setPendingPercent(Number(result))
        let thisWeek = 0;
        let lastWeek = 0;
         if(pendingThisWeek && pendingThisWeek.length > 0) {
            thisWeek = pendingThisWeek.length;
         }
          if(pendingLastWeek && pendingLastWeek.length >0) {
            lastWeek = pendingLastWeek.length;
         } 
         console.log(thisWeek); // 1
         console.log(lastWeek); // 0

         if(lastWeek === 0) {
            if(thisWeek === 0) {
                setPendingPercent(0)
            }else {
                setPendingPercent(100)
            }
           return;
         }
        const result = Math.round(((thisWeek - lastWeek) *100)/lastWeek);
       console.log(result);
       setPendingPercent(result)
    },[pendingThisWeek,pendingLastWeek])

    //----------------------------------------------------------------------help--------------------------------------------------
    //help this week
    useEffect(()=>{
        const array = [...mail]
        const result:any[] = []
        array && array.forEach((item:any)=>{
            const day = new Date(item.created_at);
            if(day >=thisWeek[0] && day <= thisWeek[thisWeek.length -1] && (item.status ==='help' || !item.supportBy)) {
                result.push(item)
            }
        });
        //console.log(result);
        setHelpThisWeek(result);
    },[mail,thisWeek])
    //procced last week
    useEffect(()=>{
        const array = [...mail]
        const result:any[] = []
        array && array.forEach((item:any)=>{
            const day = new Date(item.created_at);
            if(day <=lastWeek[0] && day >= lastWeek[lastWeek.length -1]  && (item.status ==='help' || !item.supportBy)) {
                result.push(item)
            }
        });
        //console.log(result);
        setHelpLastWeek(result);
    },[mail,lastWeek])
    //percent
    useEffect(()=>{
        //Phần trăm tăng trưởng = ((Giá trị hiện tại - Giá trị tuần trước) / Giá trị tuần trước) x 100

        // if(helpThisWeek.length === 0){
        //     setProccedPercent(100);
        //     return;
        // }
        // if(helpLastWeek.length === 0) {
        //     setProccedPercent(0);
        //     return;
        // }
        // let result = Math.round(((helpThisWeek.length - helpLastWeek.length)*100)/helpLastWeek.length);
       
        // setHelpPercent(Number(result))
        let thisWeek = 0;
        let lastWeek = 0;
         if(helpThisWeek && helpThisWeek.length > 0) {
            thisWeek = helpThisWeek.length;
         }
          if(helpLastWeek && helpLastWeek.length >0) {
            lastWeek = helpLastWeek.length;
         } 
         console.log(thisWeek); // 1
         console.log(lastWeek); // 0

         if(lastWeek === 0) {
            if(thisWeek === 0) {
                setHelpPercent(0)
            }else {
                setHelpPercent(100)
            }
           return;
         }
        const result = Math.round(((thisWeek - lastWeek) *100)/lastWeek);
       console.log(result);
       setHelpPercent(result)
    },[helpThisWeek,helpLastWeek])
    return (
        <div className=" grid grid-cols-2 gap-4 px-2 py-2 "
                    >
                    <div className="col-span-2 ">
                        <div className="text-[16px] font-semibold capitalize">Total Overview</div>
                        <div className="text-neutral-400 text-thin text-[14px] mt-[-2px]">update every week</div>
                    </div>
                    <div className="col-span-2">
                    <div className="w-full text-end text-[13px] mt-[-12px] text-neutral-400"> 
                    <span className=" "> Date :
                        <span>{new Date(thisWeek[0]).toLocaleDateString()}</span>
                        <span>-</span>
                        <span>{new Date(thisWeek[thisWeek.length -1]).toLocaleDateString()}</span>
                    </span>
                    </div>
                    </div>
                    <div className="col-span-2 grid grid-cols-2 gap-2">
                        <div 
                            className="col-span-1 flex flex-col gap-1 text-white px-4 py-4 pb-1 rounded-md"
                            style={{background:"#448D97"}}
                            >
                            <div className="text-neutral-100 text-[16px] text-semibold">Total Report</div>
                            <div className="text-neutral-100 text-[15px]">{totalMailThisWeek && totalMailThisWeek.length <10 && totalMailThisWeek.length>0 ? `0${totalMailThisWeek.length}`: totalMailThisWeek.length}</div>
                            <div className="text-neutral-100 text-[15px] flex items-end justify-end w-full">{mailPercent && mailPercent <1 ?(
                                <div className="flex items-center justify-start gap-0.5">
                                    <TbArrowBigDownLines className="w-3 h-4 text-red-600" />
                                    <div className="text-[13px]">{mailPercent * -1 + '%'}</div>
                                </div>
                            ):(
                                <div className="flex items-center justify-start gap-0.5">
                                    <PiArrowFatLinesUpFill className="w-3 h-4 text-green-600" />
                                    <div className="text-[13px]">{mailPercent + '%'}</div>
                                </div>
                            )}</div>
                        </div>
                        <div 
                            className="col-span-1 flex flex-col gap-1 text-white px-4 py-4 pb-1 rounded-md"
                            style={{background:"#E96F28"}}
                            >
                            <div className="text-neutral-100 text-[16px] text-semibold"> Processed </div>
                            <div className="text-neutral-100 text-[15px]">{proccedThisWeek && proccedThisWeek.length <10 && proccedThisWeek.length>0 ? `0${proccedThisWeek.length}`: proccedThisWeek.length}</div>
                            <div className="text-neutral-100 text-[15px] flex items-end justify-end w-full">{proccedPercent && proccedPercent <1 ?(
                                <div className="flex items-center justify-start gap-0.5">
                                    <TbArrowBigDownLines className="w-3 h-4 text-red-600" />
                                    <div className="text-[13px]">{proccedPercent * -1 + '%'}</div>
                                </div>
                            ):(
                                <div className="flex items-center justify-start gap-0.5">
                                    <PiArrowFatLinesUpFill className="w-3 h-4 text-green-600" />
                                    <div className="text-[13px]">{proccedPercent + '%'}</div>
                                </div>
                                
                            )}</div>
                        </div>
                        <div 
                            className="col-span-1 flex flex-col gap-1 text-white px-4 py-4 pb-1 rounded-md"
                            style={{background:"#EEB316"}}
                            >
                            <div className="text-neutral-100 text-[16px] text-semibold">Pending</div>
                            <div className="text-neutral-100 text-[15px]">{pendingThisWeek && pendingThisWeek.length <10 && pendingThisWeek.length>0 ? `0${pendingThisWeek.length}`: pendingThisWeek.length}</div>
                            <div className="text-neutral-100 text-[15px] flex items-end justify-end w-full">{pendingPercent && pendingPercent <1 ?(
                                <div className="flex items-center justify-start gap-0.5">
                                    <TbArrowBigDownLines className="w-3 h-4 text-red-600" />
                                    <div className="text-[13px]">{pendingPercent * -1 + '%'}</div>
                                </div>
                            ):(
                                <div className="flex items-center justify-start gap-0.5">
                                    <PiArrowFatLinesUpFill className="w-3 h-4 text-green-600" />
                                    <div className="text-[13px]">{pendingPercent + '%'}</div>
                                </div>
                                
                            )}</div>
                        </div>
                        <div 
                            className="col-span-1 flex flex-col gap-1 text-white px-4 py-4 pb-1 rounded-md"
                            style={{background:"#A42221"}}
                            >
                            <div className="text-neutral-100 text-[16px] text-semibold">Waiting for Help</div>
                            <div className="text-neutral-100 text-[15px]">{helpThisWeek && helpThisWeek.length <10 && helpThisWeek.length>0 ? `0${helpThisWeek.length}`: helpThisWeek.length}</div>
                            <div className="text-neutral-100 text-[15px] flex items-end justify-end w-full">{helpPercent && helpPercent <1 ?(
                                <div className="flex items-center justify-start gap-0.5">
                                    <TbArrowBigDownLines className="w-3 h-4 text-red-600" />
                                    <div className="text-[13px]">{helpPercent * -1 + '%'}</div>
                                </div>
                            ):(
                                <div className="flex items-center justify-start gap-0.5">
                                    <PiArrowFatLinesUpFill className="w-3 h-4 text-green-600" />
                                    <div className="text-[13px]">{helpPercent + '%'}</div>
                                </div>
                                
                            )}</div>
                        </div>
                        
                    </div>
                </div>
    )
}

export default OverView