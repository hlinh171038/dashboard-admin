"use client"

import { ContactUs } from "@/components/team/contact";
import Header from "@/components/team/header"
import Leader from "@/components/team/leader";
import Member from "@/components/team/member";
import { User } from "@prisma/client";
import { useEffect, useState } from "react";
import { GoPlus } from "react-icons/go";

interface TeamProps {
    user: User[] | any;
    userSearch: User[];
    search: string;
    page: number;
    per_page: number;
}

const Team:React.FC<TeamProps> = ({
    user = [],
    userSearch =[],
    search,
    page,
    per_page
}) =>{
    const [member,setMember] = useState<any>([])
    

 
    //pagination
    const start =(per_page * page) -per_page;  //0,5,10,15,...
    const end = per_page * page;               //5,10,15

    const userSearchUpdate = userSearch.slice(start,end)
    const max= Math.floor(userSearchUpdate.length);
    
 
    useEffect(()=>{
        const result: any[] = []
        user.forEach((item:any)=>{
            if(item.role === 'yes'){
                result.push(item)
            }
        });
        console.log(result)
        setMember(result)
    },[user])
   
  
    return (
        <div className="px-2">
            <div className="bg-slate-600 px-2 py-2 rounded-md flex flex-col gap-2">
                <Header />
                <div>
                    <hr />
                </div>
                <Leader />
                <div>
                    <hr />
                </div>
                <Member 
                    member = {member}
                    user = {user}
                    userSearch = {userSearchUpdate}
                    search={search}
                    page={page}
                    per_page={per_page}
                    max ={max}
                />
               
            </div>
            
        </div>
    )
}

export default Team