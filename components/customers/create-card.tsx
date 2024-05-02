"use client"
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { toast } from "sonner";

interface CopyLinkProps {
    currentUser: any;
    customer: User[] | any;
}

const CreateCard:React.FC<CopyLinkProps> = ({
    currentUser,
    customer =[]
}) =>{

    const router = useRouter()
    const [current,setCurrent] = useState<any>([])

    const handleNavigate = useCallback(()=>{
        if(current.role === 'no' ){
            toast.warning("Use admin role to create new users");
            return;
        }
        if(current.permission === 'read') {
            toast.warning("Only create new user with exercute permission !!!");
            return;
        }
        router.push('/dashboards/customers/add')
    },[router,current])
    useEffect(()=>{
        const result = customer && customer.find((item:any)=>item.email === currentUser.user.email);
    
        setCurrent(result)
     },[currentUser,customer])
    return (
        <div className="bg-slate-600 rounded-md p-2 relative">
            <div className="font-bold text-[15px] text-neutral-100">Action</div>
            <div className="text-neutral-400 text-[14px]">Only create new user with exercute permission.</div>
            <div
                onClick={handleNavigate}
                className="flex items-center justify-between px-2 py-1 mt-3 text-neutral-100 text-[14px] rounded-md border border-[#4FA29E] cursor-pointer hover:text-white hover:bg-[#4FA29E] transition-all duration-300">
                <div>+</div>
                <div>Create New User</div>
                <div><MdKeyboardArrowRight className="w-4 h-4"/></div>
            </div>
        </div>
    )
}

export default CreateCard