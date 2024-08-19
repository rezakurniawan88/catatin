import { createContext, useContext, useState } from "react";

interface SidebarContextProps {
    sidebarIsOpen: boolean;
    setSidebarIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SidebarContext = createContext<SidebarContextProps>({
    sidebarIsOpen: false,
    setSidebarIsOpen: () => { },
});

export const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
    const [sidebarIsOpen, setSidebarIsOpen] = useState<boolean>(false);

    return (
        <SidebarContext.Provider value={{ sidebarIsOpen, setSidebarIsOpen }}>
            {children}
        </SidebarContext.Provider>
    );
};

export const useSidebarContext = () => {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error('useSidebarContext must be used within a SidebarProvider');
    }
    return context;
};