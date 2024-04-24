"use client"

import { Mail, User } from "@prisma/client"
import ItemCustomerReport from "./item-customer-report";
import ReportHeader from "./header";
import { IoBasketOutline, IoReturnDownBackOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdAutoDelete } from "react-icons/md";
import { Skeleton } from "../ui/skeleton";

const array = [0,1,2,3,4,5,6,7,8,9]

interface CustomerProblemProps {
    mail: Mail[] | any;
   // updateMail: Mail[] | any;
    mail2: Mail[] | any;
    thisWeek: any;
    lastWeek:any;
    currentUser:any;
    user : User[] | any;
    search: string;
    role: string;
    status: string;
    start: string;
    end: string
    page: number;
    per_page: number;
    loading:boolean;
}

const CustomerProblem:React.FC<CustomerProblemProps> = ({
    mail = [],
    mail2 = [],
   // updateMail = [],
    thisWeek,
    lastWeek,
    currentUser,
    user = [],
    search,
    role,
    status,
    start,
    end,
    page,
    per_page,
    loading
}) =>{
    const [checkId,setCheckId] = useState<any>([])
    const [isLoading,setIsLoading] = useState(false)
    const [data,setData] = useState<any> ([])
    const [currentUserInfo,setCurrentUserInfo] = useState<any>([])
    const router = useRouter()

     //handle orther check
     const handleOtherCheck = useCallback((id:string)=>{
        const tempArr = [...checkId];
        const index = tempArr.includes(id);
        console.log(index);
       if(!index) {
        tempArr.push(id)
       } else {
        const position = tempArr.indexOf(id)
        tempArr.splice(position,1)
       }
        console.log(tempArr);
        setCheckId(tempArr)
    },[checkId])

    //handle delete
    const handleDelete = useCallback((array:any[])=>{
        
        if(!currentUser) {
            toast.warning('have not login !!!');
            return;
        }
        setIsLoading(true)
       // console.log(array)
        axios.post('/api/delete-report',{checkId:array})
            .then((res)=>{
                console.log(res.data)
                setData(res.data && res.data)
                //toast.success('removed ');
                router.refresh()
            })
            .catch((err:any)=>{
                toast.error("Something went wrong !!!")
            }).finally(()=>{
                setCheckId([]);
                setIsLoading(false)
                router.push('/analytics/report?search=&page=1&per_page=10')
            })
            axios.post('/api/create-new-history',{
                userId: currentUserInfo && currentUserInfo.id,
                title:`removed ${array && array.length} report`,
                type: 'removed-report'
            })
            .then((res)=>{
                
                toast.success('removed ');
                router.refresh();
            })
            .catch((err:any)=>{
                toast.error("Something went wrong !!!")
            }).
            finally(()=>{
                setIsLoading(false)
            })
    },[router,currentUser,currentUserInfo])

    //handle back product
    const handleBack = useCallback(()=>{
        router.push(`/analytics/report?search=&status=}&role=}&start=&end=&page=1&per_page=10`);
    },[router])

    // search + skelton
    useEffect( ()=>{
        setIsLoading(true)
       // console.log(array)
        axios.post('/api/filter-report',{search,role,status,start,end})
            .then((res)=>{
                console.log(res.data)
                setData(res.data && res.data)
                //toast.success('search ');
                router.refresh()
               
            })
            .catch((err:any)=>{
                toast.error("Something went wrong !!!")
            }).finally(()=>{
                setCheckId([]);
                setIsLoading(false)
               
            })
     },[search,role,status,start,end,router])
    console.log(data)

    useEffect(()=>{

        if(currentUser) {
            const result = user && user.find((item:any)=>item.email === currentUser?.user.email);
            setCurrentUserInfo(result)
        }
        
      },[currentUser,user])

    return (
        <div className=" relative text-[14px] text-neutral-400 ">
            <ReportHeader
                search ={search}
                page = {page}
                per_page ={per_page}
                mail = {mail}
                mail2 ={mail2}
                currentUser ={currentUser}
                user = {user}
            />
            {checkId.length >0 && (
                <button
                    disabled ={isLoading}
                    onClick={()=>handleDelete(checkId)}
                    className="absolute top-0 left-[30%] text-neutral-100 px-2 py-1 bg-red-600 rounded-md text-[14px] flex items-center justify-start gap-0.5">
                    Delete
                    {isLoading ?  <AiOutlineLoading3Quarters className="animate-spin h-5 w-5 "/>:<div className="flex items-center justify-end"><MdAutoDelete className="w-4 h-4"/></div>}
                </button>
                
            )}
            <table className="w-full">
                <tr className="text-[15px] text-neutral-100">
                    <td></td>
                    <td>Email</td>
                    <td>Role</td>
                    <td>Date</td>
                    <td>Support By</td>
                    <td>Status</td>
                    <td>Detail</td>
                </tr>
                {!loading || isLoading ? (
                
                array.map((item:any)=>{
                        return (
                            <tr key={item} className="my-2">
                                <td className="w-6 h-6">
                                    <Skeleton className="h-4 w-4" />
                                </td>
                                <td className="w-44" >
                                    <div className="flex items-center justify-start gap-1">
                                        <Skeleton className="h-6 w-6 rounded-full" />
                                        <Skeleton className="h-4 w-[120px]" />
                                        
                                    </div>
                                </td>
                                <td><Skeleton className="h-4 w-[100px]" /></td>
                                <td><Skeleton className="h-4 w-[70px]" /></td>
                                <td><Skeleton className="h-4 w-[70px]" /></td>
                                <td><Skeleton className="h-4 w-[50px]" /></td>
                                <td><Skeleton className="h-4 w-[50px]" /></td>
                                <td><Skeleton className="h-4 w-[50px]" /></td>
                            </tr>
                        )
                    })
                ):(data && data.map((item:any)=>{
                    return (<ItemCustomerReport
                        key={item.id}
                        email = {item.mailSend}
                        role = {item.role}
                        date = {item.created_at}
                        supportBy = {item.supportBy}
                        id={item.id}
                        currentUser ={currentUser}
                        user = {user}
                        status = {item.status}
                        check={checkId && checkId.includes(item.id)}
                        handleOtherCheck = {(id:string)=>handleOtherCheck(id)}
                    />
                    )
                }))}
               
            </table>
            {!isLoading && mail && mail.length === 0 &&(
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