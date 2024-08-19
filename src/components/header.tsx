"use client"

import { useState } from "react";
import Search from "./search";
import { Button } from "./ui/button";
import { signIn, signOut } from "next-auth/react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";
import { LucideLogOut, LucideMenu } from "lucide-react";
import { useSidebarContext } from "@/context/sidebar-context";
import Link from "next/link";

export default function Header({ session }: any) {
    const { sidebarIsOpen, setSidebarIsOpen } = useSidebarContext();
    const [profileOpen, setProfileOpen] = useState<boolean>(false);
    const acronymUser = session?.user?.name?.split(/\s+/g).slice(0, 2).map((word: string | number[]) => word[0]).join('').toUpperCase();

    return (
        <div className="relative flex justify-between items-center">
            <Button onClick={() => setSidebarIsOpen(!sidebarIsOpen)} variant="ghost" className="sm:hidden"><LucideMenu /></Button>
            <Search display={false} />
            {session !== null ? (
                <div>
                    <div onClick={() => setProfileOpen(!profileOpen)} className="w-10 h-10 flex justify-center items-center bg-slate-800 text-white rounded-full cursor-pointer">{acronymUser}</div>
                    <div className={profileOpen ? "absolute top-14 right-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-800 overflow-hidden" : "hidden"}>
                        <div className="px-4 py-3 text-sm text-gray-900">
                            <div className="text-sm dark:text-gray-200">{session?.user?.name || "Guest"}</div>
                            <div className="font-medium text-xs truncate dark:text-gray-200">{session?.user?.email || "Guest"}</div>
                        </div>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <div className="flex gap-2 items-center p-3 text-red-500 hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-600">
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
                    <Link href="/auth/register">
                        <Button variant="secondary" className="text-xs sm:text-sm">Sign Up</Button>
                    </Link>
                </div>
            )}
        </div>
    )
}
