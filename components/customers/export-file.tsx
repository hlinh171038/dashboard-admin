"use client"
import { User } from '@prisma/client';
import { useEffect, useState } from 'react';
import { CSVLink } from 'react-csv';
import { AiOutlineCloudDownload } from "react-icons/ai";
import { toast } from 'sonner';

interface ExportFileProps {
    data:User[] | any;
    filename:string;
    currentUser: any;
}

const ExportFile:React.FC<ExportFileProps> = ({ data, filename, currentUser }) =>{
 const [open,setOpen] = useState(false)
   const handleExport = () =>{
      if(currentUser.permission === 'read') {
        toast.warning('Only export files with execute permissions !!!');
        return;
      }
      if(currentUser === null) {
        toast.warning('Login to export !!!');
        return;
      }
      
   }

   useEffect(()=>{
    if(currentUser === null || currentUser.permission === 'read') {
      setOpen(false)
    }else {

      setOpen(true)
    }
   },[currentUser])
    return (
      <div>
        {open ? (
        <CSVLink data={data && data}  filename={filename} className="btn btn-primary" onClick={handleExport}>
          <AiOutlineCloudDownload  className='text-neutral-400 w-5 h-5 hover:text-white '/>
        </CSVLink>
        ):(
          <AiOutlineCloudDownload  className='text-neutral-400 w-5 h-5 hover:text-white cursor-pointer ' onClick={handleExport}/>
        )}
      </div>
    );
}
export default ExportFile