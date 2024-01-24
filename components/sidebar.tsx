import Image from "next/image"
import { MdArrowBackIos } from "react-icons/md";

const Sidebar = () =>{
    return (
        <div className="h-screen  flex flex-col">
            <div className="h-auto bg-slate-900 text-white py-1 flex items-center justify-between">
                <Image src="/logo2.png" width="100" height="100" alt="logo"/>
                <MdArrowBackIos className="text-white w-5 h-5 mr-4"/>
            </div>
            <div className="bg-slate-600 h-screen text-white">
                <div>
                    Home
                </div>
                <div>
                    Invoice
                </div>
                <div>
                    Customer
                </div>
            </div>
            <div className="bg-slate-900 text-white">log out</div>
        </div>
    )
}

export default Sidebar