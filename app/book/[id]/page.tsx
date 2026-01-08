"use client"

import { useParams, useRouter } from "next/navigation"
import { useBookDetails, useFavorites } from "@/lib/hooks"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { ArrowLeft, BookOpen, Calendar, Clock, Heart } from "lucide-react"
import { COVERS_BASE_URL } from "@/lib/api"
import Image from "next/image"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

export default function BookDetailsPage() {
    const params = useParams()
    const router = useRouter()
    const id = params.id as string
    const { book, isLoading, isError } = useBookDetails(id)
    const { isFavorite, add, remove } = useFavorites()

    // Construct a book object for storage if not already there.
    // Note: The details API returns slightly different shape. 
    // We'll need to adapt it if we want to save from here, 
    // but usually users save from search. 
    // For now, let's assume we can save enough info or we check via ID.

    const coverUrl = book && book.covers && book.covers.length > 0
        ? `${COVERS_BASE_URL}/${book.covers[0]}-L.jpg`
        : "https://placehold.co/400x600?text=No+Cover"

    const isFav = isFavorite(`/works/${id}`) // Key in search is usually /works/OL...

    const handleFavorite = () => {
        if (!book) return
        const bookToSave = {
            key: `/works/${id}`,
            title: book.title,
            cover_i: book.covers ? book.covers[0] : undefined,
            // We might not have author name in details perfectly flat, but we try
            author_name: book.authors?.map(a => "Author"), // Simplified, would need extra fetch or passing state
            first_publish_year: book.first_publish_date ? parseInt(book.first_publish_date) : undefined
        }

        // Actually, saving from details is tricky without full author names if not fetched.
        // For this demo, let's assume we toggle based on ID and maybe disable add if missing data?
        // Or better, just rely on what we have.

        if (isFav) {
            remove(`/works/${id}`)
        } else {
            add(bookToSave)
        }
    }

    if (isLoading) {
        return (
            <div className="container mx-auto py-10 px-4 space-y-8">
                <Skeleton className="h-8 w-32" />
                <div className="grid md:grid-cols-[300px_1fr] gap-8">
                    <Skeleton className="h-[450px] w-full rounded-xl" />
                    <div className="space-y-4">
                        <Skeleton className="h-10 w-3/4" />
                        <Skeleton className="h-6 w-1/2" />
                        <Skeleton className="h-32 w-full" />
                    </div>
                </div>
            </div>
        )
    }

    if (isError || !book) {
        return (
            <div className="container mx-auto py-20 text-center">
                <h2 className="text-2xl font-bold mb-4">Book not found</h2>
                <Button onClick={() => router.back()}>Go Back</Button>
            </div>
        )
    }

    return (
        <motion.div
            className="container mx-auto py-10 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <Button variant="ghost" className="mb-6 pl-0 hover:bg-transparent hover:text-primary" onClick={() => router.back()}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
            </Button>

            <div className="grid md:grid-cols-[350px_1fr] gap-10 items-start">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="relative rounded-xl overflow-hidden shadow-2xl"
                >
                    <Image
                        src={coverUrl}
                        alt={book.title}
                        width={350}
                        height={500}
                        className="w-full object-cover"
                        priority
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-6"
                >
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight mb-2">{book.title}</h1>
                        <div className="flex flex-wrap gap-4 text-muted-foreground items-center">
                            {book.authors && (
                                <span className="flex items-center">
                                    Author(s): {book.authors.map(a => a.author.key.split('/').pop()).join(", ")}
                                    {/* Note: fetching author names requires separate calls usually. */}
                                </span>
                            )}
                            {book.first_publish_date && (
                                <span className="flex items-center">
                                    <Calendar className="mr-1 h-4 w-4" />
                                    {book.first_publish_date}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="prose dark:prose-invert max-w-none text-lg leading-relaxed">
                        {typeof book.description === 'string' ? book.description : book.description?.value || "No description available."}
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6">
                        {book.number_of_pages && (
                            <Card>
                                <CardContent className="p-4 flex flex-col items-center text-center">
                                    <BookOpen className="h-6 w-6 mb-2 text-primary" />
                                    <span className="text-sm font-medium">{book.number_of_pages} Pages</span>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    <div className="flex gap-4">
                        <Button size="lg" onClick={handleFavorite} variant={isFav ? "secondary" : "default"}>
                            <Heart className={`mr-2 h-5 w-5 ${isFav ? "fill-red-500 text-red-500" : ""}`} />
                            {isFav ? "Saved to Favorites" : "Add to Favorites"}
                        </Button>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    )
}
