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
import { toast } from "sonner";

interface ItemCustomerReportProps {
    email: string;
    role: string;
    date: string;
    id:string;
    currentUser: any;
    user : User[] | any;
    supportBy: string;
    status: string
}

const ItemCustomerReport:React.FC<ItemCustomerReportProps> = ({
    email,
    role,
    date,
    id,
    currentUser,
    supportBy,
    user =[],
    status:dataStatus
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
        console.log(status);
        console.log(support)
        axios.post('/api/update-mail-2',{id,support,status})
        .then((res:any)=>{
            console.log(res.data);
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
        console.log(value)
        setStatus(value);
        setSupport(current.email)
        console.log(status);
        console.log(support);
        setApi(true)
         //handleCallApi(id,status,support)

    },[current,status,support])

   console.log(status);
   console.log(support);

    useEffect(()=>{
        const result = user && user.find((item:any)=>item.email === currentUser.user.email && item.role === 'yes');
        console.log(result);
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