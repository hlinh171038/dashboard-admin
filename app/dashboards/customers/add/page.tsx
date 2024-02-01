
import InputCustomerId from "@/components/customers/input"
import SelectCustomer from "@/components/customers/select"
import { Textarea } from "@/components/ui/textarea"


const AddNewCustomer = () =>{
    return (
        <div className="px-2 ">
            <div className="bg-slate-600 w-full h-auto rounded-md px-2 py-2 flex flex-col gap-2">
            <div className="grid grid-cols-2 gap-8">
                    <div className="col-span-1 flex flex-col gap-2">
                        <InputCustomerId 
                            title ="username"
                            placeholder = "username"
                            type = "text"
                        />
                        <InputCustomerId
                            title ="password"
                            placeholder = "password"
                            type = "password"
                        />
                        <SelectCustomer 
                            title="Is Admin ?"
                        />
                        
                    </div>
                    <div className="col-span-1 flex flex-col gap-2">
                        <InputCustomerId 
                            title ="email"
                            placeholder = "email"
                            type = "text"
                        />
                        <InputCustomerId 
                            title ="phone"
                            placeholder = "phone"
                            type = "number"
                        />
                        <SelectCustomer 
                            title="Is Active ?"
                        />
                    </div>
            </div>
            <div>
                    <Textarea className="outline-none bg-slate-500/60 border-0 focus:bg-white focus:border-0 h-52 mb-4" placeholder="Address"/>
            </div>
            <button  className="text-[15px] w-full px-2 py-1 rounded flex items-center justify-center text-white bg-slate-950 hover:text-neutral-200 hover:bg-slate-800/60 transition-all duration-300">Add New</button>
            </div>
        </div>
    )
}

export default AddNewCustomer