"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Book, COVERS_BASE_URL } from "@/lib/api"
import { Card, CardContent } from "@/components/ui/card"
import { useFavorites } from "@/lib/hooks"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

interface BookCardProps {
    book: Book
}

export function BookCard({ book }: BookCardProps) {
    const { favorites, add, remove } = useFavorites()
    const isFav = favorites.some((b) => b.key === book.key)

    // Construct initial URL
    const initialCoverUrl = book.cover_i
        ? `${COVERS_BASE_URL}/${book.cover_i}-L.jpg`
        : "https://placehold.co/400x600.png?text=No+Cover"

    const [imgSrc, setImgSrc] = useState(initialCoverUrl)

    useEffect(() => {
        setImgSrc(initialCoverUrl)
    }, [initialCoverUrl])

    const toggleFavorite = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (isFav) {
            remove(book.key)
        } else {
            add(book)
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ y: -5 }}
        >
            <Link href={`/book/${book.key.split("/").pop()}`}>
                <Card className="overflow-hidden h-full flex flex-col group cursor-pointer border-muted bg-card shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <div className="relative aspect-[2/3] w-full overflow-hidden bg-muted">
                        <Image
                            src={imgSrc}
                            alt={book.title}
                            fill
                            loading="lazy"
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            sizes="(max-width: 768px) 50vw, 33vw"
                            onError={() => setImgSrc("https://placehold.co/400x600.png?text=No+Cover")}
                        />
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-2 right-2 bg-background/80 hover:bg-background text-foreground backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={toggleFavorite}
                        >
                            <Heart
                                className={`h-5 w-5 ${isFav ? "fill-red-500 text-red-500" : ""}`}
                            />
                        </Button>
                    </div>
                    <CardContent className="flex-1 p-4 bg-card z-10">
                        <h3 className="font-semibold line-clamp-1 text-lg mb-1" title={book.title}>
                            {book.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                            {book.author_name?.join(", ") || "Unknown Author"}
                        </p>
                        {book.first_publish_year && (
                            <p className="text-xs text-muted-foreground mt-2">
                                {book.first_publish_year}
                            </p>
                        )}
                    </CardContent>
                </Card>
            </Link>
        </motion.div>
    )
}
