"use client"

import { cn } from "@/lib/utils";
import Link from "next/link"
import { usePathname } from "next/navigation";
import { IconType } from "react-icons/lib";

interface ItemAddNewProps {
    link: string;
    icon:IconType;
    title: string
}

const ItemAddNew:React.FC<ItemAddNewProps> = ({
    link,
    icon:Icon,
    title
}) => {

    const path = usePathname()
    return (
        <Link
            href={link}
            className={cn("pl-10 pt-2 flex items-center justify-start font-thin text-[14px] gap-2 cursor-pointer hover:text-neutral-400   transition-all duration-300",
            path === link && "bg-slate-500/60 rounded-md py-1"
        )}
        >
            <Icon className="w-4 h-4" />
            <div> {title}</div>
        </Link>
    )
}

export default ItemAddNew