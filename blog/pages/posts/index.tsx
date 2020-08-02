import {NextPage} from "next";
import React, {useEffect, useState} from "react";
import usePosts from "../../hooks/usePosts";

const PostsIndex:NextPage=()=>{

    const {posts,isLoading,isEmpty}=usePosts()

    return(
        <div>
            {isLoading?<div>加载中</div>:
                isEmpty?<div>空的</div>:
                posts.map(post=><div key={post.id}>{post.id}-{post.title}</div>)}
        </div>
    )
}

export default PostsIndex