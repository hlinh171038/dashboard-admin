"use client"

import { HostestProductSkeleton } from "@/components/skeleton/product/hostest-product"
import { TableSkeleton } from "@/components/skeleton/product/table"
import { TopCategorySkeleton } from "@/components/skeleton/product/top-category"
import { TotalProductSkeleton } from "@/components/skeleton/product/total-product"

const Loading = () =>{

    return (
        <div className="w-full  px-2 flex flex-col gap-2">
            <div className="">
                <TotalProductSkeleton />
            </div>
            <div className="grid grid-cols-9 gap-2">
                <div className="col-span-4 bg-slate-600 rounded-md p-2">
                    <TopCategorySkeleton />
                    
                </div>
                <div className="col-span-5 bg-slate-600 rounded-md p-2">
                    <HostestProductSkeleton />
                </div>
               
            </div>
            <div className="relative bg-slate-600  rounded-md h-full">
                
               <TableSkeleton />
            </div>
           
        </div>
    )
}

export default Loading