import { Book } from '@/lib/api';

const FAVORITES_KEY = 'book_search_favorites';

export function getFavorites(): Book[] {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem(FAVORITES_KEY);
    return stored ? JSON.parse(stored) : [];
}

export function saveFavorite(book: Book) {
    if (typeof window === 'undefined') return;
    const favorites = getFavorites();
    if (!favorites.find((b) => b.key === book.key)) {
        favorites.push(book);
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    }
}

export function removeFavorite(bookId: string) {
    if (typeof window === 'undefined') return;
    const favorites = getFavorites().filter((b) => b.key !== bookId);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

export function isFavorite(bookId: string): boolean {
    if (typeof window === 'undefined') return false;
    return getFavorites().some((b) => b.key === bookId);
}
