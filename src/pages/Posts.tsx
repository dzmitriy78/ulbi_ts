import React, {useEffect, useRef, useState} from 'react';
import "../styles/App.css"
import Pagination from "../components/UI/pagination/Pagination";
import PostList, {PostType} from "../components/PostList";
import PostFilter from "../components/PostFilter";
import MyModal from '../components/UI/MyModal/MyModal';
import PostForm from "../components/PostForm";
import MyButton from '../components/UI/button/MyButton';
import {usePost} from "../hooks/usePosts";
import {getPageCount} from "../utils/pages";
import PostService from "../API/PostService";
import {useFetching} from "../hooks/useFetching";
import Loader from "../components/UI/Loader/Loader";
import {useObserver} from "../hooks/useObserver";
import MySelect from "../components/UI/select/MySelect";


function Posts() {

    const [posts, setPosts] = useState<any>([])
    const [filter, setFilter] = useState({sort: "", query: ""})
    const [modal, setModal] = useState(false)
    const [totalPages, setTotalPages] = useState(0)
    const [limit, setLimit] = useState<any>(10)
    const [page, setPage] = useState(1)
    const [fetchPosts, isPostLoading, postError] = useFetching(async (limit: number, page: number) => {
        const response: any = await PostService.getAll(limit, page)
        setPosts([...posts, ...response.data])
        const totalCount = response.headers["x-total-count"]
        setTotalPages(getPageCount(totalCount, limit))
    })

    const sortedAndSearchedPosts = usePost(posts, filter.sort, filter.query)
    const lastElement = useRef<any>()


    useObserver(lastElement, page < totalPages, isPostLoading, () => {
        setPage(page + 1)
    })

    useEffect(() => {
        // @ts-ignore
        fetchPosts(limit, page)
    }, [page, limit])


    const createPost = (newPost: PostType) => {
        setPosts([...posts, newPost])
        setModal(false)
    };

    const removePost = (post: PostType) => {
        setPosts(posts.filter((p: { id: number; }) => p.id !== post.id))
    }

    const changePage = (page: number) => {
        setPage(page)
    }

    return (
        <div className="App">
            <MyButton style={{marginTop: 30}} onClick={() => setModal(true)}>
                Создать пользователя
            </MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost}/>
            </MyModal>

            <hr style={{margin: "15px 0"}}/>
            <PostFilter
                filter={filter}
                setFilter={setFilter}
            />

            <MySelect
                options={[
                    {value: 5, name: 5},
                    {value: 10, name: 10},
                    {value: 25, name: 25},
                    {value: -1, name: "Показать все"},
                ]}
                defaultValue="Количество элементов на странице"
                value={limit}
                onChange={value => setLimit(value)}
            />
            {postError &&
            <h1>Произошла ошибка ${postError}</h1>
            }
            <PostList
                remove={removePost}
                posts={sortedAndSearchedPosts}
                title={"Посты про Javascript"}/>
            <div ref={lastElement} style={{height: 20, background: "red"}}/>
            {
                isPostLoading &&
                <div style={{display: "flex", justifyContent: "center", marginTop: 50}}><Loader/></div>

            }
            <Pagination
                changePage={changePage}
                page={page}
                totalPages={totalPages}/>
        </div>
    );
}

export default Posts;