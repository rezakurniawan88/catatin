import Sidebar from "@/components/sidebar"
import Header from "@/components/header"
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import ModalAddTodo from "@/components/modal/modal-add-todo";
import TodoCardList from "@/components/cards/todo-card-list";
import PinnedTodoCardList from "@/components/cards/pinned-todo-card-list";

export default async function ToDoPage() {
    const session = await getServerSession(authOptions);

    return (
        <main>
            <Sidebar />
            <div className="relative h-screen p-6 sm:ml-64">
                <Header session={session} />
                <div className="pt-8 pb-12">
                    <PinnedTodoCardList />
                    <TodoCardList />
                </div>
                <ModalAddTodo displayDesktop={true} />
            </div>
        </main>
    );
}
