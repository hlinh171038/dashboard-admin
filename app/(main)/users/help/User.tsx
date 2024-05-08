"use client"

import Contact from "@/components/contactUs/contact"
import Footer from "@/components/contactUs/footer"
import ListHelp from "@/components/contactUs/list-help"
import Mail from "@/components/contactUs/mail"
import { useRouter } from "next/navigation"
import { useEffect } from "react"



interface UserProps {
    currentUser: any;
    user:  any
}

const User:React.FC<UserProps> = ({
    currentUser,
    user =[]
}) =>{
    const router = useRouter()
    //handle ctr + z
  useEffect(() => {
    const handleKeyDown = (event:any) => {
      if (event.ctrlKey === true && event.key === 'z') {
        router.push('/history')
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [router]);
    return (
        <div
            className=" flex flex-col gap-2"
        >
            
            <div  className="px-2 grid grid-cols-6 gap-2">
                <div
                    className="col-span-4  text-neutral-400 text-[14px]"
                >
                    <Mail
                        
                    />
                    <Contact
                        currentUser = {currentUser}
                        user = {user}
                    />
                </div>
                <div className="col-span-2 bg-slate-600 rounded-md text-neutral-100 text-[15px] px-2 py-4">
                    <div className="text-md capitalize my-2">How Can We help?</div>
                    <ListHelp />
                </div>
            </div>
            <div className="mt-4">
                <Footer/>
            </div>
        </div>
    )
}

export default User