"use client"
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
}

const UploadImage:React.FC<UploadImageProps> = ({
    value,
    onChange
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
                    className='
                        relative
                        cursor-pointer
                        hover:opacity-70
                        transition
                        border-dashed
                        border-2
                        p-20
                        border-neutral-300
                        flex
                        justify-center
                        items-center
                        gap-4
                        text-neutral-600
                       aspect-square
                    '
                >
                    <MdAddPhotoAlternate className='w-4 h-4' />
                    <div className='font-semibold text-lg'>
                        Click to Upload
                    </div>
                    {value && (
                        <div className='absolute a w-full h-full'>
                            <Image 
                                alt="Upload"
                                fill
                                style={{objectFit:"cover"}}
                                src={value}
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