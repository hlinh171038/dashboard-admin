"use client"

import { useCallback } from "react"
import Button from "./button"
import useLoginModal from "../hooks/useLoginModal"

const Navbar = () => {

    const loginModal = useLoginModal()


    const handleLogin = useCallback(()=>{
        loginModal.onOpen()
    },[loginModal])
    return (
        <div 
            className="bg-blue-600 w-screen h-[70px] flex gap-x-4 justify-between items-center px-4"
        >
            <div>logo</div>
            <div>menu</div>
            <div>
                <Button 
                    label="login"
                    onClick={handleLogin}
                  
                />
            </div>
        </div>
    )
}

export default Navbar