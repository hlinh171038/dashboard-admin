"use client"

import NewVersion from "@/components/dashboard/new-version"
import { AdminSkeleton } from "@/components/skeleton/home/admin"
import { CardRevenueSkeleton } from "@/components/skeleton/home/card-revunue"
import { CardUserSkeleton } from "@/components/skeleton/home/card-use"
import { HotCouponSkeleton } from "@/components/skeleton/home/hot-coupon"
import { LastTransactionSkeleton } from "@/components/skeleton/home/last-transaction"
import { PayMethodSkeleton } from "@/components/skeleton/home/pay-method"
import { PopularCategorySkeleton } from "@/components/skeleton/home/popular-category"
import { TopCustomerSkeleton } from "@/components/skeleton/home/top-customer"
import { WeeklyStaticallySkeleton } from "@/components/skeleton/home/weekly-statically"
import { Skeleton } from "@/components/ui/skeleton"
import { FaPencilAlt } from "react-icons/fa"
import { FaCirclePlay } from "react-icons/fa6"
import { FcCloseUpMode, FcLinux } from "react-icons/fc"

const Loading  =() =>{
    return (
        <div className="grid grid-cols-4 gap-2 px-2 ">
           <div className="col-span-3 flex flex-col gap-2">
                {/* new user */}
                    <div className="grid grid-cols-3 gap-2 ">
                    <CardUserSkeleton />
                    <CardRevenueSkeleton />
                    <CardRevenueSkeleton />
                    </div>
                    {/* last transaction */}
                    <LastTransactionSkeleton />
                    {/* Weekly Statictical */}
                    <WeeklyStaticallySkeleton home/>
                    {/* admin && top customer */}
                    <div className="w-full  transition  text-[14px] text-neutral-100 grid grid-cols-2 gap-2 ">
                        <div className="bg-slate-600 rounded-md  p-2">
                            <AdminSkeleton />
                            
                        </div>
                        <div className="bg-slate-600 rounded-md hover:bg-slate-500/40 p-2">
                        <TopCustomerSkeleton />
                        </div>
                    </div>
            </div>
           <div className="col-span-1  flex flex-col gap-2 ">
                <PopularCategorySkeleton />
                <PayMethodSkeleton />
                <HotCouponSkeleton home/>
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

export default Loading