"use client"
import { Discount, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { toast } from "sonner";

interface CreateNewProps {
    currentUser: any;
    customer: User[] | any;
    discount: Discount[] | any;
}

const CreateNew:React.FC<CreateNewProps> = ({
    currentUser,
    customer =[],
    discount = []
}) =>{

    const router = useRouter()
    const [current,setCurrent] = useState<any>([])

    const handleNavigate = useCallback(()=>{
        if(current.role === 'no'){
            toast.warning("Use admin role to create new users")
        }
        router.push('/dashboards/discount/add')
    },[router,current])
    useEffect(()=>{
        const result = customer && customer.find((item:any)=>item.email === currentUser.user.email);
        setCurrent(result)
     },[currentUser,customer])
    return (
        <div className="bg-slate-600 rounded-md p-2 relative">
            <div className="font-bold text-[15px] text-neutral-100">Action</div>
            <div className="text-neutral-400 text-[14px]">1. You only create new discount by administrator role.</div>
            <div className="text-neutral-400 text-[14px]">2. This is discount which is created by the shop owner.</div>
            <div className="text-neutral-400 text-[14px]">3. You should regularly manager quantity.</div>
            <div className="text-neutral-400 text-[14px]">4. The Discount code can be stolen or generate by third parties.</div>
            <div className="text-neutral-400 text-[14px]">5. Report immediately if have any problem.</div>
            <div
                onClick={handleNavigate}
                className="flex items-center justify-between px-2 py-1 mt-3 text-neutral-100 text-[14px] rounded-md border border-[#4FA29E] cursor-pointer hover:text-white">
                <div>+</div>
                <div>Create New Discount</div>
                <div><MdKeyboardArrowRight className="w-4 h-4"/></div>
            </div>
        </div>
    )
}

export default CreateNew