"use client"

import LoadingCard from '../loading-card'
import useFetchAllBoards from '@/hooks/boards/useFetchAllBoards';
import BoardCardItem from './board-card-item';
import { useSearchContext } from '@/context/search-context';
import { BoardItemProps } from '@/types/board-type';
import Search from '../search';

export default function PinnedBoardCardList() {
    const { debouncedSearchValue } = useSearchContext();
    const { data: dataBoards, isLoading: loadingDataBoards } = useFetchAllBoards();

    const filteredBoards = dataBoards?.filter((data: BoardItemProps) =>
        data.title.toLowerCase().includes(debouncedSearchValue.toLowerCase())
    );

    const pinnedBoards = filteredBoards?.filter((data: BoardItemProps) => data.isPinned === true && data.isArchived === false);

    return (
        <>
            <Search display={true} />
            <h1 className="font-bold font-sans text-xl mt-6">Boards</h1>
            <div className={`pinned mt-4 mb-10 ${pinnedBoards?.length === 0 ? "hidden" : ""}`}>
                <h1 className="font-sans text-sm text-slate-400">Pinned</h1>
                <div className="flex gap-4 flex-wrap py-3">
                    {loadingDataBoards ? (
                        <LoadingCard />
                    ) : pinnedBoards.length > 0 ? (
                        pinnedBoards.map((board: any) => (
                            <BoardCardItem key={board.id} board={board} />
                        ))
                    ) : (
                        <div className="w-full">
                            <h1 className="text-slate-400 text-center">No Data Boards</h1>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
