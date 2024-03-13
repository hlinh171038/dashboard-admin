"use client"
 
import { Calendar } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useState } from 'react';

import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';

import { MdCalendarMonth } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
interface DatePickerProps {
    onChange: (value:any) =>void;
    value:any;
    title: string
}
 
export const DatePicker:React.FC<DatePickerProps>=({
    onChange,
    value,
    title
}) =>{
   


  return (
    <div className='w-full'>
      <div className='text-[15px] text-neutral-100 capitalize'>{title}</div>
      <Popover >
        <PopoverTrigger asChild className='w-full'>
        <button
          className={cn(
            "w-full flex justify-between items-center  text-left font-normal text-white bg-slate-500/60 border-0 text-[14px] px-2 py-1 rounded-md",
            !value && "text-muted-foreground"
          )}
        >
          <div className='flex items-center justify-start gap-2'>
            <MdCalendarMonth className="mr-2 h-4 w-4" />
            {value ? format(value, "PPP") : <span className='text-neutral-100'>Pick a date</span>}
          </div>
          <div>
            <FaPlus className='h-4 w-4 mr-2'/>
          </div>
        </button>
        </PopoverTrigger>
        <PopoverContent 
          side='bottom'
          className=''
          >
          <Calendar
            date={value}
            onChange={(date)=>onChange(date)}
            minDate={new Date()}
            className=''
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

