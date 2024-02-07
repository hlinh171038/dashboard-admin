"use client"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"

  import { BsFillQuestionOctagonFill } from "react-icons/bs";
  

interface QuestionNotifiedProps {
    content: string,
    title: string,
}

const QuestionNotified:React.FC<QuestionNotifiedProps> = ({
    content,
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
                className="bg-neutral-200 text-slate-600 text-[13px]"
                >
                    {content}
            </PopoverContent>
        </Popover>

    )
}

export default QuestionNotified