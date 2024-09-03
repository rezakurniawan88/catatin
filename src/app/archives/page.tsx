import ArchivedCardList from '@/components/cards/card-lists/archived-card-list'
import Header from '@/components/header'
import Sidebar from '@/components/sidebar'
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';

export default async function ArchivesPage() {
    const session = await getServerSession(authOptions);

    return (
        <main>
            <Sidebar />
            <div className="relative h-screen p-6 sm:ml-64">
                <Header session={session} />
                <div className="py-8">
                    <h1 className="font-bold font-sans text-xl">Archives</h1>
                    <ArchivedCardList />
                </div>
            </div>
        </main>
    )
}
