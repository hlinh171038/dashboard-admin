"use client"

import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import Input from "../../components/imputs/input"
import useLoginModal from "../hooks/useLoginModal"
import Modals from "./modals"
import { useState } from "react"
import {signIn} from 'next-auth/react'
import {toast} from 'react-hot-toast'
import { useRouter } from "next/navigation"

const LoginModals = () =>{
    const loginModal = useLoginModal()
    const router = useRouter()

    const [isLoading,setIsLoading] = useState(false)
     
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm<FieldValues>({
        defaultValues: {
            name: "",
            email: "",
            password: ""
        }
      })
      const onSubmit: SubmitHandler<FieldValues> = (data) => {

        setIsLoading(true)

        signIn('Credentials',{
            ...data,
            redirect: false
        })
        .then((callback) =>{
            setIsLoading(true)

            if(callback?.ok) {
                toast.success("Logined.");
                router.refresh();
                loginModal.onClose()
            }

            if(callback?.error) {
                toast.error("Some thing went wrong !")
            }

        })
      }

    const content = (
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
        </div>
    )
    return (
        <Modals
                isOpen={loginModal.isOpen}
                onClose={loginModal.onClose}
                onSubmit={handleSubmit(onSubmit)}
                onOpen = {loginModal.onOpen}
                title="login"
                content= {content}
           />
    )
}

export default LoginModals