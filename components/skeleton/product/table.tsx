"use client"

import { Skeleton } from "@/components/ui/skeleton"

const array = [0,1,2,3,4,5,6,7,8,9]

export const TableSkeleton = () =>{
    return (
        <div className="relative bg-slate-600  rounded-md h-full p-2 ">
            <div className="grid grid-cols-12 gap-2">
                <div className="col-span-4">
                    <Skeleton className="w-full h-6" />
                </div>
                <div className="col-span-5"></div>
                <div className="col-span-3 flex items-center justify-end gap-2">
                    <Skeleton className="w-6 h-6"/>
                    <Skeleton className="w-6 h-6"/>
                    <Skeleton className="w-6 h-6"/>
                    <Skeleton className="w-6 h-6"/>
                </div>
            </div>
            <table className="w-full text-[14px] text-neutral-400 mt-2">
            <tr className="font-bold text-[15px] text-neutral-100">
                <td></td>
                <td>Title</td>
                <td>Brand</td>
                <td>Price</td>
                <td>Category</td>
                <td>
                    Location
                </td>
                <td>
                    Created At
                </td>
                <td>
                    <div className="flex items-center justify-center">
                            Sale Price
                    </div>
                </td>
                <td></td>
            </tr>
            
                    {array.map((item:any)=>{
                        return (
                            <tr key={item} className="my-2">
                                <td className="w-6 h-6">
                                    <Skeleton className="h-4 w-4" />
                                </td>
                                <td className="w-40 flex items-center justify-start gap-1 py-2" >
                                    <Skeleton className="h-4 w-[140px]" />
                                </td>
                                <td><Skeleton className="h-4 w-[50px]" /></td>
                                <td><Skeleton className="h-4 w-[70px]" /></td>
                                <td><Skeleton className="h-4 w-[50px]" /></td>
                                <td><Skeleton className="h-4 w-[50px]" /></td>
                                <td><Skeleton className="h-4 w-[70px]" /></td>
                                <td>
                                    <div className="flex items-center justify-center">
                                        <Skeleton className="h-4 w-[50px]" />
                                    </div>
                                </td>
                                <td>
                                    <div className="flex items-center justify-end gap-2">
                                        <Skeleton className="h-6 w-[70px]" />
                                    </div>
                                </td>
                            </tr>
                        )
                    })}
               
       </table>
       <div className="flex items-center justify-end  pt-2">
        <Skeleton className="h-4 w-20"/>
       </div>
        </div>
    )
}