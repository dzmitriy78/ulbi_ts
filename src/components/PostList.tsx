import React from 'react';
import PostItem from "./PostItem";

type PostListPropsType = {
    posts: Array<PostType>
    title: string
    remove(post: PostType):void
}
export type PostType = {
    id:number
    title: string
    body: string
}

const PostList = ({posts, title, remove}: PostListPropsType) => {
    return (
        <div>
            <h1 style={{textAlign: "center"}}>{title}</h1>
            {posts.map((posts, index) =>
                <PostItem number={index+1} key={posts.id} post={posts} remove={remove}/>
            )}
        </div>
    );
};

export default PostList;