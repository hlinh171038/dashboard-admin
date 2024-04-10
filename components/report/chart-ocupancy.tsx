import { Mail, Transaction } from '@prisma/client';
import React, { useCallback, useEffect, useState } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { cn } from '@/lib/utils';

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
   thisWeek:any;
   lastWeek:any;
   mail: Mail[] | any;
}

const ChartOcupancy:React.FC<ChartOcupancyProps> = ({
    thisWeek,
    lastWeek,
    mail = []
}) => {
    
   const [totalMailThisWeek,setTotalMailThisWeek] = useState<any>([])
   const [totalMailLastWeek,setTotalMailLastWeek] = useState<any>([])

    const [chart,setChart] = useState<any>([])
    const [chartRight,setChartRight] = useState('all');


    // transaction this week
    useEffect(()=>{
        const array = [...mail]
        const result:any[] = []
        array && array.forEach((item:any)=>{
            const day = new Date(item.created_at);
            if(day >=thisWeek[0] && day <= thisWeek[thisWeek.length -1]) {
                result.push(item)
            }
        });
        //console.log(result);
        setTotalMailThisWeek(result);
    },[mail,thisWeek])
    //comment last week
    useEffect(()=>{
        const array = [...mail]
        const result:any[] = []
        array && array.forEach((item:any)=>{
            const day = new Date(item.created_at);
            if(day <=lastWeek[0] && day >= lastWeek[lastWeek.length -1]) {
                result.push(item)
            }
        });
        //console.log(result);
        setTotalMailLastWeek(result);
    },[mail,lastWeek])


     

    //handle chart this week
    const handleChart = useCallback((data:any)=>{
        const array = [
            {
                id: 1,
                name: 'mon',
                proceed: 0,
                pending:0,
                help:0
            },
            {
                id: 2,
                name: 'tue',
                proceed: 0,
                pending:0,
                help:0
            },
            {
                id: 3,
                name: 'web',
                proceed: 0,
                pending:0,
                help:0
            },
            {
                id: 4,
                name: 'thur',
                proceed: 0,
                pending:0,
                help:0
            },
            {
                id: 5,
                name: 'fri',
                proceed: 0,
                pending:0,
                help:0
            },
            {
                id: 6,
                name: 'sat',
                proceed: 0,
                pending:0,
                help:0
            },
            {
                id: 0,
                name: 'sun',
                proceed: 0,
                pending:0,
                help:0
            },
        ]
       
        //console.log(data);
        for(let i=0;i<data.length;i++ ) {
            const day =new Date( data[i].created_at).getDay()

            for(let j =0 ;j<array.length;j++) {
    
                if(day === array[j].id && data[i].status === 'done') {
 
                    array[j].proceed += 1;
                }
                if(day === array[j].id && data[i].status === 'pending') {
    
                    array[j].pending += 1;
                }
                if(day === array[j].id && (data[i].status === 'help' || data[i].supportBy === null)) {
  
                    array[j].help += 1;
                }
            }
        }

        setChart(array)
    },[])

   

    useEffect(()=>{
        if (chartRight ==='all') {
            handleChart(mail)
        } else if (chartRight === 'thisWeek') {
            handleChart(totalMailThisWeek)
        } else {
            handleChart(totalMailLastWeek)
        }
    },[handleChart,chartRight,totalMailLastWeek,totalMailThisWeek,mail])

 
  return (
    <div>
        <div 
            className="flex items-center justify-between px-2 py-2 text-neutral-400 text-[14px]"
        >
            <div className='flex flex-col '>
                <div className='text-[15px] text-neutral-100 capitalize'>transaction failed</div>
                <div className=''>The transaction was canceled by the customer</div>
            </div>
            <div className=" flex items-center justify-start gap-1 text-[14px] text-neutral-100 ">
                <div 
                    onClick={()=>setChartRight('all')}
                    className={cn('border border-[#4FA29E] bg-none cursor-pointer rounded-md px-1 py-0.5 capitalize',
                            chartRight ==='all' && 'bg-[#4FA29E]'
                            )}  
                >
                    all
                </div>
                <div 
                    onClick={()=>setChartRight('thisWeek')}
                    className={cn('border border-[#4FA29E] bg-none cursor-pointer rounded-md px-1 py-0.5 capitalize',
                            chartRight ==='thisWeek' && 'bg-[#4FA29E]'
                            )} 
                >
                    current
                </div>
                <div 
                    onClick={()=>setChartRight('lastWeek')}
                    className={cn('border border-[#4FA29E] bg-none cursor-pointer rounded-md px-1 py-0.5 capitalize',
                            chartRight ==='lastWeek' && 'bg-[#4FA29E]'
                            )} 
                    >
                        last week
                </div>
            </div>
        </div>
            <div className="w-full flex items-center justify-end text-[13px] px-2 mb-[-5px] text-neutral-400">Date:{chartRight === 'thisWeek' ?(
                    <span className="flex items-center justify-start gap-0.5 ">
                        <span>{new Date(thisWeek[0]).toDateString()}</span>
                        <span>-</span>
                        <span>{new Date(thisWeek[thisWeek.length -1]).toDateString()}</span>
                    </span>
                ):(chartRight === 'lastWeek'? (
                    <span className="flex items-center justify-start gap-0.5 ">
                        <span>{new Date(lastWeek[0]).toDateString()}</span>
                        <span>-</span>
                        <span>{new Date(lastWeek[lastWeek.length -1]).toDateString()}</span>
                    </span>
                ): 'all the time')}
            </div>
       <div className="w-full h-[250px] text-[14px] text-neutral-100">
       <ResponsiveContainer width="100%" height="100%">
                <BarChart
                     width={500}
                     height={300}
                    data={chart}
                    margin={{
                        top: 20,
                        right:10,
                        left: 5,
                        bottom: 5,
                    }}
                    >
                    <CartesianGrid strokeDasharray="1 1" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="proceed" fill="#E96F28"  barSize={20}/>
                    <Bar dataKey="pending" fill="#64D03E"  barSize={20}/>
                    <Bar dataKey="help" fill="#B42A2C"  barSize={20}/>
                </BarChart>
            </ResponsiveContainer>
       </div>
        </div>
        
   
  );
}

export default ChartOcupancy

