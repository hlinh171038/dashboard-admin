"use client"


import Card from "@/components/dashboard/card"
import Chart from "@/components/dashboard/chart"
import NewVersion from "@/components/dashboard/new-version"
import Transaction from "@/components/dashboard/transaction"

import { FcLinux } from "react-icons/fc";
import { FaPencilAlt } from "react-icons/fa";
import { FaCirclePlay } from "react-icons/fa6";
import { FcCloseUpMode } from "react-icons/fc";

const Dashboard = () =>{
    return (
        <div className="grid grid-cols-4 px-2 gap-2 ">
            {/* left */}
           <div className="col-span-3 flex flex-col gap-2 ">
                {/* statistical */}
                <div className="grid grid-cols-3 gap-2">
                    <Card />
                    <Card />
                    <Card />
                </div>
                {/* transaction */}
                <div className="w-full bg-slate-600 rounded-md hover:bg-slate-500/40 transition p-2">
                    <Transaction />
                </div>
                {/* chart */}
                <div className="w-full bg-slate-600 rounded-md hover:bg-slate-500/40 transition p-2 py-6">
                    <div className="text-white">
                        Weekly Statictical
                    </div>
                   <Chart />
                </div>
           </div>
           {/* right */}
           <div className="col-span-1  flex flex-col gap-2 cursor-pointer">
                 
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