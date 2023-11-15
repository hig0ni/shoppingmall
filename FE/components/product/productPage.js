import { React, useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import styles from '../../styles/product.module.css';
import Link from 'next/link';

export default function ProductPage ({products}) {
    const [word, setWord] = useState('');
    const [filteredProducts, setFilteredProducts] = useState(products);

    const handleCategory = (e) => {
        const category = e.target.value;
        // 선택된 카테고리에 해당하는 상품만 필터링

        if(category === 'ALL') {
            setFilteredProducts(products);
            return;
        }

        const filtered = products.filter((product) => product.productCategory.name === category);
        setFilteredProducts(filtered);
    };

    const handleInput = (e) => {
        setWord(e.target.value)
    };

    const findByWord = (e) => {
        axios.post("http://localhost:5656/graphql", {
            query: `
                query {
                    fetchFindProducts(word:"${word}") {
                        id, name, description, price, isSoldout, url, productCategory{name}
                    }
                }
            `,
        },
        { withCredentials: true }
        )
        .then(res => {
            setFilteredProducts(res.data.data.fetchFindProducts)  
        })
        .catch(error =>  alert("상품을 불러오는데 실패했습니다."));
    }

    return (
        <div className={styles.wrap}>
            <div className={styles.search}>
                <div>
                    <input className={styles.search_input} onChange={handleInput} type="text" placeholder="검색어를 입력해 주세요."/>
                    <div className={styles.search_right}>
                        <button className={styles.search_button} onClick={findByWord} >
                            <div><span className={styles.blind}>검색</span></div>
                        </button>
                    </div>
                </div>
            </div>

            <main className={styles.main}>
                    <section className={styles.left_section}>
                        <div className={styles.main_shopping_top}>
                            <header>
                                <button className={styles.bold} onClick={handleCategory} value="ALL">전체</button>
                                <button className={styles.slash} onClick={handleCategory} value="텐트">텐트</button>
                                <button className={styles.slash} onClick={handleCategory} value="침낭">침낭</button>
                                <button className={styles.slash} onClick={handleCategory} value="화로">화로</button>
                                <button className={styles.slash} onClick={handleCategory} value="키친">키친</button>
                            </header>
                           
                            <div className={styles.main_shopping_grid}>
                                {filteredProducts.map((product) => (
                                    <Link href={`/product/${product.id}`} className={styles.item} key={product.id}>
                                        <div className="product-card">
                                            <div>
                                                <Image
                                                className="rounded-t-xl"
                                                src={product.url}
                                                alt="cover image"
                                                width="100%"
                                                height="80%"
                                                layout="responsive"
                                                quality={100}
                                                />
                                            </div>
                                            <div className="p-4 flex flex-col">
                                                <h1 className="text-xl font-bold">{product.name}</h1>
                                                <h3 className="mt-2 text-lg">\ {product.price}</h3>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <footer>
                            <button className={styles.prev}><span className={styles.blind}>이전 페이지</span></button>
                            <div className={styles.text}>1<span>/13</span></div>
                            <button className={styles.next}><span className={styles.blind}>다음 페이지</span></button>
                        </footer>
                    </section>
            </main>
        </div>
    );
}