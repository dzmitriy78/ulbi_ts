import React, {useEffect, useState} from 'react';
import "./components/styles/App.css"
import PostList, {PostType} from "./components/PostList";
import PostForm from "./components/PostForm";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/UI/MyModal/MyModal";
import MyButton from "./components/UI/button/MyButton";
import {usePost} from "./components/hooks/usePosts";
import PostService from "./API/PostService";
import Loader from "./components/UI/Loader/Loader";
import {UseFetching} from "./components/hooks/useFetching";

function App() {

    const [posts, setPosts] = useState<any>([])
    const [filter, setFilter] = useState({sort: "", query: ""})
    const [modal, setModal] = useState(false)
    const [fetchPosts, isPostLoading, postError] = UseFetching(async () => {
        const posts = await PostService.getAll()
        setPosts(posts)
    })

    const sortedAndSearchedPosts = usePost(posts, filter.sort, filter.query)

    useEffect(() => {
        // @ts-ignore
        fetchPosts()
    }, [])


    const createPost = (newPost: PostType) => {
        setPosts([...posts, newPost])
        setModal(false)
    };

    const removePost = (post: PostType) => {
        setPosts(posts.filter((p: { id: number; }) => p.id !== post.id))
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
        </div>
    );
}

export default App;
