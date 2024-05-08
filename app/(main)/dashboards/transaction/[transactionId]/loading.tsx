"use clinet"

import { Skeleton } from "@/components/ui/skeleton"
import { MdCopyAll } from "react-icons/md"
import { PiMoneyDuotone } from "react-icons/pi"

const array = [0,1,2,3,4,5,6,7,8,9]

const Loading = () =>{
    return (
        <div className="grid grid-cols-3 gap-2 px-2 text-[14px] ">
            <div className="col-span-2 bg-slate-600 rounded-md flex flex-col gap-4 py-4">
            <div className="w-full text-[14px] px-2">
                <div className=" text-neutral-200 flex flex-col items-start justify-start gap-2 w-full p-2">
                    <div className="flex items-center justify-start gap-2">
                        <PiMoneyDuotone className="w-4 h-4" />
                        <span className="uppercase ">amount</span>
                    </div>
                    <div className="flex items-center justify-between w-full">
                        <Skeleton className="w-16 h-8" />
                       <Skeleton className="w-12 h-4" />
                    </div>
                </div>
            </div>
               
            <div className="text-neutral-200 text-[15px] px-2">
                <div className="text-[18px] capitalize mx-2 mt-2">Transaction Date </div>
                <hr/>
                <table className="w-[100%] mx-2 ">
                    <tr>
                        <td  className="w-[40%]"> Date :</td>
                        <td className="text-neutral-400 text-thin"><Skeleton className="w-32 h-4"/></td>
                    </tr>
                
                    <tr>
                        <td  className="w-[40%]">Time:</td>
                        <td className="text-neutral-400 text-thin"><Skeleton className="w-32 h-4"/></td>
                    </tr>
                </table>
                
            
            </div>
            <div className="text-neutral-200 text-[15px] px-2">
                <div className="text-[18px] capitalize mx-2 mt-2">Transaction Details</div>
                <hr/>
                <table className="w-[100%] mx-2">
                    <tr>
                        <td className="w-[40%]">Label :</td>
                        <td className="text-neutral-400 text-thin"><Skeleton className="w-12 h-4" /></td>
                    </tr>
                    <tr>
                        <td className="w-[40%]">Payment method :</td>
                        <td className="text-neutral-400 text-thin"><Skeleton className="w-16 h-4" /></td>
                    </tr>
                    <tr>
                        <td className="w-[40%]">Payment sourse :</td>
                        <td className="text-neutral-400 text-thin"><Skeleton className="w-32 h-4" /></td>
                    </tr>
                    <tr>
                        <td className="w-[40%]">Payment references :</td>
                        <td className="text-neutral-400 text-thin"><Skeleton className="w-28 h-4" /></td>
                    </tr>
                    <tr>
                        <td className="w-[40%]">Bank :</td>
                        <td className="text-neutral-400 text-thin"><Skeleton className="w-12 h-4" /></td>
                    </tr>
                    <tr>
                        <td className="w-[40%]">Status :</td>
                        <td className="text-neutral-400 text-thin"><Skeleton className="w-12 h-4" /></td>
                    </tr>
                </table>
                
            
            </div>
            <div className="text-neutral-200 text-[15px] px-2">
                <div className="text-[18px] capitalize mx-2 mt-2">Product Information</div>
                <hr/>
                <table className="w-[100%] mx-2 ">
                    <tr>
                        <td  className="w-[40%]">Product amount :</td>
                        <td className="text-neutral-400 text-thin"><Skeleton className="w-12 h-4" /></td>
                    </tr>
                
                    <tr>
                        <td  className="w-[40%]">Comment:</td>
                        <td className="text-neutral-400 text-thin"><Skeleton className="w-24 h-4" /></td>
                    </tr>
                    
                </table>
                <div className="flex px-2 gap-2">
                        <div  className="w-[40%] ">product code :</div>
                        <div className="flex flex-col gap-2 text-neutral-400 text-thin "><Skeleton className="w-32 h-4" /></div>
            
            </div>
            </div>
            </div>
            <div className="col-span-1 flex flex-col gap-2 ">
                <Skeleton className="w-full h-6" />
                <div className="bg-slate-600 rounded-md py-4 flex flex-col gap-4 ">
                    {/* header */}
                    <div className="text-neutral-200 text-[15px] px-2">
                        <div className="flex items-center justify-between">
                                <div className="text-[18px] capitalize mx-2 mt-2">User </div> 
                                <Skeleton className="w-12 h-4" />
                        </div>
                            <hr/>
                            <div className="flex items-center justify-start gap-2 px-2 mt-2">
                                <Skeleton className="w-10 h-10 aspect-square rounded-full" />
                                <div className="flex flex-col gap-1" >
                                    <Skeleton className="w-12 h-4" />
                                    <Skeleton className="w-16 h-4" />
                                </div>
                            </div>
                            <table className="w-[100%] mx-2 px-2">

                            
                                <tr>
                                    <td  className="w-[40%]">Email:</td>
                                    <Skeleton className="h-4 w-32" />
                                </tr>
                                <tr>
                                    <td  className="w-[40%]">SDT:</td>
                                    <Skeleton className="h-4 w-32" />
                                </tr>
                            </table>
                            
                        
                        </div>
                        <div className="text-neutral-200 text-[15px] px-2">
                            <div className="text-[18px] capitalize mx-2 mt-2">History </div>
                            <hr/>
                            <div
                                className="flex flex-col gap-2 px-2 py-4"
                            >
                               <div className="flex flex-col gap-1">
                                    <Skeleton className="w-full h-4" />
                                    <Skeleton className="w-32 h-4" />
                               </div>
                               <div className="flex flex-col gap-1">
                                    <Skeleton className="w-full h-4" />
                                    <Skeleton className="w-40 h-4" />
                               </div>
                               <div className="flex flex-col gap-1">
                                    <Skeleton className="w-full h-4" />
                                    <Skeleton className="w-32 h-4" />
                               </div>
                               <div className="flex flex-col gap-1">
                                    <Skeleton className="w-full h-4" />
                                    <Skeleton className="w-48 h-4" />
                               </div>
                            </div>
                            
                        
                        </div>
                </div>
                
            </div>
        
        </div>
    )
}

export default Loading