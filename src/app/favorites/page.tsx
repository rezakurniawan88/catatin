import FavoriteCardList from '@/components/cards/favorite-card-list'
import Header from '@/components/header'
import Sidebar from '@/components/sidebar'
import React from 'react'

export default function FavoritesPage() {
    return (
        <main>
            <Sidebar />
            <div className="relative h-screen p-6 sm:ml-64">
                <Header />
                <div className="py-8">
                    <h1 className="font-bold font-sans text-xl">Favorites</h1>
                    <FavoriteCardList />
                </div>
            </div>
        </main>
    )
}
