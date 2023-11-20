import Head from 'next/head'
import Layout from '../components/layout';
import LoginPage from '../components/login/loginPage.js';

export default function Login() {
    return (
      <Layout>
          <Head>
              <title>THE 캠핑 : 로그인</title>
              <meta name="description" content="캠핑 쇼핑몰" />
              <link rel="icon" href="/favicon.png" />
          </Head>
          <section className="flex flex-col items-center justify-center text-gray-600 body-font">
              <LoginPage/>
          </section>
      </Layout>
    );
  }