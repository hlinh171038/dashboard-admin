"use client"

import Header from "@/components/dashboard/discount/header"
import Pagination from "@/components/dashboard/discount/pagination";
import Table from "@/components/dashboard/discount/table"
import { Discount } from "@prisma/client"
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface DiscountProps {
    discount: Discount[] | any;
    search: string;
    page: number,
    per_page:number
}

const Discount:React.FC<DiscountProps> =({
    discount =[],
    search,
    page,
    per_page
}) =>{
    console.log(discount)
    const router = useRouter()

    let start = (page *per_page) -per_page;
    let end = page * per_page;
    const max = Math.ceil(discount.length /per_page)

    const updateDiscount  = discount.slice(start,end)

    useEffect(()=>{
      router.push(`/dashboards/discount?search=${search}&page=1&per_page=10`)
    },[router,search])
    return (
        <div className="px-2 w-full">
            <div className="bg-slate-600 rounded-md px-2 py-4 w-full">
              <Header 
                discount = {discount}
                search = {search}
              />
              <Table 
                discount ={updateDiscount}
              />
              <Pagination 
                page={page}
                per_page={per_page}
                search={search}
                max={max}
              />
            </div>
        </div>
    )
}

export default Discount