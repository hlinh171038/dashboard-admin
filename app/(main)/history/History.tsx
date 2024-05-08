"use client"

import HeaderHistory from "@/components/history/header";
import ItemHistory from "@/components/history/item-history";
import {  User } from "@prisma/client"
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { IoBasketOutline, IoReturnDownBackOutline } from "react-icons/io5";
import { MdHistory } from "react-icons/md";
import { toast } from "sonner";

interface HistoryProps {
   history:| any;
    currentUser: any;
    query:string;
    user: User[] | any;
}

const History:React.FC<HistoryProps> = ({
    history = [],
    user = [],
    currentUser,
    query
}) =>{
    //const [history,setHistory] = useState<any> ([])
    const [data,setData] = useState<any>([])
    const [dataSearch,setDataSearch] = useState<any>([])
    const [rootData,setRootData] = useState<any>([])
    const [tempMailSearch,setTempMailSearch] = useState<any>([])
    const [checkId,setCheckId] = useState<any>([])
    const [autoId,setAutoId] = useState<any>([])
    const [isLoading,setIsLoading] = useState(false)
    const router = useRouter()
    //console.log(currentUser.user?.email)

    //handle delete
    const handleDelete = useCallback((array:any[])=>{
        setIsLoading(true)
       // console.log(array)
        axios.post('/api/remove-history',{checkId:array})
            .then((res)=>{
                console.log(res.data)
                toast.success('removed history');
                router.refresh()
            })
            .catch((err:any)=>{
                toast.error("Something went wrong !!!")
            }).finally(()=>{
                setCheckId([]);
                setIsLoading(false)
            })
    },[router])


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

    useEffect(()=>{
        const result = user && user.find((item:any)=>item.email === currentUser?.user.email);
        const result2 = history && history.filter((item:any)=>item.userId === result.id);
        console.log(result)
        console.log(result2)
        setData(result2)
        setRootData(result2)
    },[currentUser,user,history])
    console.log(data)
    console.log(history)
    console.log(currentUser?.user.email)

    useEffect(()=>{
        if(data && data.length >50) {
            const remain = data.length -40;
            const temp:any[] =[];
            for(let i=0; i<remain;i++){
                temp.push(data[data.length -1-i].id)
            }
        
          handleDelete(temp)
        
        }
    },[data,handleDelete])
    
    console.log(query)
    // search by quey fron url
    useEffect(()=>{
        if(query !== '') {
          const result =  data && data.filter((item:any)=>item.title.includes(query) || item.type.includes(query))
          console.log(result)
          setData(result)
        }
    },[query])

    //handle back product
    const handleBackProduct = useCallback(()=>{
        router.push(`/analytics/report/history?query=`);
    },[router])

   // search + skelton
//    useEffect( ()=>{
//     setIsLoading(true)
//    // console.log(array)
//     axios.post('/api/filter-history',{query})
//         .then((res)=>{
//             console.log(res.data)
//             setData(res.data && res.data)
//             //toast.success('search ');
//             router.refresh()
           
//         })
//         .catch((err:any)=>{
//             toast.error("Something went wrong !!!")
//         }).finally(()=>{
//             setCheckId([]);
//             setIsLoading(false)
           
//         })
//  },[query,router])

//  console.log(history)
 
    return (
        <div className="px-2">
            <div className=" relative bg-slate-600 rounded-md p-2  text-[14px] text-neutral-400 flex flex-col gap-2">
            <div className="text-[15px] text-neutral-100 flex items-center justify-between">
                <div className="flex items-center justify-start gap-1">
                    <MdHistory className="w-4 h-4"/>
                    <span>History</span>
                </div>
                <div className="flex items-center justify-start gap-1">
                <div className=" text-[11px] text-neutral-400 flex items-center justify-start gap-1">
                    <div className="border border-neutral-400 px-1 py-[0.01rem] rounded-md">Ctrl</div>
            
                    <div className="border border-neutral-400 px-1 py-[0.01rem] rounded-md">Z</div>
                </div>
            </div>
            </div>
            
            <HeaderHistory
                currentUser ={ currentUser}
                customer={data}
                user2 ={rootData}
                user = {user}
            />
            {checkId.length >0 && (
                <button 
                    onClick={()=>handleDelete(checkId)}
                    className="absolute top-2 right-2">
                    Delete
                </button>
            )}
            <div>
                {data && data.map((item:any)=>{
                    return(
                        <ItemHistory
                            key={item.id}
                            date ={item.created_at}
                            id={item.id}
                            title = {item.title}
                            type = {item.type}
                            check={checkId && checkId.includes(item.id)}
                            handleOtherCheck = {(id:string)=>handleOtherCheck(id)}

                        />
                    )
                })}
                
            </div>
            {data && data.length === 0 &&(
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
        </div>
    )
}

export default History