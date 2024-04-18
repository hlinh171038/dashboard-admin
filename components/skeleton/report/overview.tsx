"use client"

import { Skeleton } from "@/components/ui/skeleton"

export const OverViewSkeleton = () =>{
    return (
        <div className=" grid grid-cols-2 gap-4 px-2 py-2 "
                    >
                    <div className="col-span-2 ">
                        <div>Total Overview</div>
                        <div className="text-neutral-400 text-thin text-[14px] mt-[-2px]">update every week</div>
                    </div>
                    <div className="col-span-2 grid grid-cols-2 gap-2">
                        <div 
                            className="col-span-1 flex flex-col gap-1 text-white px-4 py-4 pb-1 rounded-md bg-slate-500/60"
                            
                            >
                            <div className="text-neutral-100 text-[15px]">Total Report</div>
                            <Skeleton className="w-6 h-4" />
                            <div className="text-neutral-100 text-[15px] flex items-end justify-end w-full">
                                <Skeleton className="w-12 h-4" />
                            </div>
                        </div>
                        <div 
                            className="col-span-1 flex flex-col gap-1 text-white px-4 py-4 pb-1 rounded-md bg-slate-500/60"
                           
                            >
                            <div className="text-neutral-100 text-[15px]"> Processed </div>
                            <Skeleton className="w-6 h-4" />
                            <div className="text-neutral-100 text-[15px] flex items-end justify-end w-full">
                                <Skeleton className="w-12 h-4" />
                            </div>
                        </div>
                        <div 
                            className="col-span-1 flex flex-col gap-1 text-white px-4 py-4 pb-1 rounded-md bg-slate-500/60"
                           
                            >
                            <div className="text-neutral-100 text-[15px]">Pending</div>
                            <Skeleton className="w-6 h-4" />
                            <div className="text-neutral-100 text-[15px] flex items-end justify-end w-full">
                                <Skeleton className="w-12 h-4" />
                            </div>
                        </div>
                        <div 
                            className="col-span-1 flex flex-col gap-1 text-white px-4 py-4 pb-1 rounded-md bg-slate-500/60"
                            
                            >
                            <div className="text-neutral-100 text-[15px]">Waiting for Help</div>
                            <Skeleton className="w-6 h-4" />
                            <div className="text-neutral-100 text-[15px] flex items-end justify-end w-full">
                                <Skeleton className="w-12 h-4" />
                            </div>
                        </div>
                        
                    </div>
                </div>
    )
}