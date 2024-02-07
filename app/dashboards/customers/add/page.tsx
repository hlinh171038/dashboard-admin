"use client"

import InputCustomerId from "@/components/customers/input"
import SelectCustomer from "@/components/customers/select"
import UploadImage from "@/components/customers/upload-img"
import { Textarea } from "@/components/ui/textarea"
import axios from "axios"
import { useState } from "react"

import { useForm, SubmitHandler, FieldValues } from "react-hook-form"
const AddNewCustomer = () =>{

    const [isLoading,setIsLoading] = useState(false)

    
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
      } = useForm<FieldValues>({
        defaultValues:{
            name: "",
            email: "",
            password: "",
            phone: "",
            role: "",
            active: "",
            imgUrl: "",
            address: ""
        }
      })

      const imgUrl = watch('imgUrl')
      const address = watch('address')
      const email = watch('email')
      console.log(address)
      const onSubmit: SubmitHandler<FieldValues> = (data) => {
        console.log(data)
        axios.post('/api/add-new-user', data)
                .then((res: any)=>{
                   console.log(res.data)
                })
                .catch((err:any)=>{
                   
                    console.log(err)
                })
      }

      const setCustomValue = (id:string, value: any) =>{
        setValue(id,value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true
        })
    }
    

    return (
        <div className="px-2 ">
            <div className="bg-slate-600 w-full h-auto rounded-md px-2 py-2 flex flex-col gap-2">
            <div className="grid grid-cols-2 gap-8">
                    <div className="col-span-1 flex flex-col gap-1">
                       
                        
                      
                       
                        {/* upload image */}
                        
                            <UploadImage 
                                value={imgUrl}
                                onChange = {(value) =>setCustomValue("imgUrl", value)}
                            />
                      
                       
                        
                    </div>
                    <div className="col-span-1 flex flex-col gap-1">
                    <InputCustomerId 
                            id="name"
                            register ={register}
                            title ="Username"
                            placeholder = "username"
                            type = "text"
                            errors ={errors}
                            disabled = {isLoading}
                        />
                    <InputCustomerId
                            id="password"
                            register ={register}
                            title ="Password"
                            placeholder = "password"
                            type = "password"
                            errors ={errors}
                            disabled = {isLoading}
                        />
                    <div className="  flex flex-col items-start justify-start gap-2 relative h-[70px]">
                       
                        <input
                            type="password"
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
                    <div>
                        
                    </div>
                    <InputCustomerId 
                            id="email"
                            register ={register}
                            title ="Email"
                            placeholder = "email"
                            type = "text"
                            errors ={errors}
                            disabled = {isLoading}
                        />
                    <InputCustomerId 
                            id="emailVerified"
                            register ={register}
                            title ="Email Verified"
                            placeholder = "email"
                            type = "text"
                            errors ={errors}
                            disabled = {isLoading}
                        />
                      
                        <InputCustomerId 
                            id="phone"
                            register ={register}
                            title ="Phone"
                            placeholder = "phone"
                            type = "text"
                            errors ={errors}
                            disabled = {isLoading}
                        />
                        <SelectCustomer 
                            id="active"
                            register = {register}
                            title="Is Active ?"
                            errors = {errors}
                        />
                        {/* admin */}
                        <SelectCustomer 
                            id="role"
                            register = {register}
                            title="Is Admin ?"
                            errors = {errors}
                        />
                        {/* address */}
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
                    </div>
            </div>
            <div>
                
            </div>
            <div>
                    
            </div>
            <button 
                onClick={handleSubmit(onSubmit)} 
                className="
                text-[15px] 
                w-full 
                px-2 
                py-1 
                rounded 
                flex 
                items-center 
                justify-center 
                text-white 
                bg-slate-950 
                hover:text-neutral-200 
                hover:bg-slate-800/60 
                transition-all 
                duration-300"
            >
                Add New
            </button>
            </div>
        </div>
    )
}

export default AddNewCustomer