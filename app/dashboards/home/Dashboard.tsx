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
import { Discount, Product, User } from "@prisma/client"
import { Suspense, useCallback, useEffect, useState } from "react"
import CardUser from "@/components/dashboard-home/card-user"
import CardTransaction from "@/components/dashboard-home/card-transaction"
import CardRevenue from "@/components/dashboard-home/card-revenue"
import LastTransaction from "@/components/dashboard-home/last-transactiion"
import TopCategory from "@/components/dashboard-home/top-category"
import PaymentTrend from "@/components/dashboard-home/payment-trend"
import DiscountTrend from "@/components/dashboard-home/discount-trend"
import { MdOutlineCallMade } from "react-icons/md";
import { useRouter } from "next/navigation"
import TeamLead from "@/components/dashboard-home/team-lead"
import TeamLeadCahrt from "@/components/dashboard-home/team-lead-chart"
import TopCustomer from "@/components/dashboard-home/top-customer"


interface DashbaordProps {
    users: User[] | any;
    transaction: any;
    product :Product[] | any;
    discount: Discount[] | any;
}

const Dashboard:React.FC<DashbaordProps> = ({
    users  = [],
    transaction = [],
    product = [],
    discount = []
}) =>{
    const [thisWeek,setThisWeek] = useState<Date[]>([])
    const [lastWeek,setLastWeek] = useState<Date[]>([])
    const [totalUserThisWeek,setTotalUserThisWeek] = useState<any[]>([])
    const [totalUserLastWeek,setTotalUserLastWeek] = useState<any[]>([])
    const router = useRouter()
   

    // find out this week
    useEffect(()=>{
        const thisWeek = [];
        const today = new Date();
         console.log(today.getDay()) // thu ba
         console.log(today.getDay() -1)
        const monday = new Date(today.getFullYear(), today.getMonth(), today.getDate()-today.getDay())
        console.log(monday);
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

    console.log(thisWeek);
    console.log(lastWeek);
    
    //handle navigate
    const handleNavigate = useCallback(()=>{
        router.push('/dashboards/transaction')
    },[router])

    //handle ctr + z
  useEffect(() => {
    const handleKeyDown = (event:any) => {
      if (event.ctrlKey === true && event.key === 'z') {
        router.push('/history')
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [router]);
    return (
        <div className="grid grid-cols-4 px-2 gap-2 ">
           
            {/* left */}
           <div className="col-span-3 flex flex-col gap-2 ">
                {/* statistical */}
                <div className="grid grid-cols-3 gap-2">
                <Suspense fallback={<div>loading ...</div>}>
                    <CardUser
                        totalUserThisWeek = {totalUserThisWeek}
                        totalUserLastWeek = {totalUserLastWeek}
                        users = {users}
                    />
                </Suspense>
                    
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
                        thisWeek = {thisWeek}
                        lastWeek = {lastWeek}
                    />
             
                    
                </div>
                {/* chart */}
                <div className="w-full bg-slate-600 rounded-md hover:bg-slate-500/40 transition p-2 text-[14px] text-neutral-100">
                    <div className="text-white text-[16px] font-bold flex items-center justify-between">
                       <div> Weekly Statictical</div>
                        <div onClick={handleNavigate} className="text-neutral-400 hover:text-neutral-100 font-thin text-[13px] flex items-center justify-start gap-0.5">View<MdOutlineCallMade className="w-4 h-4 "/></div>
                    </div>
                    <div className="text-neutral-400 font-normal text-[14px] mb-2">
                        Total income in this week compared with last week.
                    </div>
                    <div className="flex items-center justify-end">
                        <div className="flex items-center justify-start pr-6">
                            <div>Date:</div>
                            <div>{new Date(thisWeek[0]).toLocaleDateString()}</div>
                            <div> - </div>
                            <div>{new Date(thisWeek[thisWeek.length -1]).toLocaleDateString()}</div>
                        </div>
                    </div>
                   <Chart 
                         thisWeek = {thisWeek}
                         lastWeek = {lastWeek}
                         transaction = {transaction}
                   />
                </div>
                <div className="w-full  transition  text-[14px] text-neutral-100 grid grid-cols-2 gap-2 ">
                    <div className="bg-slate-600 rounded-md hover:bg-slate-500/40 p-2">
                        <TeamLead 
                            users = {users}
                        />
                        <TeamLeadCahrt
                            users = {users}
                            totalUserLastWeek={totalUserLastWeek}
                            totalUserThisWeek={totalUserThisWeek}
                        />
                        
                    </div>
                    <div className="bg-slate-600 rounded-md hover:bg-slate-500/40 p-2">
                        <TopCustomer 
                            users ={users}
                        />
                    </div>
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
                 <PaymentTrend
                    thisWeek = {thisWeek}
                    lastWeek = {lastWeek}
                    transaction = {transaction}
                 />
                 <DiscountTrend
                    discount = {discount}
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