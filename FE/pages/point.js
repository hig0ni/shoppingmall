import Head from 'next/head'
import Script from 'next/script'
import Layout from '../components/layout';
import PointPage from '../components/point/pointPage.js';
import { React, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from 'next/router'
import { useRecoilValue } from 'recoil';
import { tokenState } from '../recoil/recoilToken.js';
import useDidMountEffect from "../components/useDidMountEffect";

export default function Point() {
    const router = useRouter()
    const token = useRecoilValue(tokenState);
    const [point, setPoint] = useState(false);
    const [ssrCompleted, setSsrCompleted] = useState(false);
    
    useDidMountEffect(() => {
        axios.post("http://localhost:5656/graphql", {
            query: `
                query {
                    fetchPoint
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
            setPoint(res.data.data.fetchPoint);
            setSsrCompleted(true);
        })
        .catch(error =>  alert(error));
    }, [token])

    return (
      <Layout>
          <Head>
              <title>THE 캠핑 : 포인트충전</title>
              <meta name="description" content="캠핑 쇼핑몰" />
              <link rel="icon" href="/favicon.png" />
          </Head>
          <Script src="https://cdn.iamport.kr/v1/iamport.js"></Script>
          <section className="flex flex-col items-center justify-center text-gray-600 body-font">
            {ssrCompleted ? <PointPage nowPoint={point}/> : <></>}
          </section>
      </Layout>
    );
  }