"use client"

import { Skeleton } from "@/components/ui/skeleton"



const Loading = () =>{

    return (
        <div className="bg-none rounded-md px-2 w-full grid grid-cols-5 gap-2">
            <div className="col-span-3 flex flex-col gap-2 bg-slate-600 rounded-md text-[14px] text-neutral-400 p-2">
                <div className="flex items-center justify-between">
                    <div className="text-[15px] font-bold text-neutral-100 uppercase flex items-center justify-start gap-2">Detail <Skeleton className="h-4 w-12" /> :  <Skeleton className="h-4 w-32" /> </div>
                    <Skeleton className="h-4 w-12" /> 
                </div>
                {/* detail code */}
                <div>
                    <div className="text-neutral-100 text-[15px] capitalize"><Skeleton className="h-4 w-12" /> Code  </div>
                    <div className="text-[14px] text-neutral-400 flex items-center justify-start gap-2 "> The code use to valid this <Skeleton className="h-4 w-12" /></div>
                    <Skeleton className="h-6 w-full" />
                </div>
                {/* title */}
                <div>
                    <div  className="text-neutral-100 text-[15px]" >Title:</div>
                    <Skeleton className="h-6 w-full" />
                </div>
                {/* description */}
                <div>
                    <div  className="text-neutral-100 text-[15px]" >Description:</div>
                    <Skeleton className="h-20 w-full" />
                </div>
                {/* type */}
                <div>
                    <div className="text-neutral-100 text-[15px]"   >Type:</div>
                    <div className="flex flex-col gap-2">
                        <Skeleton className="h-6 w-full" />
                        <Skeleton className="h-6 w-full" />
                        <Skeleton className="h-6 w-full" />
                        <Skeleton className="h-6 w-full" /> 
                    </div>
                </div>

                {/* date */}
                
               <div>
                <div className="text-neutral-100 text-[15px]"> Date:</div>
                    <Skeleton className="h-6 w-full" /> 
               </div>
                <div className="flex items-center justify-start gap-2">
                    <div className="text-neutral-100 text-[15px]">Percent:</div>
                    <Skeleton className="h-4 w-12" /> 
                </div>
                {/* quantity */}
                <div>
                    <div className="text-neutral-100 text-[15px]">Quantity:</div>
                    <div>
                        <div className="flex items-center justify-start gap-2">
                            <div>Total:</div>
                            <Skeleton className="h-4 w-12" /> 
                        </div>
                        <div className="flex items-center justify-start gap-2">
                            <div>Number of codes left:</div>
                            <Skeleton className="h-4 w-20" /> 
                        </div>
                        <div className="flex items-center justify-start gap-2">
                            <div>Number of codes remained:</div>
                            <Skeleton className="h-4 w-32" /> 
                        </div>
                    </div>
                </div>
            </div>

                <div className="col-span-2 flex items-start justify-center mt-8">
                <div className=" relative w-[50%]  text-[14px] text-neutral-400 bg-white shadow-md flex flex-col gap-1">
                    {/* header */}
                    <Skeleton className="w-12 h-4 mt-1" />
                    <div>
                       <Skeleton className="h-32 w-full" />
                    </div>
                    <div className="grid grid-cols-3 ">
                       <Skeleton className="h-6 w-full"/>
                       <div></div>
                       <div></div>
                    </div>
                    {/* information */}
                    <div className="px-2 py-1">
                        <Skeleton className="h-20 w-full"/>
                    </div>
                    <div className="flex items-center justify-start gap-0.5 mx-2 text-[13px] border-t border-neutral-400">
                        <div className="flex items-center justify-start gap-2">Valid: <Skeleton className="w-6 h-4"/></div>
                        <div>-</div>
                        <div> <Skeleton className="w-6 h-4"/></div>
                    </div>
                </div>
           </div>
       
        </div>
    )
}

export default Loading