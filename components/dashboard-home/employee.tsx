"use client"

import { User } from "@prisma/client"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useCallback } from "react"
import { MdOutlineCallMade } from "react-icons/md"

interface EmployeeProps {
    member : User[] | any
}

const Employee:React.FC<EmployeeProps> =({
    member =[]
}) =>{
    const router = useRouter()

    // handle navigate
    const handleNavigate = useCallback(()=>{
        router.push('/analytics/team')
    },[router])
    return (
        <div>
            <div className="text-white text-[16px] font-bold flex items-center justify-between">
                <div> Employee</div>
                <div onClick={handleNavigate} className="text-neutral-400 hover:text-neutral-100 font-thin text-[13px] flex items-center justify-start gap-0.5">View<MdOutlineCallMade className="w-4 h-4 "/></div>
            </div>
            <div className="text-neutral-400 font-normal text-[14px] mb-2">
                All Positiion and role of administrator.
            </div>
            <div className="flex items-center justify-between gap-4">
                <div>
                    <div className="flex items-center justify-start gap-1">
                        <div>Total:</div>
                        <div className="text-neutral-400 text-[13px]">{member && member.length} Member</div>
                    </div>
                    <div className="flex items-center justify-start gap-1">
                        <div>Active:</div>
                        <div className="text-neutral-400 text-[13px]">2 Member</div>
                    </div>
                    <div className="flex items-center justify-start gap-1">
                        <div>Inactive:</div>
                        <div className="text-neutral-400 text-[13px]">{member && member.length -2} Member</div>
                    </div>
                </div>
                <div className="flex items-center justify-end">
                    <Image 
                        src="/admin.png"
                        width={150}
                        height={150}
                        alt="employee"
                    />
                </div>
            </div>
        </div>
    )
}
export default Employee