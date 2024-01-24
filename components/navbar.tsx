"use client"

import { useCallback } from "react"

import useLoginModal from "../app/hooks/useLoginModal"

import Button from "./button"
import useRegister from "@/app/hooks/useRegisterModal"
import { User } from "@prisma/client"
import { signOut } from "next-auth/react"

interface NavProps {
    name: string |undefined | null
}

const Navbar:React.FC<NavProps>= ({
    name
}) => {

    const loginModal = useLoginModal()
    const registerModal = useRegister()
   

    const handleLogin = useCallback(()=>{
        loginModal.onOpen()
    },[loginModal])

    const handleRegister = useCallback(()=>{
        registerModal.onOpen()
    },[registerModal])

    const handleSignOut = useCallback(()=>{
       signOut()
    },[])

    return (
        <div 
            className="bg-blue-600 w-full h-[70px] flex gap-x-4 justify-between items-center px-4"
        >
            <div>logo</div>
            <div>menu</div>
            <div>
            
                {/* <Button 
                    label="login"
                    onClick={handleLogin}
                  
                /> */}
                <div>{name && name}</div>
                <Button 
                        label="login"
                        onClick={handleLogin}
                    
                    />
                    <Button 
                        label="Sign Out"
                        onClick={handleSignOut}
                    
                    />
                
                <Button 
                        label="Register"
                        onClick={handleRegister}
                    
                    />
            </div>
        </div>
    )
}

export default Navbar