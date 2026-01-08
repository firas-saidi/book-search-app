import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function BookCardSkeleton() {
    return (
        <Card className="overflow-hidden h-full flex flex-col border-muted bg-card shadow-sm">
            <div className="relative aspect-[2/3] w-full bg-muted">
                <Skeleton className="h-full w-full" />
            </div>
            <div className="p-4 flex flex-col flex-1 gap-2">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <div className="mt-auto pt-4 flex justify-between items-center">
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-4 w-1/4" />
                </div>
            </div>
        </Card>
    )
}
