"use client"

import { useState } from "react"
import useRegister from "../hooks/useRegisterModal"
import Modals from "./modals"
import Input from "../../components/imputs/input"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import axios from "axios"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

const RegisterModal = () =>{
    const useRegisterModal = useRegister()
    const [isLoading,setIsLoading] = useState(false)
    const router = useRouter()

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm<FieldValues>({
        defaultValues :{
            name: "",
            email: "",
            hashedPassword: "",
        }
      })
      const onSubmit: SubmitHandler<FieldValues> = (data) => {
        axios.post('/api/register', data)
                .then((res: any)=>{
                    useRegisterModal.onClose()
                    toast.success("success !!!")
                    router.refresh();
                })
                .catch((err:any)=>{
                    toast.error("Some thing went wrong !!!")
                    
                })
      }


    const content = (
        <div>
            <Input
                id="name"
                type="text"
                label="name"
                register={register}
                required
                disabled ={isLoading}
                errors={errors}
            />
            <Input
                id="email"
                type="email"
                label="email"
                register={register}
                required
                disabled ={isLoading}
                errors={errors}
            />
            <Input
                id="hashedPassword"
                type="hashedPassword"
                label="hashedPassword"
                register={register}
                required
                disabled ={isLoading}
                errors={errors}
            />
        </div>
    )

    const footer = (
        <div>
            footer
        </div>
    )

    return (
        <Modals 
            isOpen={useRegisterModal.isOpen}
            onClose = {useRegisterModal.onClose}
            onSubmit ={handleSubmit(onSubmit)}
            title="Register"
            content = {content}
            onOpen = {useRegisterModal.onOpen}
            footer={footer}
        />
    )
}

export default RegisterModal