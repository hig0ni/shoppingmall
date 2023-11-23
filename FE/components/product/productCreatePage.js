import { React, useState } from "react";
import styles from '../../styles/productDetail.module.css';
import Link from 'next/link';
import axios from "axios";
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera, faCoins, faCheck } from '@fortawesome/free-solid-svg-icons'
import { useRecoilState } from 'recoil';
import { tokenState } from '../../recoil/recoilToken.js';

export default function ProductCreatePage () {
    const router = useRouter()
    const [token, setToken] = useRecoilState(tokenState);

    const [file, setFile] = useState("");
    const [productName, setProductName] = useState("");
    const [productCategoryId, setProductCategoryId] = useState("1");
    const [productDescription, setProductDescription] = useState("");
    const [productPrice, setProductPrice] = useState("");

    const handleInputProductName = (e) => setProductName(e.target.value);
    const handleInputProductDescription = (e) => setProductDescription(e.target.value);
    const handleInputProductPridce = (e) => setProductPrice(e.target.value);
    const handleCategory = (e) => setProductCategoryId(e.target.value);
    const fileUpload = (e) => setFile(e.target.files[0]);

    const register = async() => {
        if (!file || file.length === 0) {
            alert("이미지를 등록해주세요");
            return;
        }
        if (!productCategoryId) {
            alert("카테고리를 선택해주세요");
            return;
        }
        if (!productName) {
            alert("상품명을 작성해주세요");
            return;
        }
        if (!productDescription) {
            alert("상품 설명을 작성해주세요");
            return;
        }
        if (!productPrice) {
            alert("상품 가격을 작성해주세요");
            return;
        }

        const formData = new FormData();
        formData.append('operations', JSON.stringify({
        query: 'mutation uploadFile($file: Upload!) { uploadFile(file: $file) }',
        variables: {
            file: null,
        },
        }));
        formData.append('map', JSON.stringify({
        '0': ['variables.file'],
        }));
        formData.append('0', file);

        const headers = {
            'Content-Type': 'multipart/form-data', // Set the content type to multipart/form-data
            'x-apollo-operation-name': 'true',
            'Authorization': `Bearer ${token}`,
            'withCredentials': 'true',
        }

        const options = {
        headers: headers,
        };

        await axios.post('http://localhost:5656/graphql', formData, options)
        .then(response => {
            axios.post("http://localhost:5656/graphql", {
                query: `mutation {
                    createProduct(createProductInput: {
                        name: "${productName}",
                        description: "${productDescription}",
                        price: ${productPrice},
                        productCategoryId: "${productCategoryId}", 
                        url: "https://storage.googleapis.com/${response.data.data.uploadFile}",
                        }
                    ) {
                        id
                    }
                }
            `,
            }, {
                headers:{
                    Authorization: `Bearer ${token}`
                }, 
                withCredentials: true
            })
            .then(res => {
                console.log(res)
                router.push('/products')
            })
            .catch(error =>  alert("상품 등록 실패"));
        })
        .catch(error => {
            alert('파일 업로드 실패')
        });
    };
    
    return (
        <div className={styles.wrap}>
            <main className={styles.main}>
                    <section className={styles.left_section}>
                        <div className={styles.main_shopping_top}>                  
                            <div className="text-3xl font-bold text-black">
                                <FontAwesomeIcon className="mr-3" icon={faCamera} />
                                상품 이미지 등록
                            </div>
                            <div className="mt-5">
                                <input type="file" onChange={fileUpload}/>
                            </div>
                            <div className="p-4 flex flex-col">
                                <div className="text-3xl font-bold text-black">
                                    <FontAwesomeIcon className="mr-3" icon={faCheck} />
                                    카테고리
                                </div>
                                <select className="m-auto mt-5 border-2 border-black h-10 p-2 w-full sm:w-3/5 lg:w-2/5" onChange={handleCategory}>
                                    <option value="1">텐트</option>
                                    <option value="2">침낭</option>
                                    <option value="3">화로</option>
                                    <option value="4">기타</option>
                                </select>
                                <div className="text-3xl font-bold text-black mt-5">상품명</div>
                                <input
                                type="text"
                                value={productName}
                                className="m-auto mt-5 border-2 border-black h-10 p-2 w-full sm:w-3/5 lg:w-2/5"
                                placeholder="상품명"
                                onChange={handleInputProductName}
                                minLength={2}
                                maxLength={16}
                                required
                                />
                                <div className="text-3xl font-bold text-black mt-5">상품 설명</div>
                                <textarea   
                                value={productDescription}
                                className="m-auto mt-5 border-2 border-black h-48 p-2 rounded-xl w-full sm:w-3/5 lg:w-2/5"
                                placeholder="상품 설명"
                                onChange={handleInputProductDescription}
                                required
                                />
                                <div className="text-3xl font-bold text-black mt-5">
                                    <FontAwesomeIcon className="mr-3" icon={faCoins} />
                                    가격
                                </div>
                                <input
                                type="number"
                                value={productPrice}
                                className="m-auto mt-5 border-2 border-black h-10 p-2 w-full sm:w-3/5 lg:w-2/5"
                                placeholder="상품 가격"
                                onChange={handleInputProductPridce}
                                required
                                />
                            </div>
                            <Link href='/products'>
                                <button className="m-3 btn-product sm:m-5 lg:m-16">
                                    취소
                                </button>
                            </Link>
                            <button className="m-3 btn-product sm:m-5 lg:m-16" onClick={register}>
                                등록
                            </button>
                        </div>
                    </section>
            </main>
        </div>
    );
}