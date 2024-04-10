"use client"

import React, { PureComponent, useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';



interface ChartCustomerProps {
    totalUserThisWeek: any;
    totalUserLastWeek: any;
}

const ChartCustomer:React.FC<ChartCustomerProps> = ({
    totalUserThisWeek = [],
    totalUserLastWeek = []
}) => {
  const [data,setData] = useState<any>([])

  useEffect(()=>{
    const data = [
        {
          id:1,
          name: 'Mon',
          ThisWeek: 0,
          LastWeek: 0,
         
        },
        {
          id:2,
          name: 'Tues',
          ThisWeek: 0,
          LastWeek: 0,
         
        },
        {
          id:3,
          name: 'Web',
          ThisWeek: 0,
          LastWeek: 0,
        
        },
        {
          id:4,
          name: 'Thur',
          ThisWeek: 0,
          LastWeek: 0,
        
        },
        {
          id:5,
          name: 'Fri',
          ThisWeek: 0,
          LastWeek: 0,
         
        },
        {
          id:6,
          name: 'Sat',
          ThisWeek: 0,
          LastWeek: 0,
        
        },
        {
          id:0,
          name: 'Sun',
          ThisWeek: 0,
          LastWeek: 0,
      
        },
      ];

   totalUserThisWeek && totalUserThisWeek.forEach((item:any)=>{
        const day = new Date(item.createdAt).getDay();
        data && data.forEach((it:any)=>{
            if(it.id === day){
                it.ThisWeek +=1;
            }
        })
    })

    totalUserLastWeek && totalUserLastWeek.forEach((item:any)=>{
        const day = new Date(item.createdAt).getDay();
        data && data.forEach((it:any)=>{
            if(it.id === day){
                it.LastWeek +=1;
            }
        })
    })
    setData(data)
  },[totalUserLastWeek,totalUserThisWeek])

    return (
         <div className='px-2 py-2'>
            <div className='text-[15px] text-neutral-100 font-bold'>User statistics</div>
            <div className='text-[14px] text-neutral-400 '>The chart shows users this week compared to the previous week</div>
           
            <div className='w-full h-[300px] text-[14px] text-neutral-400 '>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 5,
                        right: 5,
                        left: 0,
                        bottom: 5,
                    }}
                    >
                    <CartesianGrid strokeDasharray="1 1" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="ThisWeek" stroke="#64D03E" activeDot={{ r: 1 }} />
                    <Line type="monotone" dataKey="LastWeek" stroke="#CCEB24" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
         </div>
    );
  }
export default ChartCustomer