"use client"

import { User } from "@prisma/client"
import { useEffect, useState } from "react";
import Employee from "./employee";

interface TeamLeadProps {
    users: User[] | any;
}

const TeamLead:React.FC<TeamLeadProps> = ({
    users =[]
}) =>{
    const [member,setMember] = useState<any>([])
  

    useEffect(()=>{
       const result = users && users.filter((item:any)=>item.role === 'yes' && item.position !==  null);
    
       setMember(result)
    },[users])
    return (
        <div>
           <Employee
                member = {member}
           />
        </div>
    )
}

export default TeamLead