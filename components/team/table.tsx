"use client"

import { User } from "@prisma/client"
import TableHeader from "./table-header"
import ItemTable from "./item-table"

interface TableProps {
    //user: User[] | any;
    userSearch: User[] | any
}

const Table:React.FC<TableProps> = ({
   // user = [],
    userSearch = []
}) =>{

    console.log(userSearch)

    return (
        <div className="w-[100%] min-w-[71.2vw]">
            <TableHeader />
            <table className="w-full">
                <tr>
                    <td>Member</td>
                    <td>email</td>
                    <td>date</td>
                    <td>status</td>
                    <td>role</td>
                    <td></td>
                </tr>
                {userSearch && userSearch.map((item:any)=>{
                    return <ItemTable
                                key={item.id}
                                id={item.id}
                                name = {item.name}
                                image = {item.image}
                                email = {item.email}
                                status = {item.action}
                                role = {item.role}
                                createdAt = {item.createdAt}
                            />
                })}
            </table>  
        </div>
    )
}

export default Table