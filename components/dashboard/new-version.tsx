"use client"

import { BsFire } from "react-icons/bs";
import Button from "@/components/button"
import { IconType } from "react-icons/lib";

interface NewVersionProps {
    title: string;
    iconTitle: IconType;
    question: string;
    content1: string;
    content2: string;
    buttonTitle: string;
    buttonIcon:IconType
}

const NewVersion:React.FC<NewVersionProps> = ({
    title,
    iconTitle:IconTitle,
    question,
    content1,
    content2,
    buttonIcon,
    buttonTitle
}) => {

    return (
        <div className="bg-slate-600 hover:bg-slate-500/40 transition rounded-md text-white p-2 flex flex-col gap-2">
            <div className="flex justify-start items-center text-white gap-2">
                <IconTitle className="w-6 h-6 " />
                <div className="font-bold text-md">
                    {title}
                </div>
            </div>
            <div>
                <p className="text-[10px] text-gray-300 ">{question}</p>
            </div>
            <div className="text-[13px]">
                <p>{content1}</p>
            </div>
            <div className="text-[13px]">
                <p>{content2}</p>
            </div>
            <div>
                <Button 
                    outline
                    icon={buttonIcon}
                    label={buttonTitle}
                    onClick={()=>{}}
                />
            </div>
        </div>
    )
}

export default NewVersion