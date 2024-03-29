"use client"
import Card from "@/components/dashboard/card"
import Chart from "@/components/dashboard/chart"
import NewVersion from "@/components/dashboard/new-version"
import Transaction from "@/components/dashboard/transaction"

import { FcLinux } from "react-icons/fc";
import { FaPencilAlt } from "react-icons/fa";
import { FaCirclePlay } from "react-icons/fa6";
import { FcCloseUpMode } from "react-icons/fc";
import { Toaster } from "react-hot-toast" 
import { Product, User } from "@prisma/client"
import { useEffect, useState } from "react"
import CardUser from "@/components/dashboard-home/card-user"
import CardTransaction from "@/components/dashboard-home/card-transaction"
import CardRevenue from "@/components/dashboard-home/card-revenue"
import LastTransaction from "@/components/dashboard-home/last-transactiion"
import TopCategory from "@/components/dashboard-home/top-category"

interface DashbaordProps {
    users: User[] | any;
    transaction: any;
    product :Product[] | any;
}

const Dashboard:React.FC<DashbaordProps> = ({
    users  = [],
    transaction = [],
    product = []
}) =>{
    const [thisWeek,setThisWeek] = useState<Date[]>([])
    const [lastWeek,setLastWeek] = useState<Date[]>([])
    const [totalUserThisWeek,setTotalUserThisWeek] = useState<any[]>([])
    const [totalUserLastWeek,setTotalUserLastWeek] = useState<any[]>([])
    console.log(users)

    // find out this week
    useEffect(()=>{
        const thisWeek = [];
        const today = new Date();
         console.log(today.getDay()) // thu ba
         console.log(today.getDay() -1)
        const monday = new Date(today.getFullYear(), today.getMonth(), today.getDate()-today.getDay())
        //console.log(monday);
        for(let i =1;i<=7;i++) {
           let date =  new Date(monday.getFullYear(), monday.getMonth(), monday.getDate()+i)
            thisWeek.push(date)
        }
         console.log(thisWeek)
        setThisWeek(thisWeek)
    },[])
    // find out last week
    useEffect(()=>{
        const lastWeek:any[] = [];
        for(let i = 0;i<thisWeek.length;i++){
            let current = new Date(thisWeek[0]);
            const result = new Date(current.getFullYear(),current.getMonth(),current.getDate() - (i+1));
            lastWeek.push(result)
        }
        setLastWeek(lastWeek)
    },[thisWeek])
    console.log(thisWeek)
    // user in week and take 10 lastest user image
    useEffect(()=>{
        const array = [...thisWeek];
        const result:any[] = []
        // user create last week
        users.forEach((item:any)=>{
            let day = new Date(item.createdAt);
            if(day >= array[0] && day<=array[array.length -1]) {
                result.push(item)
                setTotalUserThisWeek(result);
            }
        })
    },[thisWeek,users])

    // user in last week and take 10 lastest user image
    useEffect(()=>{
        const array = [...lastWeek];
        const result:any[] = []
        // user create last week
        users.forEach((item:any)=>{
            let day = new Date(item.createdAt);
            console.log(day)
            console.log(array[0])
            console.log(array[array.length -1])
            if(day <= array[0] && day>=array[array.length -1]) {
                result.push(item)
                setTotalUserLastWeek(result);
            }
        })
    },[lastWeek,users])
    console.log(totalUserThisWeek)
    console.log(totalUserLastWeek)
    return (
        <div className="grid grid-cols-4 px-2 gap-2 ">
           
            {/* left */}
           <div className="col-span-3 flex flex-col gap-2 ">
                {/* statistical */}
                <div className="grid grid-cols-3 gap-2">
                    <CardUser
                        totalUserThisWeek = {totalUserThisWeek}
                        totalUserLastWeek = {totalUserLastWeek}
                        users = {users}
                    />
                    <CardTransaction
                        thisWeek = {thisWeek}
                        lastWeek = {lastWeek}
                        transaction = {transaction}
                    />
                    <CardRevenue
                         thisWeek = {thisWeek}
                         lastWeek = {lastWeek}
                         transaction = {transaction}
                         product = {product}
                    />
                </div>
                {/* transaction */}
                <div className="w-full bg-slate-600 rounded-md hover:bg-slate-500/40 transition p-2">
                    <LastTransaction 
                    transaction = {transaction}
                    />
                </div>
                {/* chart */}
                <div className="w-full bg-slate-600 rounded-md hover:bg-slate-500/40 transition p-2 py-6">
                    <div className="text-white">
                        Weekly Statictical
                    </div>
                   <Chart 
                         thisWeek = {thisWeek}
                         lastWeek = {lastWeek}
                         transaction = {transaction}
                   />
                </div>
           </div>
           {/* right */}
           <div className="col-span-1  flex flex-col gap-2 cursor-pointer">
                <TopCategory 
                    thisWeek = {thisWeek}
                    lastWeek = {lastWeek}
                    product = {product}
                    transaction = {transaction}
                />
                 
                <NewVersion 
                    title = "Availble Now"
                    iconTitle= {FcLinux}
                    question="How to  use the version of the admin dashboard?"
                    content1="Takes 4 minutes to learn"
                    content2="New version of dashboard is 4.13.1 update on 29/1/2024"
                    buttonIcon = {FaCirclePlay}
                    buttonTitle = "Watch"
                />
                 <NewVersion 
                        title = "Coming Soon"
                        iconTitle= {FcCloseUpMode}
                        question="New versiion action is availble, pre-redering is coming up !"
                        content1="Boost your productivity"
                        content2="New version of dashboard is 4.13.1 update on 29/1/2024"
                        buttonIcon = {FaPencilAlt}
                        buttonTitle = "Learn"
                    />
           </div>
        </div>
    )
}

export default Dashboard