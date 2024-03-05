import { Transaction } from '@prisma/client';
import React, { useCallback, useEffect, useState } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

const colors = ['#EC8D4B','#64D03E', '#CCEB24', '#468AE2','#CB26E9', '#DB2B78','#E62E2D'];

const data = [
  {
    name: 'Page A',
    uv: 4000,
    
  },
  {
    name: 'Page B',
    uv: 3000,
  
  },
  {
    name: 'Page C',
    uv: 2000,
  
  },
  {
    name: 'Page D',
    uv: 2780,
   
  },
  {
    name: 'Page E',
    uv: 1890,
   
  },
  {
    name: 'Page F',
    uv: 2390,
    
  },
  {
    name: 'Page G',
    uv: 3490,
    
  },
];


const getPath = (x:any, y:any, width:any, height:any) => {
  return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
  Z`;
};

const TriangleBar = (props:any) => {
  const { fill, x, y, width, height } = props;

  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

interface ChartOcupancyProps {
    guestThisWeek: Transaction[] | any;
    guestLastWeek: Transaction[] | any;
}

const ChartOcupancy:React.FC<ChartOcupancyProps> = ({
    guestThisWeek,
    guestLastWeek
}) => {
    
    // rate in this week
    const [chartThisWeek,setChartThisWeek] = useState<any>([])
    const [chartLastWeek,setChartLastWeek] = useState<any>([])

     

    //handle chart this week
    const handleChartThisWeek = useCallback(()=>{
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
        console.log(guestThisWeek);
        for(let i=0;i<guestThisWeek.length;i++ ) {
            const day =new Date( guestThisWeek[i].date).getDay()
            for(let j =0 ;j<array.length;j++) {
                if(day === array[j].id) {
                    array[j].uv += guestThisWeek[i].amount;
                }
            }
        }
        setChartThisWeek(array)
    },[guestThisWeek])

    // rate in last week
    // rate in this week
    
    //handle chart last week
  const handleChartLastWeek= useCallback(()=>{
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
    console.log(guestLastWeek);
    for(let i=0;i<guestLastWeek.length;i++ ) {
        const day =new Date( guestLastWeek[i].date).getDay()
        for(let j =0 ;j<array.length;j++) {
            if(day === array[j].id) {
                array[j].uv += guestLastWeek[i].amount;
            }
        }
    }
    setChartThisWeek(array)
},[guestLastWeek])

    // handle push date
    const handlePushDate = useCallback((value:string)=>{
        console.log(value)
        if(value === 'thisweek') {
            console.log('try');
           handleChartThisWeek()
        }else {
            handleChartLastWeek()
        }
    },[handleChartLastWeek,handleChartThisWeek])

    useEffect(()=>{
        handleChartThisWeek()
    },[handleChartThisWeek])
  return (
    <div>
        <div 
            className="flex items-center justify-between px-2 py-2"
        >
            <div>Product Bought in Week </div>
            <div>
            <Select
                onValueChange={(e) =>handlePushDate(e)}
            >
                <SelectTrigger className=" ">
                    Date in Week
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="thisweek">Rate In Week</SelectItem>
                    <SelectItem value="lastweek">Rate Last Week</SelectItem>
                
                </SelectContent>
            </Select>
            </div>
        </div>
       
           
                <BarChart
                    width={700}
                    height={270}
                    data={chartThisWeek}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                    >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Bar dataKey="uv" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
                        {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                        ))}
                    </Bar>
                </BarChart>
    
            
        </div>
        
   
  );
}

export default ChartOcupancy

