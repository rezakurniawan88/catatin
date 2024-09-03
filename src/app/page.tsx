import Sidebar from "@/components/sidebar"
import Header from "@/components/header"
import PinnedNoteCardList from "@/components/cards/card-lists/pinned-note-card-list";
import NoteCardList from "@/components/cards/card-lists/note-card-list";
import ModalAddNote from "@/components/modal/modal-add-note";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main>
      <Sidebar />
      <div className="relative h-screen p-6 sm:ml-64">
        <Header session={session} />
        <div className="pt-8 pb-12">
          <PinnedNoteCardList />
          <NoteCardList />
        </div>
        <ModalAddNote displayDesktop={true} />
      </div>
    </main>
  );
}
