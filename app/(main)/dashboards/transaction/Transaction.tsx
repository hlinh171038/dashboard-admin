'use client'

import CircleChart from "@/components/transactions/circle-chart"
import Header from "@/components/transactions/header"
import Pagination from "@/components/transactions/pagination"
import Table from "@/components/transactions/table"
import TotalTransactioinCard from "@/components/transactions/total-transaction"
import { cn } from "@/lib/utils"
import { Product, Transaction, User } from "@prisma/client"
import { useCallback, useEffect, useState } from "react"
import { MdCandlestickChart } from "react-icons/md";
import { MdCircle } from "react-icons/md";

import { useRouter } from "next/navigation"
//import RightChart from "@/components/transactions/right-chart"



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
    transaction2 : Transaction[] | any;
    search: string;
    status: string;
    payment: string;
    startDate: string;
    endDate:string;
    page: number;
    per_page:number;
}

const TransactionPage:React.FC<TransactionProps> = ({
    transaction = [],
    transaction2 = [],
    search,
    status,
    payment,
    startDate,
    endDate,
    page,
    per_page
}) => {
    

    const [thisWeek,setThisWeek] = useState<Date[]>([])
    const [lastWeek,setLastWeek] = useState<Date[]>([])
    const [totalTransactionThisWeek,setTotalTransactionThisWeek] = useState<any>([]);
    const [totalTransactionLastWeek,setTotalTransactionLastWeek] = useState<any>([]);
    const [loading,setLoading] = useState(true)
    const [chart,setChart] = useState('all');
    const [chartRight,setChartRight] = useState('all');
    const router = useRouter()

 
    const lengthStransaction = Math.ceil(transaction.length / Number(per_page));
        
  
        //pagination
    const start = (page - 1) * per_page; // 0,5,10
    const end = start + per_page;//5,10,15
    
    //update transaction
    //const updateTransaction = transaction.slice(start,end)



    //this week
    useEffect(()=>{
        const thisWeek = [];
        const today = new Date();
      
        const monday = new Date(today.getFullYear(), today.getMonth(), today.getDate()-today.getDay())
       
        for(let i =1;i<=7;i++) {
           let date =  new Date(monday.getFullYear(), monday.getMonth(), monday.getDate()+i)
            thisWeek.push(date)
        }
   
        setThisWeek(thisWeek)
    },[])

    // last week
    useEffect(()=>{
        const lastWeek:any[] = [];
        for(let i = 0;i<thisWeek.length;i++){
            let current = new Date(thisWeek[0]);
            const result = new Date(current.getFullYear(),current.getMonth(),current.getDate() - (i+1));
            lastWeek.push(result)
        }
        setLastWeek(lastWeek)
    },[thisWeek])
 

    // transaction this week
    useEffect(()=>{
        const array = [...transaction2]
        const result:any[] = []
        array && array.forEach((item:any)=>{
            const day = new Date(item.date);
            if(day >=thisWeek[0] && day <= thisWeek[thisWeek.length -1]) {
                result.push(item)
            }
        });
    
        setTotalTransactionThisWeek(result);
    },[transaction2,thisWeek])
    // transaction last week
    useEffect(()=>{
        const array = [...transaction2]
        const result:any[] = []
        array && array.forEach((item:any)=>{
            const day = new Date(item.date);
            if(day <=lastWeek[0] && day >= lastWeek[lastWeek.length -1]) {
                result.push(item)
            }
        });
    
        setTotalTransactionLastWeek(result)
    },[transaction2,lastWeek])
    // total last week

     // handle loading
   const handleLoading = useCallback((value:boolean)=>{
        setLoading(value)
    },[])

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
        <div className="flex flex-col items-start justify-start gap-2 w-full px-2 ">
            {/* header */}
            <div
                className="grid grid-cols-3 items-start justify-between gap-2 w-full "
            >
                {/* col-1 */}
                <div className="col-span-1  flex flex-col gap-2 ">
                    {/* total */}
                    <TotalTransactioinCard
                        totalTransactionThisWeek = {totalTransactionThisWeek}
                        totalTransactionLastWeek = {totalTransactionLastWeek}
                        transaction = {transaction2}
                    />
                    {/* weekly statatitical */}
                    <div className="bg-slate-600 rounded-md">
                    <div className="px-2 py-2">
                        <div className="text-[15px] text-neutral-100 font-bold ">Weekly Statictical</div>
                        <div className="text-[14px] text-neutral-400">Amount of transaction each day</div>
                    </div>
                    <div className=" flex items-center justify-start gap-1 text-[14px] text-neutral-100 px-2 py-1">
                        <div 
                            onClick={()=>setChart('all')}
                            className={cn('border border-[#4FA29E] bg-none cursor-pointer rounded-md px-1 py-0.5 capitalize',
                                    chart ==='all' && 'bg-[#4FA29E]'
                                   )}  
                        >
                            all
                        </div>
                        <div 
                            onClick={()=>setChart('thisWeek')}
                            className={cn('border border-[#4FA29E] bg-none cursor-pointer rounded-md px-1 py-0.5 capitalize',
                                    chart ==='thisWeek' && 'bg-[#4FA29E]'
                                   )} 
                        >
                            current
                        </div>
                        <div 
                            onClick={()=>setChart('lastWeek')}
                            className={cn('border border-[#4FA29E] bg-none cursor-pointer rounded-md px-1 py-0.5 capitalize',
                                    chart ==='lastWeek' && 'bg-[#4FA29E]'
                                   )} 
                            >
                                last week
                        </div>
                    </div>
                   <div className=" flex items-center justify-between  text-[14px] text-neutral-100 px-2">
                        
                                <div
                                    className="mt-2"
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
                                <CircleChart
                                totalTransactionThisWeek = {totalTransactionThisWeek}
                                totalTransactionLastWeek = {totalTransactionLastWeek}
                                transaction =  {transaction2}
                                type={chart}
                            />
                            
                        </div>
                        <div className="text-neutral-100 text-[14px] w-full text-end mb-2 px-2">Total: {chart === 'thisWeek' ? totalTransactionThisWeek &&totalTransactionThisWeek.length:(chart === 'lastWeek'? totalTransactionLastWeek && totalTransactionLastWeek.length: transaction2 && transaction2.length)}</div>
                    </div>
                </div>
                {/* col-2 */}
               <div
                className="col-span-2 bg-slate-600 rounded-md min-h-[200px] px-2  flex flex-col justify-between"
               >
                <div className="pl-2 py-2 flex items-center justify-between">
                    <div>
                        <div className="text-[15px] text-neutral-100 font-bold ">Weekly Statictical</div>
                        <div className="text-[14px] text-neutral-400 ">Total income  {chartRight === 'thisWeek' ?'in this week':(chartRight === 'lastWeek'? 'in last week': 'all the time')}</div>
                    </div>
                    <div className=" flex items-center justify-start gap-1 text-[14px] text-neutral-100 px-2">
                        <div 
                            onClick={()=>setChartRight('all')}
                            className={cn('border border-[#4FA29E] bg-none cursor-pointer rounded-md px-1 py-0.5 capitalize',
                                    chartRight ==='all' && 'bg-[#4FA29E]'
                                   )}  
                        >
                            all
                        </div>
                        <div 
                            onClick={()=>setChartRight('thisWeek')}
                            className={cn('border border-[#4FA29E] bg-none cursor-pointer rounded-md px-1 py-0.5 capitalize',
                                    chartRight ==='thisWeek' && 'bg-[#4FA29E]'
                                   )} 
                        >
                            current
                        </div>
                        <div 
                            onClick={()=>setChartRight('lastWeek')}
                            className={cn('border border-[#4FA29E] bg-none cursor-pointer rounded-md px-1 py-0.5 capitalize',
                                    chartRight ==='lastWeek' && 'bg-[#4FA29E]'
                                   )} 
                            >
                                last week
                        </div>
                    </div>
                </div>
                <div className="w-full flex items-center justify-end text-[13px] text-neutral-400">Date:{chartRight === 'thisWeek' ?(
                    <span className="flex items-center justify-start gap-0.5 ">
                        <span>{new Date(thisWeek[0]).toDateString()}</span>
                        <span>-</span>
                        <span>{new Date(thisWeek[thisWeek.length -1]).toDateString()}</span>
                    </span>
                ):(chartRight === 'lastWeek'? (
                    <span className="flex items-center justify-start gap-0.5 ">
                        <span>{new Date(lastWeek[0]).toDateString()}</span>
                        <span>-</span>
                        <span>{new Date(lastWeek[lastWeek.length -1]).toDateString()}</span>
                    </span>
                ): 'all the time')}</div>
                {/* <RightChart
                    thisWeek ={thisWeek}
                    lastWeek ={lastWeek}
                    transaction = {transaction2}
                    type={chartRight}
                /> */}
                </div>
            </div>
            {/* table */}
            <div className="w-full rounded-md bg-slate-600 p-2  flex flex-col gap-2">
                <Header 
                 search = {search}
                 status = {status}
                 payment = {payment}
                 transaction = {transaction}
                 transaction2 = {transaction2}
                 startDate ={startDate}
                 endDate = {endDate}
                 page={page}
                 per_page ={per_page}
                />
                <Table 
                    //transaction = {updateTransaction}
                    search = {search}
                    status = {status}
                    payment = {payment}
                    startDate ={startDate}
                    endDate = {endDate}
                    page={page}
                    per_page ={per_page}
                    start ={start}
                    end ={end}
                    loading ={loading}
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
                    handleLoading = {handleLoading}
                />
            </div>
        </div>
    )
}

export default TransactionPage