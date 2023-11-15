import Head from 'next/head'
import Layout from '../../components/layout.js';
import ProductDetailPage from '../../components/product/productDetailPage.js';
import { React, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from 'next/router';

export default function productDetail() {
    const [product, setProduct] = useState("");
    const router = useRouter();
    const id = router.query.id;
    useEffect(() => {  
        axios.post("http://localhost:5656/graphql", {
            query: `
                query {
                    fetchProduct(productId:"${id}") {
                        id, name, description, price, isSoldout, url, productCategory{name}
                    }
                }
            `,
        },
        { withCredentials: true }
        )
        .then(res => {
            setProduct(res.data.data.fetchProduct)  
        })
        .catch(error =>  alert("상품을 불러오는데 실패했습니다."));
    }, [id])

    return (
      <Layout>
          <Head>
              <title>THE 캠핑</title>
              <meta name="description" content="캠핑 쇼핑몰" />
              <link rel="icon" href="/favicon.png" />
          </Head>
          <section className="flex flex-col items-center justify-center text-gray-600 body-font">
              {product ? <ProductDetailPage product={product}/> : <></>}
          </section>
      </Layout>
    );
}