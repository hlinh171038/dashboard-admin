"use client"

import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"
export const metadata = {
    title: "Dashboard Inside | Profile",
    description: "My description",
  }

const page = () => {
  return (
    <div className="grid grid-cols-3 gap-2 px-2">
            
           <div className=" rounded-md col-span-1 flex flex-col items-center justify-start gap-4">
           
            <Skeleton className='w-full  rounded-full aspect-square'/>
            <Skeleton className='w-full h-6 '/>
           </div>
           <div className="bg-slate-600 rounded-md col-span-2 px-2 py-4">
                <div className="flex items-center justify-between">
                
                {/* information */}
                <div className="flex item-center justify-between w-full mb-4">
                    <div>
                        <div className="uppercase text-[18px] text-neutral-100 font-semibold">User Information</div>
                        <div className="w-20 h-0.5 bg-neutral-100"></div>
                    </div>
                    {/* wating */}
                    <div>block/unblock</div>
                </div>
               
                </div>
                <form className='flex flex-col gap-8'>
                    <div className="grid grid-cols-2 gap-2">
                        <Skeleton className='w-full h-6'/>
                        <Skeleton className='w-full h-6'/>
                       
                    </div>
                    <Skeleton className='w-full h-6'/>

                    <Skeleton className='w-full h-6'/>

                    <Skeleton className='w-full h-6'/>

                    <div className="flex flex-col gap-4 ">
                    <Skeleton className='w-full h-6'/>

                       <div className="grid grid-cols-2 gap-2 mt-4">
                       <Skeleton className='w-full h-6'/>

                       <Skeleton className='w-full h-6'/>
 
                       </div>
                    </div>
                    <Skeleton className='w-full h-6'/>

                    
                   
                    
                    
                    <Skeleton className='w-full h-6'/>

                </form>
           </div>
        </div>
  )
}

export default page
