import React, {useState} from 'react';
import "./components/styles/App.css"
import PostList, {PostType} from "./components/PostList";
import PostForm from "./components/PostForm";

function App() {

    const [posts, setPosts] = useState<Array<PostType>>([
            {id: 1, title: "Javascript", body: "description"},
            {id: 2, title: "Javascript 2", body: "description"},
            {id: 3, title: "Javascript 3", body: "description"}
        ]
    )

    const createPost = (newPost: PostType) => {
        setPosts([...posts, newPost])
    };
    const removePost = (post: PostType) => {
        setPosts(posts.filter(p=>p.id !== post.id))
    }
    return (
        <div className="App">
            <PostForm create={createPost}/>
            <PostList remove = {removePost} posts={posts} title={"Посты про Javascript"}/>
        </div>
    );
}

export default App;
