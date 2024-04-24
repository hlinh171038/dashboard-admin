"use client"
import { DatePicker } from "@/components/dashboard/discount/date"
import Input from "@/components/dashboard/discount/input"
import { useCallback, useEffect, useState } from "react"

import { useForm, SubmitHandler, FieldValues } from "react-hook-form"
import { MdOutlineCopyAll } from "react-icons/md";
import randomString from 'randomstring'
import axios from "axios"
import { ZodType, z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { User } from "@prisma/client"

type dataForm = {
     title: string,
     percent: number,
     startDate: Date,
     endDate: Date,
     condition: string,
     description: string,
     type: string,
     count: number,
    code: string
}

interface AddDiscountProps {
    currentUser:any;
    user: User[] | any;
}

const AddDiscount:React.FC<AddDiscountProps> = ({
    currentUser,
    user =[]
}) =>{

    const [isLoading,setIsLoading] = useState(false)
    const [userId,setUserId] = useState<any>(null)
    const router = useRouter()

    const schema: ZodType<dataForm> = z.object({
         title: z.string().min(3,{
             message: "At least 3 character"
         }),
         percent: z.coerce.number().gte(1).lte(100),
         startDate:z.date(),
         endDate: z.date(),
         description: z.string().min(3,{
             message:"At least 3 character"
         }),
         condition: z.string().min(3,{
            message:"At least 3 character"
        }),
         type: z.string(),
         count: z.coerce.number().gte(1).lte(10000),
        code: z.string()
    })

    
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
      } = useForm<FieldValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            title: '',
            percent: 0,
            startDate: '',
            endDate: '',
            condition:'',
            description: '',
            type: '',
            count: 0,
            code: '# code'
        }
      })

      const title = watch('title')
      const percent = watch('percent')
      const startDate = watch('startDate')
      const endDate = watch('endDate')
      const description = watch('description')
      const type = watch('type')
      const count = watch('count')
      const ma = watch('code')
      const condition = watch('condition')
   
      const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if(!currentUser) {
            toast.warning('have not login !!!');
            return;
        }
        setIsLoading(true)
        axios.post('/api/add-new-coupon',data)
                .then((res)=>{
                    router.refresh()
                    //toast.success("Add new coupon")
                })
                .catch((err:any)=>{
                    toast.error("something went wrong")
                })
                .finally(()=>{
                   
                })
        // create history
            axios.post('/api/create-new-history',{
                userId:userId?.id,
                title:`coupon`,
                type: 'add-new-coupon'
            })
            .then((res)=>{
                
                toast.success('add new coupon');
                router.refresh();
            })
            .catch((err:any)=>{
                toast.error("Something went wrong !!!")
            }).
            finally(()=>{
                setIsLoading(false)
                router.push('/dashboards/discount?search=&page=1&per_page=10')
            })
      }

      const setCustomValue =useCallback((id:string, value:any) => {
        setValue(id,value,{
            shouldValidate: true,
            shouldTouch: true,
            shouldDirty: true
        })
      },[setValue])

      //handle coppy
      const handleCopy =(id:string) =>{
        navigator.clipboard.writeText(id)
        toast.success("coppied to clipboard")
      }

    useEffect(()=>{
        if(type !==''){
            let result = randomString.generate(7);
            switch(type){
                case 'coupon':result = 'coup-'+ result; break;
                case 'voucher':result = 'vou-'+ result; break;
                case 'rewards':result = 're-'+ result; break;
                case 'ship':result = 'ship-'+ result; break;
            }
            setCustomValue('code',result)

        }
    },[setCustomValue,type])

    // take userID from current user
    useEffect(()=>{
        const result = user && user.find((item:any)=>item.email === currentUser?.user.email);
        setUserId(result)
    },[user,currentUser])
    console.log(userId)

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
    return(
        <div className="px-2">
            <div className="bg-slate-600 rounded-md px-2 py-4 grid grid-cols-2">
                <div className="col-span-2 flex flex-col gap-4">
                   <div>
                  <div className="relative">
                  <Input 
                        id="title"
                        register={register}
                        title="Title"
                        placeholder="title coupon"
                        errors={errors}
                        type="text"
                    />
                    {errors.title && <span className="absolute top-12 left-0 text-[13px] text-red-600">{errors.title.message as string}</span>}
                  </div>
                  <div className="relative">
                    <Input 
                            id="percent"
                            register={register}
                            title="Percent"
                            placeholder="title coupon"
                            errors={errors}
                            type="number"
                        />
                    {errors.percent && <span className="absolute top-12 left-0 text-[13px] text-red-600">{errors.percent.message as string}</span>}
                  </div >
                    
                    {/* count */}
                    <div className="relative">
                        <div className="text-neutral-100 text-[15px] ">Count</div>
                        <input 
                            type="number"
                            {...register('count',{required:true})}
                            placeholder="count"
                            className="w-full rounded-md text-neutral-100 text-[14px] placeholder:text-[14px] outline-none border-0 px-2 py-1 bg-slate-500/60"
                        />
                        {errors.count && <span className="absolute top-12 left-0 text-[13px] text-red-600">{errors.count.message as string}</span>}
                    </div>
                   </div>
                   
                    {/* date */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-1 w-full relative">
                            <DatePicker 
                                value={startDate}
                                onChange={(value)=>setCustomValue('startDate',value)}
                                title="Start Date"
                            />
                            {errors.startDate && <span className="absolute top-12 left-0 text-[13px] text-red-600">{errors.startDate.message as string}</span>}
                        </div>
                        <div className="col-span-1 w-full relative">
                            <DatePicker 
                                value={endDate}
                                onChange={(value)=>setCustomValue('endDate',value)}
                                title = "End Date"
                            />
                            {errors.endDate && <span className="absolute top-12 left-0 text-[13px] text-red-600">{errors.endDate.message as string}</span>}
                        </div>
                    </div>
                    {/* type */}
                    <div className="relative">
                        <div className="text-[15px] text-neutral-100 ">Type</div>
                        <div className="text-[14px] text-neutral-200 flex flex-col gap-2">
                            <label htmlFor="">
                                <input {...register("type")} type="radio" value="coupon" defaultChecked />
                                <span>Coupon</span>
                            </label>
                            <label htmlFor="">
                                <input {...register("type")} type="radio" value="voucher" />
                                <span>Voucher</span>
                            </label>
                            <label htmlFor="">
                                <input {...register("type")} type="radio" value="rewards" />
                                <span>Rewards</span>
                            </label>
                            <label htmlFor="">
                                <input {...register("type")} type="radio" value="ship" />
                                <span>Ship</span>
                            </label>
                        </div>
                        {errors.type && <span className="absolute top-12 left-0 text-[13px] text-red-600">{errors.type.message as string}</span>}
                    </div>
                    {/* code */}
                    <div>
                        <div className="text-[15px] text-neutral-100 "># code</div>
                        <div>
                            <div className="bg-slate-500/60 rounded-md px-2 py-1 text-neutral-400 text-[14px] flex items-center justify-between ">
                                <span>{ma}</span>
                                <span><MdOutlineCopyAll onClick={()=>handleCopy(ma)} className="w-4 h-4 text-neutral-100"/></span>
                            </div>
                        </div>
                    </div>
                     {/* condition */}
                     <div className="relative">
                        <div >
                            <div className="text-[15px] text-neutral-100 ">Condition</div>
                            <textarea 
                                {...register("condition",{ required: true })}
                                className="w-full rounded-md text-neutral-100 min-h-10 h-auto bg-slate-500/60 outline-none border-0 placeholder:text-[14px] px-2 py-4 text-[14px]" 
                                placeholder="Description"
                            />
                        </div> 
                        {errors.condition && <span className="absolute left-0 bottom-[-10px]  text-[13px] text-red-600">{errors.condition.message as string}</span>}
                    </div>
                    {/* description */}
                    <div className="relative">
                        <div >
                            <div className="text-[15px] text-neutral-100 ">Description</div>
                            <textarea 
                                {...register("description",{ required: true })}
                                className="w-full rounded-md text-neutral-100 min-h-10 h-auto bg-slate-500/60 outline-none border-0 placeholder:text-[14px] px-2 py-4 text-[14px]" 
                                placeholder="Description"
                            />
                        </div> 
                        {errors.description && <span className="absolute left-0 bottom-[-10px]  text-[13px] text-red-600">{errors.description.message as string}</span>}
                    </div>
                    {/* submit */}
                    <button
                        disabled={isLoading}
                        className=" bg-[#4FA29E] hover:opacity-[0.7] text-[15px] text-neutral-100 flex items-center justify-center gap-2 w-full rounded-md px-2 py-1"
                        onClick={handleSubmit(onSubmit)}
                    >
                       <span> Add New Coupon</span>
                        {isLoading ?  <AiOutlineLoading3Quarters className="animate-spin h-5 w-5 "/>:<div className="w-5 h-5"></div>}
                    </button>
                </div>

                
            </div>
        </div>
    )
}

export default AddDiscount