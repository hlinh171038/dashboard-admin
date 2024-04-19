"use client"

import { Product, Transaction, User } from "@prisma/client"
import Item from "./item"
import { useCallback, useEffect, useState } from "react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { useRouter } from "next/navigation"
import axios from "axios"
import { toast } from "sonner"
import { Skeleton } from "../ui/skeleton"
import { IoBasketOutline, IoReturnDownBackOutline } from "react-icons/io5"

const array = [0,1,2,3,4,5,6,7,8,9]

interface TableProps {
    //transaction : Transaction[] | any
    search : string;
    status: string;
    payment: string;
    startDate: string;
    endDate: string;
    page:number;
    per_page:number;
    start: number;
    end: number;
    loading: boolean
}

const Table:React.FC<TableProps> = ({
    //transaction = [],
    search,
    status,
    payment,
    startDate,
    endDate,
    page,
    per_page,
    start,
    end,
    loading
}) => {

    const router = useRouter()
    const [data,setData] = useState<any>([])
    const [isLoading,setIsLoading] = useState(false)

    const updateData = data.slice(start,end);

    //handle push payment
    const handlePushPayment = useCallback((value: string)=>{
        router.push(`/dashboards/transaction?search=${search}&payment=${value === 'all' ?'':value}&status=${status}&startDate=${startDate}&endDate=${endDate}&page=1&per_page=10`)
    },[router,search,status,startDate,endDate])

    //handle push status
    const handlePushStatus = useCallback((value:string)=>{
        router.push(`/dashboards/transaction?search=${search}&payment=${payment}&status=${value === 'all' ?'':value}&startDate=${startDate}&endDate=${endDate}&page=1&per_page=10`)
    },[router,payment,search,startDate,endDate])

    //handle back product
    const handleBackProduct = useCallback(()=>{
        router.push(`/dashboards/transaction?search=&payment=&status=&startDate=&endDate=&page=1&per_page=10`);
    },[router])

    // search + skelton
    useEffect( ()=>{
        setIsLoading(true)
       // console.log(array)
        axios.post('/api/filter-transaction',{payment,status,startDate,endDate})
            .then((res)=>{
                console.log(res.data)
                setData(res.data && res.data)
                //toast.success('search ');
                router.refresh()
               
            })
            .catch((err:any)=>{
                toast.error("Something went wrong !!!")
            }).finally(()=>{
                
                setIsLoading(false)
               
            })
     },[payment,status,startDate,endDate,router])
    console.log(data)
    return (
        <div>
            <table className="text-neutral-400 w-full text-[14px] mt-4 pb-2">
            <tr className="text-[15px] text-neutral-100 font-bold">
                <td>
                    User
                </td>
                <td>
                    <Select
                        onValueChange={(e) =>handlePushPayment(e)}
                    >
                        <SelectTrigger className=" ">
                            Payment
                        </SelectTrigger>
                        <SelectContent className="text-[14px] text-slate-600">
                            <SelectItem value="all" defaultChecked={true}>All Brand</SelectItem>
                            <SelectItem value="online">Online</SelectItem>
                            <SelectItem value="offline">Offline</SelectItem>
                        </SelectContent>
                    </Select>
                </td>
                <td>
                    Date
                </td>
                <td>
                    Time
                </td>
               
                <td className="text-center">
                    <Select
                        onValueChange={(e) =>handlePushStatus(e)}
                    >
                        <SelectTrigger className=" ">
                            Status
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all" defaultChecked={true}>All Status</SelectItem>
                            <SelectItem value="cancel">Cancel</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="done">Done</SelectItem>
                        </SelectContent>
                    </Select>
                </td>
                <td className="text-end">
                    Total Price
                </td>
                <td 
                    className="text-end"
                >View Detail</td>
            </tr>
            {!loading || isLoading ? (
                
                array.map((item:any)=>{
                        return (
                            <tr key={item} className="my-2">
                               
                                <td className="w-40" >
                                    <div className="flex items-center justify-start gap-1">
                                        <Skeleton className="h-6 w-6 rounded-full" />
                                        <Skeleton className="h-4 w-[120px]" />
                                        
                                    </div>
                                </td>
                                <td><Skeleton className="h-4 w-[50px]" /></td>
                                <td><Skeleton className="h-4 w-[100px]" /></td>
                                <td><Skeleton className="h-4 w-[70px]" /></td>
                                <td><Skeleton className="h-4 w-[100px]" /></td>
                                <td>
                                    <div className="flex items-center justify-end">
                                        <Skeleton className="h-4 w-[70px]" />
                                    </div>
                                </td>
                                <td>
                                    <div className="flex items-center justify-end">
                                        <Skeleton className="h-4 w-[50px]" />
                                    </div>
                                </td>
                            </tr>
                        )
                    })
                ):(updateData && updateData.map((item:any)=>{
                    return (<Item 
                        key={item.id}
                        productId = {item.id}
                        userName = {item.user.name}
                        userImage = {item.user.image}
                        userId = {item.userId}
                        payment = {item.transportation}
                        date = {item.date}
                        quantity ={item.amount}
                        status = {item.status}
                        total = {item.totalPrice}
                    />
                    )
                }))}
            
        </table>
        { !isLoading && data && data.length === 0 &&(
            <div className="w-full flex flex-col items-center justify-center gap-1 text-neutral-100 text-[14px] h-[60vh]">
               
                   
                    <div className="flex flex-col gap-1 items-center justify-center">
                        <div className="flex items-center justify-start gap-2">
                        <IoBasketOutline className="w-6 h-6 text-neutral-100 font-thin"/>
                        <div className=" text-[14px] uppercase">No result found !!!</div>
                        </div>
                        <div className="flex items-center justify-start gap-2">
                            <span className="text-thin text-[14px] text-neutral-400 flex items-center justify-center gap-1">Click here  <span><IoReturnDownBackOutline onClick={handleBackProduct} className="text-neutral-200 w-4 h-4 cursor-pointer hover:text-white transition-all duration-300"/></span> to back to all transaction</span> 
                        </div>
                    </div>
            </div>
            
        )}
        </div>
    )
}

export default Table