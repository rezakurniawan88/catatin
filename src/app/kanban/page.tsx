import Sidebar from "@/components/sidebar"
import Header from "@/components/header"
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import KanbanContainer from "@/components/kanban/kanban-container";
import ModalAddKanban from "@/components/modal/modal-add-kanban";

export default async function KanbanPage() {
    const session = await getServerSession(authOptions);

    return (
        <main>
            <Sidebar />
            <div className="relative h-screen p-6 sm:ml-64">
                <Header session={session} />
                <div className="pt-8 pb-12">
                    <h1 className="font-bold font-sans text-xl ml-2 md:ml-0">Kanban Board</h1>
                    <KanbanContainer />
                </div>
                <ModalAddKanban />
            </div>
        </main>
    );
}
