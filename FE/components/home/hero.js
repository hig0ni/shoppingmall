import Link from 'next/link';

export default function Hero() {
    return (
        <>
            <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center ">
                <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900 ">
                안녕하세요 
                <br className="inline-block"/>
                더 나은 캠핌문화를 만드는
                <br className="inline-block"/>
                THE 캠핑입니다.
                </h1>
                <div className="flex justify-center">
                <Link href="/products">
                    <div className="btn-product">
                        상품 보러가기
                    </div>
                </Link>
            </div>
            </div>
        </>
    )
}