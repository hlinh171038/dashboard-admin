"use client"

import DiscountTrend from "@/components/dashboard-home/discount-trend";
import CreateNew from "@/components/dashboard/discount/create-new";
import Header from "@/components/dashboard/discount/header"
import Pagination from "@/components/dashboard/discount/pagination";
import Table from "@/components/dashboard/discount/table"
import TotalDiscount from "@/components/dashboard/discount/total-discount";
import {  User } from "@prisma/client"
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

interface DiscountProps {
    discount:  any;
    discount2:  any;
    search: string;
    type:string;
    percent: number;
    countFrom: number;
    countTo: number;
    dayStart: string;
    dayEnd: string;
    page: number,
    per_page:number,
    users: User[],
    currentUser:any
}

const Discount:React.FC<DiscountProps> =({
    discount =[],
    discount2 = [],
    users = [],
     currentUser,
    search,
    type,
    percent,
    countFrom,
    countTo,
    dayStart,
    dayEnd,
    page,
    per_page
}) =>{
 
    const router = useRouter()
    const [thisWeek,setThisWeek] = useState<any>([])
    const [lastWeek,setLastWeek] = useState<any>([])
    const [totalDiscountThisWeek,setTotaDiscountThisWeek] = useState<any>([])
    const [totalDiscountLastWeek,setTotalDiscountLastWeek] = useState<any>([])
    const [status,setStatus] = useState(true)

    let start = (page *per_page) -per_page;
    let end = page * per_page;
    const max = Math.ceil(discount.length /per_page)

    //const updateDiscount  = discount.slice(start,end)

    //this week
     useEffect(()=>{
          const thisWeek = [];
          const today = new Date();
        
          const monday = new Date(today.getFullYear(), today.getMonth(), today.getDate()-today.getDay())
    
          for(let i =1;i<=7;i++) {
            let date =  new Date(monday.getFullYear(), monday.getMonth(), monday.getDate()+i)
              thisWeek.push(date)
          }
     
          setThisWeek(thisWeek)
      },[])

    //last week
    useEffect(()=>{
      const lastWeek:any[] = [];
      for(let i = 0;i<thisWeek.length;i++){
          let current = new Date(thisWeek[0]);
          const result = new Date(current.getFullYear(),current.getMonth(),current.getDate() - (i+1));
          lastWeek.push(result)
      }
      setLastWeek(lastWeek)
  },[thisWeek])
    // discount this week
    useEffect(()=>{
        const array = [...discount2]
        const result:any = []
        array && array.forEach((item:any) =>{
            const day = new Date(item.startDate);
            if(day >=thisWeek[0] && day<=thisWeek[thisWeek.length -1]) {
                result.push(item)
            }
        });
        setTotaDiscountThisWeek(result)
    },[thisWeek,discount2])

    // discount create last week
    useEffect(()=>{
      const array = [...discount2]
      const result:any = []
      array && array.forEach((item:any) =>{
          const day = new Date(item.startDate);
          if(day <=lastWeek[0] && day>=lastWeek[lastWeek.length -1]) {
              result.push(item)
          }
      });
      setTotalDiscountLastWeek(result)
  },[lastWeek,discount2])
    useEffect(()=>{
      router.push(`/dashboards/discount?search=${search}&page=1&per_page=10`)
    },[router,search])

     // handle loading
   const handleLoading = useCallback((value:boolean)=>{
    setStatus(value)
 },[])

    //handle ctr + z
  useEffect(() => {
    const handleKeyDown = (event:any) => {
      if (event.ctrlKey === true && event.key === 'z') {
        router.push('/history')
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [router]);
    return (
        <div className="px-2 w-full">
            <div className="grid grid-cols-7 gap-2 mb-2">
              <div className="col-span-3 flex flex-col gap-2 ">
                <TotalDiscount
                  discount = {discount}
                  totalDiscountThisWeek = {totalDiscountThisWeek}
                  totalDiscountLastWeek = {totalDiscountLastWeek}
                />
                <CreateNew 
                  currentUser ={ currentUser}
                  customer = {users}
                  discount = {discount}
                />
              </div>
              <div className="col-span-4 bg-slate-600 rounded-md px-2">

                <DiscountTrend 
                  discount={discount}
                  discountCondition = {true}
                />
              </div>
            </div>
            <div className=" relative bg-slate-600 rounded-md px-2 py-2 w-full mb-2">
              <Header 
                discount = {discount}
                discount2 ={discount2}
                search = {search}
                currentUser ={currentUser}
                customer = {users}
              />
              <Table 
                //discount ={updateDiscount}
               search ={search}
               type={type}
               percent = {percent}
               countFrom ={countFrom}
               countTo = {countTo}
               dayStart = {dayStart}
               dayEnd = {dayEnd}
               start ={start}
               end ={end}
               status ={status}
               currentUser ={currentUser}
               users = {users}
              />
              <Pagination 
                page={page}
                per_page={per_page}
                search={search}
                max={max}
                handleLoading = {handleLoading}
              />
            </div>
        </div>
    )
}

export default Discount