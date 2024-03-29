import { User } from '@prisma/client';
import React, { PureComponent, useEffect, useState } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export const colors = ['#EC8D4B','#64D03E', '#CCEB24', '#468AE2','#CB26E9','#59B6AD'];

interface TeamLeadCahrtProps {
    users: User[] | any
}

const TeamLeadCahrt:React.FC<TeamLeadCahrtProps> = ({
    users = []
}) => {
    const [teamData,setTeamData] = useState<any>([])


    useEffect(()=>{
        const data = [
            {
              name: 'lead',
              uv: 0,
              
            },
            {
              name: 'developer',
              uv: 0,
 
            },
            {
              name: 'maketing',
              uv: 0,
      
            },
            {
              name: 'customer-service',
              uv: 0,
        
            },
            {
              name: 'sale',
              uv: 0,
        
            },
            {
              name: 'employee',
              uv: 0,

            }
           
          ];

        const filterUsers =  users && users.filter((item:any)=>item.role === 'yes' && item.position !== null);
        filterUsers && filterUsers.forEach((item:any)=>{
            data.forEach((it:any)=>{
                if(item.position === it.name) {
                    it.uv += 1;               
                 }
            })
        });
        console.log(data)
        setTeamData(data)
    },[users])
    return (
        <div>
            <div className="w-full h-[150px]">
                <ResponsiveContainer width="100%" height="100%">
            
                    <BarChart width={150} height={40} data={teamData}>
                
                    <Bar dataKey="uv" fill="#8884d8"  label={{ position: 'top' }}>
                        {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                        ))}
                    </Bar>
                    </BarChart>
                </ResponsiveContainer>
                
            </div>
            <div className=" w-full grid grid-cols-2 px-2 py-4">
                    {teamData && teamData.map((item:any,index:any)=>{
                        return (
                            <div
                                key={item.id}
                                className="text-[14px] text-neutral-100 flex items-start gap-2 justify-start "
                            >
                                <div className='w-4 h-4' style={{backgroundColor:`${colors[index]}`}}>
                                                        
                                </div>
                                <div className="capitalize">{item.name}</div>
                            </div>
                        )
                    })}
                </div>
        </div>
    );
  
}

export default TeamLeadCahrt
