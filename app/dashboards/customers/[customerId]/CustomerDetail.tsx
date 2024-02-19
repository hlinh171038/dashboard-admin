"use client"

import Button from "@/components/button"
import { cn } from "@/lib/utils"

import Image from "next/image"

import '@/app/globals.css'

import InputCustomerId from "@/components/customers/input"
import SelectCustomer from "@/components/customers/select"
import { usePathname } from "next/navigation"
import { getuserById } from "@/app/actions/getUserById"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { User } from "@prisma/client"
import { error } from "console"



interface DetailCustomerProps {
    user?: User[] | null | any
}

const DetailCustomer:React.FC<DetailCustomerProps> = ({
    user=[]
}) =>{
  

    console.log(user)
   const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
        name: user?.name,
        email:user?.email,
        password: user?.password,
        emailVerified: user?.emailVerified,
        phone: user?.phone,
        role: user?.role,
        active: user?.active,
        imgUrl: user?.imgUrl,
        address: user?.address,
        confirmPassword: ""
    }
  })

  const name = watch('name');
  const email = watch('email');
  const password = watch('password');
  const emailVerified = watch('emailVerified');
  const phone = watch('phone');
  const role = watch('role');
  const active = watch('active');
  const imgUrl = watch('imgUrl');
  const address = watch('address')
  
  console.log(name)
  const onSubmit: SubmitHandler<FieldValues> = (data) => console.log(data)

  console.log(watch("example")) // watch input value by passing the name of it


//    console.log(customerById)
    return (
        <div className="grid grid-cols-3 gap-2 px-2">
           <div className=" rounded-md col-span-1 flex items-start justify-center">
            <Image 
                src='/avatar-empty.png'
                width="300"
                height="300"
                alt="Avatar"
            />
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
                        id="password"
                        title ="password"
                        register={register}
                        placeholder = "password"
                        type = "password"
                        errors={errors}
                        defaultValues={password}
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
                    {/* <SelectCustomer
                        title = "Is Admin ?"
                        />
                    <SelectCustomer
                        title="Is Active ?"
                    /> */}
                   <input 
                        type="submit"
                        value="Update user"
                        onClick={handleSubmit(onSubmit)}
                        className="w-full px-2 py-1 rounded flex items-center justify-center text-white bg-slate-950 hover:text-neutral-200 hover:bg-slate-800/60 transition-all duration-300"
                   />
                </form>
           </div>
        </div>
    )
}

export default DetailCustomer
