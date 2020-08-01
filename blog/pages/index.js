import Head from 'next/head'
import Link from "next/link";
import png from '../../assets/image/find.png'
import React from "react";

console.log(png);

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
