import React, {useEffect, useState} from 'react';
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
import {UseFetching} from "../hooks/useFetching";
import Loader from "../components/UI/Loader/Loader";


function Posts() {

    const [posts, setPosts] = useState<any>([])
    const [filter, setFilter] = useState({sort: "", query: ""})
    const [modal, setModal] = useState(false)
    const [totalPages, setTotalPages] = useState(0)
    const [limit, setLimit] = useState(10)
    const [page, setPage] = useState(1)
    const [fetchPosts, isPostLoading, postError] = UseFetching(async (limit: number, page: number) => {
        const response: any = await PostService.getAll(limit, page)
        setPosts(response.data)
        const totalCount = response.headers["x-total-count"]
        setTotalPages(getPageCount(totalCount, limit))
    })

    const sortedAndSearchedPosts = usePost(posts, filter.sort, filter.query)

    useEffect(() => {
        // @ts-ignore
        fetchPosts(limit, page)
    }, [])


    const createPost = (newPost: PostType) => {
        setPosts([...posts, newPost])
        setModal(false)
    };

    const removePost = (post: PostType) => {
        setPosts(posts.filter((p: { id: number; }) => p.id !== post.id))
    }

    const changePage = (page: number) => {
        setPage(page)
        // @ts-ignore
        fetchPosts(limit, page)
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
            {postError &&
            <h1>Произошла ошибка ${postError}</h1>
            }
            {
                isPostLoading
                    ? <div style={{display: "flex", justifyContent: "center", marginTop: 50}}><Loader/></div>
                    : <PostList
                        remove={removePost}
                        posts={sortedAndSearchedPosts}
                        title={"Посты про Javascript"}/>
            }
            <Pagination
                changePage={changePage}
                page={page}
                totalPages={totalPages}/>
        </div>
    );
}

export default Posts;