"use client"

import { User } from "@prisma/client"
import ItemCustomer from "./item"


interface TableCustomerProps {
    users?: User[] | null
}

const TableCustomer:React.FC<TableCustomerProps> = ({
    users =[]
}) =>{
    console.log(users)
    return (
       <table className="w-full text-[15px] text-white ">
            <tr className="font-bold ">
                <td>Name</td>
                <td>Email</td>
                <td>Created at</td>
                <td>Role</td>
                <td>Action</td>
                <td></td>
            </tr>
            {users && users.map((item:any)=>{
                return (<ItemCustomer 
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        img={item.image}
                        email={item.email}
                        created_at={item.createdAt}
                        role={item.role}
                        action={item.action}
                    />
                )
            })}
       </table>
    )
}

export default TableCustomer