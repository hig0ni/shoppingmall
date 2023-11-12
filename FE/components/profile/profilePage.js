import { React, useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { Cookies } from "react-cookie";
import { useRouter } from 'next/router'
import { useRecoilState } from 'recoil';
import { tokenState } from '../../recoil/recoilToken.js';
import { userState } from '../../recoil/recoilUser.js';
import styles from '../../styles/profile.module.css'

export default function ProfilePage() {
    const router = useRouter()
    const cookies = new Cookies();
    const [token, setToken] = useRecoilState(tokenState);
    const [user, setUser] = useRecoilState(userState);
    const [isAuth, setIsAuth] = useState(false); 

   useEffect(() => {
        axios.post("http://localhost:5656/graphql", {
            query: `
                query {
                    fetchUser{ nickname, isAuth }
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
            if(!res.data.data){
                alert("로그인이 필요합니다.")
                router.push('/')
            } else {
                setIsAuth(res.data.data.fetchUser.isAuth)
            }
            
        })
        .catch(error =>  alert(error));
    }, [])

    const [inputPw, setInputPw] = useState(""); // 비밀번호 변경시 사용할 비밀번호
    const [inputPw1, setInputPw1] = useState(""); // 비밀번호 변경시 사용할 비밀번호
    const [inputPw2, setInputPw2] = useState(""); // 비밀번호 변경시 사용할 비밀번호
    const [inputPw3, setInputPw3] = useState(""); // 회원 탈퇴시 사용할 비밀번호
    const [inputNn1, setInputNn1] = useState("");

    const [passwordisEditing, setPasswordIsEditing] = useState(false);
    const [nicknameisEditing, setNicknameIsEditing] = useState(false);
    const [unRegisterisEditing, setUnRegisterisEditing] = useState(false);

    const handleInputPw = (e) => {
        setInputPw(e.target.value);
    };

    const handleInputPw1 = (e) => {
        setInputPw1(e.target.value);
    };

    const handleInputPw2 = (e) => {
        setInputPw2(e.target.value);
    };

    const handleInputPw3 = (e) => {
        setInputPw3(e.target.value);
    };


    const handleInputNn1 = (e) => {
        setInputNn1(e.target.value);
    };

    const UpdateNicknameCheck = async() => {
        await axios.post("http://localhost:5656/graphql", {
            query: `
                mutation {
                    changeNickname(afterNickname: "${inputNn1}")
                }
            `,   
        },
        {
            headers:{
                Authorization: `Bearer ${token}`
            }
        },
        { withCredentials: true })
        .then((res) => {
            if(res.data.errors) {
                alert(res.data.errors[0].message)
            } else {
                alert("닉네임 변경 완료. 다시 로그인 해주세요");
                setToken(null);
                setUser(null);
                cookies.remove('refreshToken');
                router.push('/')
            }
        })
        .catch(error => alert("닉네임 변경 실패"))
    };

    const UpdatePasswordCheck = async() => {
        await axios.post("http://localhost:5656/graphql", {
            query: `
                mutation {
                    changePassword(password: "${inputPw}", password1: "${inputPw1}", password2: "${inputPw2}")
                }
            `,
        },
        {
            headers:{
                Authorization: `Bearer ${token}`
            }
        },
        { withCredentials: true })
        .then((res) => {
            if(res.data.errors) {
                alert(res.data.errors[0].message)
            } else {
                alert("비밀번호 수정 완료. 다시 로그인 해주세요");
                setToken(null);
                setUser(null);
                cookies.remove('refreshToken');
                router.push('/')
            }
        })
        .catch(error => alert("비밀번호 수정 실패"))
    };

    //회원 탈퇴 구현
    const unRegister = async() => {
        if(window.confirm("정말로 회원 탈퇴 하시겠습니까?\n탈퇴된 계정은 복구 할 수 없습니다.")) {
            await axios.post("http://localhost:5656/graphql", {
                query: `
                    mutation {
                        deleteUser(password: "${inputPw3}")
                    }
                `,
            },
            {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            },
            { withCredentials: true })
            .then((res) => {
                if(res.data.errors) {
                    alert(res.data.errors[0].message)
                } else {
                    alert("회원 탈퇴 완료");
                    setToken(null);
                    setUser(null);
                    cookies.remove('refreshToken');
                    router.push('/')
                }
            })
            .catch(error => alert("회원 탈퇴 실패"))
        };
    }

    function UpdatePasswordcheckAll() {
        if (!CheckPassword(inputPw)) {
            return false;
        }
        if (!CheckPassword(inputPw2)) {
            return false;
        }
        if (!CheckSamePassword(inputPw1,inputPw2)) {
            return false;
        }

        UpdatePasswordCheck();
    }

    function UpdateNicknamecheckAll() {
        if (!CheckNickname(inputNn1)) {
            return false;
        }

        UpdateNicknameCheck();
    }

    // 공백확인 함수
    function checkExistData(value, dataName) {
        if (value === "") {
            alert(dataName + " 입력해주세요!");
            return false;
        }
        return true;
    }

    function CheckPassword(password) {
        ///비밀번호가 입력되었는지 확인하기
        if (!checkExistData(password, "비밀번호를")) return false;

        var passwordRegExp = /^[a-zA-Z0-9]{8,20}$/ //비밀번호 유효성 검사
        var chk_num = password.search(/[0-9]/g);
        var chk_eng = password.search(/[a-z]/ig);

        if(!passwordRegExp.test(password)){
            alert("비밀번호는 숫자와 영문자 조합으로 8~20자리를 사용해야 합니다.");
            return false;
        }
        if(chk_num<0 || chk_eng<0){
            alert("비밀번호는 숫자와 영문자를 혼용하여야 합니다.");
            return false;
        }
        if(/(\w)\1\1\1/.test(password)){
            alert("비밀번호에 같은 문자를 4번 이상 사용하실 수 없습니다.");
            return false;
        }
        return true; //확인이 완료되었을 때
    }

    function CheckSamePassword(password1,password2) {
        if (password1 !== password2) {
            alert("비밀번호가 일치하지 않습니다.");
            return false;
        }
        return true; //확인이 완료되었을 때
    }

    function CheckNickname(nickname) {
        //닉네임이 입력되었는지 확인하기
        if (!checkExistData(nickname, "닉네임을")) return false;

        var nicknameRegExp = /^[가-힣a-z0-9-_]{2,10}$/; //닉네임 유효성 검사

        if (!nicknameRegExp.test(nickname)) {
            alert("닉네임은 특수문자와 초성을 제외한 2~10자리여야 합니다.");
            return false;
        }
        return true; //확인이 완료되었을 때
    }

    const passwordStartEditingHandler = () => {
        if (nicknameisEditing === true) {
            setNicknameIsEditing(false);
        }
        if (unRegisterisEditing === true) {
            setUnRegisterisEditing(false);
        }
        setPasswordIsEditing(true);
    };
    const passwordEndEditingHandler = () => {
        UpdatePasswordcheckAll();
        setPasswordIsEditing(false);
    };
    const passwordEditingCancleHandler = () => {
        setPasswordIsEditing(false);
    };

    const nicknameStartEditingHandler = () => {
        if (passwordisEditing === true) {
            setPasswordIsEditing(false);
        }
        if (unRegisterisEditing === true) {
            setUnRegisterisEditing(false);
        }
        setNicknameIsEditing(true);
    };
    const nicknameEndEditingHandler = () => {
        UpdateNicknamecheckAll();
        setNicknameIsEditing(false);
    };
    const nicknameEditingCancleHandler = () => {
        setNicknameIsEditing(false);
    };

    const unRegisterStartEditingHandler = () => {
        if (passwordisEditing === true) {
            setPasswordIsEditing(false);
        }
        if (nicknameisEditing === true) {
            setNicknameIsEditing(false);
        }
        setUnRegisterisEditing(true);
    };
    const unRegisterEndEditingHandler = () => {
        unRegister();
        setUnRegisterisEditing(false);
    };
    const unRegisterEditingCancleHandler = () => {
        setUnRegisterisEditing(false);
    };

    return (
        <div className={styles.Wrapper}>
            <div className={styles.LogoWrapper}>
                <Image src="/profile.png" width="150" height="150" alt="" />
                <div className={styles.Title}>프로필</div>
            </div>
            {!isAuth && (
                <div>
                    {passwordisEditing ? (
                    <div className={styles.profile_content}>
                        <div>
                            기존 비밀번호:
                            <input
                                className={styles.inputbox}
                                type="password"
                                name="existing_password"
                                value={inputPw}
                                placeholder="기존 비밀번호를 입력하세요"
                                onChange={handleInputPw}
                                minLength={2}
                                maxLength={16}
                                required
                            />
                        </div>
                        <div>
                            비밀번호 변경:
                            <input
                                className={styles.inputbox}
                                type="password"
                                name="modified_password"
                                value={inputPw1}
                                placeholder="변경할 비밀번호를 입력하세요"
                                onChange={handleInputPw1}
                                minLength={2}
                                maxLength={16}
                                required
                            />
                        </div>
                        <div>
                            비밀번호 확인:
                            <input
                                className={styles.inputbox}
                                type="password"
                                name="modified_password2"
                                value={inputPw2}
                                placeholder="변경할 비밀번호를 입력하세요"
                                onChange={handleInputPw2}
                                minLength={2}
                                maxLength={16}
                                required
                            />
                        </div>
                        <div className={styles.button}>
                            <button
                                type="button"
                                onClick={passwordEditingCancleHandler}
                            >
                                취소
                            </button>
                            <button
                                type="button"
                                className="ml-5"
                                onClick={passwordEndEditingHandler}
                            >
                                수정
                            </button>
                        </div>
                    </div>
                ) : (
                    <div>
                        <button
                            type="button"
                            onClick={passwordStartEditingHandler}
                            className={styles.profile_content}
                        >
                            비밀번호 변경
                        </button>
                        <br />
                    </div>
                )}
            </div>
            )}
            {nicknameisEditing ? (
                <div className={styles.profile_content}>
                    <div>
                        기존 닉네임: {user}
                    </div>    
                    <div>
                        변경 후 닉네임:
                        <input
                            className={styles.inputbox}
                            type="text"
                            name="modified_nickname"
                            value={inputNn1}
                            placeholder="변경할 닉네임을 입력하세요"
                            onChange={handleInputNn1}
                            minLength={2}
                            maxLength={6}
                            required
                        />
                    </div>
                    <div className={styles.button}>
                        <button
                            type="button"
                            onClick={nicknameEditingCancleHandler}
                        >
                            취소
                        </button>
                        <button
                            type="button"
                            className="ml-5"
                            onClick={nicknameEndEditingHandler}
                        >
                            수정
                        </button>
                    </div>
                </div>
            ) : (
                <div>
                    <button
                        type="button"
                        onClick={nicknameStartEditingHandler}
                        className={styles.profile_content}
                    >
                        닉네임 변경
                    </button>
                    <br />
                </div>
            )}
            {unRegisterisEditing ? (
                <div className={styles.profile_content}>
                    <div>
                        비밀번호:
                        <input
                            className={styles.inputbox}
                            type="password"
                            value={inputPw3}
                            placeholder="비밀번호를 입력하세요"
                            onChange={handleInputPw3}
                            minLength={2}
                            maxLength={16}
                            required
                        />
                    </div>
                    <div className={styles.button}>
                        <button
                            type="button"
                            onClick={unRegisterEditingCancleHandler}
                        >
                            취소
                        </button>
                        <button
                            type="button"
                            className="ml-5"
                            onClick={unRegisterEndEditingHandler}
                        >
                            탈퇴
                        </button>
                    </div>
                </div>
            ) : (
                <div>
                    <button
                        type="button"
                        onClick={unRegisterStartEditingHandler}
                        className={styles.profile_content}
                    >
                        회원 탈퇴
                    </button>
                    <br />
                </div>
            )}
        </div>
    );
}