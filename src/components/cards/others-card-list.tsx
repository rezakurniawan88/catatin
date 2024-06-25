"use client"

import useFetchAllNotes from "@/hooks/notes/useFetchAllNotes";
import CardItem from "./card-item";
import { NoteItemProps } from "@/types/notes-type";
import LoadingCard from "../loading-card";
import { useSearchContext } from "@/context/search-context";

export default function OthersCardList() {
    const { debouncedSearchValue } = useSearchContext();
    const { data: dataNotes, isLoading: loadingDataNotes } = useFetchAllNotes();

    const filteredNotes = dataNotes?.filter((data: NoteItemProps) =>
        data.title.toLowerCase().includes(debouncedSearchValue.toLowerCase())
    );

    const otherNotes = filteredNotes?.filter((data: NoteItemProps) => data.isPinned === false && data.isArchived === false);

    return (
        <div className="others mt-4 mb-10">
            <h1 className="font-sans text-sm text-slate-400">Others</h1>
            <div className="flex gap-4 flex-wrap py-3">
                {loadingDataNotes ? (
                    <LoadingCard />
                ) :
                    otherNotes && otherNotes.length > 0 ? (
                        otherNotes?.map((data: NoteItemProps) => (
                            <CardItem key={data.id} data={data} />
                        ))) : (
                        <div className="w-full">
                            <h1 className="text-slate-400 text-center">No Data Notes</h1>
                        </div>
                    )
                }
            </div>
        </div>
    )
}
