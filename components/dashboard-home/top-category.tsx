"use client"

import { Product, Transaction } from "@prisma/client";
import ChartCategory from "./chart-category"
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const color =['#EC8D4B','#64D03E', '#CCEB24', '#468AE2','#CB26E9', '#ECEDF1']

interface TopCategoryProps {
    thisWeek: any;
    lastWeek:any;
    product: Product[] | any;
    transaction: Transaction[] | any;
    productCondition?: boolean;
}

const TopCategory:React.FC<TopCategoryProps> = ({
    thisWeek,
    lastWeek,
    product =[],
    transaction =[],
    productCondition
}) =>{
    const [trendCategory,setTrendCategory] = useState<any>([])
    const [total,setTotal] = useState(0)
    const [data,setData] = useState<any>([])

    useEffect(()=>{
        let result:any[] = []
        transaction && transaction.forEach((item:any)=>{
            if(item.productId.length >0) {
                item.productId.forEach((pro:any)=>{
                    product && product.forEach((it:any)=>{
                        if(pro === it.id) {

                            // check brand
                            const index = result.findIndex((item:any)=>item.category === it.category)
                            if(index ===-1){
                                const obj = {category:it.category,count:1}
                                result.push(obj)
                            } else {
                                
                                    result[index].count +=1;
                            }
                        }
                    })
                })
            }
        })
        setTrendCategory(result)
    },[product,transaction])

    // slice data
    
    useEffect (()=>{
        const array = [...trendCategory];
        const obj:any ={}
        array.sort((a:any,b:any)=>{
          if(a.count > b.count) return -1;
          if(a.count <b.count) return 1;
          return 0;
        })
     
        console.log(array)
        if(array.length >5){
          const sub = array.slice(5);
     
          const total = sub.reduce((calculator:number, currentValue:any)=> calculator + currentValue.count,0);
       
          obj.category = 'orther'
          obj.count= total;
          const first = array.slice(0,5);
     
         first.push(obj);
        setData(first)
        }
     
        setData(array)
       },[trendCategory])
   
    useEffect(()=>{
       const result = data && data.reduce((calculator:number,currentValue:any)=> calculator + currentValue.count,0);
       setTotal(result);
    },[data])

    console.log(data)
    console.log(total)
    console.log(trendCategory)
    return (
        <div className={cn("bg-slate-600 rounded w-full p-2  transition-all duration-300 relative",
                            productCondition && productCondition ? 'hover:opacity-[1]':'hover:bg-slate-500/40'
                        )}>
            <div className="text-[15px] text-neutral-100 font-bold ">Popular Category</div>
            <div className="text-[14px] text-neutral-400">List of hotest category sort by quanity of transaction.</div>
           <div className={cn("flex justify-between ",
                            productCondition && productCondition ?'flex-row-reverse':'flex-wrap'
                        )}>
            <ChartCategory 
                data = {data}
            />
            <div className={cn("  ",
                                productCondition && productCondition ? 'mt-6 flex flex-col gap-1.5 w-full':"w-full"
                            )}>
                {data && data.map((item:any,index:any)=>{
                    return (
                        <div
                            key={item.id}
                            className="text-[14px] text-neutral-100 flex items-start gap-2 justify-start "
                        >
                            <div className='w-4 h-4' style={{backgroundColor:`${color[index]}`}}>
                                                    
                            </div>
                            <div className="capitalize">{item.category}</div>
                        </div>
                    )
                })}
            </div>
           </div>
            <div className="absolute bottom-1 right-1 text-[14px] text-neutral-100 ">Total:{total}</div>
        </div>
    )
}

export default TopCategory