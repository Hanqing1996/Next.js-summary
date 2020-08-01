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
// index.js

<img src="/find.png" alt=""/>
```
* 把 find.png 放在 assets/image 目录下
```
// index.js

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