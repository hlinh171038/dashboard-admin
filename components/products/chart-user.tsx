"use client"

import React, { PureComponent, useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


interface LineChartUserProps {
    totalProductThisWeek: any;
    totalProductLastWeek: any;
}

 const ChartUser:React.FC<LineChartUserProps> = ({
    totalProductThisWeek,
    totalProductLastWeek
 }) =>  {
    const [chartThisWeek,setChartThisWeek] = useState<any>([])

    const handleChartThisWeek = useEffect(()=>{
        const array = [
            {
                id: 1,
                name: 'mon',
                ThisWeek: 0,
                LastWeek: 0,
            },
            {
                id: 2,
                name: 'tue',
                ThisWeek: 0,
                LastWeek: 0,
            },
            {
                id: 3,
                name: 'web',
                ThisWeek: 20,
                LastWeek: 0,
            },
            {
                id: 4,
                name: 'thur',
                ThisWeek: 0,
                LastWeek: 30,
            },
            {
                id: 5,
                name: 'fri',
                ThisWeek: 0,
                LastWeek: 10,
            },
            {
                id: 6,
                name: 'sat',
                ThisWeek: 0,
                LastWeek: 0,
            },
            {
                id: 0,
                name: 'sun',
                ThisWeek: 10,
                LastWeek: 0,
            },
        ]
      
        for(let i=0;i<totalProductThisWeek.length;i++ ) {
            const day =new Date( totalProductThisWeek[i].createdAt).getDay()
            for(let j =0 ;j<array.length;j++) {
                if(day === array[j].id) {
                
                    array[j].ThisWeek += 1;
                }
            }
        }
        setChartThisWeek(array)
    },[totalProductThisWeek])
 
    return (
        <div className='w-full h-[100px] text-[14px] text-neutral-400'>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                width={500}
                height={300}
                data={chartThisWeek}
                margin={{
                top: 5,
                right: 5,
                left: 5,
                bottom: 5,
                }}
                >
               
                <Tooltip />
                <Line type="monotone" dataKey="ThisWeek" stroke="#64D03E" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="LastWeek" stroke="#CCEB24" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
  }

export default ChartUser