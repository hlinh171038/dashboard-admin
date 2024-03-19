"use client"

import { useCallback, useState } from "react"
import { useForm, SubmitHandler, FieldValues } from "react-hook-form"
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import { useRouter } from "next/navigation";
import { User } from "@prisma/client";

interface FilterProps {
    customer: User[] | any
}

const Filter:React.FC<FilterProps> = ({
    customer =[]
}) => {

    const router = useRouter()
    const [dateRange,setDateRange] = useState({
        startDate: new Date(),
        endDate:new Date(),
        key: 'selection'
    })

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
      } = useForm<FieldValues>({
        defaultValues: {
            role: '',
            action: false,
            start: new Date(),
            end: new Date(),
        }
      })
      const onSubmit: SubmitHandler<FieldValues> = (data) => {
        router.push(`/dashboards/customers?search=&role=${data.role}&action=${data.action}&start=${data.start}&end=${data.end}&page=1&per_page=10`)
      }
    
      const role = watch('role');
      const action = watch('action');
      const start = watch('start');
      const end = watch('end');

      console.log(role)
      console.log(action)
      console.log(start)
      console.log(end)
     //handle customeValue
     const setCustomeValue = useCallback((id:string,value:any)=>{
            setValue(id,value,{
                shouldValidate: true,
                shouldTouch: true,
                shouldDirty: true
            })
     },[setValue])

      //handle selection
      const handleSelected = useCallback((ranges:any)=>{
            console.log(dateRange.startDate)
            setDateRange(ranges.selection);
            const start = ranges.selection.startDate;
            const end = ranges.selection.endDate;
            setCustomeValue('start',start);
            setCustomeValue('end',end)
      },[dateRange,setCustomeValue])

    const handleReset = useCallback((

    )=>{},[])
    return (
        <div className="w-full">
             {/* header filter */}
             <div className="flex items-center justify-between px-2 py-1 text-[15px] ">
               
               <div >
                   <span>Filter </span>
                   <span>{customer.length}  item</span>
               </div>
               <div className="flex items-center justify-start gap-2">
                   <button 
                       onClick={handleSubmit(onSubmit)}
                       className="flex items-center justify-center px-2 py-1 border border-slate-900 bg-slate-900 hover:bg-slate-800 cursor-pointer text-neutral-200 test-[15px] w-full rounded-md"
                   >
                       {`show`}
                   </button>
                   <button
                       onClick={handleReset}
                       className="flex items-center justify-center px-2 py-1 bg-neutral-100 border border-slate-900  cursor-pointer test-[15px] w-full rounded-md"
                   >
                       Reset
                   </button>
               </div>
               
        </div>
          {/* role */}
          <div>
            <div className="font-bold text-[15px]">Role:</div>
            <div className="flex items-center justify-start gap-4 px-2">
                <label htmlFor="" className="flex items-center justify-center">
                    <input {...register("role")} type="radio" value="yes" />
                    Admin
                </label>
                <label htmlFor="" className="flex items-center justify-center">
                    <input {...register("role")} type="radio" value="no" />
                    User
                </label>
            </div>
        </div>
        {/*  action */}
        <div>
        <div  className="font-bold text-[15px]">Active:</div>
            <div className="flex items-center justify-start gap-4 px-2">
                <label htmlFor="" className="flex items-center justify-center">
                    <input {...register("action")} type="radio" value='true' />
                    Active
                </label>
                <label htmlFor="" className="flex items-center justify-center">
                    <input {...register("action")} type="radio" value="false" />
                   Inactive
                </label>
            </div>
        </div>
        {/* date */}
        <div className="py-2">
            <DateRangePicker
                ranges={[dateRange]}
                onChange={handleSelected}
            />
        </div>
        </div>
    )
}

export default Filter