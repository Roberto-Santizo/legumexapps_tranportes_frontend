import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export function BackLink({ link, text }: { link: string, text: string }) {
    return (
        <Link
            to={link}
            className="group inline-flex w-fit items-center gap-1.5 text-sm font-medium text-gray-500 transition-colors hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
        >
            <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
            {text}
        </Link>

    )
}
