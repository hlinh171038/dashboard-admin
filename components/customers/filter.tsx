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
            action: null,
            start: '',
            end: '',
        }
      })
      const onSubmit: SubmitHandler<FieldValues> = (data) => {
        const start = data.start !=='' ? new Date(new Date(data.start).getTime() ).toISOString() : ''
        const end = data.end !=='' ? new Date(new Date(data.end).getTime() + 86400000).toISOString() : ''
        router.push(`/dashboards/customers?search=&role=${data.role}&action=${data.action}&start=${start}&end=${end}&page=1&per_page=10`)
      }
    
      const role = watch('role');
      const action = watch('action');
      const start = watch('start');
      const end = watch('end');


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

    //   role: '',
    //   action: null,
    //   start: '',
    //   end: '',

    const handleReset = useCallback(()=>{
        setCustomeValue('role','');
        setCustomeValue('action',null);
        setCustomeValue('start','');
        setCustomeValue('end','');
        router.push(`/dashboards/customers?search=&role=${role}&action=${action}&start=${start}&end=${end}&page=1&per_page=10`);
    },[action,end,role,router,setCustomeValue,start])
    return (
        <div className="w-full">
             {/* header filter */}
             <div className="flex items-center justify-between pr-2 py-1 text-[15px] ">
               
               <div >
                   <span>Filter </span>
                   <span>{customer.length}  item</span>
               </div>
               <div className="flex items-center justify-start gap-2">
                   <button 
                       onClick={handleSubmit(onSubmit)}
                       className="flex items-center justify-center px-2 py-1 border border-[#4FA29E] bg-[#4FA29E] hover:opacity-[0.7] cursor-pointer text-neutral-200 test-[15px] w-full rounded-md"
                   >
                       {`show`}
                   </button>
                   <button
                       onClick={handleReset}
                       className="flex items-center justify-center px-2 py-1 bg-neutral-100 border border-[#4FA29E]  cursor-pointer test-[15px] w-full rounded-md"
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
            <div className="flex items-center justify-end ">
                <div>
                    { start==='' ? (
                        <span className="text-orange-600">Choose the range date</span>
                    ):(
                        <span className="text-green-600">You have chosen</span> 
                    )}
                </div>
            </div>
            <DateRangePicker
                ranges={[dateRange]}
                onChange={handleSelected}
            />
        </div>
        </div>
    )
}

export default Filter