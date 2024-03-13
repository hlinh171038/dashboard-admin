"use client"

import Header from "@/components/dashboard/discount/header"
import Table from "@/components/dashboard/discount/table"
import { Discount } from "@prisma/client"

interface DiscountProps {
    discount: Discount[] | any
}

const Discount:React.FC<DiscountProps> =({
    discount =[]
}) =>{
    console.log(discount)
    return (
        <div className="px-2">
            <div className="bg-slate-600 rounded-md px-2 py-4">
              <Header />
              <Table 
                discount ={discount}
              />
            </div>
        </div>
    )
}

export default Discount