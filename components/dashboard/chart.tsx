import { Transaction } from '@prisma/client';
import React, { PureComponent, useCallback, useEffect, useState } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


interface ChartProps {
  thisWeek: any;
  lastWeek: any;
  transaction: Transaction[] | any;
}
const Chart:React.FC<ChartProps> = ({
  thisWeek,
  lastWeek,
  transaction =[]
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
  useEffect(()=>{
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


    //done status
    for(let i=0;i<totalTransactionThisWeek.length;i++ ) {
        const day =new Date( totalTransactionThisWeek[i].date).getDay()
        for(let j =0 ;j<array.length;j++) {
            if(day === array[j].id && totalTransactionThisWeek[i].status === 'done') {
                array[j].Done += totalTransactionThisWeek[i].totalPrice;
            }
        }
    }
    //pending
    for(let i=0;i<totalTransactionThisWeek.length;i++ ) {
      const day =new Date( totalTransactionThisWeek[i].date).getDay()
      for(let j =0 ;j<array.length;j++) {
          if(day === array[j].id && totalTransactionThisWeek[i].status === 'pending') {
              array[j].Pending += totalTransactionThisWeek[i].totalPrice;
          }
      }
  }

  //cancel
      for(let i=0;i<totalTransactionThisWeek.length;i++ ) {
        const day =new Date( totalTransactionThisWeek[i].date).getDay()
        for(let j =0 ;j<array.length;j++) {
            if(day === array[j].id && totalTransactionThisWeek[i].status === 'cancel') {
                array[j].Cancel += totalTransactionThisWeek[i].totalPrice;
            }
        }
    }
    for(let i=0;i<totalTransactionLastWeek.length;i++ ) {
            const day =new Date( totalTransactionLastWeek[i].date).getDay()
            for(let j =0 ;j<array.length;j++) {
                if(day === array[j].id) {
                    array[j].LastWeek += totalTransactionLastWeek[i].totalPrice;
                }
            }
        }

    
    setChartThisWeek(array)
},[totalTransactionThisWeek,totalTransactionLastWeek])

    return (
      <div className="w-full h-[350px] text-[14px] text-neutral-100">
        <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={chartThisWeek}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="1 1" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Done" stackId="a" fill="#64D03E"  />
          <Bar dataKey="Pending" stackId="a" fill="#EC8D4B" />
          <Bar dataKey="Cancel" stackId="a" fill="#CB26E9" />
          <Bar dataKey="LastWeek" fill="#CCEB24"  />
        </BarChart>
      </ResponsiveContainer>
      </div>
    );
  
}

export default Chart