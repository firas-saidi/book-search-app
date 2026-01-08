import Link from "next/link"
import { BookOpen } from "lucide-react"
import { ThemeToggle } from "@/components/ThemeToggle"

export function Navbar() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 md:px-16 px-4">
            <div className="container flex h-14 items-center">
                <Link href="/" className="mr-6 flex items-center space-x-2">
                    <BookOpen className="h-6 w-6" />
                    <span className="hidden font-bold sm:inline-block">
                        BookSearch
                    </span>
                </Link>
                <nav className="flex items-center space-x-6 text-sm font-medium">
                    <Link
                        href="/favorites"
                        className="transition-colors hover:text-foreground/80 text-foreground/60"
                    >
                        Favorites
                    </Link>
                </nav>
                <div className="ml-auto flex items-center space-x-2">
                    <ThemeToggle />
                </div>
            </div>
        </header>
    )
}
