import { getMailById } from "@/app/actions/getMailById";
import ReportById from "./ReportById"
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

interface IParams {
    reportId: string;

}

const page = async({params}:{params:IParams}) =>{

    //console.log(params.reportId)

    const mailById = await getMailById(params.reportId)
    const currentUser = await getServerSession(authOptions);
    return (
        <ReportById 
            mailById = {mailById}
            currentUser = {currentUser}
        />
    )
}

export default page