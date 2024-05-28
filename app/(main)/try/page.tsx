"use client"

import { Skeleton } from "@/components/ui/skeleton"



const Loading = () =>{

    return (
        <div className="flex flex-col justify-start items-start gap-2 w-full px-2">
          <div className="grid grid-cols-3 w-full rounded-md  gap-2">
           <div className="col-span-1  w-full h-auto rounded-md  flex flex-col gap-2 ">
                  <Skeleton className="w-full h-6"/>
                  <Skeleton className="w-full  aspect-square " />
            </div>
            <div className="col-span-2 bg-slate-600 rounded-md px-2 py-2 flex flex-col gap-10">
              {/* name */}
                <Skeleton className="w-full h-6  " />
                {/* brand, category */}
                <div className="grid grid-cols-2 gap-2">
                    <Skeleton className="w-full h-6" /> 
                    <Skeleton className="w-full h-6" />
                </div>
               
                 {/* stock , weight */}
                 {/* <div className="row-span-1 grid grid-cols-2 w-full gap-2 ">
                    <div className="col-span-1 ">
                        <Skeleton className="w-full h-6" /> 
                    </div>
                    <div className="  col-span-1">
                        <Skeleton className="w-full h-6" /> 
                    </div>
                 </div> */}
                 <Skeleton className="w-full h-6 " />
                 {/* location + description */}
                 <Skeleton className="w-full h-28" /> 
                 
            </div>
          </div>
          <div className="bg-slate-600 rounded-md w-full grid grid-cols-3 gap-2 h-full p-2">
           
            <div className="col-span-3 grid grid-cols-3 gap-2 mb-2">
                 {/* color  array checkbox*/}
                 <Skeleton className="w-full h-6" />
                 <Skeleton className="w-full h-6" />
                 <Skeleton className="w-full h-6" />
                {/* size array checkbox*/}
            </div>
            <div className="col-span-3 grid grid-cols-3 gap-2 mb-2">
                 {/* color  array checkbox*/}
                 <Skeleton className="w-full h-6" />
                 <Skeleton className="w-full h-6" />
                 <Skeleton className="w-full h-6" />
                {/* size array checkbox*/}
            </div>
            <div className="col-span-3 flex items-center justify-end">
                <Skeleton className="w-16 h-6" />
            </div>
            {/* unit */}
            <div className="col-span-3 grid grid-cols-3 gap-2 mt-6">
                <Skeleton className="col-span-1 h-6" />
                 <Skeleton className="col-span-2 h-6" />
                 
                
            </div>
            <div className="col-span-3 grid grid-cols-3 gap-2 mt-6">
                    {/* tax */}
                    <Skeleton className="w-full h-6" />
                    <Skeleton className="w-full h-6" />
                    <Skeleton className="w-full h-6" />
            </div>
            <div className="col-span-3 grid grid-cols-3 gap-2 mt-6">
                    {/* tax */}
                    <Skeleton className="w-full h-6" />
                    <Skeleton className="w-full h-6" />
                    <Skeleton className="w-full h-6" />
            </div>
            <Skeleton className="col-span-3 h-28 mt-6" /> 
            <div className="col-span-3 grid grid-cols-2 gap-2 rounded-md mt-6">
                    <Skeleton className="w-full h-6" />
                    <Skeleton className="w-full h-6" />
            </div>

            </div>
            
            <Skeleton className="w-full h-6" />

        
        </div>
    )
}

export default Loading