import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useStore } from 'react-redux';
import { useHistory } from 'react-router-dom';
const Sendfrom = () => {
    let id = useSelector(state => state.user.userId)
    let have_yama = useSelector(state => state.user.have_yama)
    const [address, setAddress] = useState("")
    const [amount, setAmount] = useState();
    let history = useHistory();
    const onaddresshandler = (e) =>{
        setAddress(e.target.value);
    }
    const onamounthandler = (e) => {
        setAmount(e.target.value);
    }
    useEffect(()=>{
    },[address,amount])

    const onSubmit = () =>{
        if(id ==""){
            alert("로그인 후 이용해 주세요")
        }
        else if( (have_yama-amount)<0){
            alert("보유한 YAMA 코인이 부족합니다.")
        }
        else{
            let body ={
                id : id,
                address : address,
                amount : amount
            }
            axios.post("/api/sendfrom",body).then((res) =>{
               if(res.data.success == true){
                   alert(`${address}로 \n ${amount} YAMA를 보냈습니다 \n txid는 ${res.data.data.result} \n 입니다`);
                   window.location.reload()
                }
               else{
                   alert('보내기에 실패했습니다. 다시 시도해 주세요')
               }
                
            })
        }
    }
    return (
        <div>
            <div style={{width:"350px",height:"auto",background:"rgb(243,240,237)",padding:"10px",borderRadius:"15px",marginTop:"30px",border:"1px solid rgb(66,66,66)", boxShadow:"0px 0px 3px 3px rgb(88,88,88)"}}>
                <h4 style={{textAlign:"center"}}><b>지갑주소로 보내기</b></h4>
            <input type="text" placeholder="상대의 지갑 주소를 적어주세요" onChange={onaddresshandler}
            style={{width:"100%",height:"40px"}}/>
            <div>

            <input type="number" step="0.00000001" placeholder="보낼 개수를 입력해주세요" onChange={onamounthandler}
            style={{width:"68%",height:"40px",marginTop:"5px"}}/>
            <button style={{width:"30%",height:"40px",marginLeft:"2%",background:"rgb(180,180,180)"}} onClick={onSubmit}>보내기</button>
            </div>
            </div>
        </div>
    )
}

export default Sendfrom
