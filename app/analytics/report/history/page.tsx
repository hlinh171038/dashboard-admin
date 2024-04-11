import { getAllTempMail } from "@/app/actions/getAllTempMail";
import History from "./History";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getAllUser2 } from "@/app/actions/getAllUser2";



const page = async({searchParams}:{searchParams: { [key: string]: string | string[] | undefined }}) =>{

    //console.log(params.reportId)

    const query = typeof searchParams.query === 'string' ? searchParams.query : '';

    const tempMail = await getAllTempMail()
    const currentUser = await getServerSession(authOptions)
    const user = await getAllUser2()
    return (
        <History
           tempMail ={tempMail}
           currentUser = {currentUser}
           query ={query}
           user ={user}
        />
    )
}

export default page