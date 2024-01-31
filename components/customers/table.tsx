"use client"

import ItemCustomer from "./item"

const table = [
    {
        name:"hello",
        img:"/avatar-empty.png",
        email: "hello@gmail.com",
        created_at: "20/11/2023",
        role: "client",
        action: "passive"
    },
    {
        name:"hello",
        img:"/avatar-empty.png",
        email: "hello@gmail.com",
        created_at: "20/11/2023",
        role: "client",
        action: "passive"
    }
]

const TableCustomer = () =>{
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
            {table.map((item)=>{
                return (
                    <ItemCustomer 
                        key={item.name}
                        name={item.name}
                        img={item.img}
                        email={item.email}
                        created_at={item.created_at}
                        role={item.role}
                        action={item.action}
                    />
                )
            })}
       </table>
    )
}

export default TableCustomer