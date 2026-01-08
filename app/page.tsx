"use client"

import { useState } from "react"
import { SearchBar } from "@/components/SearchBar"
import { BookCard } from "@/components/BookCard"
import { useSearchBooks, useTrendingBooks } from "@/lib/hooks"
import { Skeleton } from "@/components/ui/skeleton"
import { BookCardSkeleton } from "@/components/BookCardSkeleton"
import { motion } from "framer-motion"

export default function Home() {
  const [query, setQuery] = useState("")
  const searchState = useSearchBooks(query)
  const trendingState = useTrendingBooks()

  const { books, isLoading, isError } = query ? searchState : trendingState

  const handleSearch = (value: string) => {
    setQuery(value)
  }

  return (
    <div className="space-y-8">
      <section className="text-center py-10 space-y-4">
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold tracking-tight lg:text-6xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {query ? (
            <>Find Your Next <span className="text-primary">Adventure</span></>
          ) : (
            <>Trending <span className="text-primary">Books</span></>
          )}
        </motion.h1>
        <motion.p
          className="text-muted-foreground text-lg max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {query ? "Search millions of books from the Open Library." : "Discover the most popular books on Open Library right now."}
        </motion.p>
        <div className="pt-4">
          <SearchBar onSearch={handleSearch} isLoading={isLoading} initialValue={query} />
        </div>
      </section>

      <section>
        {isError && (
          <div className="text-center text-destructive py-10">
            Failed to load books. Please try again.
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {isLoading ? (
            Array.from({ length: 10 }).map((_, i) => (
              <BookCardSkeleton key={i} />
            ))
          ) : (
            books.map((book) => (
              <BookCard key={book.key} book={book} />
            ))
          )}
        </div>

        {!isLoading && books.length === 0 && query && (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">No books found for "{query}".</p>
          </div>
        )}
      </section>
    </div>
  )
}
