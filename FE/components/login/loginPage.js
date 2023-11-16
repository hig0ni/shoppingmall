import { React, useState, useEffect } from "react";
import axios from "axios";
import styles from '../../styles/Login.module.css'
import Image from "next/image";
import Link from 'next/link';
import { useRecoilState } from 'recoil';
import { tokenState } from '../../recoil/recoilToken.js'
import { userState } from '../../recoil/recoilUser.js'
import { useRouter } from 'next/router'

export default function LoginPage() {
    const [inputId, setInputId] = useState("");
    const [inputPw, setInputPw] = useState("");

    const router = useRouter()
    const [token, setToken] = useRecoilState(tokenState);
    const [user, setUser] = useRecoilState(userState);

    const handleInputId = (e) => setInputId(e.target.value);
    const handleInputPw = (e) => setInputPw(e.target.value);

    // 로그인 페이지 접속시 변수에 액세스 토큰이 있으면 로그인 중이므로 일반 홈으로 이동하도록
    useEffect(() => {
        axios.post("http://localhost:5656/graphql", {
            query: `
                query {
                    fetchUser{ nickname, isAuth }
                }
            `,
        }, {
            headers:{
                Authorization: `Bearer ${token}`
            }, 
            withCredentials: true
        })
        .then(res => {
            if(res.data.data){
                setUser(res.data.data.fetchUser.nickname)
                router.push('/')
            }
            
        })
        .catch(error =>  alert("fetchUser Error"));
    }, [token])
    
    // 로그인 버튼 클릭 이벤트
    const LoginCheck = async() => {
        await axios.post("http://localhost:5656/graphql", {
            query: `
                mutation {
                    login(email: "${inputId}", password: "${inputPw}")
                }
            `,
            
        },
        { withCredentials: true })
        .then(res => {
            if(res.data.errors) {
                alert(res.data.errors[0].message)
                return;
            }
            setToken(res.data.data.login);
        })
        .then()
        .catch(error =>  alert("로그인 실패"));
        
    };

    function checkAll() {
        if (!CheckUserId(inputId)) {
            return false;
        }
        if (!CheckPassword(inputPw)) {
            return false;
        }
        LoginCheck();
    }

    // 공백확인 함수
    function checkExistData(value, dataName) {
        if (value === "") {
            alert(dataName + " 입력해주세요!");
            return false;
        }
        return true;
    }

    function CheckUserId(id) {
        //Id가 입력되었는지 확인하기
        if (!checkExistData(id, "아이디를")) return false;
        return true; //확인이 완료되었을 때
    }

    function CheckPassword(password) {
        ///비밀번호가 입력되었는지 확인하기
        if (!checkExistData(password, "비밀번호를")) return false;
        return true; //확인이 완료되었을 때
    }

    return (
        <>  
            {/* 본 컨텐츠 */}
            <div className={styles.Wrapper}>
                <div className={styles.LogoWrapper}>
                    <Image src="/tree.png" width="150" height="150" alt="" />
                    <div className={styles.LogoTitle}>THE 캠핑</div>
                </div>
                <div id={styles.Login}>
                    <div>
                        <div className={styles.SignupInputWrapper}>
                            <span className={styles.SignupInputName}>아이디</span>
                            <input
                                type="text"
                                name="input_id"
                                value={inputId}
                                className={styles.SignupInput}
                                placeholder="아이디를 입력해주세요"
                                onChange={handleInputId}
                                minLength={2}
                                maxLength={16}
                                required
                            />
                        </div>
                        <div className={styles.SignupInputWrapper}>
                            <span className={styles.SignupInputName}>비밀번호</span>
                            <input
                                type="password"
                                name="input_pw"
                                value={inputPw}
                                className={styles.SignupInput}
                                placeholder="비밀번호를 입력해주세요"
                                onChange={handleInputPw}
                                minLength={2}
                                maxLength={16}
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <button className={styles.LoginButton} onClick={checkAll}>로그인</button>
                    </div>

                </div>
                <div id={styles.SocialLoginGoogle}>
                    <Image className={styles.SocialLoginButtonImg} src="/google.png" width="32" height="32" alt="" />
                    <Link href="http://localhost:5656/login/google">
                        <div className={styles.SocialLoginButtonTitle}>구글로 로그인</div>
                    </Link>
                </div>
                <div id={styles.SocialLoginNaver}>
                    <Image className={styles.SocialLoginButtonImg} src="/naver.png" width="32" height="32" alt="" />
                    <Link href="http://localhost:5656/login/naver">
                        <div className={styles.SocialLoginButtonTitle}>네이버로 로그인</div>
                    </Link>
                </div>
                <div id={styles.SocialLoginKakao}>
                    <Image className={styles.SocialLoginButtonImg} src="/kakao.png" width="32" height="32" alt="" />
                    <Link href="http://localhost:5656/login/kakao">
                        <div className={styles.SocialLoginButtonTitle}>카카오톡으로 로그인</div>
                    </Link>
                </div>
                <div className={styles.SignupWrapper}>
                아직 회원이 아니신가요?
                    <Link href="/register">
                        <a className={styles.SignupButton}>가입하기</a>
                    </Link>
                </div>
            </div>
            
        </>
    )
}