import { Transaction } from '@prisma/client';
import  { PureComponent, useCallback, useEffect, useInsertionEffect, useState } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';

// const data = [
//   {day:'hai',value:0 },
//   {day:'ba',value:45},
//   {day:'tu',value:0 },
//   {day:'nam',value:45},
//   {day:'sau',value:0 },
//   {day:'bay',value:45},
//   {day:'cn',value:0 },
// ];

export const COLORS = ['#EC8D4B','#64D03E', '#CCEB24', '#468AE2','#CB26E9', '#DB2B78','#E62E2D',];

const RADIAN = Math.PI / 180;

interface Iprams {
    cx: any;
    cy:any;
    midAngle: any;
    innerRadius: any;
    outerRadius:any;
    percent:any;
    index:any;
}
const renderCustomizedLabel:React.FC<Iprams> = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
interface CirclechartParams {
    totalTransactionThisWeek: Transaction[] | any;
    totalTransactionLastWeek: Transaction[] | any;
    transaction: Transaction[] | any;
    type: string
}

const CircleChart:React.FC<CirclechartParams> = ({
    totalTransactionLastWeek = [],
    totalTransactionThisWeek =[],
    transaction = [],
    type

}) =>{
  const [chartThisWeek,setChartThisWeek] = useState<any>([])
    const handleChart = useCallback((data:any)=>{
      const array = [
        {id:1,day:'hai',value:0 },
        {id:2,day:'ba',value:0},
        {id:3,day:'tu',value:0 },
        {id:4,day:'nam',value:0},
        {id:5,day:'sau',value:0 },
        {id:6,day:'bay',value:0},
        {id:0,day:'cn',value:0 },
      ];
     
        for(let i=0;i<data.length;i++ ) {
            const day =new Date( data[i].date).getDay()
            for(let j =0 ;j<array.length;j++) {
                if(day === array[j].id) {
              
                    array[j].value += 1;
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
      <div className='w-[200px] h-[200px] text-[14px]'>
        <ResponsiveContainer width="100%" height="100%">
            <PieChart width={400} height={400}>
            <Pie
                data={chartThisWeek}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
            >
                {chartThisWeek.map((entry:any, index:any) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
            </PieChart>
        </ResponsiveContainer>
      </div>
    );
  
}

export default CircleChart
