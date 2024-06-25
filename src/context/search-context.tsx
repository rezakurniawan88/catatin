import React, { createContext, useState, useContext, useEffect, useRef } from 'react';

interface SearchContextProps {
    searchValue: string;
    setSearchValue: React.Dispatch<React.SetStateAction<string>>;
    debouncedSearchValue: string;
}

const SearchContext = createContext<SearchContextProps | undefined>(undefined);

const debounce = (func: Function, delay: number) => {
    let timeoutId: ReturnType<typeof setTimeout> | null;
    return (...args: any[]) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            func(...args);
        }, delay);
    };
};

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
    const [searchValue, setSearchValue] = useState('');
    const [debouncedSearchValue, setDebouncedSearchValue] = useState('');
    const debouncedSearch = useRef<ReturnType<typeof debounce>>();

    useEffect(() => {
        debouncedSearch.current = debounce((value: string) => {
            setDebouncedSearchValue(value);
        }, 300);
    }, []);

    useEffect(() => {
        if (debouncedSearch.current) {
            debouncedSearch.current(searchValue);
        }
    }, [searchValue]);

    return (
        <SearchContext.Provider value={{ searchValue, setSearchValue, debouncedSearchValue }}>
            {children}
        </SearchContext.Provider>
    );
};

export const useSearchContext = () => {
    const context = useContext(SearchContext);
    if (!context) {
        throw new Error('useSearchContext must be used within a SearchProvider');
    }
    return context;
};
