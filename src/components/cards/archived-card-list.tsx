"use client";

import useFetchAllNotes from "@/hooks/notes/useFetchAllNotes";
import { NoteItemProps } from "@/types/notes-type";
import CardItem from "./card-item";

export default function ArchivedCardList() {
    const { data: dataNotes, isLoading: loadingDataNotes } = useFetchAllNotes();

    const archivedNotes = dataNotes?.filter((data: NoteItemProps) => data.isArchived);

    return (
        <div className="pinned mt-4 mb-10">
            <div className="flex gap-4 flex-wrap py-3">
                {archivedNotes && archivedNotes.length > 0 ? (
                    archivedNotes?.map((data: NoteItemProps) => (
                        <CardItem key={data.id} data={data} />
                    ))
                ) : (
                    <div className="w-full">
                        <h1 className="text-slate-400 text-center">No Data Notes</h1>
                    </div>
                )
                }
                {loadingDataNotes ? (<h1>Loading ...</h1>) : null}
            </div>
        </div>
    )
}
