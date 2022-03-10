import React, {useState} from 'react';
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";

const PostForm = ({create}: any) => {
    const [post, setPost] = useState({title: "", body: ""})
    let addNewPost = (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        const newPost = {
            ...post, id: Date.now()
        }
        create(newPost)
        setPost({title: "", body: ""})
    }
    return (
        <form>
            <MyInput type={"text"}
                     placeholder={"Название поста"}
                     value={post.title}
                     onChange={(e: { target: { value: string; }; }) => setPost({
                         ...post,
                         title: e.target.value
                     })}
            />
            <MyInput type={"text"}
                     placeholder={"Описание поста"}
                     value={post.body}
                     onChange={(e: { target: { value: string; }; }) => setPost({
                         ...post,
                         body: e.target.value
                     })}

            />
            <MyButton onClick={addNewPost}>Создать пост</MyButton>
        </form>
    )
}
export default PostForm;