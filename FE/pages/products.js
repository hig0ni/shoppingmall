import Head from 'next/head'
import Layout from '../components/layout.js';
import ProductPage from '../components/product/productPage.js';

export default function Product() {
    return (
      <Layout>
          <Head>
              <title>THE 캠핑</title>
              <meta name="description" content="캠핑 쇼핑몰" />
              <link rel="icon" href="/favicon.png" />
          </Head>
          <section className="flex flex-col items-center justify-center text-gray-600 body-font">
              <ProductPage/>
          </section>
      </Layout>
    );
  }