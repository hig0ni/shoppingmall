import { React, useState } from "react";
import axios from "axios";
import styles from '../../styles/register.module.css';
import Link from 'next/link';

export default function RegisterPage () {

    const [inputId, setInputId] = useState("");
    const [inputNn, setInputNn] = useState("");
    const [inputPw, setInputPw] = useState("");
    const [inputPw2, setInputPw2] = useState("");
    
    // input data 의 변화가 있을 때마다 value 값을 변경해서 useState 해준다
    const handleInputId = (e) => setInputId(e.target.value);
    const handleInputNn = (e) => setInputNn(e.target.value);
    const handleInputPw = (e) => setInputPw(e.target.value);
    const handleInputPw2 = (e) => setInputPw2(e.target.value);

    // register 버튼 클릭 이벤트
    const RegisterCheck = async() => {
        await axios.post("http://localhost:5656/graphql", {
            query: `
                mutation {
                    createUser(email: "${inputId}", nickname: "${inputNn}", password: "${inputPw}") {
                        id
                    }
                }
            `,
        })
        .then(res => {
            if(res.data.errors) {
                console.log(res.data.errors)
                alert(res.data.errors[0].message)
            } else {
                alert('회원가입 성공')
                document.location.href = "/";
            }
        })
        .then()
        .catch(error =>  alert("회원가입 실패"));
    };

    function checkAll() {
        if (!CheckUserId(inputId)) {
            return false;
        }
        if (!CheckNickname(inputNn)) {
            return false;
        }
        if (!CheckPassword(inputPw)) {
            return false;
        }
        if (!CheckPassword(inputPw2)) {
            return false;
        }
        if (!CheckSamePassword(inputPw,inputPw2)) {
            return false;
        }

        RegisterCheck();
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

        var idRegExp = /^[a-zA-z0-9]{2,16}$/; //아이디 유효성 검사
        var chk_eng = id.search(/[a-z]/ig);

        if (!idRegExp.test(id)) {
            alert("아이디는 영문 대소문자와 숫자 2 ~ 16자리로 입력해야합니다!");
            return false;
        }
        if(chk_eng<0){
            alert("아이디는 1개 이상의 영문자를 포함하여야 합니다.");
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

    function CheckSamePassword(password,password2) {
        if (password !== password2) {
            alert("비밀번호가 일치하지 않습니다.");
            return false;
        }
        return true; //확인이 완료되었을 때
    }

    return (
        <div className={styles.Wrapper} >
            <form id={styles.Form}>
                <div className={styles.SignupTitle}>회원가입
                    <Link href="/login">
                        <a className={styles.Back}>←뒤로가기</a>
                    </Link>
                </div>

                <div className={styles.SignupInputWrapper}>
                    <span className={styles.SignupInputName}>아이디</span>
                    <input
                        type="text"
                        name="input_id"
                        id={styles.SignupID}
                        className={styles.SignupInput}
                        placeholder="아이디를 입력해주세요"
                        onChange={handleInputId}
                        minLength={2}
                        maxLength={16}
                        required
                    />
                </div>
                
                <div className={styles.SignupInputWrapper}>
                    <span className={styles.SignupInputName}>닉네임</span>
                    <input
                        type="text"
                        name="input_Nn"
                        id={styles.SignupNickName}
                        className={styles.SignupInput}
                        placeholder="닉네임을 입력해주세요"
                        onChange={handleInputNn}
                        minLength={2}
                        maxLength={6}
                        required
                    />
                </div>

                <div className={styles.SignupInputWrapper}>
                    <span className={styles.SignupInputName}>비밀번호</span>
                    <input
                        type="password"
                        name="input_pw"
                        id={styles.SignupPwd}
                        value={inputPw}
                        className={styles.SignupInput}
                        placeholder="비밀번호를 입력해주세요"
                        onChange={handleInputPw}
                        minLength={2}
                        maxLength={16}
                        required
                        autoComplete="off"
                    />
                </div>      

                <div className={styles.SignupInputWrapper}>
                    <span className={styles.SignupInputName}>비밀번호 확인</span>
                    <input
                        type="password"
                        name="input_pw2"
                        id={styles.SignupPwd2}
                        value={inputPw2}
                        className={styles.SignupInput}
                        placeholder="비밀번호를 한번 더 입력해주세요"
                        onChange={handleInputPw2}
                        minLength={2}
                        maxLength={16}
                        required
                        autoComplete="off"
                    />
                </div>
                
                <div className={styles.ButtonWrapper}>
                    <button
                        id={styles.SignupButton}
                        className={styles.Signup}
                        type="button"
                        onClick={checkAll}
                    >
                        회원가입
                    </button>
                </div>
            </form>
        </div>
    );
}