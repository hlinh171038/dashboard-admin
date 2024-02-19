"use client"

import Button from "@/components/button"
import { cn } from "@/lib/utils"

import Image from "next/image"

import '@/app/globals.css'

import InputCustomerId from "@/components/customers/input"
import SelectCustomer from "@/components/customers/select"
import { useParams, usePathname } from "next/navigation"
import { getuserById } from "@/app/actions/getUserById"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { User } from "@prisma/client"
import { error } from "console"
import { MdCopyAll } from "react-icons/md";
import { useCallback, useState } from "react"
import { Toaster, toast } from "sonner"
import Radio from "@/components/customers/radio"
import axios from "axios"
import UploadImage from "@/components/customers/upload-img"
import { Value } from "@radix-ui/react-select"
import { MdAddPhotoAlternate } from "react-icons/md";




interface DetailCustomerProps {
    user?: User[] | null | any
}

const DetailCustomer:React.FC<DetailCustomerProps> = ({
    user=[]
}) =>{
    const [isLoading,setisLoading] = useState(false)


   const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
        id: user?.id,
        name: user?.name,
        email:user?.email,
        password: user?.hashedPassword,
        emailVerified: user?.emailVerified,
        phone: user?.phone,
        role: user?.role,
        active: user?.active,
        imgUrl: user?.image,
        address: user?.address,
        confirmPassword: ""
    }
  })


  const id = watch('id');
  const name = watch('name');
  const email = watch('email');
  const password = watch('password');
  const emailVerified = watch('emailVerified');
  const phone = watch('phone');
  const role = watch('role');
  const active = watch('active');
  const imgUrl = watch('imgUrl');
  const address = watch('address')
  console.log(id)
  
  const onSubmit: SubmitHandler<FieldValues> = () => {
    setisLoading(true)
    axios.post('/api/updated-user',{
        id,
        name,
        email,
        emailVerified,
        phone,
        role,
        active,
        imgUrl,
        address
    })
        .then((res)=>{
            toast.success('User is uplaoded')
        })
        .catch((err:any)=>{
            toast.error('Some thing went wrong !!')
        })
        .finally(()=>{
            setisLoading(false)
        })

  }

  //handle coppy id

  const handleCopy =(id:string) =>{
    navigator.clipboard.writeText(id)
    toast.success("coppied to clipboard")
  }


  // set customer 
  const setCustomValue = (id:string, value: any) =>{
    setValue(id,value, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true
    })
}
//    console.log(customerById)
    return (
        <div className="grid grid-cols-3 gap-2 px-2">
            
           <div className=" rounded-md col-span-1 flex flex-col items-center justify-start gap-4">
            <div className="relative w-full  ">
                <div className="absolute top-[48%] left-[48%] hover:z-50 transition-all duration-300 flex flex-col items-center justify-center gap-2">
                    <MdAddPhotoAlternate className="w-6 h-6 text-white" />
                   
                </div>
                <UploadImage 
                    value={imgUrl}
                    onChange={(value)=>setCustomValue('imgUrl', value)}
                    update
                />
            </div>
            <div className="flex items-center justify-between bg-slate-600/80 rounded-md px-2 py-1 w-full">
                <div className="flex items-center justify-center text-[15px]">
                    <div className="text-neutral-200">ID : </div>
                    <div className="text-neutral-400"> {id}</div>
                </div>
                <div>
                    <MdCopyAll 
                    className="w-4 h-4 hover:text-white cursor-pointer text-neutral-200" 
                    onClick={()=>handleCopy(id)}/>
                </div>
            </div>
           </div>
           <div className="bg-slate-600 rounded-md col-span-2 px-2 py-4">
                <form>
                    <InputCustomerId
                         id="name"
                         title ="username"
                         register={register}
                         placeholder = "username"
                         type = "text"
                         errors={errors}
                         defaultValues={name}
                    />
                    <InputCustomerId
                        id="email" 
                        title ="email"
                        register={register}
                        placeholder = "email"
                        type = "text"
                        errors={errors}
                        defaultValues={email}
                    />
                     <InputCustomerId
                        id="emailVerified" 
                        title ="emailVerified"
                        register={register}
                        placeholder = "emailVerified"
                        type = "text"
                        errors={errors}
                        defaultValues={emailVerified}
                    />
                    <InputCustomerId 
                        id="phone"
                        title ="phone"
                        register={register}
                        placeholder = "phone"
                        type = "text"
                        errors={errors}
                        defaultValues={phone}
                    />
                    <InputCustomerId 
                        id="address"
                        title ="address"
                        register={register}
                        placeholder = "address"
                        type = "text"
                        errors={errors}
                        defaultValues={address}
                    />
                    <Radio 
                        id="active"
                        title1="yes"
                        title2="no"
                        register={register}
                        errors={errors}
                        defaultValues={active}
                    />
                    <Radio 
                        id="role"
                        title1="user"
                        title2="admin"
                        register={register}
                        errors={errors}
                       
                    />
                   <input 
                        type="submit"
                        value="Update user"
                        onClick={handleSubmit(onSubmit)}
                        disabled = {isLoading}
                        className={cn("w-full px-2 py-1 rounded flex items-center justify-center text-white bg-slate-950 hover:text-neutral-200 hover:bg-slate-800/60 transition-all duration-300 cursor-pointer",
                                    isLoading && 'cursor-not-allowed'
                                )}
                   />
                </form>
           </div>
        </div>
    )
}

export default DetailCustomer
