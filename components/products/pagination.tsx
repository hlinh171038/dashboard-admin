"use client"

import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation"
import { GrFormPrevious,GrFormNext  } from "react-icons/gr";


interface PaginationParams {
    page: number;
    per_page: number;
    max: number;
    query: string;
    category: string;
    brand: string;
    location: string;
    price: string;
    stock: string;
}

const Pagination:React.FC<PaginationParams> = ({
    page,
    per_page,
    max,
    query,
    category,
    brand,
    location,
    price,
    stock
}) =>{
    const router = useRouter()
    // const searchParams = useSearchParams();
    // const pageQuery = searchParams.get('page');
    // console.log(pageQuery)
    const pagin=[]
   
    for(let i= 0;i<max;i++){
        pagin.push(i)
    }
    return (
        <div
                className="flex items-center justify-between px-2 py-2 text-[15px] absolute left-0 bottom-1"
                >
                    <button 
                        disabled = {Number(page) <=1}
                        onClick={()=>{
                            router.push(`/dashboards/product/?query=${query}&category=${category}&brand=${brand}&location=${location}&price=${price}&stock=${stock}&page=${page - 1}&per_page=10`)
                        }}
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
                                         onClick={()=>{
                                            router.push(`/dashboards/product/?query=${query}&category=${category}&brand=${brand}&location=${location}&price=${price}&stock=${stock}&page=${item+1}&per_page=10`)
                                         }}
                                         key={item} 
                                         className={cn(" w-6 h-6 pt-0.5 border border-slate-900  rounded-md flex items-center justify-center text-neutral-300 transition-all hover:text-white cursor-pointer",
                                                      item + 1 == Number(page) && "bg-slate-900 p-2 w-6 h-6"                                                    
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
                        onClick={()=>{
                            router.push(`/dashboards/product/?query=${query}&category=${category}&brand=${brand}&location=${location}&price=${price}&stock=${stock}&page=${page + 1}&per_page=10`)
                        }}
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