"use client"

import ChartOcupancy from "@/components/report/chart-ocupancy";
import CustomerProblem from "@/components/report/customer-problem";
import HistoryMail from "@/components/report/history";
import OverView from "@/components/report/overview";
import Pagination from "@/components/report/pagination";
import PaymentMethod from "@/components/report/payment-method";
import TrendingSale from "@/components/report/trend-sale";
import { Comment, Mail, Product, TempMail, Transaction, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";


interface ReportProps {
    user: User[] | any;
    product: Product[] | any;
    transaction: Transaction[] | any;
    comment: Comment[] | any;
    mail: Mail[] | any;
    mail2: Mail[] | any;
    currentUser: any;
    search: string;
    page: number;
    per_page: number;
    status: string;
    role: string;
    start:string;
    end:string;
    tempMail: TempMail[] | any;
}

const Report:React.FC<ReportProps> = ({
    user = [],
    product =[],
    transaction = [],
    comment = [],
    mail = [],
    mail2 =[],
    tempMail =[],
    currentUser,
    search,
    page,
    per_page,
    status,
    role,
    start,
    end
}) =>{
    const [thisWeek,setThisWeek] = useState<Date[]>([])
    const [lastWeek,setLastWeek] = useState<Date[]>([])
    const [guestThisWeek,setGuestThisWeek] = useState<any[]>([])
    const [guestLastWeek,setGuestLastWeek] = useState<any[]>([])
    const [totalPriceThisWeek,setTotalPriceThisWeek] = useState(0)
    const [totalPriceLastWeek,setTotalPriceLastWeek] = useState(0)
    const [newUser,setNewuser] = useState<any>([])
    const [newUserLastWeek,setNewuserLastWeek] = useState<any>([])
    const router = useRouter()

    const [loading,setLoading] = useState(true)

  //pagination
    //begin
    const begin = (page -1)*per_page;  // 0,10,20
    //finish
    const finish = page * per_page // 10,20,30
    //pagin array
    
    //max
    const max = Math.ceil(mail.length / per_page);
    //update mail
    const updateMail = mail && mail.slice(begin,finish)

    // find out this week
    useEffect(()=>{
        const thisWeek = [];
        const today = new Date();
        // console.log(today.getDay()) // thu ba
        // console.log(today.getDay() -1)
        const monday = new Date(today.getFullYear(), today.getMonth(), today.getDate()-today.getDay())
        //console.log(monday);
        for(let i =1;i<=7;i++) {
           let date =  new Date(monday.getFullYear(), monday.getMonth(), monday.getDate()+i)
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
    // guest in week
    useEffect(()=>{
        const array = [...thisWeek];
        const guest = []
       
        for(let i=0;i<transaction.length;i++) {
            const day1 = new Date(transaction[i].date)
            for(let j= 0;j<array.length;j++) {
                const day2 = new Date(array[j])
                if(day1.getDate() === day2.getDate()){
                   //console.log('try');
                   guest.push(transaction[i])
                }
            }
        }
        setGuestThisWeek(guest)
    },[thisWeek,transaction])

    // guest last week
    useEffect(()=>{
        const array = [...lastWeek];
        const guest = []
        //console.log(transaction)
       // console.log(array)
        for(let i=0;i<transaction.length;i++) {
            const day1 = new Date(transaction[i].date)
            for(let j= 0;j<array.length;j++) {
                const day2 = new Date(array[j])
                if(day1.getDate() === day2.getDate()){
                   //console.log('try');
                   guest.push(transaction[i])
                }
            }
        }
        setGuestLastWeek(guest)
    },[lastWeek,transaction])
    // new user in week 
    useEffect(()=>{
        const array = [...thisWeek];
        const newUser = []
       
        for(let i=0;i<user.length;i++) {
            const day1 = new Date(user[i].createdAt)
            for(let j= 0;j<array.length;j++) {
                const day2 = new Date(array[j])
                if(day1.getDate() === day2.getDate()){
                   newUser.push(user[i])
                }
            }
        }
        setNewuser(newUser)
    },[thisWeek,user])
    // user register last week
    useEffect(()=>{
        const array = [...lastWeek];
        const newUser = []
       
        for(let i=0;i<user.length;i++) {
            const day1 = new Date(user[i].createdAt)
            for(let j= 0;j<array.length;j++) {
                const day2 = new Date(array[j])
                if(day1.getDate() === day2.getDate()){
                   newUser.push(user[i])
                }
            }
        }
        setNewuserLastWeek(newUser)
    },[lastWeek,user])
    // transactioin in week is guest this week
    // revenue in week
    useEffect(()=>{
        //console.log(guestThisWeek)
        const result = guestThisWeek.reduce((accumulator:number, currentValue:any)=>
            accumulator + currentValue.totalPrice,
        0)
        //console.log(result)
        setTotalPriceThisWeek(result)
    },[guestThisWeek])
    // rrevenue last week
    useEffect(()=>{
       
        const result = guestLastWeek.reduce((accumulator:number, currentValue:any)=>
            accumulator + currentValue.totalPrice,
        0)
        //console.log(result)
        setTotalPriceLastWeek(result)
    },[guestLastWeek])

    // handle loading
   const handleLoading = useCallback((value:boolean)=>{
        setLoading(value)
    },[])


    // revenue of cash
    // revenue of card
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
        <div className="flex flex-col gap-2 text-white px-2">
            <div className="grid grid-cols-6 gap-2">
                <div className="col-span-2 rounded-md bg-slate-500/60">
                    <OverView 
                        thisWeek = {thisWeek}
                        lastWeek = {lastWeek}
                        transaction = {transaction}
                        comment = {comment}
                        mail = {mail}
                    />
                </div>
                <div className="col-span-4 rounded-md bg-slate-500/60">
                    <div>
                        
                        <ChartOcupancy 
                             thisWeek = {thisWeek}
                             lastWeek = {lastWeek}
                             mail ={mail}
                        />
                    </div>

                </div>
            </div>
           <div>
            {/* customer report to admin */}
            <div className="col-span-2 rounded-md bg-slate-500/60 px-2 py-2">
                <CustomerProblem 
                    mail ={mail}
                    //updateMail ={updateMail}
                    mail2 ={mail2}
                    thisWeek = {thisWeek}
                    lastWeek = {lastWeek}
                    currentUser = {currentUser}
                    user = {user}
                    search ={search}
                    role ={role}
                    status = {status}
                    start ={start}
                    end ={end}
                    page ={page}
                    per_page = {per_page}
                    loading = {loading}
                />
                <Pagination
                    page ={page}
                    per_page ={per_page}
                    search ={search}
                    max ={max}
                    status = {status}
                    role={role}
                    start ={start}
                    end ={end}
                    handleLoading ={handleLoading}
                />
            </div>
           </div>
            
        </div>
    )
}

export default Report