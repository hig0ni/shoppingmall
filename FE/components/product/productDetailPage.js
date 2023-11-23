import { React } from "react";
import Image from "next/image";
import styles from '../../styles/productDetail.module.css';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

export default function ProductDetailPage ({product}) {
    
    return (
        <div className={styles.wrap}>
            <main className={styles.main}>
                    <section className={styles.left_section}>
                        <div className={styles.main_shopping_top}>
                        <Link href='/products'>
                            <button className="text-3xl m-5 cursor-pointer">
                                <FontAwesomeIcon icon={faArrowLeft} style={{color: "#000000"}}/>
                                <span className="m-2 text-black">상품 목록</span>
                            </button>
                        </Link>    
                            <div className="p-10 max-w-xl m-auto">
                                <Image
                                className="rounded-3xl"
                                src={product.url}
                                alt="cover image"
                                width="100%"
                                height="70%"
                                layout="responsive"
                                quality={100}
                                />
                            </div>
                            <div className="p-4 flex flex-col">
                                <span className="text-5xl font-bold text-black">{product.name}</span>
                                <span className="mt-2 text-3xl text-black"> {product.price}원</span>
                                <span className="mt-5 text-3xl text-black">{product.description}</span>
                                
                            </div>
                        </div>
                    </section>
            </main>
        </div>
    );
}