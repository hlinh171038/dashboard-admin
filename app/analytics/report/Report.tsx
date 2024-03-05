"use client"

import ChartOcupancy from "@/components/report/chart-ocupancy";
import OverView from "@/components/report/overview";
import TrendingSale from "@/components/report/trend-sale";
import { Product, Transaction, User } from "@prisma/client";
import { useCallback, useEffect, useState } from "react";


interface ReportProps {
    user: User[] | any;
    product: Product[] | any;
    transaction: Transaction[] | any
}

const Report:React.FC<ReportProps> = ({
    user = [],
    product =[],
    transaction = []
}) =>{
    const [thisWeek,setThisWeek] = useState<Date[]>([])
    const [lastWeek,setLastWeek] = useState<Date[]>([])
    const [guestThisWeek,setGuestThisWeek] = useState<any[]>([])
    const [guestLastWeek,setGuestLastWeek] = useState<any[]>([])
    const [totalPriceThisWeek,setTotalPriceThisWeek] = useState(0)
    const [totalPriceLastWeek,setTotalPriceLastWeek] = useState(0)
    const [newUser,setNewuser] = useState<any>([])
    const [newUserLastWeek,setNewuserLastWeek] = useState<any>([])

  

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
                   console.log('try');
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
        console.log(transaction)
        console.log(array)
        for(let i=0;i<transaction.length;i++) {
            const day1 = new Date(transaction[i].date)
            for(let j= 0;j<array.length;j++) {
                const day2 = new Date(array[j])
                if(day1.getDate() === day2.getDate()){
                   console.log('try');
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
        console.log(guestThisWeek)
        const result = guestThisWeek.reduce((accumulator:number, currentValue:any)=>
            accumulator + currentValue.totalPrice,
        0)
        console.log(result)
        setTotalPriceThisWeek(result)
    },[guestThisWeek])
    // rrevenue last week
    useEffect(()=>{
       
        const result = guestLastWeek.reduce((accumulator:number, currentValue:any)=>
            accumulator + currentValue.totalPrice,
        0)
        console.log(result)
        setTotalPriceLastWeek(result)
    },[guestLastWeek])

   
    return (
        <div className="flex flex-col gap-2 text-white px-2">
            <div className="grid grid-cols-6 gap-2">
                <div className="col-span-2 rounded-md bg-slate-500/60">
                    <OverView 
                        revenue = {totalPriceThisWeek}
                        guest = {guestThisWeek}
                        guestLast = {guestLastWeek}
                        thisWeek = {thisWeek}
                        lastWeek = {lastWeek}
                        newUser = {newUser}
                        newUserLastWeek = {newUserLastWeek}
                        revenueLastWeek = {totalPriceLastWeek}
                    />
                </div>
                <div className="col-span-4 rounded-md bg-slate-500/60">
                    <div>
                        
                        <ChartOcupancy 
                            guestThisWeek = {guestThisWeek}
                            guestLastWeek = {guestLastWeek}
                        />
                    </div>

                </div>
            </div>
           
            <div 
                className="grid grid-cols-6 gap-2 text-neutral-100 "

            >   
                {/* left */}
                <div className="col-span-4 bg-slate-600 rounded-md">
                    <TrendingSale 
                     transaction = {transaction}
                     product = {product}
                     guestThisWeek = {guestThisWeek}
                     guestLastWeek = {guestLastWeek}
                    />
                </div>
                {/* right */}
                <div
                    className="col-span-2 bg-slate-600 rounded-md"
                >
                    payment
                </div>
            </div>
        </div>
    )
}

export default Report