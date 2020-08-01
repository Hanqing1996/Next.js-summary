import {NextPage} from "next";
import React, {useEffect, useState} from "react";
import axios from 'axios'

const PostsIndex:NextPage=()=>{

    const [posts,setPosts]=useState([])
    const [isLoading,setLoading]=useState(false)
    const [isEmpty,setIsEmpty]=useState(false)

    useEffect(()=>{
        setLoading(true)
        axios.get('/api/posts').then(res=>{

            setTimeout(()=>{
                setPosts(res.data)

                if(res.data.length==0){
                    setIsEmpty(true)
                }

                setLoading(false)


            },3000)
        })
    },[])

    return(
        <div>
            {isLoading?<div>加载中</div>:
                isEmpty?<div>空的</div>:
                posts.map(post=><div key={post.id}>{post.id}-{post.title}</div>)}
        </div>
    )
}

export default PostsIndex