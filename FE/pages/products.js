import Head from 'next/head'
import Layout from '../components/layout.js';
import ProductPage from '../components/product/productPage.js';
import { React, useEffect, useState } from "react";
import axios from "axios";
import { useRecoilValue } from 'recoil';
import { tokenState } from '../recoil/recoilToken.js';

export default function Product() {
    const token = useRecoilValue(tokenState);
    const [products, setProducts] = useState("");
    const [isAdmin, setIsAdmin] = useState(0);
    useEffect(() => {
        axios.post("http://localhost:5656/graphql", {
            query: `
                query {
                    fetchProducts {
                        id, name, description, price, isSoldout, url, productCategory{name}
                    }
                }
            `,
        },
        { withCredentials: true }
        )
        .then(res => {
            setProducts(res.data.data.fetchProducts)  
        })
        .catch(error =>  alert("상품을 불러오는데 실패했습니다."));

        axios.post("http://localhost:5656/graphql", {
            query: `
                query {
                    fetchUser{ isAdmin }
                }
            `,
        },{
            headers:{
                Authorization: `Bearer ${token}`
            },
            withCredentials: true
        })
        .then(res => {
            setIsAdmin(res.data.data.fetchUser.isAdmin)
        })
        .catch(error =>  alert("fetchUser Error"));
    }, [])

    return (
      <Layout>
          <Head>
              <title>THE 캠핑</title>
              <meta name="description" content="캠핑 쇼핑몰" />
              <link rel="icon" href="/favicon.png" />
          </Head>
          <section className="flex flex-col items-center justify-center text-gray-600 body-font">
              {products ? <ProductPage products={products} isAdmin={isAdmin}/> : <></>}
          </section>
      </Layout>
    );
  }