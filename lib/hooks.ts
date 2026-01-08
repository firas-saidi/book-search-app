import useSWR from 'swr';
import { getBookDetails, searchBooks, getTrendingBooks, Book } from '@/lib/api';
import { useEffect, useState } from 'react';
import { getFavorites, isFavorite, removeFavorite, saveFavorite } from '@/lib/storage';

export function useSearchBooks(query: string) {
    const { data, error, isLoading } = useSWR(
        query ? ['search', query] : null,
        ([, q]) => searchBooks(q),
        {
            revalidateOnFocus: false,
        }
    );

    return {
        books: data?.docs || [],
        count: data?.numFound || 0,
        isLoading,
        isError: error,
    };
}

export function useTrendingBooks() {
    const { data, error, isLoading } = useSWR(
        ['trending'],
        () => getTrendingBooks(),
        {
            revalidateOnFocus: false,
        }
    );

    return {
        books: data?.docs || [],
        isLoading,
        isError: error,
    };
}

export function useBookDetails(id: string) {
    const { data, error, isLoading } = useSWR(
        id ? ['book', id] : null,
        ([, i]) => getBookDetails(i)
    );

    return {
        book: data,
        isLoading,
        isError: error,
    };
}

export function useFavorites() {
    const [favorites, setFavorites] = useState<Book[]>([]);

    useEffect(() => {
        setFavorites(getFavorites());
    }, []);

    const add = (book: Book) => {
        saveFavorite(book);
        setFavorites(getFavorites());
    };

    const remove = (bookId: string) => {
        removeFavorite(bookId);
        setFavorites(getFavorites());
    };

    const checkIsFavorite = (bookId: string) => isFavorite(bookId);

    return { favorites, add, remove, isFavorite: checkIsFavorite };
}
