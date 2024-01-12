"use client"

import useLoginModal from "../hooks/useLoginModal"
import Modals from "./modals"

const LoginModals = () =>{
    const loginModal = useLoginModal()
    return (
        <Modals
                isOpen={loginModal.isOpen}
                onClose={loginModal.onClose}
                onOpen = {loginModal.onOpen}
                title="login"
           />
    )
}

export default LoginModals