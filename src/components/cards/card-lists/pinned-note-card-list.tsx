"use client";

import useFetchAllNotes from "@/hooks/notes/useFetchAllNotes";
import { NoteItemProps } from "@/types/notes-type";
import NoteCardItem from "../card-item/note-card-item";
import LoadingCard from "../../loading-card";
import { useSearchContext } from "@/context/search-context";
import Search from "../../search";

export default function PinnedNoteCardList() {
    const { debouncedSearchValue } = useSearchContext();
    const { data: dataNotes, isLoading: loadingDataNotes } = useFetchAllNotes();

    const filteredNotes = dataNotes?.filter((data: NoteItemProps) =>
        data.title.toLowerCase().includes(debouncedSearchValue.toLowerCase())
    );

    const pinnedNotes = filteredNotes?.filter((data: NoteItemProps) => data.isPinned && data.isArchived === false);

    return (
        <>
            <Search display={true} />
            <h1 className="font-bold font-sans text-xl mt-6 md:mt-0">All Notes</h1>
            <div className={`pinned mt-4 mb-10 ${pinnedNotes?.length === 0 ? "hidden" : ""}`}>
                <h1 className="font-sans text-sm text-slate-400">Pinned</h1>
                <div className="flex gap-4 flex-wrap py-3">
                    {loadingDataNotes ? (
                        <LoadingCard />
                    ) :
                        pinnedNotes && pinnedNotes.length > 0 ? (
                            pinnedNotes?.map((data: NoteItemProps) => (
                                <NoteCardItem key={data.id} data={data} />
                            ))
                        ) : (
                            <div className="w-full">
                                <h1 className="text-slate-400 text-center">No Data Notes</h1>
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    )
}
