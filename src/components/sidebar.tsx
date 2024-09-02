"use client"

import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { useState } from "react";
import { LucideCheckSquare, LucideKanban, LucideTvMinimal, LucideX } from "lucide-react";
import { useSidebarContext } from "@/context/sidebar-context";

export default function Sidebar() {
    const pathname = usePathname();
    const { setTheme, theme } = useTheme();
    const [checkedTheme, setCheckedTheme] = useState<boolean>(false);
    const { sidebarIsOpen, setSidebarIsOpen } = useSidebarContext();

    return (
        <aside className={`fixed top-0 left-0 z-40 w-64 h-screen pt-6 pb-4 px-2 transition-transform ${sidebarIsOpen ? "" : "-translate-x-full"}  bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-darkPrimary dark:border-gray-600`}>
            <div className="flex justify-between items-center w-full mb-6">
                <div className="flex flex-grow justify-center">
                    <h1 className="font-bold font-sans text-2xl">Catat.in</h1>
                </div>
                <button onClick={() => setSidebarIsOpen(!sidebarIsOpen)} className="p-1 mr-2 rounded-full items-end hover:bg-slate-100 hover:dark:bg-slate-800 sm:hidden"><LucideX size={16} /></button>
            </div>
            <div className="relative h-full overflow-y-auto overflow-x-hidden">
                <ul className="space-y-2 font-medium">
                    <Link href="/" onClick={() => setSidebarIsOpen(false)} className={`flex items-center p-2 rounded-lg pl-8 text-slate-500 hover:bg-gray-50 dark:hover:bg-gray-900 ${pathname == "/" ? "font-semibold text-slate-800 bg-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-800" : "text-gray-900"}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 transition duration-75"><path d="M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4" /><path d="M2 6h4" /><path d="M2 10h4" /><path d="M2 14h4" /><path d="M2 18h4" /><path d="M21.378 5.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" /></svg>
                        <h2 className="flex-1 ml-2.5 text-sm font-sans whitespace-nowrap">Notes</h2>
                    </Link>

                    <Link href="/todo" onClick={() => setSidebarIsOpen(false)} className={`flex items-center p-2 rounded-lg pl-8 text-slate-500 hover:bg-gray-50 dark:hover:bg-gray-900 ${pathname == "/todo" ? "font-semibold text-slate-800 bg-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-800" : "text-gray-900"}`}>
                        <LucideCheckSquare className="w-4 h-4 transition duration-75" />
                        <h2 className="flex-1 ml-2.5 text-sm font-sans whitespace-nowrap">To Do</h2>
                    </Link>

                    <Link href="/board" onClick={() => setSidebarIsOpen(false)} className={`flex items-center p-2 rounded-lg pl-8 text-slate-500 hover:bg-gray-50 dark:hover:bg-gray-900 ${pathname == "/board" ? "font-semibold text-slate-800 bg-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-800" : "text-gray-900"}`}>
                        <LucideTvMinimal className="w-4 h-4 transition duration-75" />
                        <h2 className="flex-1 ml-2.5 text-sm font-sans whitespace-nowrap">Board</h2>
                    </Link>

                    <Link href="/kanban" onClick={() => setSidebarIsOpen(false)} className={`flex items-center p-2 rounded-lg pl-8 text-slate-500 hover:bg-gray-50 dark:hover:bg-gray-900 ${pathname == "/kanban" ? "font-semibold text-slate-800 bg-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-800" : "text-gray-900"}`}>
                        <LucideKanban className="w-4 h-4 transition duration-75" />
                        <h2 className="flex-1 ml-2.5 text-sm font-sans whitespace-nowrap">Kanban</h2>
                    </Link>

                    <Link href="/favorites" onClick={() => setSidebarIsOpen(false)} className={`flex items-center p-2 rounded-lg pl-8 text-slate-500 hover:bg-gray-50 dark:hover:bg-gray-900 ${pathname == "/favorites" ? "font-semibold text-slate-800 bg-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-800" : "text-gray-900"}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 transition duration-75"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>
                        <h2 className="flex-1 ml-2.5 text-sm font-sans whitespace-nowrap">Favorites</h2>
                    </Link>

                    <Link href="/archives" onClick={() => setSidebarIsOpen(false)} className={`flex items-center p-2 rounded-lg pl-8 text-slate-500 hover:bg-gray-50 dark:hover:bg-gray-900 ${pathname == "/archives" ? "font-semibold text-slate-800 bg-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-800" : "text-gray-900"}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 transition duration-75"><rect width="20" height="5" x="2" y="3" rx="1" /><path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8" /><path d="M10 12h4" /></svg>
                        <h2 className="flex-1 ml-2.5 text-sm font-sans whitespace-nowrap">Archives</h2>
                    </Link>
                    <div className="flex items-center space-x-2 pl-8 p-2">
                        <Switch id="dark-mode"
                            className="dark:bg-gray-800"
                            checked={theme === "dark" ? true : false}
                            onCheckedChange={() => {
                                setCheckedTheme(!checkedTheme);
                                setTheme(checkedTheme ? "light" : "dark")
                            }} />
                        <Label htmlFor="dark-mode" className="text-sm font-sans text-slate-500 cursor-pointer">Dark Mode</Label>
                    </div>

                    <li className="absolute w-full bottom-14 left-0 flex items-center p-2 text-gray-600 text-center">
                        <h2 className="flex-1 ml-2.5 text-xs font-sans whitespace-nowrap dark:text-gray-400">{`CATAT.in @${new Date().getFullYear()}`}</h2>
                    </li>
                </ul>
            </div>
        </aside>
    )
}
