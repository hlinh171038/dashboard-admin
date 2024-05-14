import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react'
import { LuMailOpen } from "react-icons/lu";
import { toast } from 'sonner';
import emailjs from '@emailjs/browser';

interface step2Props {
  infor: any;
  code:any;
}

const Step2:React.FC<step2Props> = ({
  infor,
  code
}) => {
  const [inputs, setInputs] = useState(['', '', '', '']); // Array to store values
  const inputRefs = useRef<any>([]); // Array of refs for each input element
  const [text,setText] = useState('')
  const router = useRouter()
  const form = useRef<any>();
  
  console.log(inputs)
  console.log(code)
  const handleChange = (event:any, index:any) => {
    const newValue = event.target.value.replace(/\D/, ''); // Remove non-digits
    const newInputs = [...inputs];
    newInputs[index] = newValue;
    setInputs(newInputs);

    // Focus next input if current input has a value and is not the last one
    if (newValue !== '' && index < inputs.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  //handle recive
  const handleRecive = () =>{
    router.push('/forget-password?step=1')
  }

  const handleContinue = () => {
   const checkEmpty =  inputs && inputs.filter((item:any)=>item === '');
   if(checkEmpty.length >0) {
    toast.warning('fill all !!!');
    return;
   }
  //  compare
   const codeString = inputs.join('');
   console.log(codeString)
   if(Number(codeString) !== code) {
    toast.warning('Code wrong, check your Email again!!!');
    return;
   }
   router.push('/forget-password?step=3')
  }

  console.log(infor)
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
                <LuMailOpen className='w-6 h-6 text-neutral-100'/>
            </div>
            <div className='text-neutral-100 text-[20px] mt-6'>Password Reset</div>
            <div className='text-[14px] text-neutral-400 font-thin'>We are send a code to <span className='font-bold text-neutral-100'> {infor?.email}</span></div>
            <div>
            <div className='flex items-center justify-start gap-2 mt-4'>
              {inputs.map((value, index) => (
                <input
                  key={index}
                  type="text"
                  value={value}
                  maxLength={1}
                  ref={(el) => (inputRefs.current[index] = el)}
                  onChange={(e) => handleChange(e, index)}
                  className ="w-10 h-10 flex items-center justify-center pl-[0.7rem] text-[30px] rounded-md"
                />
              ))}
            </div>
            <div className="mt-2">
                <button
                    onClick={handleContinue}
                    className="text-white bg-[#5dbebb] py-1 text-[14px] rounded-md flex items-center justify-center w-[60%] hover:bg-[#60c3d2] hover:text-white  transition-colors"
                >
                    Continue
                </button>
            </div>
            <div className='text-neutral-400 text-[14px]'>Dont recive the email? <span className=' text-neutral-100 cursor-pointer underline' onClick={handleRecive}>Click to recive</span></div>
            <div className='text-[14px] text-neutral-400 underline font-light cursor-pointer' onClick={()=> router.push('/signIn')}>Back to SignIn</div>
            </div>
           </div>
           
        </div>
  )
}

export default Step2
