import { React } from "react";
import styles from '../../styles/productDetail.module.css';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

export default function ProductCreatePage () {
    
    return (
        <div className={styles.wrap}>
            <main className={styles.main}>
                    <section className={styles.left_section}>
                        <div className={styles.main_shopping_top}>
                        <Link href='/products'>
                            <button className="text-3xl m-5 cursor-pointer">
                                <FontAwesomeIcon icon={faArrowLeft} />
                                <span className="m-2">상품 목록</span>
                            </button>
                        </Link>    
                            <div className="text-3xl font-bold text-black">
                                이미지 등록
                            </div>
                            <div className="p-4 flex flex-col">
                                <span className="text-3xl font-bold text-black">카테고리</span>
                                <span className="text-3xl font-bold text-black mt-5">상품명</span>
                                <span className="text-3xl font-bold text-black mt-5">상품설명</span>
                                <span className="text-3xl font-bold text-black mt-5">가격</span>
                            </div>
                            <button className="btn-product m-10">
                                등록하기
                            </button>
                        </div>
                    </section>
            </main>
        </div>
    );
}