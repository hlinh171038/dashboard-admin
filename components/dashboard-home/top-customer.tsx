"use client"

import { User } from "@prisma/client"
import { useCallback, useEffect, useState } from "react";
import { ItemTopCustomer } from "./item-top-customer";
import { useRouter } from "next/navigation";
import { MdOutlineCallMade } from "react-icons/md";

interface TopCustomerProps {
    users: User[] | any;
}

const TopCustomer:React.FC<TopCustomerProps> = ({
    users = []
}) =>{
    const [guestData,setGuestData] = useState<any>([])
    const router = useRouter()

     //handle navigate
     const handleNavigate = useCallback(()=>{
        router.push('/dashboards/transaction')
    },[router])
    useEffect(()=>{
        const array:any[] = [...users]
        array && array.forEach((item:any)=>{
      
            if(item.transaction.length >0) {
               const result = item.transaction.reduce((calculator:number,currentValue: any)=>calculator + currentValue.totalPrice,0);
                item.total = result;
            }else {
                item.total = 0;
            }
        });
    
        array.sort((a:any,b:any)=>{
            if(a.total >b.total) return -1;
            if(a.total < b.total) return 1;
            return 0
        })

        setGuestData(array)
    },[users])

    return (
        <div className="text-[14px] text-neutral-100 ">
             <div className="text-white text-[16px] font-bold flex items-center justify-between">
                       <div> Customer Service</div>
                        <div onClick={handleNavigate} className="text-neutral-400 hover:text-neutral-100 font-thin text-[13px] flex items-center justify-start gap-0.5">View<MdOutlineCallMade className="w-4 h-4 "/></div>
                    </div>
                    <div className="text-neutral-400 font-normal text-[14px] mb-2">
                       
Customer service is the assistance and support provided by a company to its customers, both before and after they purchase or use a product or service.
                    </div>
            <div className="font-bold text-[15px] my-2 mb-4">Top 6 Best Customer</div>
            <div className="flex flex-col gap-2">
                {guestData && guestData.slice(0,6).map((item:any,index:any) =>{
                    return (
                       <ItemTopCustomer
                        key= {item.id}
                        name= {item.name}
                        image = {item.image}
                        total = {item.total}
                        location = {item.address}
                        index ={index}
                       />
                    )
                })}
            </div>
        </div>
    )
}
export default TopCustomer