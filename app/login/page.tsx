"use client"

import Input from "@/components/imputs/input"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { toast } from "sonner"

const Login = () =>{
    const router = useRouter()

    const [isLoading,setIsLoading] = useState(false)
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm<FieldValues>({
        defaultValues: {
            email: "",
            password: ""
        }
      })
      const onSubmit: SubmitHandler<FieldValues> = (data) => {

        setIsLoading(true)

        signIn('credentials',
        {...data, redirect: false
       })
       .then((callback) => {
           if (callback?.error) {
               toast.error(callback.error)
           }

           if(callback?.ok && !callback?.error) {
            
               router.refresh()
               toast.success('Logged in successfully!')
               router.push('/dashboards/home')
           }
       } )
      }
    return (
        <div>
             <Input
                id="email"
                type="email"
                label="email"
                register= {register}
                disabled ={ isLoading}
                required
                errors={errors}
            />
            <Input 
                id="password"
                type="password"
                label="password"
                register={register}
                disabled={isLoading}
                required
                errors={errors}

            />
             <button
                        onClick={handleSubmit(onSubmit)}
                        className="text-white bg-blue-600 py-1.5 rounded-md flex items-center justify-center w-full hover:bg-blue-500 transition-colors"
                    >
                       Login
                    </button>
        </div>
    )
}

export default Login