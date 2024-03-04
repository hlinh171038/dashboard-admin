"use client"

import { useCallback, useEffect, useState } from "react"
import { IoSearchSharp } from "react-icons/io5"
import { AiOutlineDownload } from "react-icons/ai";
import { MdDateRange } from "react-icons/md";
import { useDebounce } from "use-debounce";
import { useRouter } from "next/navigation";
import { DateRangePicker, Range } from 'react-date-range';

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { formatISO } from "date-fns";
import { Transaction } from "@prisma/client";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { BsFillQuestionOctagonFill } from "react-icons/bs";

interface HeaderProps {
    search: string;
    payment: string;
    status: string;
    startDate: string;
    endDate: string;
    page: number;
    per_page: number;
    transaction: Transaction[] | any
}
const Header:React.FC<HeaderProps> = ({
    search,
    payment,
    status,
    startDate,
    endDate,
    page,
    per_page,
    transaction = []
}) => {

    const router = useRouter()
    const [text,setText] = useState('')
    const [earlyDate,setEarlyDate] = useState(new Date())
    const [query] = useDebounce(text,300)
    const [start,setStart] = useState(new Date().toDateString())
    const [end,setEnd] = useState( new Date().toDateString())
    const [dateRange, setDateRange] = useState<Range>({
        startDate: new Date(),
        endDate: new Date(),
        key:'selected'
    })

    //handle Select Range Date
    const handleSelect = useCallback((ranges: any) => {
        //const start = new Date(new Date(ranges.selected.startDate).getTime()+24 * 60 * 60 * 1000)
        const start = ranges.selected.startDate
        const end = new Date(new Date(ranges.selected.endDate).getTime()+ 24*60*60*1000)
        console.log(start)
        console.log(start.toISOString())
        const startConvert = start.toISOString()
        const endConvert = end.toISOString()
         setDateRange(ranges.selected)
        router.push(`/dashboards/transaction?search=${search}&payment=${payment}&status=${status}&startDate=${startConvert}&endDate=${endConvert}&pag=1&per_page=10`)
    },[router,search,payment,status])
       
    useEffect(()=>{
        router.push(`/dashboards/transaction?search=${query}&payment=${payment}&status=${status}&startDate=${startDate}&endDate=${endDate}&page=1&per_page=10`)
    },[query,router,payment,status,startDate,endDate])

    console.log(earlyDate)
    // find the laster date
    useEffect(()=>{
      let  earliesDate = transaction.length> 0 && transaction[0].date;
      for(let i=0;i<transaction.length;i++) {
        if(transaction[i].date <earliesDate) {
            earliesDate = transaction[i].date
        }
      }
      console.log(earliesDate)
      setEarlyDate(earliesDate)
      setStart(earliesDate && earliesDate.toDateString())
    },[transaction])
    return (
        <div className="flex items-center justify-between gap-2 w-full ">
            <Popover>
            <PopoverTrigger  >
                <div className="flex items-center justify-end gap-4">
                    <div className="h-6 w-6 rounded-full  flex items-center justify-center text-neutral-200 border border-neutral-100 px-2 py-1 cursor-pointer ">
                        <AiOutlineDownload className="w-4 h-4"/>
                    </div>
                    <div className="flex items-center justify-start gap-2 text-neutral-200 border boder-neutral-100 rounded-md px-2 py-1 cursor-pointer text-[14px] text-thin">
                        <MdDateRange />
                        <div>{start + ' - ' + end}</div>
                        
                    </div>
                </div>    
            </PopoverTrigger>
            <PopoverContent  
                side="bottom" 
                align="start" 
                sideOffset={4}
                className="bg-neutral-200 text-slate-600 text-[13px]"
                >
                   <DateRangePicker
                        rangeColors={['#262626']}
                        ranges={[dateRange]}
                        onChange={handleSelect}
                        maxDate={new Date()}
                        minDate={earlyDate}
                    />
            </PopoverContent>
        </Popover>
           
        </div>
    )
}

export default Header