'use client'

import CircleChart from "@/components/transactions/circle-chart"
import Header from "@/components/transactions/header"
import Pagination from "@/components/transactions/pagination"
import Table from "@/components/transactions/table"
import { Product, Transaction, User } from "@prisma/client"
import { useEffect, useState } from "react"
import { MdCandlestickChart } from "react-icons/md";
import { MdCircle } from "react-icons/md";



const chartColor =[
    {
        color:'#EC8D4B',
        title: 'sunday'
    },
    {
        color:'#64D03E',
        title: 'monday'
    },
    {
        color:'#CCEB24',
        title: 'tuestday'
    },
    {
        color:'#468AE2',
        title: 'webnesday'
    },
    {
        color:'#CB26E9',
        title: 'thursday'
    },
    {
        color:'#DB2B78',
        title: 'friday'
    },
    {
        color:'#E62E2D',
        title: 'saterday'
    },
   
]

interface TransactionProps {
    transaction : Transaction[] | any;
    search: string;
    status: string;
    payment: string;
    startDate: string;
    endDate:string;
    page: number;
    per_page:number;
}

const Transaction:React.FC<TransactionProps> = ({
    transaction = [],
    search,
    status,
    payment,
    startDate,
    endDate,
    page,
    per_page
}) => {
    console.log(transaction)
    const [all,setAll] = useState(0)
    const [totalIncrease,setTotalIncrease] = useState(0)
    const [next7Day,setNext7Day] = useState<any>([])
    const [chart,setChart] = useState<any>([])
    const [updateTransaction,setUpdateTransaction] = useState([])
    //const [lengthTransaction,setLengthTransaction] = useState(0)

    console.log(page)//0
    console.log(per_page)//10
    const lengthStransaction = Math.ceil(transaction.length / Number(per_page));
        
  
        //pagination
    const start = (page - 1) * per_page; // 0,5,10
    const end = start + per_page;//5,10,15
    
    //update transaction
    

    useEffect(()=>{
        const updateTransaction = transaction.slice(start,end)
        console.log(updateTransaction)
        setUpdateTransaction(updateTransaction)
    },[end,start,transaction])
  
console.log(updateTransaction)
    useEffect(()=>{
        setAll(transaction.length)
    },[transaction.length])


    // count 7 day
    useEffect(()=>{
        // Lấy ngày hiện tại
        const today = new Date();
        console.log(today)

        // back to cn
        const backday = new Date(today.getFullYear(), today.getMonth(), today.getDay()- today.getDay())
        console.log(backday)

        // Tạo mảng để lưu trữ 7 ngày tiếp theo
        const next7Days = [];
        const result =[
            {day:'cn',
            value:0
           },
            {day:'hai',
            value:0
           },
           {day:'ba',
           value:0
           },
            {day:'tu',
            value:0
            },
            {day:'nam',
            value:0
            },
            {day:'sau',
            value:0
           },
           {day:'bay',
           value:0
           },

        ]
        // Duyệt qua 7 ngày tiếp theo
        for (let i = 1; i <= 7; i++) {
        // Tạo ngày mới
        const newDate = new Date(backday.getFullYear(), backday.getMonth(), backday.getDay() + i);

        // Thêm ngày mới vào mảng
         next7Days.push(newDate);
         // reduce in this day
         for(let j= 0;j<transaction.length;j++){
            const day1 = new Date(transaction[j].date).getDay();
            const day2 = new Date(newDate).getDay()
        
            if(day1 === day2) {
            
                const check = new Date(newDate).getDay()
                result[check].value += transaction[j].totalPrice;
               }
            }
       
        }
        
        setNext7Day(next7Days)
        setChart(result)
    },[transaction])

    useEffect(()=>{
        const initialValue = 0;
        const result = chart.reduce(
          (accumulator:number, currentValue:any) => accumulator + currentValue.value,
          initialValue,
        );
     
        setTotalIncrease(result)
    },[chart])
    return (
        <div className="flex flex-col items-start justify-start gap-2 w-full px-2 ">
            {/* header */}
            <div
                className="grid grid-cols-2 items-center justify-between gap-2 w-full "
            >
               <div className="flex items-start justify-start gap-4 bg-slate-600 rounded-md">
                    <CircleChart
                        next7Day = {next7Day}
                        chart ={chart}
                    />
                    <div
                        className="mt-6"
                    >
                       {chartColor.map((item:any)=>{
                        return (
                            <div
                                key={item}
                                className="flex gap-2 items-start justify-start"
                            >
                                <div>
                                    <MdCircle className="w-4 h-4 " style={{color: `${item.color}`}} />
                                </div>
                                <div className="text-[14px] text-neutral-200">{item.title}</div>
                            </div>
                        )
                       })}
                    </div>
                   
               </div>
               <div
                className="bg-slate-600 rounded-md min-h-[200px] px-2 py-4 flex flex-col justify-between"
               >
                     <div>
                        <div className="text-neutral-100 capitalize">Transaction</div>
                        <div className="text-neutral-400 text-[13px] text-thin">Total transaction from this week.</div>
                    </div>
                    <div className="flex items-center justify-between w-full">
                        <div className="text-neutral-100 text-[40px]">{all}</div>
                        <div className="text-[15px] text-neutral-100 capitalize">total: {totalIncrease.toLocaleString('vi', {style : 'currency', currency : 'VND'})} </div>
                    </div>
               </div>
                
            </div>
            {/* table */}
            <div className="w-full rounded-md bg-slate-600 p-2 flex flex-col gap-2">
                <Header 
                 search = {search}
                 status = {status}
                 payment = {payment}
                 transaction = {transaction}
                 startDate ={startDate}
                 endDate = {endDate}
                 page={page}
                 per_page ={per_page}
                />
                <Table 
                    transaction = {updateTransaction}
                    search = {search}
                    status = {status}
                    payment = {payment}
                    startDate ={startDate}
                    endDate = {endDate}
                    page={page}
                    per_page ={per_page}
                />
                <Pagination
                    page={page}
                    search={search}
                    status = {status}
                    startDate = {startDate}
                    endDate = {endDate}
                    payment = {payment}
                    per_page={per_page}
                    max={lengthStransaction}
                />
            </div>
        </div>
    )
}

export default Transaction