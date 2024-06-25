"use client";

import useFetchAllNotes from "@/hooks/notes/useFetchAllNotes";
import { NoteItemProps } from "@/types/notes-type";
import CardItem from "./card-item";
import LoadingCard from "../loading-card";

export default function PinnedCardList() {
    const { data: dataNotes, isLoading: loadingDataNotes } = useFetchAllNotes();

    const pinnedNotes = dataNotes?.filter((data: NoteItemProps) => data.isPinned && data.isArchived === false);

    return (
        <div className={`pinned mt-4 mb-10 ${pinnedNotes?.length === 0 ? "hidden" : ""}`}>
            <h1 className="font-sans text-sm text-slate-400">Pinned</h1>
            <div className="flex gap-4 flex-wrap py-3">
                {loadingDataNotes ? (
                    <LoadingCard />
                ) :
                    pinnedNotes && pinnedNotes.length > 0 ? (
                        pinnedNotes?.map((data: NoteItemProps) => (
                            <CardItem key={data.id} data={data} />
                        ))
                    ) : (
                        <div className="w-full">
                            <h1 className="text-slate-400 text-center">No Data Notes</h1>
                        </div>
                    )
                }
            </div>
        </div>
    )
}
