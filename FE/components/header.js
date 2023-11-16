import styles from '../styles/header.module.css'
import axios from "axios";
import Link from 'next/link';
import Image from "next/image";
import { useRecoilState } from 'recoil';
import { tokenState } from '../recoil/recoilToken.js';
import { userState } from '../recoil/recoilUser.js';
import { useState, useEffect } from "react";
import Dropdown from './dropdown.js'
import useDidMountEffect from "./useDidMountEffect";


export default function Header(){
    const [ssrCompleted, setSsrCompleted] = useState(false);    
    useEffect(() => setSsrCompleted(true), []);

    const [token, setToken] = useRecoilState(tokenState);
    const [user, setUser] = useRecoilState(userState);

    useDidMountEffect(() => {
        axios.post("http://localhost:5656/graphql", {
            query: `
                query {
                    fetchUser{ nickname }
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
            }     
        })
        .catch(error =>  alert("fetchUser Error"));
    }, [token])

    useEffect(() => {
        axios.post("http://localhost:5656/graphql", {
            query: `
                mutation {
                    restoreAccessToken
                }
            `,
        }, { withCredentials: true })
        .then(res => {
            if(res.data.errors) {
                console.log(res.data.errors[0].message)
            } else {
                setToken(res.data.data.restoreAccessToken);
            }
        })
        .catch(error =>  alert('restoreAccessToken Error'));
    }, [])

    return (
        <header className= {styles.main}>
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                <Link href="/">
                    <div className="flex title-font font-medium items-center mb-4 md:mb-0 text-black hover:cursor-pointer">  
                        <Image src="/camping.png" width="30" height="30"/>
                        <span className="ml-3 hover:text-white text-2xl">THE 캠핑</span>
                    </div>
                </Link>

                <div className="md:ml-auto flex flex-wrap items-center text-base justify-center text-2xl">
                    { ssrCompleted && !token && !user ? (
                        <Link href="/login">
                            <a className="mr-5 text-black text-2xl">
                            <span className="ml-3 hover:text-white text-2xl">로그인</span>
                            </a>
                        </Link>
                    ) : (
                    <>
                        { ssrCompleted && token && user ? <Dropdown/> : <></> }
                    </>
                    )}
                </div>
            </div>
        </header>
    );
}
