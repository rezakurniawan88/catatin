"use client";

import useFetchAllNotes from "@/hooks/notes/useFetchAllNotes";
import { NoteItemProps } from "@/types/notes-type";
import CardItem from "./card-item";
import LoadingCard from "../loading-card";

export default function FavoriteCardList() {
    const { data: dataNotes, isLoading: loadingDataNotes } = useFetchAllNotes();

    const favoriteNotes = dataNotes?.filter((data: NoteItemProps) => data.isFavorite);

    return (
        <div className="pinned mt-4 mb-10">
            <div className="flex gap-4 flex-wrap py-3">
                {loadingDataNotes ? (
                    <LoadingCard />
                ) :
                    favoriteNotes && favoriteNotes.length > 0 ? (
                        favoriteNotes?.map((data: NoteItemProps) => (
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
