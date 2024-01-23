"use client"

import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import Input from "../../components/imputs/input"
import useLoginModal from "../hooks/useLoginModal"
import Modals from "./modals"
import { useCallback, useState } from "react"
import {signIn} from 'next-auth/react'
import {toast} from 'react-hot-toast'
import { useRouter } from "next/navigation"
import Button from "@/components/button"

import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link"
import useRegister from "../hooks/useRegisterModal"

const LoginModals = () =>{
    const loginModal = useLoginModal()
    const registerModal = useRegister();
    const router = useRouter()

    const [isLoading,setIsLoading] = useState(false)

    const handleChangeIntoRegister = useCallback(()=>{
        loginModal.onClose();
        registerModal.onOpen();
    },[loginModal,registerModal])
     
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
               loginModal.onClose();
               router.refresh()
               toast.success('Logged in successfully!')
           }
       } )
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

    const footer = (
        <div className="flex flex-col gap-2 px-2 ">

            <Button
                label="Sign In with Github"
                outline
                onClick={()=>signIn('github')}
                icon={FaGithub}
            />
            <Button 
                label="Sign In with Google"
                outline
                onClick={()=>signIn('google')}
                icon={FcGoogle}
            />
            <div>
                <p
                    className="text-neutral-600 text-sm text-center mr-1"
                >Sign In with Your account. If not 
                    <span 
                        onClick={handleChangeIntoRegister}
                        className="underline px-2 cursor-pointer hover:text-blue-600"
                    >
                        register
                    </span>
                </p>
            </div>
        </div>
    )
    return (
        <Modals
                isOpen={loginModal.isOpen}
                onClose={loginModal.onClose}
                onSubmit={handleSubmit(onSubmit)}
                onOpen = {loginModal.onOpen}
                title="Sign In"
                content= {content}
                footer = {footer}
           />
    )
}

export default LoginModals