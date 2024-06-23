"use client"

import useFetchAllNotes from "@/hooks/notes/useFetchAllNotes";
import CardItem from "./card-item";
import { NoteItemProps } from "@/types/notes-type";

export default function CardList() {
    const { data: dataNotes, isLoading: loadingDataNotes } = useFetchAllNotes();

    const otherNotes = dataNotes?.filter((data: NoteItemProps) => data.isPinned === false && data.isArchived === false);

    return (
        <div className="flex gap-4 flex-wrap py-3">
            {otherNotes && otherNotes.length > 0 ? (
                otherNotes?.map((data: NoteItemProps) => (
                    <CardItem key={data.id} data={data} />
                ))) : (
                <div className="w-full">
                    <h1 className="text-slate-400 text-center">No Data Notes</h1>
                </div>
            )}
            {loadingDataNotes ? (<h1>Loading ...</h1>) : null}
        </div>
    )
}
