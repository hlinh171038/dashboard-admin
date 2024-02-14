import { Iparams, getAlluser } from "@/app/actions/getAllUser"
import { getFilterUser } from "@/app/actions/getFilterUser"
import HeaderCustomer from "@/components/customers/header"
import TableCustomer from "@/components/customers/table"
import { useSearchParams } from "next/navigation"

interface CustomerProps {
    searchParams : Iparams
  }

const Customer = async({searchParams}:CustomerProps) =>{
  
    const users = await getAlluser(searchParams)
  
    console.log(users)
    return (
        <div className="w-full h-screen px-2">
            <div className=" bg-slate-600  rounded-md ">
                <div>
                    <HeaderCustomer/>
                    <div className="px-2">
                        <TableCustomer
                            users={users}
                        />
                    </div>
                </div>
                {/* check condition if page =1 / page = last page */}
                <div
                className="flex items-center justify-between px-2 py-2 text-[15px] "
                >
                    <button className="bg-neutral-200 text-slate-950 rounded-md px-2 py-0.5">
                        Privious
                    </button>
                    <button className="bg-neutral-200 text-slate-950 rounded-md px-2 py-0.5">
                        Next
                    </button>
                </div>
            </div>
           
        </div>
    )
}

export default Customer