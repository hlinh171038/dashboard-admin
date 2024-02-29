'use client'

import CircleChart from "@/components/transactions/circle-chart"
import Header from "@/components/transactions/header"
import Table from "@/components/transactions/table"
import { Product, Transaction, User } from "@prisma/client"
import { useEffect, useState } from "react"
import { MdCandlestickChart } from "react-icons/md";
import { MdCircle } from "react-icons/md";



const chartColor =[
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
    {
        color:'#EC8D4B',
        title: 'sunday'
    },
]

interface TransactionProps {
    transaction : Transaction[] | any
}

const Transaction:React.FC<TransactionProps> = ({
    transaction = [],
}) => {
    console.log(transaction)
    const [all,setAll] = useState(0)
    const [totalIncrease,setTotalIncrease] = useState(0)
    const [next7Day,setNext7Day] = useState<any>([])
    const [chart,setChart] = useState<any>([])

    useEffect(()=>{
        setAll(transaction.length)
    },[transaction.length])

    // count 7 day
    useEffect(()=>{
        // Lấy ngày hiện tại
        const today = new Date();

        //day from today
        const tr = new Date().getDay()

        // back to cn
        const backday = new Date(today.getFullYear(), today.getMonth(), today.getDate()- tr)

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
        const newDate = new Date(backday.getFullYear(), backday.getMonth(), backday.getDate() + i);

        // Thêm ngày mới vào mảng
         next7Days.push(newDate);
         // reduce in this day
         for(let j= 0;j<transaction.length;j++){
            const day1 = new Date(transaction[j].date).getDate();
            const day2 = new Date(newDate).getDate()
            console.log(day1)
            console.log(day2)
            if(day1 === day2) {
                console.log('try')
                const check = new Date(newDate).getDay()
                result[check].value += transaction[j].totalPrice;
               }
            }
       
        }
        console.log(result)
        setNext7Day(next7Days)
        setChart(result)
    },[transaction])
    return (
        <div className="flex flex-col items-start justify-start gap-2 w-full px-2">
            {/* header */}
            <div
                className="grid grid-cols-3 items-center justify-between gap-2 w-full bg-slate-600 rounded-md"
            >
               <div className="flex items-start justify-start gap-4">
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
                {/* budget */}
                {/* <div 
                    className="rounded-md bg-slate-500/60 px-2 py-1 flex flex-col items-start justify-start gap-3"
                >
                    <div>
                        <div className="text-neutral-100 capitalize">Transaction</div>
                        <div className="text-neutral-400 text-[13px] text-thin">Total transaction from this month.</div>
                    </div>
                    <div>
                        <CircleChart />
                    </div>
                    <div className="flex items-center justify-between w-full">
                        <div className="text-neutral-100 text-lg">{all}</div>
                        <div className="text-[15px] text-neutral-100 capitalize">total Increase : </div>
                    </div>
                </div> */}
                {/* extends */}
                {/* <div 
                    className="rounded-md bg-slate-500/60 px-2 py-1 flex flex-col items-start justify-start gap-3"
                >
                    <div>
                        <div className="text-neutral-100 capitalize">Expends</div>
                        <div className="text-neutral-400 text-[13px] text-thin">Total expends from this month.</div>
                    </div>
                    <div className="flex items-center justify-between w-full">
                        <div className="text-neutral-100 text-lg">97.000.000 d</div>
                        <div className="text-[15px] text-neutral-100 capitalize">Avarage</div>
                    </div>
                </div> */}
                {/* income */}
                {/* <div 
                    className="rounded-md bg-slate-500/60 px-2 py-1 flex flex-col items-start justify-start gap-3"
                >
                    <div>
                        <div className="text-neutral-100 capitalize">Income</div>
                        <div className="text-neutral-400 text-[13px] text-thin">Total income from this month.</div>
                    </div>
                    <div className="flex items-center justify-between w-full">
                        <div className="text-neutral-100 text-lg">97.000.000 d</div>
                        <div className="text-[15px] text-neutral-100 capitalize">total Income:</div>
                    </div>
                </div> */}
            </div>
            {/* table */}
            <div className="w-full rounded-md bg-slate-600 p-2 flex flex-col gap-2">
                <Header />
                <Table 
                    transaction = {transaction}
                />
            </div>
        </div>
    )
}

export default Transaction