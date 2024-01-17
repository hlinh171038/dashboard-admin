"use client"

import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import Input from "../../components/imputs/input"
import useLoginModal from "../hooks/useLoginModal"
import Modals from "./modals"
import { useState } from "react"

const LoginModals = () =>{
    const loginModal = useLoginModal()

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
      const onSubmit: SubmitHandler<FieldValues> = (data) => console.log(data)

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
                onOpen = {loginModal.onOpen}
                title="login"
                content= {content}
           />
    )
}

export default LoginModals