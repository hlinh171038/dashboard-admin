

import { getAllMail } from "../actions/getAllMail"


const MyComponent= async ({
   
}) =>{
    const mail = await  getAllMail()
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