import { cn } from '@/lib/utils';
import { User } from '@prisma/client';
import React, { PureComponent, useCallback, useEffect, useState } from 'react';
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

export const colors = ['#EC8D4B','#64D03E', '#CCEB24', '#468AE2','#CB26E9','#59B6AD','#A21D48'];

interface TeamLeadCahrtProps {
    users: User[] | any;
    totalUserThisWeek: any;
    totalUserLastWeek: any;
   
    teamCondition?: boolean;
    chart?: string
}

const TeamLeadCahrt:React.FC<TeamLeadCahrtProps> = ({
    users = [],
    totalUserThisWeek,
    totalUserLastWeek,
    teamCondition,
    chart
}) => {
    const [teamData,setTeamData] = useState<any>([])
    const [chartArr,setChartArr] = useState<any>([])





    useEffect(()=>{
        const data = [
            {
              name: 'lead',
              uv: 0,
              shortname:'Lead'
              
            },
            {
              name: 'developer',
              uv: 0,
              shortname:'Developer'
            },
            {
              name: 'marketing',
              uv: 0,
              shortname:'Marketing'
            },
            {
              name: 'customer-service',
              uv: 0,
              shortname:'CS'
            },
            {
              name: 'sale',
              uv: 0,
              shortname:'Sale'
            },
            {
              name: 'designer',
              uv: 0,
              shortname:'Design'
            },
            {
              name: 'employee',
              uv: 0,
              shortname:'Staff'
            },
            
           
          ];

        const filterUsers =  users && users.filter((item:any)=>item.role === 'yes' && item.position !== null);
        filterUsers && filterUsers.forEach((item:any)=>{
            data.forEach((it:any)=>{
                if(item.position === it.name) {
                    it.uv += 1;               
                 }
            })
        });
      
        setTeamData(data)
    },[users])

    const handleChart = useCallback((data:any)=>{
      const array = [
        {
          id:0,
          name: 'lead',
          uv: 0,
          shortname:'Lead'
          
        },
        {
          name: 'developer',
          uv: 0,
          shortname:'Developer'
        },
        {
          name: 'marketing',
          uv: 0,
          shortname:'Marketing'
        },
        {
          name: 'customer-service',
          uv: 0,
          shortname:'CS'
        },
        {
          name: 'sale',
          uv: 0,
          shortname:'Sale'
        },
        {
          name: 'designer',
          uv: 0,
          shortname:'Design'
        },
        {
          name: 'employee',
          uv: 0,
          shortname:'Staff'
        },
      ];

  
        data && data.forEach((item:any)=>{
          array.forEach((ele:any)=>{
            if(item.position === ele.name) {
              ele.uv +=1;
            }
          })
        })
        setChartArr(array)
    },[])
    
    //chart condition
    useEffect(()=>{
      if(chart==='thisWeek') {
        handleChart(totalUserThisWeek);
      } else if(chart ==='lastWeek'){
        handleChart(totalUserLastWeek)
      } else {
        handleChart(users)
      }
    },[handleChart,totalUserThisWeek,chart,totalUserLastWeek,users])
    return (
        <div>
            <div className={cn("w-full ",
                                teamCondition ?'h-[270px]' :'h-[150px]'
                          )}>
            {teamCondition ? (
               <ResponsiveContainer width="100%" height="100%">
            
               <BarChart width={150} height={40} data={chartArr}>
            
                  <CartesianGrid strokeDasharray="1 1" />
                  <XAxis  dataKey="shortname"  />
                  <YAxis />
              
               <Bar dataKey="uv" fill="#8884d8" barSize={25}  label={{ position: 'top' }}>
                   {data.map((entry, index) => (
                   <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                   ))}
               </Bar>
               </BarChart>
           </ResponsiveContainer>
            ):(
              <ResponsiveContainer width="100%" height="100%">
            
              <BarChart width={150} height={40} data={teamData}>
             
              <Bar dataKey="uv" fill="#8884d8" barSize={25}  label={{ position: 'top' }} >
                  {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                  
                  ))}
              </Bar>
              </BarChart>
          </ResponsiveContainer>
            )}
               
                
            </div>
            {!teamCondition && (
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
            )}
        </div>
    );
  
}

export default TeamLeadCahrt
