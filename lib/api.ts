export const OPEN_LIBRARY_BASE_URL = 'https://openlibrary.org';
export const COVERS_BASE_URL = 'https://covers.openlibrary.org/b/id';

export interface Book {
    key: string;
    title: string;
    author_name?: string[];
    first_publish_year?: number;
    cover_i?: number;
    number_of_pages_median?: number;
}

export interface BookDetails {
    key: string;
    title: string;
    description?: string | { value: string };
    covers?: number[];
    authors?: { author: { key: string }; type: { key: string } }[];
    first_publish_date?: string;
    number_of_pages?: number;
}

export interface SearchResponse {
    docs: Book[];
    numFound: number;
}

export async function searchBooks(query: string, page: number = 1): Promise<SearchResponse> {
    if (!query) return { docs: [], numFound: 0 };
    const res = await fetch(`${OPEN_LIBRARY_BASE_URL}/search.json?q=${encodeURIComponent(query)}&page=${page}`);
    if (!res.ok) throw new Error('Failed to fetch books');
    return res.json();
}

export async function getBookDetails(id: string): Promise<BookDetails> {
    const res = await fetch(`${OPEN_LIBRARY_BASE_URL}/works/${id}.json`);
    if (!res.ok) throw new Error('Failed to fetch book details');
    return res.json();
}

export async function getAuthor(key: string): Promise<{ name: string }> {
    const res = await fetch(`${OPEN_LIBRARY_BASE_URL}${key}.json`);
    if (!res.ok) throw new Error('Failed to fetch author');
    return res.json();
}

export async function getTrendingBooks(page: number = 1): Promise<SearchResponse> {
    // using 'subject:fiction' and sorting by 'editions' is a good proxy for popularity/trending
    // q=* can often timeout or be rejected.
    const res = await fetch(`${OPEN_LIBRARY_BASE_URL}/search.json?q=subject:fiction&sort=editions&page=${page}&limit=20`);
    if (!res.ok) throw new Error('Failed to fetch trending books');
    return res.json();
}
