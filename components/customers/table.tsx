"use client"

import { User } from "@prisma/client"
import ItemCustomer from "./item"
import { IoBasketOutline, IoReturnDownBackOutline } from "react-icons/io5"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import axios from "axios"
import { toast } from "sonner"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { MdAutoDelete } from "react-icons/md";
import { getAllComment } from "@/app/actions/getAllComment"
import { Skeleton } from "../ui/skeleton"

const array = [0,1,2,3,4,5,6,7,8,9]
interface TableCustomerProps {
    //users?: User[] | null;
    //handleLoading : (value:boolean) =>void;
    search?:string;
    role?: string;
    action?: string;
    startDate?: string;
    endDate?: string;
    start?: number;
    end?: number;
    status: boolean;
    currentUser: any;
    user2: User[] | any;
}

const TableCustomer:React.FC<TableCustomerProps> = ({
    //users =[],
    //handleLoading,
    search,
    role,
    action,
    startDate,
    endDate,
    start,
    end,
    status,
    currentUser,
    user2
}) =>{
    const router = useRouter()
    const [checkId,setCheckId] = useState<any>([])
    const [isLoading,setIsLoading] = useState(false)
    const [data,setData] = useState<any>([])
    const [currentUserInfo,setCurrentUserInfo] = useState<any>([])

    const updateData = data.slice(start,end)
    
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
        axios.post('/api/delete-user',{checkId:array})
            .then((res)=>{
                console.log(res.data)
                setData(res?.data && res?.data )
                // toast.success('removed ');
                router.refresh()
               
            })
            .catch((err:any)=>{
                toast.error("Something went wrong !!!")
            }).finally(()=>{
                setCheckId([]);
                
                setIsLoading(false)
                router.push('/dashboards/customers?search=&page=1&per_page=10')
            })
            axios.post('/api/create-new-history',{
                userId: currentUserInfo && currentUserInfo.id,
                title:`removed ${array && array.length} user`,
                type: 'removed-user'
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
    },[router,currentUserInfo,currentUser])

    //handle back product
    const handleBackProduct = useCallback(()=>{
        router.push(`/dashboards/customers?search=&role=&action=&start=&end=&page=1&per_page=10`);
    },[router])

    // search + skelton
    useEffect( ()=>{
        setIsLoading(true)
       // console.log(array)
        axios.post('/api/filter-user',{search,role,action,startDate,endDate})
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
     },[search,role,action,startDate,endDate,router])
    console.log(data)

    useEffect(()=>{

        if(currentUser) {
            const result = user2 && user2.find((item:any)=>item.email === currentUser?.user.email);
            setCurrentUserInfo(result)
        }
        
      },[currentUser,user2])

    const array = [0,1,2,3,4,5,6,7,8,9,10]
  
    return (
        <div>
            {checkId.length >0 && (
                <button
                    disabled ={isLoading}
                    onClick={()=>handleDelete(checkId)}
                    className="absolute top-2 left-[30%] text-neutral-100 px-2 py-1 bg-red-600 rounded-md text-[14px] flex items-center justify-start gap-0.5">
                    Delete
                    {isLoading ?  <AiOutlineLoading3Quarters className="animate-spin h-5 w-5 "/>:<div className="flex items-center justify-end"><MdAutoDelete className="w-4 h-4"/></div>}
                </button>
                
            )}
            <table className="w-full text-[14px] text-neutral-400 mt-2">
            <tr className="font-bold text-[15px] text-neutral-100">
                <td></td>
                <td>Name</td>
                <td>Email</td>
                <td>Date</td>
                <td>Time</td>
                <td>
                    Role
                </td>
                <td>
                    <div className="flex items-center justify-center">
                        <div>
                         Status
                        </div>
                    </div>
                </td>
                <td></td>
            </tr>
            {isLoading || !status ? (
                
            array.map((item:any)=>{
                    return (
                        <tr key={item} className="my-2">
                             <td className="w-6 h-6">
                                    <Skeleton className="h-4 w-4" />
                                </td>
                                <td className="max-w-20 flex items-center justify-start gap-1 py-2" >
                                    <div className="flex items-center justify-start gap-1">
                                        <Skeleton className="h-6 w-6 rounded-full" />
                                        <Skeleton className="h-4 w-[70px]" />
                                        
                                    </div>
                                </td>
                                <td><Skeleton className="h-4 w-[100px]" /></td>
                                <td><Skeleton className="h-4 w-[70px]" /></td>
                                <td><Skeleton className="h-4 w-[70px]" /></td>
                                <td><Skeleton className="h-4 w-[50px]" /></td>
                                <td><Skeleton className="h-4 w-[50px]" /></td>
                                <td>
                                    <div className="flex justify-end items-start">
                                        <Skeleton className="h-6 w-[50px]" />
                                    </div>
                                </td>
                        </tr>
                    )
                })
            ):(updateData && updateData.map((item:any)=>{
                return (<ItemCustomer 
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        img={item.image}
                        email={item.email}
                        created_at={item.createdAt}
                        role={item.role}
                        action={item.action}
                        check={checkId && checkId.includes(item.id)}
                        handleOtherCheck = {(id:string)=>handleOtherCheck(id)}
                    />
                )
            }))}
          
       </table>
            
            { !isLoading && data && data.length === 0 &&(
            <div className="w-full flex flex-col items-center justify-center gap-1 text-neutral-100 text-[14px] h-[60vh]">
               
                   
                    <div className="flex flex-col gap-1 items-center justify-center">
                        <div className="flex items-center justify-start gap-2">
                        <IoBasketOutline  className="w-6 h-6 text-neutral-100 font-thin"/>
                        <div className=" text-[14px] uppercase">No result found !!!</div>
                        </div>
                        <div className="flex items-center justify-start gap-2">
                            <span className="text-thin text-[14px] text-neutral-400 flex items-center justify-center gap-1">Click here  <span><IoReturnDownBackOutline onClick={handleBackProduct} className="text-neutral-200 w-4 h-4 cursor-pointer hover:text-white transition-all duration-300"/></span> to back to all customer</span> 
                        </div>
                    </div>
            </div>
            
        )}
        </div>
       
    )
}

export default TableCustomer