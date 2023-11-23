import Head from 'next/head'
import Layout from '../components/layout';
import ProfilePage from '../components/profile/profilePage.js';
import { React, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from 'next/router'
import { useRecoilValue } from 'recoil';
import { tokenState } from '../recoil/recoilToken.js';

export default function Profile() {
    const router = useRouter()
    const token = useRecoilValue(tokenState);
    const [isAuth, setIsAuth] = useState(false);
    const [ssrCompleted, setSsrCompleted] = useState(false);

    useEffect(() => {
        axios.post("http://localhost:5656/graphql", {
            query: `
                query {
                    fetchUser{ isAuth }
                }
            `,
        },{
            headers:{
                Authorization: `Bearer ${token}`
            },
            withCredentials: true
        })
        .then(res => {
            if(!res.data.data){
                alert("로그인이 필요합니다.")
                setSsrCompleted(false);
                router.push('/')
                return;
            } 
            setIsAuth(res.data.data.fetchUser.isAuth)
            setSsrCompleted(true);
        })
        .catch(error =>  alert(error));
    }, [])

    return (
      <Layout>
          <Head>
              <title>THE 캠핑 : 프로필</title>
              <meta name="description" content="캠핑 쇼핑몰" />
              <link rel="icon" href="/favicon.png" />
          </Head>
          <section className="flex flex-col items-center justify-center text-gray-600 body-font">
            {ssrCompleted ? <ProfilePage isAuth={isAuth} /> : <></>}
          </section>
      </Layout>
    );
  }