import { getuserById } from "@/app/actions/getUserById"
//import DetailCustomer from "./CustomerDetail";

interface Iparams {
    customerId: string;
}
const CustomerId = async({params}:{params:Iparams}) => {
    const customerById = await getuserById(params)
    console.log(customerById)
    return (
        <div>
            {/* <DetailCustomer 
                user = {customerById}
            /> */}
        </div>
    )
}

export default CustomerId