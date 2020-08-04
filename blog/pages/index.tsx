import {GetServerSideProps, GetStaticProps, NextPage} from "next";
import React, {useEffect, useState} from "react";
import {UAParser} from "ua-parser-js";


const Index:NextPage<{browser:{name:string}}>=(props)=>{
    console.log(props.browser.name);

    return(
        <div>
            你的浏览器是{props.browser.name}
        </div>
    )
}

export default Index

export const getServerSideProps=(context)=>{

    const ua=context.req.headers['user-agent']
    const result=new UAParser(ua).getResult()
    return{
        props:{
            browser:result.browser
        }
    }
}