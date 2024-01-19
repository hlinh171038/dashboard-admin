"use client"

import { useState } from "react"
import useRegister from "../hooks/useRegisterModal"
import Modals from "./modals"
import Input from "../../components/imputs/input"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import axios from "axios"

const RegisterModal = () =>{
    const useRegisterModal = useRegister()
    const [isLoading,setIsLoading] = useState(false)

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm<FieldValues>({
        defaultValues :{
            email: "",
            password: "",
        }
      })
      const onSubmit: SubmitHandler<FieldValues> = (data) => {
        axios.post('/api/register', data)
                .then((res: any)=>{
                    console.log(res.data)
                })
                .catch((err:any)=>{
                    console.log(err)
                })
      }


    const content = (
        <div>
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
                id="password"
                type="password"
                label="password"
                register={register}
                required
                disabled ={isLoading}
                errors={errors}
            />
            <Input
                id="passwordConfirm"
                type="password"
                label="passwordConfirm"
                register={register}
                required
                disabled ={isLoading}
                errors={errors}
            />
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
        />
    )
}

export default RegisterModal