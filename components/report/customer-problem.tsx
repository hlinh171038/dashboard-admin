"use client"

import { Mail, User } from "@prisma/client"
import ItemCustomerReport from "./item-customer-report";
import ReportHeader from "./header";
import { IoBasketOutline, IoReturnDownBackOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

interface CustomerProblemProps {
    mail: Mail[] | any;
    updateMail: Mail[] | any;
    mail2: Mail[] | any;
    thisWeek: any;
    lastWeek:any;
    currentUser:any;
    user : User[] | any;
    search: string;
    page: number;
    per_page: number
}

const CustomerProblem:React.FC<CustomerProblemProps> = ({
    mail = [],
    mail2 = [],
    updateMail = [],
    thisWeek,
    lastWeek,
    currentUser,
    user = [],
    search,
    page,
    per_page
}) =>{
    //console.log(currentUser)
    const router = useRouter()
    //handle back product
    const handleBack = useCallback(()=>{
        router.push(`/analytics/report?search=&status=}&role=}&start=&end=&page=1&per_page=10`);
    },[router])
    return (
        <div className="text-[14px] text-neutral-400 ">
            <ReportHeader
                search ={search}
                page = {page}
                per_page ={per_page}
                mail = {mail}
                mail2 ={mail2}
                currentUser ={currentUser}
                user = {user}
            />
            <table className="w-full">
                <tr className="text-[15px] text-neutral-100">
                    <td>Email</td>
                    <td>Role</td>
                    <td>Date</td>
                    <td>Support By</td>
                    <td>Status</td>
                    <td>Detail</td>
                </tr>
                {updateMail && updateMail.map((item:any)=>{
                    return <ItemCustomerReport
                                key={item.id}
                                email = {item.mailSend}
                                role = {item.role}
                                date = {item.created_at}
                                supportBy = {item.supportBy}
                                id={item.id}
                                currentUser ={currentUser}
                                user = {user}
                                status = {item.status}
                            />
                })}
            </table>
            {mail && mail.length === 0 &&(
            <div className="w-full flex flex-col items-center justify-center gap-1 text-neutral-100 text-[14px] h-[60vh]">
               
                   
                    <div className="flex flex-col gap-1 items-center justify-center">
                        <div className="flex items-center justify-start gap-2">
                        <IoBasketOutline  className="w-6 h-6 text-neutral-100 font-thin"/>
                        <div className=" text-[14px] uppercase">No result found !!!</div>
                        </div>
                        <div className="flex items-center justify-start gap-2">
                            <span className="text-thin text-[14px] text-neutral-400 flex items-center justify-center gap-1">Click here  <span><IoReturnDownBackOutline onClick={handleBack} className="text-neutral-200 w-4 h-4 cursor-pointer hover:text-white transition-all duration-300"/></span> to back to all customer</span> 
                        </div>
                    </div>
            </div>
            
        )}
        </div>
    )
}

export default CustomerProblem