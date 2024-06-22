import Sidebar from "@/components/sidebar"
import Header from "@/components/header"
import CardList from "@/components/cards/card-list";
import PinnedCardList from "@/components/cards/pinned-card-list";
import ModalAddNote from "@/components/modal/modal-add-note";

export default function Home() {
  return (
    <main>
      <Sidebar />
      <div className="relative h-screen p-6 sm:ml-64">
        <Header />
        <div className="py-8">
          <h1 className="font-bold font-sans text-xl">All Notes</h1>
          <PinnedCardList />
          <div className="others mt-4 mb-10">
            <h1 className="font-sans text-sm text-slate-400">Others</h1>
            <CardList />
          </div>
        </div>
        <ModalAddNote />
      </div>
    </main>
  );
}
