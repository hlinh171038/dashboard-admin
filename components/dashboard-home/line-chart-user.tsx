"use client"

import React, { PureComponent, useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


interface LineChartUserProps {
    totalUserThisWeek: any;
}

 const LineChartUser:React.FC<LineChartUserProps> = ({
    totalUserThisWeek
 }) =>  {
    const [chartThisWeek,setChartThisWeek] = useState<any>([])
    const handleChartLastWeek = useEffect(()=>{
        const array = [
            {
                id: 1,
                name: 'mon',
                uv: 0
            },
            {
                id: 2,
                name: 'tue',
                uv: 0
            },
            {
                id: 3,
                name: 'web',
                uv: 0
            },
            {
                id: 4,
                name: 'thur',
                uv: 0
            },
            {
                id: 5,
                name: 'fri',
                uv: 0
            },
            {
                id: 6,
                name: 'sat',
                uv: 0
            },
            {
                id: 0,
                name: 'sun',
                uv: 0
            },
        ]
        console.log(totalUserThisWeek);
        for(let i=0;i<totalUserThisWeek.length;i++ ) {
            const day =new Date( totalUserThisWeek[i].createdAt).getDay()
            for(let j =0 ;j<array.length;j++) {
                if(day === array[j].id) {
                    console.log('try')
                    array[j].uv += 1;
                }
            }
        }
        setChartThisWeek(array)
    },[totalUserThisWeek])
    console.log(chartThisWeek)
    return (
        <div className='w-full h-8'>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart width={300} height={100} data={chartThisWeek}>
                <Line type="monotone" dataKey="uv" stroke="#8884d8" strokeWidth={2} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
  }

export default LineChartUser