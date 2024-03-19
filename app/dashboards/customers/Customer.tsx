"use client"

import HeaderCustomer from "@/components/customers/header"
import Pagination from "@/components/customers/paginantion"
import TableCustomer from "@/components/customers/table"
import { User } from "@prisma/client"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

interface Cusromerprops {
    users  : User[];
    page: number;
    per_page: number;
    search: string 
}
const Customer:React.FC<Cusromerprops> = ({
    users = [],
    page,
    per_page,
    search
}) =>{
    
    const router = useRouter()


    const start = (page - 1) * per_page; // 0,5,10
    const end = start + per_page;//5,10,15

  
    const lengthuser = Math.ceil(users.length / per_page);

    console.log(lengthuser)

    const updateUser = users.slice(start,end)
  
   useEffect(()=>{
    router.push(`/dashboards/customers/?search=${search}&page=1&per_page=10`)

   },[])
    return (
        <div className="w-full h-[85.5vh] px-2">
            <div className="relative bg-slate-600  rounded-md h-full ">
                <div>
                    <HeaderCustomer
                        customer ={users}
                    />
                    <div className="px-2">
                        <TableCustomer
                            users={updateUser}
                        />
                    </div>
                </div>
                {/* check condition if page =1 / page = last page */}
                <Pagination 
                    page={page}
                    per_page ={per_page}
                    search={search}
                    max = {lengthuser}
                />
            </div>
           
        </div>
    )
}

export default Customer