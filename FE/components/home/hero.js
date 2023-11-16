import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPersonRunning } from '@fortawesome/free-solid-svg-icons'

export default function Hero() {
    return (
        <>
            <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center ">
                <h1 className="title-font sm:text-5xl sm:leading-normal text-4xl leading-normal mb-4 font-medium text-gray-900 ">
                안녕하세요 
                <br/>
                더 좋은 
                <br/>
                캠핑 문화를 만드는
                <br/>
                THE 캠핑입니다.
                </h1>
                    <Link href="/products">
                        <div className="btn-product">
                            <FontAwesomeIcon icon={faPersonRunning} size="xl" style={{color: "#000000"}} />
                            <span className='ml-2'>상품 보러가기</span>
                        </div>
                    </Link>
            </div>
        </>
    )
}