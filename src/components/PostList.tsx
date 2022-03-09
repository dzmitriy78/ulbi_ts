import React from 'react';
import PostItem from "./PostItem";

type PostListPropsType = {
    posts: Array<PostType>
    title: string
}
export type PostType = {
    id: number
    title: string
    body: string
}

const PostList = ({posts, title}: PostListPropsType) => {
    return (
        <div>
            <h1 style={{textAlign: "center"}}>{title}</h1>
            {posts.map(posts =>
                <PostItem key={posts.id} post={posts}/>
            )}
        </div>
    );
};

export default PostList;