"use client"

import InputCustomerId from "@/components/customers/input"
import SelectCustomer from "@/components/customers/select"
import UploadImage from "@/components/customers/upload-img"
import QuestionNotified from "@/components/question-notified"
import { Textarea } from "@/components/ui/textarea"
import axios from "axios"
import { useState } from "react"
import {ZodType, z} from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import validator from 'validator';


type formData = {
    name: string,
    email: string,
    phone: any,
     role: string,
    active: string,
    imgUrl: string,
    address: string,
    password: string,
    confirmPassword: string,
}

import { useForm, SubmitHandler, FieldValues } from "react-hook-form"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Toaster } from "@/components/ui/sonner"
import { cn } from "@/lib/utils"




const AddNewCustomer = () =>{
    const router = useRouter()
    const [isLoading,setIsLoading] = useState(false)
  
    const schema: ZodType<formData> = z.object({
        name: z.string().min(3).max(20),
        email:z.string().email(),
        emailVerified:z.string().email(),
        phone: z.string().refine(validator.isMobilePhone),
        role: z.string(),
        active: z.string(),
        imgUrl: z.string(),
        address: z.string().min(10),
        password:z.string().min(5).max(20),
        //check password and password confirm
        confirmPassword: z.string()
    }).refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"], // path of error
      });
    
    //console.log(schema.parse({ password: "asdf4", confirmPassword: "asdf4" }))

    // connect zod with react hook form
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
      } = useForm<FieldValues>({
        resolver: zodResolver(schema) ,
        defaultValues:{
            name: "",
            email: "",
            password: "",
            emailVerified: "",
            phone: null,
            role: "",
            active: "",
            imgUrl: "",
            address: "",
            confirmPassword: ""
        }
      })

      const imgUrl = watch('imgUrl')
      const address = watch('address')
      const email = watch('email')
      const password = watch('password')
      const passwordConfirm = watch('confirmPassword')
      console.log(password,passwordConfirm)
      const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)
        axios.post('/api/add-new-user', data)
                .then(()=>{
                  toast.success("created new user.")
                  router.push('/dashboards/customers')
                  router.refresh()
                })
                .catch((err:any)=>{
                    toast.error('Email already exists !!!')
                })
                .finally(()=>{
                    setIsLoading(false)
                })
               
      }

      const setCustomValue = (id:string, value: any) =>{
        setValue(id,value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true
        })
    }
    const notify = () => toast.error("Event has been created.")

    return (
        <div className="px-2 ">
            <Toaster/>
            <button onClick={notify}>click</button>
            <div className="bg-slate-600 w-full h-auto rounded-md px-2 py-2 flex flex-col gap-2">
            <div className="grid grid-cols-2 gap-8">
                    <div className="col-span-1 flex flex-col ">
                        {/* upload image */}
                            <div>
                                <QuestionNotified 
                                    title="?"
                                    content="content"
                                />    
                            </div> 
                            <UploadImage 
                                value={imgUrl}
                                onChange = {(value) =>setCustomValue("imgUrl", value)}
                            /> 
                            
                    </div>
                    <div className="col-span-1 flex flex-col gap-1">
                        {/* user name */}
                    <div className="relative">
                        <InputCustomerId 
                            id="name"
                            register ={register}
                            title ="Username"
                            placeholder = "username"
                            type = "text"
                            errors ={errors}
                            disabled = {isLoading}
                        />
                        {errors.name && <span className="absolute top-12 left-0 text-[13px] text-red-600">{errors.name.message as string}</span>}
                    </div>
                    {/* password */}
                    {/* <div className="relative">
                    <InputCustomerId
                            id="password"
                            register ={register}
                            title ="Password"
                            placeholder = "password"
                            type = "password"
                            errors ={errors}
                            disabled = {isLoading}
                        />
                        {errors.password && <span className="absolute top-12 left-0 text-[13px] text-red-600">{errors.password.message as string}</span>}
                    </div> */}
                     <div className="relative">
                        <div className="  flex flex-col items-start justify-start gap-2 relative h-[70px]">
                        
                            <input
                                type="password"
                                {...register('password')}
                                placeholder="Password"
                                className=" peer absolute top-5 left-0 rounded-md px-2 py-1 w-full text-[14px] outline-none cursor-pointer bg-slate-500/60 focus:bg-white transition-all focus:text-slate-900 "
                            />
                                <label 
                                    className="
                                    peer-focus:text-white 
                                    peer-focus:font-bold  
                                    peer-focus:drop-shadow-xl  
                                    absolute 
                                    top-0 
                                    left-0 
                                    text-neutral-200 
                                    text-[15px]"
                                >
                                     Password
                                
                                </label>
                        </div>
                        {errors.password && <span className="absolute top-12 left-0 text-[13px] text-red-600">{errors.password.message as string}</span>}
                    </div>
                    
                    <div>
                        
                    </div>
                    {/* password confirm */}
                    <div className="relative">
                        <div className="  flex flex-col items-start justify-start gap-2 relative h-[70px]">
                        
                            <input
                                type="password"
                                {...register('confirmPassword')}
                                placeholder="Confirm Password"
                                className=" peer absolute top-5 left-0 rounded-md px-2 py-1 w-full text-[14px] outline-none cursor-pointer bg-slate-500/60 focus:bg-white transition-all focus:text-slate-900 "
                            />
                                <label 
                                    className="
                                    peer-focus:text-white 
                                    peer-focus:font-bold  
                                    peer-focus:drop-shadow-xl  
                                    absolute 
                                    top-0 
                                    left-0 
                                    text-neutral-200 
                                    text-[15px]"
                                >
                                    Confirm Password
                                
                                </label>
                        </div>
                        {errors.confirmPassword && <span className="absolute top-12 left-0 text-[13px] text-red-600">{errors.confirmPassword.message as string}</span>}
                    </div>
                    
                    <div>
                        
                    </div>
                    {/* email */}
                    <div className="relative">
                    <InputCustomerId 
                            id="email"
                            register ={register}
                            title ="Email"
                            placeholder = "email"
                            type = "text"
                            errors ={errors}
                            disabled = {isLoading}
                        />
                        {errors.email && <span className="absolute top-12 left-0 text-[13px] text-red-600">{errors.email.message as string}</span>}
                    </div>
                    {/* email verified */}
                    <div className="relative">
                    <InputCustomerId 
                            id="emailVerified"
                            register ={register}
                            title ="Email Verified"
                            placeholder = "email"
                            type = "text"
                            errors ={errors}
                            disabled = {isLoading}
                            question
                        />
                        {errors.emailVerified && <span className="absolute top-12 left-0 text-[13px] text-red-600">{errors.emailVerified.message as string}</span>}
                    </div>
                    
                      {/* phone */}
                    <div className="relative">
                        <div className="  flex flex-col items-start justify-start gap-2 relative h-[70px]">
                        
                            <input
                                type="number"
                                {...register('phone')}
                                placeholder="Phone"
                                className=" peer absolute top-5 left-0 rounded-md px-2 py-1 w-full text-[14px] outline-none cursor-pointer bg-slate-500/60 focus:bg-white transition-all focus:text-slate-900 "
                            />
                                <label 
                                    className="
                                    peer-focus:text-white 
                                    peer-focus:font-bold  
                                    peer-focus:drop-shadow-xl  
                                    absolute 
                                    top-0 
                                    left-0 
                                    text-neutral-200 
                                    text-[15px]"
                                >
                                    Phone
                                
                                </label>
                        </div>
                            {errors.phone && <span className="absolute top-12 left-0 text-[13px] text-red-600">{errors.phone.message as string}</span>}
                    </div>
                       {/* active */}
                       <div className="relative">
                       <SelectCustomer 
                            id="active"
                            register = {register}
                            title="Is Active ?"
                            errors = {errors}
                        />
                        {errors.active && <span className="absolute top-12 left-0 text-[13px] text-red-600">{errors.active.message as string}</span>}
                    </div>
                        
                        {/* admin */}
                        <div className="relative">
                        <SelectCustomer 
                            id="role"
                            register = {register}
                            title="Is Admin ?"
                            errors = {errors}
                        />
                            {errors.role && <span className="absolute top-12 left-0 text-[13px] text-red-600">{errors.role.message as string}</span>}
                        </div>
                        
                        {/* address */}
                        <div className="relative">
                            <div className="flex flex-col items-start justify-start  relative ">
                                <label htmlFor="address" className="text-neutral-200 text-[15px] ">Address</label>
                                <Textarea  
                                    {...register("address")} 
                                    className="
                                    outline-none 
                                    bg-slate-500/60 
                                    border-0 
                                    focus:bg-white 
                                    focus:border-0 
                                    h-full 
                                    mb-4" 

                                    placeholder="Address"
                                />
                            </div>
                            {errors.address && <span className="absolute top-[90%] left-0 text-[13px] text-red-600">{errors.address.message as string}</span>}
                        </div>
                       
                    </div>
            </div>
            <div>
                
            </div>
            <div>
                    
            </div>
            <button 
                onClick={handleSubmit(onSubmit)} 
                disabled ={isLoading ? true: false}
                className={cn(" text-[15px]  w-full  px-2  py-1  rounded  flex items-center justify-center  text-white  bg-slate-950  hover:text-neutral-200  hover:bg-slate-800/60 transition-all duration-300 ",
                    isLoading ? "cursor-not-allowed" :"cursor-pointer"
                )}
            >
                Add New
            </button>
            </div>
        </div>
    )
}

export default AddNewCustomer