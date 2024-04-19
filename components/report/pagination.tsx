"use client"

import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react";
import { GrFormPrevious,GrFormNext  } from "react-icons/gr";


interface PaginationParams {
    page: number;
    per_page: number;
    max: number;
    search: string;
    status:string;
    role:string;
    start:string;
    end:string;
    handleLoading: (value:boolean) => void;
}

const Pagination:React.FC<PaginationParams> = ({
    page,
    per_page,
    max,
    search,
   status,
   role,
   start,
   end,
   handleLoading
}) =>{
    const router = useRouter()
    const [tempPage,setTempPage] = useState(1);
   
    const pagin=[]
   
    for(let i= 0;i<max;i++){
        pagin.push(i)
    }

    const handleNavigate = useCallback((value1: number,value2: number) =>{
        setTempPage(value1)
        
        router.push(`/analytics/report?search=${search}&status=${status}&role=${role}&start=${start}&end=${end}&page=${value1}&per_page=${value2}`);
        
    },[router,search,status,role,start,end])

    useEffect(()=>{
        if(page === tempPage) {
            handleLoading(true)
        }else {
            handleLoading(false)
        }
    },[page,handleLoading,tempPage])
    return (
        <div
                className="flex items-center justify-end px-2 py-2 text-[15px] "
                >
                    <button 
                        disabled = {Number(page) <=1}
                        onClick={()=>handleNavigate(page -1 ,per_page)}
                        className={cn("  rounded-md flex items-center justify-center gap-1 text-neutral-200",
                                    Number(page) <= 1 ?"":"hover:bg-white"
                                )}
                    >
                        <GrFormPrevious className="w-4 h-4"/>
                        <span>Previous</span>
                    </button>
                    <div className="flex items-center justify-between gap-2 mx-2">
                        {
                            pagin && pagin.map((item)=>{
                                return (
                                    <div 
                                         onClick={()=>handleNavigate(item + 1,per_page)}
                                         key={item} 
                                         className={cn(" w-6 h-6 pt-0.5 rounded-md flex items-center justify-center text-neutral-300 transition-all hover:text-white cursor-pointer" ,
                                                        item + 1 == Number(page) && "bg-[#5EC0B5] p-2 w-6 h-6"                                                    
                                                    )}
                                    >
                                        {item + 1}
                                    </div>
                                )
                            })
                        }
                    </div>
                    <button 
                        disabled = {Number(page) >= max}
                        onClick={()=>handleNavigate(page + 1,per_page)}
                        className={cn(" rounded-md flex items-center justify-center text-neutral-200",
                                       Number(page) >=max ?"":"hover:bg-white"
                                 )}>
                                     <span>Next</span>
                                    <GrFormNext className="w-4 h-4"/>
                       
                    </button>
                </div>
    )
}

export default Pagination