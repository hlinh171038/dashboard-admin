import { Transaction } from '@prisma/client';
import React, { PureComponent, useCallback, useEffect, useState } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


interface ChartProps {
  thisWeek: any;
  lastWeek: any;
  transaction: Transaction[] | any;
  type: string;
}
const RightChart:React.FC<ChartProps> = ({
  thisWeek,
  lastWeek,
  transaction =[],
  type,
})=>  {
  const [totalTransactionThisWeek,setTotalTransactionThisWeek] = useState<any>([])
  const [totalTransactionLastWeek,setTotalTransactionLastWeek] = useState<any>([])
  const [chartThisWeek,setChartThisWeek] = useState<any>([])
  const [chartLastWeek,setChartLastWeek] = useState<any>([])

  // total transaction this week
  useEffect(()=>{
    const array = [...thisWeek]
    const result:any[] = [];
    transaction && transaction.forEach((item:any)=>{
      let day = new Date(item.date)
      if(day >=  array[0] && day<= array[array.length -1]) {
        result.push(item)
      }
    });

    setTotalTransactionThisWeek(result)
  },[thisWeek,transaction])

  //total transaction last week
  useEffect(()=>{
    const array = [...lastWeek]

    const result:any[] = [];
    transaction && transaction.forEach((item:any)=>{
      let day = new Date(item.date)
 
      if(day <=  array[0] && day>= array[array.length -1]) {
        result.push(item)
      }
    });

    setTotalTransactionLastWeek(result)
  },[lastWeek,transaction])
 
  //handle chart this week
  const handleChart = useCallback((data:any)=>{
    const array = [
        {
            id: 1,
            name: 'mon',
            Done: 0,
            LastWeek:0,
            Pending:0,
            Cancel:0
        },
        {
            id: 2,
            name: 'tue',
            Done: 0,
            LastWeek:0,
            Pending:0,
            Cancel:0
        },
        {
            id: 3,
            name: 'web',
            Done: 0,
            LastWeek:0,
            Pending:0,
            Cancel:0
        },
        {
            id: 4,
            name: 'thur',
            Done: 0,
            LastWeek:0,
            Pending:0,
            Cancel:0
        },
        {
            id: 5,
            name: 'fri',
            Done: 0,
            LastWeek:0,
            Pending:0,
            Cancel:0
        },
        {
            id: 6,
            name: 'sat',
            Done: 0,
            LastWeek:0,
            Pending:0,
            Cancel:0
        },
        {
            id: 0,
            name: 'sun',
            Done: 0,
            LastWeek:0,
            Pending:0,
            Cancel:0
        },
    ]
    console.log(data);

    //done status
    for(let i=0;i<data.length;i++ ) {
        const day =new Date( data[i].date).getDay()
        for(let j =0 ;j<array.length;j++) {
            if(day === array[j].id && data[i].status === 'done') {
                array[j].Done += data[i].totalPrice;
            }
        }
    }
    //pending
    for(let i=0;i<data.length;i++ ) {
      const day =new Date( data[i].date).getDay()
      for(let j =0 ;j<array.length;j++) {
          if(day === array[j].id && data[i].status === 'pending') {
              array[j].Pending += data[i].totalPrice;
          }
      }
  }

  //cancel
      for(let i=0;i<data.length;i++ ) {
        const day =new Date( data[i].date).getDay()
        for(let j =0 ;j<array.length;j++) {
            if(day === array[j].id && data[i].status === 'cancel') {
                array[j].Cancel += data[i].totalPrice;
            }
        }
    }
   

    
    setChartThisWeek(array)
},[])

useEffect(()=>{
  if(type==='thisWeek') {
    handleChart(totalTransactionThisWeek);
  } else if(type ==='lastWeek'){
    handleChart(totalTransactionLastWeek)
  } else {
    handleChart(transaction)
  }
},[handleChart,totalTransactionThisWeek,type,totalTransactionLastWeek,transaction])

    return (
      <div className="w-full h-[350px] text-[14px] text-neutral-100">
        <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={chartThisWeek}
          margin={{
            top: 5,
            right: 5,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="1 1" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Done" fill="#64D03E"  />
          <Bar dataKey="Pending"  fill="#EC8D4B" />
          <Bar dataKey="Cancel"  fill="#CB26E9" />
          
        </BarChart>
      </ResponsiveContainer>
      </div>
    );
  
}

export default RightChart