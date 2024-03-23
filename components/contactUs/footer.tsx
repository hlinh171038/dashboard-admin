"use client"
import { IoMailOpenOutline } from "react-icons/io5";
import { IoLogoFacebook } from "react-icons/io";
import { IoLogoInstagram } from "react-icons/io5";
import { MdOutlinePhoneInTalk } from "react-icons/md";

const Footer =() =>{
    return (
        <div className="grid grid-cols-4 gap-2 items-start justify-start px-4">
            <div  className="col-span-1 flex flex-col gap-2">
                <div className="text-[17px] text-white capitalize">get started</div>
                <div className="text-[14px] font-thin text-neutral-400 underline cursor-pointer transition-all duration-300">
                    <div className="hover:text-white">Add new user</div>
                    <div className="hover:text-white">All abount dashboard</div>
                    <div className="hover:text-white">Upgrade dashboard</div>
                </div>
            </div>
            <div className="col-span-1 flex flex-col gap-2">
                <div className="text-[17px] text-white capitalize">manager account </div>
                <div className="text-[14px] font-thin text-neutral-400 underline cursor-pointer transition-all duration-300">
                    <div  className="hover:text-white">Loggined and out of dashboard</div>
                    <div  className="hover:text-white">find out role</div>
                    <div  className="hover:text-white">administrator</div>
                    <div  className="hover:text-white">change email</div>
                </div>
            </div>
            <div className="col-span-1 flex flex-col gap-2 justify-end">
                <div className="text-[17px] text-white capitalize">find and save</div>
                <div className="text-[14px] font-thin text-neutral-400 underline cursor-pointer transition-all duration-300">
                    <div  className="hover:text-white">download image</div>
                    <div  className="hover:text-white">find  all page</div>
                    <div  className="hover:text-white">save prduct data</div>
                    <div  className="hover:text-white">save customer date</div>
                </div>
            </div>
            <div className="col-span-1 flex flex-col gap-2 justify-end">
                <div className="text-[17px] text-white capitalize">Contact Us</div>
                <div className="text-[14px] font-thin text-neutral-400 underline cursor-pointer transition-all duration-300">
                    <div  className="hover:text-white flex items-center justify-start gap-2"> 
                        <IoLogoFacebook className="w-4 h-4" />
                        <span>Facebook</span>
                    </div>
                    <div  className="hover:text-white flex items-center justify-start gap-2">
                        <IoMailOpenOutline className="w-4 h-4" />
                        <span>Email</span>
                    </div>
                    <div  className="hover:text-white flex items-center justify-start gap-2">
                        <MdOutlinePhoneInTalk className="w-4 h-4" />
                        <span>Phone</span>
                    </div>
                    <div  className="hover:text-white flex items-center justify-start gap-2">
                        <IoLogoInstagram className="w-4 h-4" />
                        <span>Instagram</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer