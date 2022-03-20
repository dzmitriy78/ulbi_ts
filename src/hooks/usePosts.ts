import {useMemo} from "react";

export const useSortedPosts = (posts: any, sort: string | number) => {
    const sortedPosts = useMemo(() => {
        if (sort) {
            return [...posts].sort((a, b) => a[sort].localeCompare(b[sort]))
        }
        return posts;
    }, [sort, posts])
    return sortedPosts
}

export const usePost = (posts: any, sort: string | number, query: string) => {
    const sortedPosts = useSortedPosts(posts, sort)
    const sortedAndSearchedPosts = useMemo(() => {
        return sortedPosts.filter((post: { title: string; }) => post.title.toLowerCase().includes(query))
    }, [query, sortedPosts])
    return sortedAndSearchedPosts
}