"use client"

interface MycomponentProps {
    mail:any;
}

const MyComponent:React.FC<MycomponentProps>=  ({
    mail = []
}) =>{

    return (
        <div>
            {mail?.map((item:any)=>{
                return (
                    <div key={item.id}>linh</div>
                )
            })}
        </div>
    ) 
}

export default MyComponent