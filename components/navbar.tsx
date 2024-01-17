"use client"

import { useCallback } from "react"

import useLoginModal from "../app/hooks/useLoginModal"
import { 
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger,
 } from "./ui/menubar"
import Button from "./button"
import useRegister from "@/app/hooks/useRegisterModal"

const Navbar = () => {

    const loginModal = useLoginModal()
    const registerModal = useRegister()


    const handleLogin = useCallback(()=>{
        loginModal.onOpen()
    },[loginModal])

    const handleRegister = useCallback(()=>{
        registerModal.onOpen()
    },[registerModal])
    return (
        <div 
            className="bg-blue-600 w-screen h-[70px] flex gap-x-4 justify-between items-center px-4"
        >
            <div>logo</div>
            <div>menu</div>
            <div>
            <Menubar>
            <MenubarMenu>
                <MenubarTrigger>User Name</MenubarTrigger>
                <MenubarContent>
                <MenubarItem>
                    New Tab <MenubarShortcut>⌘T</MenubarShortcut>
                </MenubarItem>
                <MenubarItem>New Window</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>
                    <Button 
                        label="login"
                        onClick={handleLogin}
                    
                    /> 
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem>
                <Button 
                        label="Register"
                        onClick={handleRegister}
                    
                    />
                </MenubarItem>
                </MenubarContent>
            </MenubarMenu>
            </Menubar>
                {/* <Button 
                    label="login"
                    onClick={handleLogin}
                  
                /> */}
            </div>
        </div>
    )
}

export default Navbar