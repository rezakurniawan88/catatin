import Sidebar from "@/components/sidebar"
import Header from "@/components/header"
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import ModalAddBoard from "@/components/modal/modal-add-board";
import BoardCardList from "@/components/cards/board-card-list";
import PinnedBoardCardList from "@/components/cards/pinned-board-card-list";

export default async function BoardPage() {
    const session = await getServerSession(authOptions);

    return (
        <main>
            <Sidebar />
            <div className="relative h-screen p-6 sm:ml-64">
                <Header session={session} />
                <div className="pt-8 pb-12">
                    <PinnedBoardCardList />
                    <BoardCardList />
                </div>
                <ModalAddBoard displayDesktop={true} />
            </div>
        </main>
    );
}
