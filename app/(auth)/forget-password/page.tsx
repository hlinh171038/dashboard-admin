"use client"

import React from 'react'
import Step from './step';

const ForgetPassword =({searchParams}:{searchParams: { [key: string]: string | string[] | undefined }}) => {

    const step = typeof searchParams.step === 'string' ? Number(searchParams.step) : 0;
//     const step2 = typeof searchParams.step2 === 'string' ? Number(searchParams.step2) : 0;
//     const step3 = typeof searchParams.step3 === 'string' ? Number(searchParams.step3) : 0;
//     const step4 = typeof searchParams.step4 === 'string' ? Number(searchParams.step4) : 0;
 return (
    <div>
        <Step 
            step ={step}
            // step2 ={step2}
            // step3 ={step3}
            // step4 ={step4}
        />
    </div>
  )
}

export default ForgetPassword
