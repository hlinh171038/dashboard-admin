import  { PureComponent, useEffect, useState } from 'react';
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

export const COLORS = ['#EC8D4B','#64D03E', '#CCEB24', '#468AE2','#CB26E9', '#ECEDF1',];
//export const COLORS =['#14171F','#CCA7FF','#C6CBFE','#8489FF','#B8EEBF','#C2C2C6']

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
    data: any;
}

const ChartCategory:React.FC<CirclechartParams> = ({
   data =[]
}) =>{


    return (
      <div className='w-full h-[200px] text-[13px] text-neutral-100 '>
        <ResponsiveContainer width="100%" height="100%">
            <PieChart width={200} height={200}>
            <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
            >
                {data.map((entry:any, index:any) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
            </PieChart>
        </ResponsiveContainer>
      </div>
    );
  
}

export default ChartCategory
