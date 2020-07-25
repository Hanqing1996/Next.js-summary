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


