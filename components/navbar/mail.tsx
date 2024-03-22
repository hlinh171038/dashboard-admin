"use client"

import Image from "next/image"


interface MailContentProps {
    mail: any
}
const MailContent:React.FC<MailContentProps> = ({
    mail
}) =>{
    console.log(mail)
    return (
        <div className="text-[14px] ">
            <div>All email</div>
            <div>
                <div className="flex items-center justify-start gap-2">
                    <Image 
                        width={40}
                        height={40}
                        src={mail.image ? mail.image : '/avatar.png'}
                        alt="avatar"
                    />
                    <div></div>
                    <div>{ new Date(mail.createdAt).toLocaleString()}</div>
                </div>
            </div>
        </div>
    )
}

export default MailContent