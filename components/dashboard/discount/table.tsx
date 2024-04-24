"use client"

import { Discount, User } from "@prisma/client"
import Item from "./item"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { useCallback, useEffect, useState } from "react"
import { IoBasketOutline, IoReturnDownBackOutline } from "react-icons/io5"
import { useRouter } from "next/navigation"
import axios from "axios"
import { toast } from "sonner"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { MdAutoDelete } from "react-icons/md"
import { Skeleton } from "@/components/ui/skeleton"


const array = [0,1,2,3,4,5,6,7,8,9]

interface TableProps {
    //discount: Discount[] | any;
   search: string;
   type:string;
   percent: number;
   countFrom: number;
   countTo: number;
   dayStart: string;
   dayEnd: string;
   start: number;
   end:number;
   status: boolean;
   currentUser: any;
   users: User[] | any;
}

const Table:React.FC<TableProps> = ({
    //discount =[],
    search,
    type,
    percent,
    countFrom,
    countTo,
    dayStart,
    dayEnd,
    start,
    end,
    status,
    currentUser,
    users = []
}) =>{

    const [data,setData] = useState<any>([])
    const [cateType,setCateType] = useState<any>([])
    const [checkId,setCheckId] = useState<any>([])
    const [isLoading,setIsLoading] = useState(false)
    const [currentUserInfo,setCurrentUserInfo] = useState<any>([])
    const router = useRouter()
 
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
        axios.post('/api/delete-discount',{checkId:array})
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
            })
            axios.post('/api/create-new-history',{
                userId: currentUserInfo && currentUserInfo.id,
                title:`removed ${array && array.length} discount`,
                type: 'removed-discount'
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
                router.push('/dashboards/discount?search=&page=1&per_page=10')
            })
    },[router,currentUser,currentUserInfo])

    // filter type
    useEffect(()=>{
        const result : any[] = [];
        for(let i=0;i<data.length;i++){
            if(!result.includes(data[i].type)){
             
                result.push(data[i].type)
            
            }
        }
       setCateType(result)
    },[data])

    //handle back product
    const handleBackProduct = useCallback(()=>{
        router.push(`/dashboards/discount?search=&type=&percent=&dayStart=&dayEnd=&countFrom=&countTo=&page=1&per_page=10`)
    },[router])

    // search + skelton
    useEffect( ()=>{
        setIsLoading(true)
       // console.log(array)
        axios.post('/api/filter-discount',{search,type,percent,countFrom,countTo,dayStart,dayEnd})
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
     },[search,type,percent,countFrom,countTo,dayStart,dayEnd,router])
    console.log(data)

    useEffect(()=>{

        if(currentUser) {
            const result = users && users.find((item:any)=>item.email === currentUser?.user.email);
            setCurrentUserInfo(result)
        }
        
      },[currentUser,users])
    return (
       <div className=" mt-2">
         {checkId.length > 0 && (
                <button
                    disabled ={isLoading}
                    onClick={()=>handleDelete(checkId)}
                    className="absolute top-2 left-[30%] text-neutral-100 px-2 py-1 bg-red-600 rounded-md text-[14px] flex items-center justify-start gap-0.5">
                    Delete
                    {isLoading ?  <AiOutlineLoading3Quarters className="animate-spin h-5 w-5 "/>:<div className="flex items-center justify-end"><MdAutoDelete className="w-4 h-4"/></div>}
                </button>
                
            )}
            <table className="w-full text-[15px] text-neutral-400 ">
                <tr className="font-bold text-neutral-100">
                <td></td>
                <td>Title</td>
                <td>Type</td>
                <td>Percent</td>
                <td>Count</td>
                <td>
                    Created
                </td>
                <td>
                    Status
                </td>
                <td></td>
                </tr>
                {!status || isLoading ? (
                
                array.map((item:any)=>{
                        return (
                            <tr key={item} className="my-2">
                            <td className="w-6 h-6">
                                <Skeleton className="h-4 w-4" />
                            </td>
                            <td className="w-64" >
                                    <Skeleton className="h-4 w-[220px]" /> 
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
                ):(updateData && updateData.map((item:any)=>{
                    return (<Item
                            key={item.id}
                            id={item.id}
                            title = {item.title}
                            type={item.type}
                            percent ={item.percent}
                            count = {item.count}
                            created_at={item.created_at}
                            startDate = {item.startDate}
                            endDate = {item.endDate}
                            check={checkId && checkId.includes(item.id)}
                            handleOtherCheck = {(id:string)=>handleOtherCheck(id)}
                        />
                    )
                }))}
              
        </table>
        {!isLoading && data && data.length === 0 &&(
            <div className="w-full flex flex-col items-center justify-center gap-1 text-neutral-100 text-[14px] h-[60vh]">
               
                   
                    <div className="flex flex-col gap-1 items-center justify-center">
                        <div className="flex items-center justify-start gap-2">
                        <IoBasketOutline  className="w-6 h-6 text-neutral-100 font-thin"/>
                        <div className=" text-[14px] uppercase">No result found !!!</div>
                        </div>
                        <div className="flex items-center justify-start gap-2">
                            <span className="text-thin text-[14px] text-neutral-400 flex items-center justify-center gap-1">Click here  <span><IoReturnDownBackOutline onClick={handleBackProduct} className="text-neutral-200 w-4 h-4 cursor-pointer hover:text-white transition-all duration-300"/></span> to back to all discount</span> 
                        </div>
                    </div>
            </div>
            
        )}
       </div>
    )
}

export default Table
