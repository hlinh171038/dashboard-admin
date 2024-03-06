"use client"
import { cn } from '@/lib/utils';
import { Maximize } from 'lucide-react';
import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import { useCallback } from 'react';
import { MdAddPhotoAlternate } from "react-icons/md";

declare global {
    var cloudinary: any;
}

interface UploadImageProps {
    value: string;
    onChange: (value:string) => void;
    update?: boolean;
    disabled?: boolean
}

const UploadImage:React.FC<UploadImageProps> = ({
    value,
    onChange,
    update,
    disabled
}) =>{

    const handleUpload = useCallback((result: any)=>{
        onChange(result.info.secure_url)
    },[onChange])
    return (
        <CldUploadWidget 
            onUpload={handleUpload}
            uploadPreset="hhbqtryr"
            options = {{
                maxFiles: 1
           }}
          
        >
        {({ open }) => {
            return (
                <div
                    onClick={()=> open?.()}
                    className={cn('relative cursor-pointer hover:opacity-70 transition   p-20  flex flex-col justify-center items-center gap-2  hover:text-neutral-200 aspect-square text-white text-[15px]',
                            update ?"rounded-full object-cover":"border-2 border-neutral-300 border-dashed"
                    )}
                >
                    <MdAddPhotoAlternate className='w-6 h-6' />
                    <div className='font-semibold text-lg'>
                        Click to Upload
                    </div>
                    {value && (
                        <div className='absolute a w-full h-full '>
                            <Image 
                                alt="Upload"
                                fill
                                style={{objectFit:"cover"}}
                                src={value}
                                className={cn(update && 'rounded-full')}
                            />
                        </div>
                    )}
                </div>
            );
        }}
        </CldUploadWidget>
    )
}

export default UploadImage