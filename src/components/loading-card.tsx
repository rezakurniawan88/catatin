import { LucideLoader2 } from "lucide-react";

export default function LoadingCard() {
    return (
        <div className="flex w-full h-32 justify-center items-center">
            <LucideLoader2 size={28} className="animate-spin text-slate-500" />
        </div>
    )
}
