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
            <div className="text-white text-[16px] font-semibold flex items-center justify-between">
                <div> Employee</div>
                <div onClick={handleNavigate} className="text-neutral-400 hover:text-neutral-100 font-thin text-[13px] flex items-center justify-start gap-0.5">View<MdOutlineCallMade className="w-4 h-4 "/></div>
            </div>
            <div className="text-neutral-400 font-normal text-[14px] ">
                All Positiion and role of administrator.
            </div>
            <div className="flex items-center justify-between gap-4">
                <table id="trend-sale-table">
                    <tr>
                        <td>
                            Total 
                        </td>
                        <td>
                            {member && member.length} Member
                        </td>
                    </tr>
                    <tr>
                     
                        <td>Active</td>
                        <td>2 Member</td>
                    </tr>
                    <tr>
                      
                        <td>Inactive</td>
                        <td>{member && member.length -2} Member</td>
                    </tr>
                </table>
              
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