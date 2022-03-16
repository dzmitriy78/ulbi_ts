import React from 'react';
import PostItem from "./PostItem";
import {TransitionGroup, CSSTransition} from "react-transition-group"

type PostListPropsType = {
    posts: Array<PostType>
    title: string
    remove(post: PostType): void
}
export type PostType = {
    id: number
    title: string
    body: string
}

const PostList = ({posts, title, remove}: PostListPropsType) => {

    if (!posts.length) {
        return (
            <h1 style={{textAlign: "center"}}>
                Посты не найдены!
            </h1>
        )
    }
    return (
        <div>
            <h1
                style={{textAlign: "center"}}>
                {title}
            </h1>
            <TransitionGroup>
                {posts.map((posts, index) =>
                    <CSSTransition
                        key={posts.id}
                        timeout={500}
                        classNames="post"
                    >
                        <PostItem number={index + 1} post={posts} remove={remove}/>
                    </CSSTransition>
                )}
            </TransitionGroup>

        </div>
    );
};

export default PostList;