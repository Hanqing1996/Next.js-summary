> 使用Next.js的目的就是构建非SPA的多页面项目。

#### [文档](https://nextjs.org/learn/basics/create-nextjs-app/setup)

#### 安装脚手架
```
yarn create next-app
```

#### Pages are associated with a route based on their file name.
> pages 目录下的文件自动对应某个路由
```
// pages/first-page.js

import React from "react";

export default function X() {
    return (
        <div>First page</div>
    )
}
```
可访问 http://localhost:3000/first-page
* 想要访问 pages/posts/index.tsx,必须使用路由 http://localhost:3000/posts
详见[文档](https://nextjs.org/docs/routing/introduction)

#### SSR 和 CSR
* SSR:server-side-render;
* CSR:client-side-render
* 参考[这里](https://juejin.im/entry/58f49c20ac502e006c3a614e)


#### 在 _app.js 进行全局配置
```
import Head from "next/dist/next-server/lib/head";
import React from "react";

export default function App({Component,pageProps}) {
    return <div className='myBlog'>

        <Head>
            <title>我的博客</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <Component {...pageProps}/>
    </div>
}
```
* 创建 _app.js 后要重新 yarn dev

#### 全局 css 和局部 css
* 全局 css 只能在 _app.js 中引入
```
// _app.js

import '../styles/global.css'
```
* 局部 css
```
<style jsx>{`
.container {
  min-height: 100vh;
  padding: 0 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
`}</style>
```

#### 使用绝对路径
```
// _app.js

import 'styles/global.css'
```
```
// jsconfig.json

{
  "compilerOptions": {
    "baseUrl": "."
  }
}
```
会自动在 jsconfig.json 所在目录中查找 styles/global.css

#### 使用 scss
安装 sass
```
yarn add -D sass
```

#### 引入静态资源
* 直接把 find.png 放在 public 目录下
```
// index.tsx

<img src="/find.png" alt=""/>
```
* 把 find.png 放在 assets/image 目录下
```
// index.tsx

import Link from "next/link";
import png from '../../assets/image/find.png'
import React from "react";

export default function Home() {
  return (
    <div className="container">
        <h1 className="title">
          第一篇文章 <Link href="./first-page">点击这里</Link>

          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
        <img src={png} alt=""/>
    </div>
  )
}
```
```
// next.config.js

module.exports = {
    webpack: (config, options) => {
        const {isServer}=options
        config.module.rules.push({
            test: /\.png$/,
            use: [
                {
                    loader: 'file-loader',
                    options:{
                        outputPath:'static',
                        publicPath:'_next/static'
                    }
                },

            ]
        })
        return config
    }
}
```
* 使用 [next-images](https://www.npmjs.com/package/next-images)


#### 支持 typescript
1. [创建并初始化 tsconfig.json](https://github.com/Hanqing1996/TypeScript-learning)
```
yarn add typescript
tsc --init
```


#### 制造 API 接口
* [api-routes](https://nextjs.org/docs/api-routes/introduction)

#### 配置 baseUrl 
> 指定基准目录为 next.config.js 所在目录
```
// next.config.js,位于 blog 目录下

{
  "compilerOptions": {
    "baseUrl": ".",
    }
}
```
```
// pages/index.tsx

print('./');// 输出的是 blog 目录下的文件名
```

#### gray-matter
用于解析文本内容
---
#### 客户端渲染
> 只在浏览器上执行的渲染
* 缺点
> 由于 HTML 内容是由 js 提供的，所以由如下问题 
1. 在 ajax 请求到数据前，呈现给用户的是 loading 状态（也就是用户有“等”的感觉）
2. SEO 不友好，搜索引擎不会执行 js,它看到的只是一个没有子元素的 div


#### 被渲染了两次的静态内容
```
return(
    <div>
        <h1 onClick={console.log('X')}>文章列表</h1>

        {isLoading?<div>加载中</div>:
            isEmpty?<div>空的</div>:
            posts.map(post=><div key={post.id}>{post.id}-{post.title}</div>)}
    </div>
)
```
以下静态内容被渲染了两次
```
    <div>
        <h1>文章列表</h1>
    </div>
```
1. 服务端渲染（renderToString()）：返回静态 HTML 字符串
2. 客户端渲染（hydrate()）：检验渲染结果与服务端是否一致，并添加事件绑定


####



---
#### SSG（static site generation）
* 属于 pre-render

> posts 由后端获取，最后返回给前端完整的，含数据的 HTML
```
// pages/posts/index.tsx

const PostsIndex:NextPage<{posts:Post []}>=(props)=>{

    console.log(props.posts);

    return(
        <div>
            <h1>文章列表</h1>
            {props.posts.map(post=><div key={post.id}>{post.title}-{post.date}</div>)}
        </div>
    )
}

export default PostsIndex

export const getStaticProps=async ()=>{
    const posts=await getPosts()
    return {
        props:{
            posts
        }
    }
}
```
在生产环境下，getStaticProps 只在 build 时运行一次，这样可以提供一份HTML给所有用户下载



#### SSR（server side render）
* 属于 pre-render
* SSR 比 pre-render，多了一步执行JS的过程。


#### res 返回一个 json 字符串，axios 会解析成数组
```
export default async (req: NextApiRequest, res: NextApiResponse) => {
    const posts = await getPosts()

    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.write(JSON.stringify(posts));
    res.end()
}
```
```
import {NextPage} from "next";
import React, {useEffect, useState} from "react";
import axios from 'axios'

const PostsIndex:NextPage=()=>{

    const [posts,setPosts]=useState([])
    useEffect(()=>{
        axios.get('/api/posts').then(res=>{
            setPosts(res.data)
        })
    },[])

    return(
        <div>
            Posts Index
        </div>
    )
}

export default PostsIndex
```