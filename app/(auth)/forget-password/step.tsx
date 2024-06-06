import Button from '@/components/button';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { FaGithub, FaPlay } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { IoMdStar } from 'react-icons/io';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { RiDoubleQuotesL, RiDoubleQuotesR } from 'react-icons/ri';
import { IoFingerPrintOutline } from "react-icons/io5";
// import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
// import { z } from "zod"
// import { zodResolver } from '@hookform/resolvers/zod';
// import Input from '@/components/imputs/input';
import { useRouter } from 'next/navigation';
import Step1 from './step-1';
import { cn } from '@/lib/utils';
import Step2 from './step-2';
import Step3 from './step-3';
import Step4 from './step-4';

interface Props {
    step: number;
    // step2: number;
    // step3: number;
    // step4: number;
}

const Step:React.FC<Props> = ({
    step,
    // step2,
    // step3,
    // step4
}) => {
    const [content,setContent] = useState<React.ReactNode>(null)
    const [imageIndex,setImageIndex] = useState<number>(0)
    const router = useRouter()
    const [infor,setInfor] = useState<any>(null)
    const [code,setCode] = useState<any>('')
    

    const step1Content = (
        <Step1 setInfor ={setInfor} setCode ={setCode} code ={code}/>
    )
    const step2Content = (
        <Step2 infor = {infor} code ={code}/>
     )
     const step3Content = (
        <Step3 infor = {infor} code ={code}/>
     )
     const step4Content = (
        <Step4 infor = {infor} code ={code}/>
     )
    useEffect(()=>{
        console.log(step)
        switch (step) {
            case 1: setContent(step1Content); break;
            case 2: setContent(step2Content); break;
            case 3: setContent(step3Content); break;
            case 4: setContent(step4Content); break;
            default: setContent(step1Content);
        }
    },[step])
    console.log(content)
  return (
    <div className="w-auto h-screen">
    <div className="w-full h-full grid grid-cols-2 gap-2 bg-gradient-to-r from-slate-900 via-[#5EC0BD] to-slate-900 ">
        <div className='relative'>
            {!content ? 'loading ...' : content}
            <div className='absolute bottom-2 left-[40%] flex items-center justify-start gap-1'>
                {[1,2,3,4].map((item:any)=>{
                    return (
                        <div key={item} className={cn('rounded-full w-6 h-6 flex items-center justify-center border border-neutral-100 text-[14px] text-neutral-100',
                            step === item && "border-[#60C4C1] bg-[#60C4C1]"
                        )}>
                            {item}
                        </div>
                    )
                })}
            </div>
        </div>
        <div className=" h-screen p-2">
            <div className="relative h-full flex overflow-hidden     ">
               <Image 
                src='/forget-password.jpeg'
                width={4000}
                height={6000}
                alt="forget-password"
                className='object-cover  rounded-md'
               />
               <div className="absolute top-0 left-0 w-full h-full bg-slate-950/10">
                
                </div>
            </div>
           
            
        </div>
       
    </div>
</div>
  )
}

export default Step