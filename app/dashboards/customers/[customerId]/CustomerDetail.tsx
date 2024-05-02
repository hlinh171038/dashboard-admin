"use client"

import Button from "@/components/button"
import { cn } from "@/lib/utils"

import Image from "next/image"

import '@/app/globals.css'

import InputCustomerId from "@/components/customers/input"
import SelectCustomer from "@/components/customers/select"
import { useParams, usePathname, useRouter } from "next/navigation"
import { getuserById } from "@/app/actions/getUserById"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { User } from "@prisma/client"
import { error } from "console"
import { MdCopyAll } from "react-icons/md";
import { useCallback, useEffect, useState } from "react"
import { Toaster, toast } from "sonner"
import Radio from "@/components/customers/radio"
import axios from "axios"
import UploadImage from "@/components/customers/upload-img"
import { Value } from "@radix-ui/react-select"
import { MdAddPhotoAlternate } from "react-icons/md";
import QuestionNotified from "@/components/question-notified"
import { GoDotFill } from "react-icons/go";
import { AiOutlineLoading3Quarters } from "react-icons/ai"




interface DetailCustomerProps {
    userById?: User[] | null | any;
    currentUser: any;
    user: User[] | any
}

const DetailCustomer:React.FC<DetailCustomerProps> = ({
    user=[],
    currentUser,
    userById
}) =>{
    const [isLoading,setisLoading] = useState(false)
    const[check,setCheck] = useState(true)
    const router = useRouter()

  
   const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
        id: userById?.id,
        name: userById ?.name,
        email:userById?.email,
        password: userById?.hashedPassword,
        emailVerified: userById?.emailVerified,
        phone: userById?.phone,
        role: userById?.role,
        active: userById?.active,
        imgUrl: userById?.image,
        address: userById?.address,
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
            toast.success('User is uploaded')
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

useEffect(()=>{
    setCheck(true)
    if(userById.email !== currentUser.user.email ){
        setCheck(true)
    }
    user && user.forEach((item:any)=>{
      
        console.log(item.email ===currentUser.user.email)
        //console.log(currentUser.email)
        if(item.email == currentUser.user.email ){

            if(item.role ==='yes' && item.permission !=='read'){
                console.log('try')
                setCheck(false)
            }
        }
    })
    
},[currentUser.user.email, userById,user])
console.log(check)
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
                    disabled
                />
                <div
                    className="flex item-center justify-start gap-1 "
                >
                    <div className="flex items-center justify-center">
                        <GoDotFill className={cn("w-4 h-4 ",
                                                active ? 'text-green-600': 'text-red-600'
                                            )}/>
                    </div>
                    <div className="text-[14px] text-neutral-100">{active ?'available for work': 'offline'}</div>
                </div>
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
                <div className="flex items-center justify-between">
                
                <QuestionNotified 
                    content="
                        just be update user by admin's role
                    "
                    title="linh thai"
                />
                {check && (<div className="w-full text-end text-red-600 text-[14px]">Only Updated with exercute permission</div>)}
                </div>
                <form>
                    <InputCustomerId
                         id="name"
                         title ="username"
                         register={register}
                         placeholder = "username"
                         type = "text"
                         errors={errors}
                         defaultValues={name}
                         disabled={check}
                    />
                    <InputCustomerId
                        id="email" 
                        title ="email"
                        register={register}
                        placeholder = "email"
                        type = "text"
                        errors={errors}
                        defaultValues={email}
                        disabled={check}
                    />
                     <InputCustomerId
                        id="emailVerified" 
                        title ="emailVerified"
                        register={register}
                        placeholder = "emailVerified"
                        type = "text"
                        errors={errors}
                        defaultValues={emailVerified}
                        disabled={check}
                    />
                    <InputCustomerId 
                        id="phone"
                        title ="phone"
                        register={register}
                        placeholder = "phone"
                        type = "text"
                        errors={errors}
                        defaultValues={phone}
                        disabled={check}
                    />
                    <div
                        className="flex flex-col justify-start gap-2 text-neutral-200 text-[15px] mb-4"
                    >
                        <div>
                            <div>Role</div>
                            <div className="text-[13px] text-neutral-400 mt-[-2px]">Can be change by Admin</div>
                        </div>
                        <div className="bg-slate-500/60 inline-block px-2 py-1 rounded-md text-[14px]">{role === 'no' ? "User": 'Admin'}</div>
                    </div>
                    <InputCustomerId 
                        id="address"
                        title ="address"
                        register={register}
                        placeholder = "address"
                        type = "text"
                        errors={errors}
                        defaultValues={address}
                        disabled={check}
                    />
                  
                   {/* <input 
                        type="submit"
                        value="Update User"
                        onClick={handleSubmit(onSubmit)}
                        disabled = {isLoading || check}
                        className={cn("w-full px-2 py-1 rounded flex items-center justify-center text-[15px] text-white bg-[#4FA29E] hover:text-neutral-200 hover:opacity[0.7] transition-all duration-300 cursor-pointer",
                                    isLoading && 'cursor-not-allowed', check && 'cursor-not-allowed'
                                )}
                   /> */}
                    <button 
                        onClick={handleSubmit(onSubmit)}
                        disabled = {isLoading || check}
                        className={cn("w-full px-2 py-1 rounded flex items-center justify-center text-[15px] text-white bg-[#4FA29E] hover:text-neutral-200 hover:opacity[0.7] transition-all duration-300 cursor-pointer",
                                    isLoading && 'cursor-not-allowed', check && 'cursor-not-allowed'
                                )}
                        > 
                        Update Product
                        {isLoading ?  <AiOutlineLoading3Quarters className="animate-spin h-5 w-5 "/>:<div className="w-5 h-5"></div>}
                    </button>
                </form>
           </div>
        </div>
    )
}

export default DetailCustomer
