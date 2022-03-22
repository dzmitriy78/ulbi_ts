import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import PostService from "../API/PostService";
import {useFetching} from "../hooks/useFetching"
import Loader from "../components/UI/Loader/Loader";
import {PostType} from "../components/PostList";

interface CommentsType {
    postId: number
    id: number
    name: string
    email: string
    body: string
}

const PostIdPage = () => {
    const params = useParams()
    const [post, setPost] = useState<PostType>({body: "", id: 0, title: ""})
    const [comments, setComments] = useState<Array<CommentsType>>([])
    const [fetchComments, isComLoading, comError] = useFetching(async (id: number) => {
        const response = await PostService.getCommentsByPostId(id)
        setComments(response.data)
    })
    const [fetchPostById, isLoading, error] = useFetching(async (id: number) => {
        const response = await PostService.getById(id)
        setPost(response.data)
    })
    useEffect(() => {
        // @ts-ignore
        fetchPostById(params.id)
        // @ts-ignore
        fetchComments(params.id)
    }, [])
    return (
        <div>
            <h1>Вы открыли страницу поста с ID = {params.id}</h1>
            {isLoading
                ? <Loader/>
                : <div>{post.id}.{post.title}</div>
            }
            <h1>
                Комментарии
            </h1>
            {isLoading
                ? <Loader/>
                : <div>
                    {comments.map((com) =>
                        <div
                            key={com.name}
                            style={{marginTop: 15}}>
                            <h5>{com.email}</h5>
                            <div>{com.body}</div>
                        </div>
                    )}
                </div>
            }
        </div>
    );
};

export default PostIdPage;