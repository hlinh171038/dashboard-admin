import { getMailById } from "@/app/actions/getMailById";
import ReportById from "./ReportById"

interface IParams {
    reportId: string;
}

const page = async({params}:{params:IParams}) =>{

    //console.log(params.reportId)

    const mailById = await getMailById(params.reportId)
    return (
        <ReportById 
            mailById = {mailById}
        />
    )
}

export default page