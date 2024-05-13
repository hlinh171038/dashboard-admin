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
    
    // const formSchema = z.object({
    //     email: z.string().email({message: "Wrong Email Format"}),
    //   })

    // const {
    //     register,
    //     handleSubmit,
    //     watch,
    //     formState: { errors },
    //   } = useForm<FieldValues>({
    //     resolver: zodResolver(formSchema),
    //     defaultValues: {
    //         email: ""
    //     }
    //   })

    //   const email = watch('email');
    //   console.log(email)
    //   const onSubmit: SubmitHandler<FieldValues> = (data:any) => {
    //     console.log(data);
    //     //router.push('/forget-password?step=2')
    //   }
    const step1Content = (
        <Step1 />
    )
    const step2Content = (
        <div>
            step-2
        </div>
    )
    useEffect(()=>{
        console.log(step)
        switch (step) {
            case 1: setContent(step1Content); break;
            case 2: setContent(step2Content); break;
            default: setContent(step1Content);
        }
    },[step])
    console.log(content)
  return (
    <div className="w-auto h-screen">
    <div className="w-full h-full grid grid-cols-2 gap-2 bg-gradient-to-r from-slate-900 via-[#5EC0BD] to-slate-900 ">
        {!content ? 'loading ...' : content}
        <div className=" h-screen p-2">
            <div className="relative h-full flex overflow-hidden     ">
               <Image 
                src='/forget-password.jpeg'
                width={4000}
                height={6000}
                alt="forget-password"
                className='object-cover'
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