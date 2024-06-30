import FavoriteCardList from '@/components/cards/favorite-card-list'
import Header from '@/components/header'
import ModalAddNote from '@/components/modal/modal-add-note';
import Sidebar from '@/components/sidebar'
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';

export default async function FavoritesPage() {
    const session = await getServerSession(authOptions);

    return (
        <main>
            <Sidebar />
            <div className="relative h-screen p-6 sm:ml-64">
                <Header session={session} />
                <div className="py-8">
                    <h1 className="font-bold font-sans text-xl">Favorites</h1>
                    <FavoriteCardList />
                </div>
            </div>
            <ModalAddNote displayDesktop={false} />
        </main>
    )
}
