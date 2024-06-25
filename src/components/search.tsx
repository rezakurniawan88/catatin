import { useSearchContext } from "@/context/search-context";

export default function Search() {
    const { searchValue, setSearchValue } = useSearchContext();

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    return (
        <form className="w-1/2">
            <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-5 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                </div>
                <input type="search" id="default-search" className="block w-full p-3 ps-12 text-xs font-sans text-gray-900 border border-gray-300 rounded-full focus:ring-blue-500 focus:border-blue-500" placeholder="Search notes ..." required value={searchValue} onChange={handleSearchChange} />
            </div>
        </form>
    )
}
