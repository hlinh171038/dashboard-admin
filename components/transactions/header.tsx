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

interface HeaderProps {
    search: string;
    payment: string;
    status: string;
    transaction: Transaction[] | any
}
const Header:React.FC<HeaderProps> = ({
    search,
    payment,
    status,
    transaction = []
}) => {

    const router = useRouter()
    const [text,setText] = useState('')
    const [earlyDate,setEarlyDate] = useState(new Date())
    const [query] = useDebounce(text,300)
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
        router.push(`/dashboards/transaction?search=${search}&payment=${payment}&status=${status}&startDate=${startConvert}&endDate=${endConvert}`)
    },[router,search,payment,status])
       
    useEffect(()=>{
        router.push(`/dashboards/transaction?search=${query}`)
    },[query,router])

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
    },[transaction])
    return (
        <div className="flex items-center justify-between gap-2 w-full ">
            <div className="relative">
                <div className="absolute top-2 left-2 "><IoSearchSharp className="w-3 h-3 text-white"/></div>
                <input 
                    className="px-2 py-1 pl-8 rounded-md bg-slate-500/60 text-sm focus:outline-none" 
                    placeholder="Search ... "
                    value={text}
                    onChange={(e)=>setText(e.target.value)}
                />
            </div>
            <div className="flex items-center justify-end gap-4">
                <div className="h-6 w-6 rounded-full  flex items-center justify-center text-neutral-200 border border-neutral-100 px-2 py-1 cursor-pointer ">
                    <AiOutlineDownload className="w-4 h-4"/>
                </div>
                <div className="flex items-center justify-start gap-2 text-neutral-200 border boder-neutral-100 rounded-md px-2 py-1 cursor-pointer text-[14px] text-thin">
                    <MdDateRange />
                    <div>Oct,10,2023 - Nov,13,2023</div>
                    <DateRangePicker
                        rangeColors={['#262626']}
                        ranges={[dateRange]}
                        onChange={handleSelect}
                        maxDate={new Date()}
                        minDate={earlyDate}
                    />
                </div>
            </div>
        </div>
    )
}

export default Header