"use client"
import { Discount } from "@prisma/client";
import { useCallback, useEffect, useState } from "react";
import { FaRegSquare } from "react-icons/fa";
import { FaRegSquareCheck } from "react-icons/fa6";
import { RiArrowLeftSLine } from "react-icons/ri";
import ItemType from "./item-type";
import { Slider } from "@/components/ui/slider"
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css';
import { DateRangePicker } from 'react-date-range';
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form"

const cateType = [
    'coupon',
    'voucher',
    'rewards'
]


interface FilterProps {
    discount: Discount[]
    search: string
}

const Filter:React.FC<FilterProps> =({
    discount = [],
    search
}) =>{
    
    const router = useRouter()
    const [dateRange,setDateRange] = useState<any>({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    })


    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
      } = useForm<FieldValues>({
        defaultValues: {
            type: '',
            percent:0,
            countFrom: 0,
            countTo: 100,
            dayStart: new Date(),
            dayEnd: new Date(),
        }
      })
      const onSubmit: SubmitHandler<FieldValues> = (data) => {
        router.push(`/dashboards/discount?search=${search}&type=${data.type}&percent=${data.percent}&dayStart=${data.dayStart}&dayEnd=${data.dayEnd}&countFrom=${data.countFrom}&countTo=${data.countTo}`)
      }
    
     

       // custome Value
    const setCustumValue = useCallback((id:string,value:any)=>{
        setValue(id,value,{
            shouldValidate:true,
            shouldTouch: true,
            shouldDirty: true
        })
    },[setValue])

    //handle reset
    const handleReset = useCallback(()=>{
        setCustumValue('type','')
        setCustumValue('percent',0)
        setCustumValue('countFrom',0)
        setCustumValue('countTo',100)
        setCustumValue('dayStart','')
        setCustumValue('dayEnd','')
        setDateRange({
            startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
        })
        router.push(`/dashboards/discount?search=${search}`)
    },[router,search,setCustumValue])

  

    //handle slider
    const handleSlider = (value:any) =>{
        console.log(value)
        setCustumValue('percent',value[0])
    }

    //handle change date
    const handleChangeDate = useCallback((range:any) =>{
        console.log(range)
        setDateRange(range.selection)
        const start = range.selection.startDate;
        const end = range.selection.endDate;
       setCustumValue('dayStart',start)
       setCustumValue('dayEnd',end)
    },[setCustumValue])

    const type = watch('type')
    const percent = watch('percent')
    const dayStart = watch('dayStart')
    
    console.log( typeof dayStart)
    //handle count form
    const handleCountFrom = useCallback((value:string) =>{
    
        setCustumValue('countFrom',Number(value))
    },[setCustumValue])

    //handle count to
    const handleCountTo = useCallback((value:string) =>{
        setCustumValue('countTo',Number(value))
    },[setCustumValue])

    //handle change type value
    const handleChangType = useCallback((value:any)=>{
        setCustumValue('type',value)
    },[setCustumValue])

    return (
        <div>
            {/* header filter */}
            <div className="flex items-center justify-between px-2 py-1 text-[15px]">
               
                <div >
                    <span>Filter</span>
                    <span> {discount.length} item</span>
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
            {/* content */}
            <div className="flex flex-col gap-2">
                {/* type */}
                <div>
                <div>Type</div>
                <div className="flex items-center justify-start gap-2">
                {cateType.map((item:any)=>{
                    return(
                        <ItemType 
                            key={item}
                            item={item}
                            onClick={(value:any)=>handleChangType(value)}
                            value={type}
                        />
                    )
                })}
                </div>
                </div>
                {/* percent */}
               
                <div>
                    <div className="flex items-center justify-between pr-2">
                        <div>
                             Percent
                        </div>
                        <div>
                            {percent} %
                        </div>
                    </div>
                    <Slider defaultValue={[0]} value={[percent]} max={100} step={1}  onValueChange={(e) =>handleSlider(e)}/>
                </div>
                {/* count */}
                <div className="flex items-center justify-start gap-1">
                    <div>Amount from </div>
                    <div>
                        <div>
                            <input type="number" {...register('countFrom')} className="rounded-md border border-slate-900 px-2 py-0.5"/>
                            <span> to </span>
                            <input type="number" {...register('countTo')} className="rounded-md border border-slate-900 px-2 py-0.5" />
                        </div>
                    </div>
                </div>
                {/* date range */}
                <div>
                <DateRangePicker
                    ranges={[dateRange]}
                    onChange={handleChangeDate}
                    minDate={new Date()}
                />
                </div>
                
            </div>
        </div>
    )
}

export default Filter