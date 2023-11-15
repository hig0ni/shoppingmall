import { React } from "react";
import Image from "next/image";
import styles from '../../styles/productDetail.module.css';
import Link from 'next/link';

export default function ProductPage ({product}) {
    
    return (
        <div className={styles.wrap}>
            <main className={styles.main}>
                    <section className={styles.left_section}>
                        <div className={styles.main_shopping_top}>
                        <Link href='/products'>
                            <div className="text-3xl mt-4 mb-5 cursor-pointer">
                                ← 상품 목록
                            </div>
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
                                <span className="mt-5 text-3xl text-black"> {product.price}원</span>
                            </div>
                        </div>
                    </section>
            </main>
        </div>
    );
}