import React, {useState} from 'react';
import "./components/styles/App.css"
import PostList from "./components/PostList";
import MyButton from "./components/UI/button/MyButton";
import MyInput from "./components/UI/input/MyInput";

function App() {

    const [posts, setPosts] = useState([
            {id: 1, title: "Javascript", body: "description"},
            {id: 2, title: "Javascript 2", body: "description"},
            {id: 3, title: "Javascript 3", body: "description"}
        ]
    )
    const [title, setTitle] = useState("")

    let addNewPost = (e: { preventDefault: () => void; }) => {
        e.preventDefault()
    };
    return (
        <div className="App">
            <form>
                <MyInput type={"text"}
                         placeholder={"Название поста"}
                         value={title}
                         onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setTitle(e.target.value)}
                />
                <MyInput type={"text"} placeholder={"Описание поста"}/>
                <MyButton onClick={addNewPost}>Создать пост</MyButton>
            </form>
            <PostList posts={posts} title={"Посты про Javascript"}/>
        </div>
    );
}

export default App;
