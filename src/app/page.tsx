import Sidebar from "@/components/sidebar"
import Header from "@/components/header"
import PinnedCardList from "@/components/cards/pinned-card-list";
import OthersCardList from "@/components/cards/others-card-list";
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
          <PinnedCardList />
          <OthersCardList />
        </div>
        <ModalAddNote displayDesktop={true} />
      </div>
    </main>
  );
}
