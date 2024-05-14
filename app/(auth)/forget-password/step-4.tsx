import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react'
import { LuMailOpen } from "react-icons/lu";
import { toast } from 'sonner';
import { MdDone } from "react-icons/md";


interface step2Props {
  infor: any;
  code:any;
}

const Step4:React.FC<step2Props> = ({
  infor,
  code
}) => {
  const router = useRouter()
  return (
    <div className="px-4">
            {/* logo */}
            <div className="flex items-center justify-start gap-1 mt-8">
                <Image
                    src="/logo.webp"
                    width={30}
                    height={30}
                    alt="logo"
                    className="aspect-square"
                />
                <div className="">
                    <div className="font-bold  text-[14px]" style={{color:'#5EC0B5'}}>Dashboard </div>
                    <div className="text-neutral-100 text-[12px] mt-[-4px]">Insight</div>
                </div>
            </div>
           {/* step 1 */}
           <div className='px-16 py-8'>
            {/* icon */}
            <div className='p-2 border border-neutral-100 rounded-md flex items-center justify-center w-10 h-10'>
                <MdDone className='w-6 h-6 text-neutral-100'/>
            </div>
            <div className='text-neutral-100 text-[20px] mt-6'>All Done !</div>
            <div className='text-[14px] text-neutral-400 font-thin'>Your password have been reset.</div>
            <div className='text-[15px] text-neutral-100'>back to <span className='underline cursor-pointer' onClick={()=>router.push('/signIn')}>SignIn</span></div>
            <div>
            
            
           </div>
            
        </div>
      </div>  
  )
}

export default Step4
