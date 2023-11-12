import { React, useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import styles from '../../styles/product.module.css';
import Link from 'next/link';

import { useRecoilValue } from 'recoil';
import { tokenState } from '../../recoil/recoilToken.js';

export default function ProductPage () {
    const [category, setCategory] = useState("");
    const [products, setProducts] = useState("");

    const token = useRecoilValue(tokenState);

    // 버튼 클릭 이벤트
    const userCheck = async() => {
        await axios.post("http://localhost:5656/graphql", {
            query: `
                query {
                    fetchUser
                }
            `,
            
        },
        {
            headers:{
                Authorization: `Bearer ${token}`
            }
        },
        { withCredentials: true }
        )
        .then(res => {
            console.log(res.data.data);
        })
        .catch(error =>  alert("Authorization 오류"));
    }




    // 카테고리에 맞는 아이템 가져오기 
    const handleCategory = (e) => {
        setCategory(e.target.getAttribute('value'));
    };
    useEffect(()=> {
        console.log(category)
    }, [category])

    return (
        <div className={styles.wrap}>
            <div className={styles.search}>
                <button className={styles.search_button} onClick={userCheck}>
                    <div><span className={styles.blind}>임시버튼</span></div>
                </button>     
            </div>
            <div className={styles.search}>
                <form action="">
                    <input className={styles.search_input} type="text" placeholder="검색어를 입력해 주세요."/>
                    <div className={styles.search_right}>
                        <button className={styles.search_button}>
                            <div><span className={styles.blind}>검색</span></div>
                        </button>
                    </div>
                </form>
            </div>

            <main className={styles.main}>
                    <section className={styles.left_section}>
                        <div className={styles.main_shopping_top}>
                            <header>
                                <a href="#" className={styles.bold} onClick={handleCategory} value="텐트">텐트</a>
                                <a href="#" className={styles.slash} onClick={handleCategory} value="캠핑웨어">캠핑웨어</a>
                                <a href="#" className={styles.slash} onClick={handleCategory} value="캠핑도구">캠핑도구</a>
                            </header>
                           
                            <div className={styles.main_shopping_grid}>
                                <a className={styles.item}>
                                    {/* <img className={styles.image} src={products.image} alt={products.name}/> */}
                                    <img className={styles.image} src="/tent1.png" alt={products.name}/>
                                    <div className={styles.text}>고퀄리티 니트 전품목 최대90%</div>
                                </a>
                                <a className={styles.item}>
                                    <img className={styles.image} src="/tent2.png" alt={products.name}/>
                                    <div className={styles.text}>지금 딱입기좋은 하프코트 코디~!</div>
                                </a>
                                <a className={styles.item}>
                                    <img className={styles.image} src="/tent3.png" alt={products.name}/>
                                    <div className={styles.text}>호로록!인기폭발 노마진 이벤트</div>
                                </a>
                                <a className={styles.item}>
                                    <img className={styles.image} src="/tent4.png" alt={products.name}/>
                                    <div className={styles.text}>따뜻한HOT웰론 오늘만~1만원대</div>
                                </a>
                                <a className={styles.item}>
                                    <img className={styles.image} src="/tent5.png" alt={products.name}/>
                                    <div className={styles.text}>SET 구성 할인 가을신상 잔뜩~</div>
                                </a>
                                <a className={styles.item}>
                                    <img className={styles.image} src="/tent6.png" alt={products.name}/>
                                    <div className={styles.text}>진주템누가없어 반지1+1 특가</div>
                                </a>
                                <a className={styles.item}>
                                    <img className={styles.image} src="/tent7.png" alt={products.name}/>
                                    <div className={styles.text}>꾸민듯안꾸민듯1만원대찬스야!</div>
                                </a>
                                <a className={styles.item}>
                                    <img className={styles.image} src="/tent8.png" alt={products.name}/>
                                    <div className={styles.text}>양말10+10장이 단돈1만원대래!</div>
                                </a>
                                <a className={styles.item}>
                                    <img className={styles.image} src="/tent9.png" alt={products.name}/>
                                    <div className={styles.text}>겨울 금방와요~ 단하루 2만원대!</div>
                                </a>
                                <a className={styles.item}>
                                    <img className={styles.image} src="/tent10.png" alt={products.name}/>
                                    <div className={styles.text}>거실에 깔았더니 밤새 안 깨고 자</div>
                                </a>
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