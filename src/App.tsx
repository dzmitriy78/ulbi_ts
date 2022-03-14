import React, {useState} from 'react';
import "./components/styles/App.css"
import PostList, {PostType} from "./components/PostList";
import PostForm from "./components/PostForm";
import MySelect from "./components/UI/select/MySelect";
import MyInput from "./components/UI/input/MyInput";

function App() {

    const [posts, setPosts] = useState<Array<PostType>>([
            {id: 1, title: "aa", body: "fd"},
            {id: 2, title: "ss 2", body: "gf"},
            {id: 3, title: "gg 3", body: "gh"}
        ]
    )
    const [selectedSort, setSelectedSort] = useState("")
    const [searchQuery, setSearchQuery] = useState("")

    function getSortedPosts () {
        console.log("Отработала")
        if (selectedSort) {
            // @ts-ignore
            return [...posts].sort((a,b)=>a[selectedSort].localeCompare(b[selectedSort]))
        }
        return posts;
    }

    const sortedPosts = getSortedPosts()

    const createPost = (newPost: PostType) => {
        setPosts([...posts, newPost])
    };
    const removePost = (post: PostType) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    const sortPosts = (sort: React.SetStateAction<string>) => {
        setSelectedSort(sort)
    }

    return (
        <div className="App">
            <PostForm create={createPost}/>
            <hr style={{margin: "15px 0"}}/>
            <div>
                <MyInput
                value = {searchQuery}
                onChange = {(e: { target: { value: React.SetStateAction<string>; }; })=>setSearchQuery(e.target.value)}
                placeholder = "Поиск..."
                />
                <MySelect
                    value={selectedSort}
                    onChange={sortPosts}
                    defaultValue={"Сортировка"}
                    options={[
                        {value: "title", name: "По названию"},
                        {value: "body", name: "По описанию"}
                    ]}
                />
            </div>
            {posts.length
                ? <PostList remove={removePost} posts={sortedPosts} title={"Посты про Javascript"}/>
                : <h1 style={{textAlign: "center"}}>Посты не найдены!</h1>
            }
        </div>
    );
}

export default App;
