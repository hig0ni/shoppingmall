import Head from 'next/head'
import Layout from '../components/layout';
import ProfilePage from '../components/profile/profilePage.js';

export default function Login() {
    return (
      <Layout>
          <Head>
              <title>프로필</title>
              <meta name="description" content="캠핑 쇼핑몰" />
              <link rel="icon" href="/favicon.png" />
          </Head>
          <section className="flex flex-col items-center justify-center text-gray-600 body-font">
              <ProfilePage/>
          </section>
      </Layout>
    );
  }