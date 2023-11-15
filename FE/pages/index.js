import Head from 'next/head'
import Layout from '../components/layout';
import Hero from '../components/home/hero';

export default function Home() {
  return (
    <Layout>
        <Head>
            <title>THE 캠핑</title>
            <meta name="description" content="캠핑 쇼핑몰" />
            <link rel="icon" href="/favicon.png" />
        </Head>
        <section className="flex  flex-col items-center justify-center text-gray-600 body-font ">
            <div className="container min-h-screen mx-auto flex px-5 py-24 md:flex-row flex-col items-center ">
                <Hero/>
            </div>
        </section>
    </Layout>
  );
}
