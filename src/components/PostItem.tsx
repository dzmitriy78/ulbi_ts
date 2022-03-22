import React from 'react';
import MyButton from "./UI/button/MyButton";
import {PostType} from "./PostList";
import {useNavigate} from "react-router-dom"

interface PostItemPropsType {
    number: number
    remove(post: PostType): void
    post: {
        id: number
        title: string
        body: string
    }
}

const PostItem = (props: PostItemPropsType) => {
    const deletePost = () => props.remove(props.post)
    const router = useNavigate()
    return (
        <div>
            <div className={"post"}>
                <div className="post__content">
                    <strong>{props.post.id}.{props.post.title}</strong>
                    <div>
                        {props.post.body}
                    </div>
                </div>
                <div className="post__btns">
                    <MyButton onClick={() => router(`/posts/${props.post.id}`)}>Открыть</MyButton>
                    <MyButton onClick={deletePost}>Удалить</MyButton>
                </div>
            </div>
        </div>
    );
};

export default PostItem;