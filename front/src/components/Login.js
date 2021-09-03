import React,{useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom'
import axios from 'axios'
// import { LoginUser } from '../modules/user1';
import { useDispatch } from 'react-redux';
import {login} from '../modules/user'
import { Link } from 'react-router-dom';
import {AiOutlineUser} from "react-icons/ai"
import {RiLockPasswordLine} from "react-icons/ri"
function Login() {
    let history = useHistory();
    const dispatch = useDispatch();
    const [userid, setuserid] = useState('');
    const [userpwd, setuserpwd] = useState('');

    const  onidhandler =  (e) => {
        setuserid(e.target.value);
    };
    const onpwdhandler = (e) => {
        setuserpwd(e.target.value);
    };

    const onKeyPress=(e)=>{
        if(e.key=='Enter'){
            onsubmit()
        }
    }
    const onsubmit = (e) => {
        let reg_id = /^[A-Za-z0-9_-]{4,16}$/;
        if (userid == '' || userpwd == '') {
            alert('빈 곳 없이 입력해주세요!!');
        }
        else if (!reg_id.test(userid)) {
            alert("아이디는 4~16자, 영문,숫자입니다")
        }
        else if (!reg_id.test(userpwd)) {
            alert("비밀번호는 4~16자, 영문,숫자입니다")
        }
        else {
            let body = {
                id: userid,
                password: userpwd,
            }
            dispatch(login(body))
        };
    };
    return (
        <div className="loginBox" style={{ width: "350px",height:"auto",background:"rgb(22,22,22)",borderRadius:"10px", border:"1px solid rgb(66,66,66)", boxShadow:"0px 0px 3px 3px rgb(88,88,88)"}}>
            <div style={{ padding:"15px" }}>

            <div style={{ width: "100%", height: "50px", background:"rgba(22,22,22,0.4)",marginBottom:"10px",border:"none", borderBottom:"1px solid rgb(88,88,88)"}}>
                <input id="login" type="text" onChange={onidhandler} onKeyPress={onKeyPress} placeholder="아이디를 입력해주세요" style={{color:"rgb(88,88,88)", width: "80%", height: "50px",background:"none",border:"none",outline:"none",paddingLeft:"10px" }} />
                <label for="login"style={{ width: "10%", height: "40px" }}><AiOutlineUser style={{ width: "100%", height: "50px" }} /></label>
            </div>
            <div style={{ width: "100%", height: "50px", background:"rgba(22,22,22,0.4)",marginBottom:"10px",border:"none", borderBottom:"1px solid rgb(88,88,88)" }}> 
            <input id="password" type="password" onChange={onpwdhandler} onKeyPress={onKeyPress} placeholder="비밀번호를 입력해주세요" style={{color:"rgb(88,88,88)", width: "80%", height: "50px",background:"none",border:"none",outline:"none",paddingLeft:"10px" }} />
            <label for="password"style={{ width: "10%", height: "40px" }}><RiLockPasswordLine style={{ width: "100%", height: "50px" }} /></label>
            </div>
        <div>
            <Link to="/register" ><button style={{ width: "40%", height: "50px",borderRadius:"15px", background:"rgba(88,88,88)",border:"none",fontSize:"20px",color:"rgb(243,240,237)",fontWeight:'700' }}>회원가입</button></Link>
                <button onClick={onsubmit} style={{ width: "40%", height: "50px",float:"right",borderRadius:"15px", background:"rgb(237,69,69)",border:"none",fontSize:"20px",color:"rgb(243,240,237)",fontWeight:'700' }}>로그인</button>
                </div>
            </div>
        </div>
    );
}

export default Login;
