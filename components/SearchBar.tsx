"use client"

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface SearchBarProps {
    initialValue?: string
    onSearch: (value: string) => void
    isLoading?: boolean
}

export function SearchBar({ initialValue = "", onSearch, isLoading }: SearchBarProps) {
    const [value, setValue] = useState(initialValue)

    useEffect(() => {
        const handler = setTimeout(() => {
            onSearch(value)
        }, 500)

        return () => {
            clearTimeout(handler)
        }
    }, [value, onSearch])

    return (
        <div className="relative w-full max-w-lg mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Search for books..."
                className="pl-10 h-12 text-lg shadow-sm"
            />
            {isLoading && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                </div>
            )}
        </div>
    )
}
