"use client";

import { SearchProvider } from "@/context/search-context";
import React from "react";
import { QueryClientProvider, QueryClient } from "react-query";

function Providers({ children }: React.PropsWithChildren) {
    const [client] = React.useState(new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false
            }
        }
    }));

    return (
        <QueryClientProvider client={client}>
            <SearchProvider>
                {children}
            </SearchProvider>
        </QueryClientProvider>
    );
}

export default Providers;
