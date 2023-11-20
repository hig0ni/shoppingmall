import { React, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from 'next/router'
import { useRecoilState } from 'recoil';
import { tokenState } from '../../recoil/recoilToken.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleDollarToSlot } from '@fortawesome/free-solid-svg-icons'

export default function PointPage({nowPoint}) {
    const [token, setToken] = useRecoilState(tokenState);
    const [point, setPoint] = useState("5000");
    const [pointList, setPointList] = useState('');
    const [showList, setShowList] = useState(false);
    const router = useRouter()

    const handlePoint = (e) => setPoint(e.target.value);
    const handleShowList = async() => {
        if(showList) {setShowList(!showList); return;}
        await axios.post("http://localhost:5656/graphql", {
            query: `
                query {
                    fetchPointTransaction {
                        impUid,
                        amount,
                        status,
                        createdAt
                    }
                }
            `,
            
        },
        {
            headers:{
                Authorization: `Bearer ${token}`
            }
        },
        { withCredentials: true })
        .then(res => {
            console.log(res)
            if(res.data.errors) {
                alert(res.data.errors[0].message)
                return;
            }
            setPointList(res.data.data.fetchPointTransaction);
            setShowList(!showList);
        })
        .then()
        .catch(error =>  alert("충전 내역 조회 실패"));
    }

    const requestPay = () => {
        IMP.init("imp20688424");

        IMP.request_pay(
            {
                pg: "kakaopay",
                pay_method: "card",
                name: `포인트 ${point}원`,
                amount: point,
                buyer_email: "Iamport@chai.finance",
                buyer_name: "아임포트 기술지원팀",
                buyer_tel: "010-1234-5678",
                buyer_addr: "서울특별시 강남구 삼성동",
                buyer_postcode: "123-456",
            },
            function (rsp) {
                console.log(rsp);
                // callback
                if (rsp.success) {
                    axios.post("http://localhost:5656/graphql",
                        {
                            query: `
                                mutation {
                                    createPointTransaction(impUid: "${rsp.imp_uid}", amount: ${rsp.paid_amount}){
                                    id
                                    }
                                }
                            `,
                        },
                        {
                            headers:{
                                Authorization: `Bearer ${token}`
                            },
                            withCredentials: true
                        }
                );
                    alert("포인트 충전을 성공했습니다!");
                    location.reload();
                } else {
                    // 결제 실패 시 로직,
                    alert("포인트 충전을 실패했습니다!");
                }
            }
        );
    };

    const canclePay = async(index) => {
        if(window.confirm("환불 하시겠습니까?\n이후 복구 할 수 없습니다.")){
            await axios.post("http://localhost:5656/graphql", {
                query: `
                    mutation {
                        cancelPointTransaction(impUid: "${pointList[index].impUid}") {
                            id,
                            impUid,
                            amount,
                            status,
                            createdAt
                        }
                    }
                `,     
            },
            {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            },
            { withCredentials: true })
            .then(res => {
                if(res.data.errors) {
                    alert(res.data.errors[0].message)
                    return;
                }
                location.reload();
            })
            .catch(error =>  alert("환불 실패"));
        }
    };

    return (
        <div className="Wrapper">
            <div className="LogoWrapper">
                <FontAwesomeIcon icon={faCircleDollarToSlot} size="10x" style={{color: "#000000"}} />
                <div className="Title">포인트충전</div>
            </div>
            <div className="text-2xl text-black border-2 border-black rounded-lg p-2">
                현재 포인트: {nowPoint}원
            </div>
            <div className="text-2xl text-black">
                충전 금액:
                <select className="m-auto ml-5 mt-5 mb-5 border-2 border-black h-15 p-1" onChange={handlePoint}>
                    <option value="5000">5,000</option>
                    <option value="10000">10,000</option>
                    <option value="30000">30,000</option>
                    <option value="50000">50,000</option>
                    <option value="100000">100,000</option>
            </select>
            </div>
            
            <Image className="cursor-pointer rounded-xl" src="/kakaopay.png" width="400" height="100" alt="" onClick={requestPay}/>
            <button className="btn-product mt-10" onClick={handleShowList}>충전 내역 조회</button>
            {showList ? 
            (<table className="mt-10 text-center w-full">
                <thead>
                    <tr>
                        <th>impUid</th><th>amount</th><th>status</th><th>createdAt</th>
                    </tr>
                </thead>
                <tbody>
                {pointList?.map((item, index) => (
                        <tr className="hover:text-red-600 hover:font-bold" onClick={()=>canclePay(index)} key={index}>
                            <td>{item.impUid}</td>
                            <td>{item.amount}</td>
                            <td>{item.status}</td>
                            <td>{item.createdAt.substring(0,10)}</td>
                            
                        </tr>
                ))}
                </tbody>
            </table>) : <></>}  
        </div>
    );
}