import { BookCardSkeleton } from "@/components/BookCardSkeleton"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
    return (
        <div className="space-y-8 animate-pulse">
            <section className="text-center py-10 space-y-4">
                <Skeleton className="h-16 w-3/4 mx-auto" />
                <Skeleton className="h-6 w-1/2 mx-auto" />
                <div className="pt-4 flex justify-center">
                    <Skeleton className="h-10 w-full max-w-md rounded-md" />
                </div>
            </section>

            <section>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {Array.from({ length: 10 }).map((_, i) => (
                        <BookCardSkeleton key={i} />
                    ))}
                </div>
            </section>
        </div>
    )
}
