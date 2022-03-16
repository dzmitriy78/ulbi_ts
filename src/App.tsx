import React, {useMemo, useState} from 'react';
import "./components/styles/App.css"
import PostList, {PostType} from "./components/PostList";
import PostForm from "./components/PostForm";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/UI/MyModal/MyModal";
import MyButton from "./components/UI/button/MyButton";

function App() {

    const [posts, setPosts] = useState<any>([
            {id: 1, title: "aa", body: "fd"},
            {id: 2, title: "ss 2", body: "gf"},
            {id: 3, title: "gg 3", body: "gh"}
        ]
    )
    const [filter, setFilter] = useState({sort: "", query: ""})
    const [modal, setModal] = useState(false)

        const
    sortedPosts = useMemo(() => {
        if (filter.sort) {
            return [...posts].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort]))
        }
        return posts;
    }, [filter.sort, posts])

    const sortedAndSearchedPosts = useMemo(() => {
        return sortedPosts.filter((post: { title: string; }) => post.title.toLowerCase().includes(filter.query))
    }, [filter.query, sortedPosts])

    const createPost = (newPost: PostType) => {
        setPosts([...posts, newPost])
        setModal(false)
    };
    const removePost = (post: PostType) => {
        setPosts(posts.filter((p: { id: number; }) => p.id !== post.id))
    }

    return (
        <div className="App">
            <MyButton style = {{marginTop: 30}} onClick = {()=> setModal(true)}>
                Создать пользователя
            </MyButton>
            <MyModal visible={modal} setVisible = {setModal}>
                <PostForm create={createPost}/>
            </MyModal>

            <hr style={{margin: "15px 0"}}/>
            <PostFilter
                filter={filter}
                setFilter={setFilter}
            />
            <PostList
                remove={removePost}
                posts={sortedAndSearchedPosts}
                title={"Посты про Javascript"}/>
        </div>
    );
}

export default App;
