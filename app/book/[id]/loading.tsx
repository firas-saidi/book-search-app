import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
    return (
        <div className="container mx-auto py-10 px-4 space-y-8 animate-pulse">
            <Skeleton className="h-8 w-32" />
            <div className="grid md:grid-cols-[350px_1fr] gap-10 items-start">
                <Skeleton className="w-full h-[500px] rounded-xl" />
                <div className="space-y-6">
                    <Skeleton className="h-12 w-3/4" />
                    <div className="flex gap-4">
                        <Skeleton className="h-6 w-32" />
                        <Skeleton className="h-6 w-32" />
                    </div>
                    <Skeleton className="h-40 w-full" />
                    <div className="grid grid-cols-4 gap-4">
                        <Skeleton className="h-24 w-full" />
                    </div>
                </div>
            </div>
        </div>
    )
}
