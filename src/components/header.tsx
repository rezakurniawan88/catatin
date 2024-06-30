"use client"

import { useState } from "react";
import Search from "./search";
import { Button } from "./ui/button";
import { signIn, signOut } from "next-auth/react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";
import { LucideLogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header({ session }: any) {
    const pathname = usePathname();
    const [profileOpen, setProfileOpen] = useState<boolean>(false);
    const acronymUser = session?.user?.name?.split(/\s+/g).slice(0, 2).map((word: string | number[]) => word[0]).join('').toUpperCase();

    return (
        <div className="relative flex justify-between items-center">
            <h1 className="font-bold font-sans text-2xl inline sm:hidden">Catat.in</h1>
            <Search display={false} />
            {session !== null ? (
                <div>
                    <div onClick={() => setProfileOpen(!profileOpen)} className="w-10 h-10 flex justify-center items-center bg-slate-800 text-white rounded-full cursor-pointer">{acronymUser}</div>
                    <div className={profileOpen ? "absolute top-14 right-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44" : "hidden"}>
                        <div className="px-4 py-3 text-sm text-gray-900">
                            <div className="text-sm">{session?.user?.name || "Guest"}</div>
                            <div className="font-medium text-xs truncate">{session?.user?.email || "Guest"}</div>
                        </div>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <div className="flex gap-2 items-center p-3 text-red-500 hover:bg-gray-100 cursor-pointer">
                                    <LucideLogOut size={16} />
                                    <p className="text-xs font-medium">Log out</p>
                                </div>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="max-w-md md:max-w-xl">
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you sure to logout?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. and you can log out of your session from our server.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction className="bg-red-500 hover:bg-red-800" onClick={() => signOut()}>Logout</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </div>
            ) : (
                <div className="flex gap-2 items-center">
                    <Button onClick={() => signIn()} className="text-xs sm:text-sm">Sign In</Button>
                    <Button variant="secondary" className="text-xs sm:text-sm">Sign Up</Button>
                </div>
            )}
            <div className="sm:hidden fixed bottom-0 left-0 w-full h-20 flex items-center gap-4 bg-white py-2 px-6 border-t-2 z-40">
                <Link href="/" className="w-1/4">
                    <div className={`flex flex-col items-center gap-2 py-2 rounded-lg cursor-pointer hover:bg-slate-50 ${pathname == "/" ? "bg-slate-100" : ""}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 transition duration-75"><path d="M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4" /><path d="M2 6h4" /><path d="M2 10h4" /><path d="M2 14h4" /><path d="M2 18h4" /><path d="M21.378 5.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" /></svg>
                        <h1 className="text-xs text-slate-500 font-semibold">Notes</h1>
                    </div>
                </Link>
                <Link href="/favorites" className="w-1/4">
                    <div className={`flex flex-col items-center gap-2 py-2 rounded-lg cursor-pointer hover:bg-slate-50 ${pathname == "/favorites" ? "bg-slate-100" : ""}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 transition duration-75"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>
                        <h1 className="text-xs text-slate-500 font-semibold">Favorites</h1>
                    </div>
                </Link>
                <Link href="/archives" className="w-1/4">
                    <div className={`flex flex-col items-center gap-2 py-2 rounded-lg cursor-pointer hover:bg-slate-50 ${pathname == "/archives" ? "bg-slate-100" : ""}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 transition duration-75"><rect width="20" height="5" x="2" y="3" rx="1" /><path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8" /><path d="M10 12h4" /></svg>
                        <h1 className="text-xs text-slate-500 font-semibold">Archives</h1>
                    </div>
                </Link>
            </div>
        </div>
    )
}
