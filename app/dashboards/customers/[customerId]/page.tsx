import Button from "@/components/button"
import { cn } from "@/lib/utils"
import Image from "next/image"

import '@/app/globals.css'

import InputCustomerId from "@/components/customers/input"
import SelectCustomer from "@/components/customers/select"

const DetailCustomer = () =>{

   
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
                         title ="username"
                         placeholder = "username"
                         type = "text"
                    />
                    <InputCustomerId 
                        title ="email"
                        placeholder = "email"
                        type = "text"
                    />
                    <InputCustomerId 
                        title ="password"
                        placeholder = "password"
                        type = "password"
                    />
                    <InputCustomerId 
                        title ="phone"
                        placeholder = "phone"
                        type = "text"
                    />
                    <InputCustomerId 
                        title ="address"
                        placeholder = "address"
                        type = "text"
                    />
                    <SelectCustomer
                        title = "Is Admin ?"
                        />
                    <SelectCustomer
                        title="Is Active ?"
                    />
                   <input 
                        type="submit"
                        value="Update user"
                        className="w-full px-2 py-1 rounded flex items-center justify-center text-white bg-slate-950 hover:text-neutral-200 hover:bg-slate-800/60 transition-all duration-300"
                   />
                </form>
           </div>
        </div>
    )
}

export default DetailCustomer