"use client"
import { User } from '@prisma/client';
import { CSVLink } from 'react-csv';
import { AiOutlineCloudDownload } from "react-icons/ai";

interface ExportFileProps {
    data:User[] | any;
    filename:string;
}

const ExportFile:React.FC<ExportFileProps> = ({ data, filename }) =>{
   

    return (
      <CSVLink data={data && data}  filename={filename} className="btn btn-primary">
        <AiOutlineCloudDownload  className='text-neutral-400 w-5 h-5 hover:text-white '/>
      </CSVLink>
    );
}
export default ExportFile