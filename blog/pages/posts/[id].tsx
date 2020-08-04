import React from "react";
import {async} from "q";
import {getPost} from "../../lib/posts";
import {NextPage} from "next";

const PostShow:NextPage<{post:Post}> = (props) => {

    return (
        <div>
         <h3>文章详情</h3>
            <div>{props.post.title}</div>
            <div>{props.post.content}</div>
        </div>
    )
}

export default PostShow

export const getStaticPaths = async () => {

    return {
        paths: [
            {
                params: {id: 'firstArticle'}
            },
            {
                params: {id: 'second'}
            }
        ],
        fallback:false
    }
}

export const getStaticProps=async(x)=>{
    const id=x.params.id
    const post=await getPost(id)
    return {
        props:{
            post
        }
    }
}