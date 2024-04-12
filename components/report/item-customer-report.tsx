'use client'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { cn } from "@/lib/utils";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { FaRegSquare } from "react-icons/fa";
import { FaRegSquareCheck } from "react-icons/fa6";
import { toast } from "sonner";

interface ItemCustomerReportProps {
    email: string;
    role: string;
    date: string;
    id:string;
    currentUser: any;
    user : User[] | any;
    supportBy: string;
    status: string;
    check: boolean;
    handleOtherCheck: (id:string) =>void;
}

const ItemCustomerReport:React.FC<ItemCustomerReportProps> = ({
    email,
    role,
    date,
    id,
    currentUser,
    supportBy,
    user =[],
    status:dataStatus,
    check,
    handleOtherCheck
}) =>{
    const [status,setStatus] = useState('status');
    const [api,setApi] = useState(false);
    const [current,setCurrent] = useState<any>(null);
    const [support,setSupport] = useState('');
    const router = useRouter()

    const handleDetail = useCallback(()=>{
        router.push(`/analytics/report/${id}`)
    },[router,id])

    const handleCallApi = useCallback(()=>{
       
        axios.post('/api/update-mail-2',{id,support,status})
        .then((res:any)=>{
            toast.success("updated !")
            router.refresh()
        })
        .catch((err:any)=>{
            toast.error("Something went wrong !")
        })
        .finally(()=>{

        })
    },[router,status,support,id])

    const handleSelected = useCallback((value:any)=>{
        if(!current) {
            toast.warning('You are not loggin or not admin');
            return ;
        } 
       
        setStatus(value);
        setSupport(current.email)
      
        setApi(true)
         //handleCallApi(id,status,support)

    },[current])



    useEffect(()=>{
        const result = user && user.find((item:any)=>item.email === currentUser.user.email && item.role === 'yes');
        //console.log(result);
        setCurrent(result)
     },[currentUser,user])
     useEffect(()=>{
        if(api === true) {
            handleCallApi()
        }
     },[api,handleCallApi])

     useEffect(()=>{
        setStatus(!dataStatus ?'choose status': dataStatus)
     },[dataStatus])
    return (
        <tr className={cn('',
            status === 'help' ? 'text-red-600':'text-neutral-400'
        )}>
            <td className="w-6">
                <div className="flex items-center justify-start mt-[-5px]">
                    {!check ?(
                        <FaRegSquare
                            className="w-4 h-4 text-neutral-100 font-thin"
                            onClick={()=>handleOtherCheck(id)}
                            />
                    ):(
                        <FaRegSquareCheck 
                            className="w-4 h-4 text-neutral-100"
                            onClick={()=>handleOtherCheck(id)}
                            />
                    )}
                    
                </div>
            </td>
            <td>{email}</td>
            <td>{role}</td>
            <td>{new Date(date).toDateString()}</td>
            <td>{!supportBy ?(
                <span className="text-yellow-600 ">
                    {`<wating for support>`}
                </span>
            ):(
                <span>
                    {supportBy}
                </span>
            )}
            </td>
            <td>
            <Select
                onValueChange={(e) =>handleSelected(e)}
            >
                <SelectTrigger className=" ">
                    {status}
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="done">Done</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="help">Need Help</SelectItem>
                
                </SelectContent>
            </Select>
            </td>
            <td className="underline cursor-pointer" onClick={handleDetail}>
                Detail
            </td>
        </tr>
    )
}

export default ItemCustomerReport