"use clinet"

import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

import { RiMailSendLine } from "react-icons/ri"

const array = [0,1,2,3,4,5,6,7,8,9]

const Loading = () =>{
    return (
        <div
            className=" flex flex-col gap-2"
        >
            
            <div  className="px-2 grid grid-cols-6 gap-2">
                <div
                    className="col-span-4  text-neutral-400 text-[14px]"
                >
                    <div className=" text-neutral-400 text-[14px] pb-2 ">
                        {/*header*/}
                        <div  className="grid grid-cols-3 items-center justify-between gap-2">
                            {[0,1,2].map((item)=>{
                                return (
                                    <div 
                                        key={item}
                                        className="grid grid-cols-3  rounded-md px-2 py-1 bg-slate-600 text-[14px]"
                                    >
                                    
                                        <div className="col-span-1 flex items-center justify-center"><Skeleton className="w-6 h-6"/></div>
                                        <div className="col-span-2 flex flex-col gap-y-2  ">
                                            
                                            <div className="text-neutral-100 capitalize"><Skeleton className="w-24 h-4"/></div>
                                            <div className="text-neutral-400 cursor-pointer"><Skeleton className="w-20 h-4"/></div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="grid grid-cols-3 items-start justify-start gap-2 bg-slate-600 rounded-md p-2">
            <div className="h-full ">
                <div className="col-span-1 flex items-center justify-start">
                    <RiMailSendLine className="w-6 h-6 " />
                    <div>Send me message</div>
                </div>
                <div className="font-thin text-[14px] text-neutral-400 flex flex-col  justify-between  h-[90%] mt-4 pb-4">
                    <div>
                        <div>1. Do you have any problem ?</div>
                        <div>2. some feature are trouble ?</div>
                        <div>3. Connect for more information</div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <Skeleton className="w-32 h-4"/>
                        <Skeleton className="w-36 h-4"/>
                    </div>
                </div>
            </div>
            <div className="col-span-2 w-full">
            <div className='text-[15px] text-neutral-100  pb-4 rounded-md'>
        
                <form 
               
                className='flex  flex-col gap-2'
                >
                <div className='flex flex-col gap-0.5'>
                    <label className='text-[14px]'>Name </label>
                    <Skeleton className="w-full h-6"/>
                </div>
                <div className='flex flex-col gap-0.5'>
                    <label className='text-[14px]'>Email </label>
                    <Skeleton className="w-full h-6"/>
                </div>
                <div className='flex flex-col gap-0.5'>
                    <label className='text-[14px]'>Message </label>
                    <Skeleton className="w-full h-36"/>
                </div>
                    <Skeleton className="w-44 h-4"/>
                    <Skeleton className="w-full h-6"/>
                </form>
            </div>
            </div>
        </div>
                </div>
                <div className="col-span-2 bg-slate-600 rounded-md text-neutral-100 text-[15px] px-2 py-4">
                    <div className="text-md capitalize my-2">How Can We help?</div>
                    <div className="flex flex-col gap-2">
                        {[0,1,2,3,4].map((item)=>{
                            return (
                                <button 
                                    className={cn(`grid grid-cols-3 items-center gap-2 border rounded-md shadow-md px-2 py-1 cursor-pointer `,{

                                                })}
                                    key={item}
                                   
                                >
                                    <div className="col-span-1 px-4">
                                        <Skeleton className="w-16 h-10" />
                                    </div>
                                    <div className="col-span-2 flex flex-col gap-0.5  justify-start items-start text-start">
                                        <Skeleton className="w-12 h-4"/>
                                        <Skeleton className="w-full h-8"/>
                                    </div>
                                </button>
                            )
                        })}
                    </div>
                </div>
            </div>
            <div className="mt-4">
            <div className="grid grid-cols-4 gap-2 items-start justify-start px-4">
            <div  className="col-span-1 flex flex-col gap-2">
                <div className="text-[17px] text-white capitalize">get started</div>
                <div className="text-[14px] font-thin text-neutral-400 underline cursor-pointer transition-all duration-300 flex flex-col gap-1">
                    <Skeleton className="w-32 h-4"/>
                    <Skeleton className="w-44 h-4"/>
                    <Skeleton className="w-28 h-4"/>
                </div>
            </div>
            <div className="col-span-1 flex flex-col gap-2">
                <div className="text-[17px] text-white capitalize">manager account </div>
                <div className="text-[14px] font-thin text-neutral-400 underline cursor-pointer transition-all duration-300 flex flex-col gap-1">
                    <Skeleton className="w-52 h-4"/>
                    <Skeleton className="w-32 h-4"/>
                    <Skeleton className="w-28 h-4"/>
                    <Skeleton className="w-28 h-4"/>
                </div>
            </div>
            <div className="col-span-1 flex flex-col gap-2 justify-end">
                <div className="text-[17px] text-white capitalize">find and save</div>
                <div className="text-[14px] font-thin text-neutral-400 underline cursor-pointer transition-all duration-300 flex flex-col gap-1">
                    <Skeleton className="w-24 h-4"/>
                    <Skeleton className="w-28 h-4"/>
                    <Skeleton className="w-28 h-4"/>
                    <Skeleton className="w-32 h-4"/>
                </div>
            </div>
            <div className="col-span-1 flex flex-col gap-2 justify-end">
                <div className="text-[17px] text-white capitalize">Contact Us</div>
                <div className="text-[14px] font-thin text-neutral-400 underline cursor-pointer transition-all duration-300 flex flex-col gap-1">
                    <Skeleton className="w-24 h-4"/>
                    <Skeleton className="w-28 h-4"/>
                    <Skeleton className="w-28 h-4"/>
                    <Skeleton className="w-32 h-4"/>
                </div>
            </div>
        </div>
            </div>
        </div>
    )
}

export default Loading