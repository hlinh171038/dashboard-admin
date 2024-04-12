"use client"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"

  import { BsFillQuestionOctagonFill } from "react-icons/bs";
  

interface QuestionNotifiedProps {
    content: string,
    content2?: string,
    content3?: string,
    content4?: string,
    content5?: string,
    title: string,
}

const QuestionNotified:React.FC<QuestionNotifiedProps> = ({
    content,
    content2,
    content3,
    content4,
    content5,
    title
}) =>{
    return (
        <Popover>
            <PopoverTrigger  >
                    <BsFillQuestionOctagonFill className="w-3 h-3" />
            </PopoverTrigger>
            <PopoverContent  
                side="bottom" 
                align="start" 
                sideOffset={4}
                className="bg-neutral-100 text-slate-900 text-[13px] px-4 py-2 rounded-md mr-2"
                >
                    <div>{content}</div>
                    <div>{content2 && content2}</div>
                    <div>{content3 && content3}</div>
                    <div>{content4 && content4}</div>
                    <div>{content5 && content5}</div>
            </PopoverContent>
        </Popover>

    )
}

export default QuestionNotified