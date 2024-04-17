"use clinet"

import { Skeleton } from "@/components/ui/skeleton"
const array = [0,1,2,3,4,5,6,7]

export const LastTransactionSkeleton = () =>{
    return (
        <div className="bg-slate-600 px-2 py-2 rounded-md">
            <div className="flex flex-col gap-4 text-white  ">
                    <div >
                        <div className="text-white text-[16px] font-bold flex items-center justify-between">
                            <div> Lastest  Transactiion</div>
                            <Skeleton className="w-12 h-4" />
                        </div>
                        <div className="text-neutral-400 font-normal text-[14px] ">
                            The list of lastest transaction in this week.
                        </div>
                    </div>
                    
                
                        <table id="trend-sale-table" className="w-full text-start text-sm gap-2 ">
                            <tr >
                                <td className="text-neutral-100 px-2">Name</td>
                                <td className="text-neutral-100 px-2">Status</td>
                                <td className="text-neutral-100 px-2">Date</td>
                                <td className="text-neutral-100 px-2">Price</td>
                            </tr>
                            {array.map((item:any)=>{
                                return (
                                    <tr key={item}>
                                        <td className="px-2">
                                            <div className="flex items-center space-x-2">
                                            <Skeleton className="h-6 w-6 rounded-full" />
                                            <Skeleton className="h-4 w-[70px]" />
                                            </div>
                                        </td>
                                        <td className="px-2">
                                            <Skeleton className="h-4 w-[50px]" />
                                        </td>
                                        <td className="px-2">
                                            <Skeleton className="h-4 w-[50px]" />
                                        </td>
                                        <td className="px-2">
                                            <Skeleton className="h-4 w-[50px]" />
                                        </td>
                                        <td className="px-2">
                                            <Skeleton className="h-4 w-[50px]" />
                                        </td>
                                    </tr>
                                )
                            })}
                             
                           
                        </table>
            
           
                </div>
        </div>
    )
}