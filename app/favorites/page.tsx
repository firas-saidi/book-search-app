"use client"

import { useFavorites } from "@/lib/hooks"
import { BookCard } from "@/components/BookCard"
import { motion } from "framer-motion"

export default function FavoritesPage() {
    const { favorites } = useFavorites()

    return (
        <div className="space-y-8">
            <div className="py-6">
                <h1 className="text-3xl font-bold tracking-tight mb-2">My Favorites</h1>
                <p className="text-muted-foreground">Your collection of saved books.</p>
            </div>

            {favorites.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-20 bg-muted/20 rounded-xl"
                >
                    <h2 className="text-xl font-semibold mb-2">No favorites yet</h2>
                    <p className="text-muted-foreground">Start searching to add books to your collection.</p>
                </motion.div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {favorites.map((book) => (
                        <BookCard key={book.key} book={book} />
                    ))}
                </div>
            )}
        </div>
    )
}
