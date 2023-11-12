import Head from 'next/head'
import Layout from '../components/layout';
import RegisterPage from '../components/register/register.js';

export default function Login() {
    return (
      <Layout>
          <Head>
              <title>회원가입</title>
              <meta name="description" content="캠핑 쇼핑몰" />
              <link rel="icon" href="/favicon.png" />
          </Head>
          <section className="flex flex-col items-center justify-center text-gray-600 body-font">
              <RegisterPage/>
          </section>
      </Layout>
    );
  }