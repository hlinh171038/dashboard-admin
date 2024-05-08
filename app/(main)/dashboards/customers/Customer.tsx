"use client"

import ChartCustomer from "@/components/customers/chart"
import CreateCard from "@/components/customers/create-card"
import HeaderCustomer from "@/components/customers/header"
import Pagination from "@/components/customers/paginantion"
import TableCustomer from "@/components/customers/table"
import TotalAdminCard from "@/components/customers/total-admin-card"
import TotalUserCard from "@/components/customers/total-user-card"
import { User } from "@prisma/client"
import { useRouter } from "next/navigation"
import { Suspense, useCallback, useEffect, useState } from "react"



interface Cusromerprops {
    users  : User[];
    user2 : User[] |any;
    page: number;
    per_page: number;
    role: string;
    action: string;
    start: string;
    end: string;
    search: string;
    currentUser: any;
}
const Customer:React.FC<Cusromerprops> = ({
    users = [],
    user2 = [],
    page,
    per_page,
    role,
    action,
    start:startDate,
    end:endDate,
    search,
    currentUser
}) =>{
    
    const router = useRouter()

    const [totalAdmin,setTotalAdmin] = useState(0)
    const [thisWeek,setThisWeek] = useState<Date[]>([])
    const [lastWeek,setLastWeek] = useState<Date[]>([])
    const [totalUserThisWeek,setTotalUserThisWeek] = useState<any[]>([])
    const [totalUserLastWeek,setTotalUserLastWeek] = useState<any[]>([])
    const [status,setStatus] = useState(true);

    const start = (page - 1) * per_page; // 0,5,10
    const end = start + per_page;//5,10,15

  
    const lengthuser = Math.ceil(users.length / per_page);



   // const updateUser = users.slice(start,end)

    // find out this week
    useEffect(()=>{
        const thisWeek = [];
        const today = new Date();
        const monday = new Date(today.getFullYear(), today.getMonth(), today.getDate()-today.getDay())
  
        for(let i =1;i<=7;i++) {
           let date =  new Date(monday.getFullYear(), monday.getMonth(), monday.getDate()+i)
          // console.log(date)
            thisWeek.push(date)
        }
        // console.log(thisWeek)
        setThisWeek(thisWeek)
    },[])
    // find out last week
    useEffect(()=>{
        const lastWeek:any[] = [];
        for(let i = 0;i<thisWeek.length;i++){
            let current = new Date(thisWeek[0]);
            const result = new Date(current.getFullYear(),current.getMonth(),current.getDate() - (i+1));
            lastWeek.push(result)
        }
        setLastWeek(lastWeek)
    },[thisWeek])
    //console.log(lastWeek)

    // customer create this week
    useEffect(()=>{
        const array = [...user2]
        const result:any = []
        array && array.forEach((item:any) =>{
            const day = new Date(item.createdAt);
            if(day >=thisWeek[0] && day<=thisWeek[thisWeek.length -1]) {
                result.push(item)
            }
        });
        setTotalUserThisWeek(result)
    },[thisWeek,user2])
    // customer create last week
    useEffect(()=>{
        const array = [...user2]
        const result:any = []
        array && array.forEach((item:any) =>{
            const day = new Date(item.createdAt);
            if(day <=lastWeek[0] && day>=lastWeek[lastWeek.length -1]) {
                result.push(item)
            }
        });
        setTotalUserLastWeek(result)
    },[lastWeek,user2])
  
   useEffect(()=>{
    router.push(`/dashboards/customers/?search=${search}&page=1&per_page=10`)

   },[router,search])
   useEffect(()=>{
    const result = users && users.filter((item:any)=>item.role === 'yes');
    setTotalAdmin(result.length)
   },[users])

   // handle loading
   const handleLoading = useCallback((value:boolean)=>{
      setStatus(value)
   },[])

   console.log(status)

   //handle ctr + z
  useEffect(() => {
    const handleKeyDown = (event:any) => {
      if (event.ctrlKey === true && event.key === 'z') {
        router.push('/history')
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [router]);
    return (
        <div className="w-full  px-2">
            <div className="grid grid-cols-3 gap-2 mb-2">
                <div className="col-span-1 flex flex-col gap-2 ">
                    <TotalUserCard 
                        users ={user2}
                        totalUserThisWeek ={totalUserThisWeek}
                        totalUserLastWeek = {totalUserLastWeek}
                    />
                    <TotalAdminCard
                        users ={user2}
                        totalUserThisWeek ={totalUserThisWeek}
                        totalUserLastWeek = {totalUserLastWeek}
                    />
                    <CreateCard
                         customer ={users}
                         currentUser = {currentUser}
                    />
                </div>
                <div className="col-span-2 bg-slate-600 rounded-md">
                    <ChartCustomer 
                        totalUserThisWeek = {totalUserThisWeek}
                        totalUserLastWeek = {totalUserLastWeek}
                    />
                </div>
            </div>
            
            <div className="relative bg-slate-600  rounded-md h-full ">
                <div>
                    <HeaderCustomer
                        customer ={users}
                        user2 = {user2}
                        currentUser = {currentUser}
                        handleLoading = {handleLoading}
                    />
                    <div className="px-2 w-full">
                       {/* <Table/> */}
                      
                        <TableCustomer
                            //users={updateUser}
                            search ={search}
                            role = {role}
                            action = {action}
                            startDate = {startDate}
                            endDate = {endDate}
                            start = {start}
                            end = {end}
                            status ={status}
                            currentUser = {currentUser}
                            user2 = {user2}
                        />
                      
                    </div>
                </div>
                {/* check condition if page =1 / page = last page */}
                <div className="flex items-center justify-end">
                    <Pagination 
                        page={page}
                        per_page ={per_page}
                        search={search}
                        max = {lengthuser}
                        handleLoading ={handleLoading}
                    />
                </div>
            </div>
           
        </div>
    )
}

export default Customer