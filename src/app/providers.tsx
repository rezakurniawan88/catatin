"use client";

import { SearchProvider } from "@/context/search-context";
import React, { useEffect } from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import { ThemeProvider } from "next-themes";
import { SidebarProvider } from "@/context/sidebar-context";

function Providers({ children }: React.PropsWithChildren) {
    const [client] = React.useState(new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false
            }
        }
    }));
    const [mounted, setMounted] = React.useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <QueryClientProvider client={client}>
                <SearchProvider>
                    {children}
                </SearchProvider>
            </QueryClientProvider>
        )
    }

    return (
        <QueryClientProvider client={client}>
            <ThemeProvider attribute="class" defaultTheme="light">
                <SearchProvider>
                    <SidebarProvider>
                        {children}
                    </SidebarProvider>
                </SearchProvider>
            </ThemeProvider>
        </QueryClientProvider>
    );
}

export default Providers;
