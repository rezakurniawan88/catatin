import ArchivedCardList from '@/components/cards/archived-card-list'
import Header from '@/components/header'
import Sidebar from '@/components/sidebar'

export default function ArchivesPage() {
    return (
        <main>
            <Sidebar />
            <div className="relative h-screen p-6 sm:ml-64">
                <Header />
                <div className="py-8">
                    <h1 className="font-bold font-sans text-xl">Archives</h1>
                    <ArchivedCardList />
                </div>
            </div>
        </main>
    )
}
