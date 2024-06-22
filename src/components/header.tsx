"use client"

import { useState } from "react";
import Search from "./search";

export default function Header() {
    const [profileOpen, setProfileOpen] = useState<boolean>(false);

    return (
        <div className="relative flex justify-between items-center">
            <Search />
            <div>
                <div onClick={() => setProfileOpen(!profileOpen)} className="w-10 h-10 flex justify-center items-center bg-slate-800 text-white rounded-full cursor-pointer">RK</div>
                <div className={profileOpen ? "absolute top-14 right-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44" : "hidden"}>
                    <div className="px-4 py-3 text-sm text-gray-900">
                        <div className="text-sm">Bonnie Green</div>
                        <div className="font-medium text-xs truncate">name@flowbite.com</div>
                    </div>
                    <div className="flex gap-2 items-center py-2 px-4 text-red-500 hover:bg-gray-100">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-4"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" x2="9" y1="12" y2="12" /></svg>
                        <a href="#" className="text-xs font-medium">Log out</a>
                    </div>
                </div>
            </div>
        </div>
    )
}
