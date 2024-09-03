"use client"

import LoadingCard from '../../loading-card'
import useFetchAllBoards from '@/hooks/boards/useFetchAllBoards';
import BoardCardItem from '../card-item/board-card-item';
import { useSearchContext } from '@/context/search-context';
import { BoardItemProps } from '@/types/board-type';

export default function BoardCardList() {
    const { debouncedSearchValue } = useSearchContext();
    const { data: dataBoards, isLoading: loadingDataBoards } = useFetchAllBoards();

    const filteredBoards = dataBoards?.filter((data: BoardItemProps) =>
        data.title.toLowerCase().includes(debouncedSearchValue.toLowerCase())
    );

    const otherBoards = filteredBoards?.filter((data: BoardItemProps) => data.isPinned === false && data.isArchived === false);

    return (
        <div className="mt-4 mb-10">
            <h1 className="font-sans text-sm text-slate-400">Others</h1>
            <div className="flex gap-4 flex-wrap py-3">
                {loadingDataBoards ? (
                    <LoadingCard />
                ) : otherBoards.length > 0 ? (
                    otherBoards.map((board: any) => (
                        <BoardCardItem key={board.id} board={board} />
                    ))
                ) : (
                    <div className="w-full">
                        <h1 className="text-slate-400 text-center">No Data Boards</h1>
                    </div>
                )}
            </div>
        </div>
    )
}
