import Sidebar from "@/components/sidebar"
import Header from "@/components/header"
import PinnedCardList from "@/components/cards/pinned-card-list";
import OthersCardList from "@/components/cards/others-card-list";
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
          <OthersCardList />
        </div>
        <ModalAddNote />
      </div>
    </main>
  );
}
