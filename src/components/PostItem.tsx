import React from 'react';

interface PostItemPropsType {
    post: {
        id: number
        title: string
        body: string
    }
}

const PostItem = (props: PostItemPropsType) => {

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
                    <button>Удалить</button>
                </div>
            </div>
        </div>
    );
};

export default PostItem;