import React,{useState, useEffect} from 'react';
import night from './common/night.mp4';
import logo from './common/Logo_nonebackground.png'
import axios from 'axios'
import {useHistory} from 'react-router-dom'

function Register() {
    let history = useHistory();

    let reg_name = /^[가-힣a-zA-Z]{2,10}$/; // 한글 + 영문만
    let reg_id = /^[A-Za-z0-9_-]{4,16}$/; // 반드시 영문으로 시작 숫자+언더바/하이픈 허용 4~2
    let reg_pw = /(?=.*[a-zA-Z0-9S])(?=.*?[#?!@$%^&*-]).{4,16}/; // 문자와 특수문자 조합의 6~24 자리

    const [usernickname, setusernickname] = useState('');
    const [userid, setuserid] = useState('');
    const [userpwd, setuserpwd] = useState('');
    const [usercheckpwd, setusercheckpwd] = useState('');
    const [checkpwd, setcheckpwd] = useState(true);

    const [idmsg, setIdmsg] = useState("");
    const [pwmsg, setPwmsg] = useState("");
    const [pwdcheckmsg, setPwdcheckmsg] = useState("");
    const [nickmsg, setNickmsg] = useState("");

    const [Cidmsg, setCIdmsg] = useState(false);
    const [Cpwmsg, setCPwmsg] = useState(false);
    const [Cpwdcheckmsg, setCPwdcheckmsg] = useState(false);
    const [Cnickmsg, setCNickmsg] = useState(false);
    
    const onnicknamehandler = (e) => {
        setusernickname(e.target.value);
    };
    const  onidhandler =  (e) => {
        setuserid(e.target.value);
    };
    const onpwdhandler = (e) => {
        setuserpwd(e.target.value);
    };
    const oncheckpwdhandler = (e) => {
        setusercheckpwd(e.target.value);
    };

    const oncheckid = () => {
        if(!reg_id.test(userid)){
            setIdmsg("아이디는 4~16자, 영문,숫자만 가능합니다")
        }
        else{
            let body = {
                id : userid
            }
            axios.post('/user/IDCheck',body).then((res) => {
                if (res.data.message === "사용 가능한 ID 입니다.") {
                    setIdmsg("사용 가능한 아이디입니다")
                    setCIdmsg(true)
                } else {
                    setIdmsg("이미 중복된 아이디입니다.")
                    setCIdmsg(false)
                }
            });
        }
    };
    useEffect(()=>{
        oncheckid();
    },[userid]);

    const oncheckNick = () =>{
        if(!reg_name.test(usernickname)){
            setNickmsg("닉네임은 2~10자, 영문,한글만 가능합니다")
        }
        else{
            let body = {
                nickname : usernickname
            }
            axios.post("/user/NickCheck",body).then((res)=>{
                if (res.data.NickCheck == true){
                    setNickmsg("사용가능한 닉네임입니다.");
                    setCNickmsg(true);
                }
                else{
                    setNickmsg("이미 중복된 닉네임 입니다.");
                    setCNickmsg(false);
                }
            })
        }
    }

    useEffect(()=>{
        oncheckNick();
    },[usernickname]);



    useEffect(() => {
        if (userpwd === usercheckpwd) {
            setPwdcheckmsg("비밀번호가 일치합니다");
            setCPwdcheckmsg(true)
        } else {
            setPwdcheckmsg("비밀번호가 일치하지 않습니다");
            setCPwdcheckmsg(false)
        }
    }, [usercheckpwd]);


    const oncheckpwd = () =>{
        if(!reg_id.test(userpwd)){
            setPwmsg("비밀번호는 4~16자, 문자,숫자만 가능합니다");
            setCPwmsg(false);
        }
        else {setPwmsg("사용가능한 비밀번호입니다"); };
        setCPwmsg(true);
    }
    useEffect(()=>{
        oncheckpwd();
    },[userpwd])

    const onsubmit = () => {
        if (userid == '' || userpwd == '' || usercheckpwd == '') {
            alert('빈 곳 없이 입력해주세요!!');
        } else if (checkpwd === false) {
            alert('비밀번호가 같은지 확인해주세요!!');
        } else if (Cnickmsg ===false) {
            alert('닉네임을 확인해주세요!!');
        } else if (Cidmsg === false) {
            alert('아이디를 확인해주세요!!');
        } else if (Cpwmsg === false) {
            alert('비밀번호를 확인해주세요!!');
        } else {
            let body = {
                id : userid,
                pw : userpwd,
                nickname : usernickname
            }
            axios.post('/user/sign_up', body).then((res) => {
                console.log(res)
                if(res.data.success == true){
                    alert("회원가입이 완료되었습니다");
                    history.push('/');
                }
                else{
                    alert("회원가입이 실패하였습니다. 다시 한 번 시도해주세요");
                }
            });
        }
    };

    return (
        <div id="container" style={{ width: "100%", height: "100%", margin: "0px", padding: "0px", top: "50%", left: "50%", transform: "translate(-50%,-50%)", position: "absolute" }}>
            <div style={{ width: "100%", height: "100%", margin: "0px", padding: "0px", overflow: "hidden", zIndex: "0" }} >
                <video autoPlay loop muted width="100%"  >
                    <source src={night} type="video/mp4"></source>
                </video>
            </div>
            <div className="registerBox" style={{ width: "25%", height: "70%", margin: "0", zIndex: "100", position: "absolute", display: "inline-block", top: "50%", left: "50%", transform: "translate(-50%,-50%)", background: "none" }}>
                <div className="logo" style={{width:"100%", margintop:"3%"}} ><img src={logo} width="100%" /></div>

                <div className="input" style={{width:"100%", height:"80%", margintop:"30px" }}>

                    <div style={{ width: "100%", height: "20%" }}>
                        <label for="id" ><h5 style={{color:"rgba(255,255,255,0.7)", fontWeight:"bolder", display:"inline-block"}}>ㆍ아이디</h5> <h6 style={{color:"rgba(255,255,255,0.7)", fontWeight:"bolder", display:"inline-block", right:"3%", position:"absolute"}}>{idmsg}</h6> </label>
                        <input id="id" onChange={onidhandler} placeholder=" 아이디를 입력해주세요 ( 4~16자 ) " type="text" style={{paddingLeft:"10px",outline:"none", color:"white",  width: "100%", height: "60%", background:"none", borderColor:"rgba(255,255,255,0.15)", borderRadius:"15px",background:"rgba(0,0,0,0.2)" }} />
                    </div>

                    <div style={{ width: "100%", height: "20%" }}>
                    <label for="id" ><h5 style={{color:"rgba(255,255,255,0.7)", fontWeight:"bolder", display:"inline-block"}}>ㆍ비밀번호</h5> <h6 style={{color:"rgba(255,255,255,0.7)", fontWeight:"bolder", display:"inline-block", right:"3%", position:"absolute"}}>{pwmsg}</h6> </label>
                        <input id="id"  onChange={onpwdhandler} placeholder=" 비밀번호를 입력해주세요 ( 4~16자 )" type="password" style={{paddingLeft:"10px",outline:"none",color:"white", width: "100%", height: "60%", background:"none", borderColor:"rgba(255,255,255,0.15)", borderRadius:"15px",background:"rgba(0,0,0,0.2)" }} />
                    </div>

                    <div style={{ width: "100%", height: "20%" }}>
                    <label for="id" ><h5 style={{color:"rgba(255,255,255,0.7)", fontWeight:"bolder", display:"inline-block"}}>ㆍ비밀번호 확인</h5> <h6 style={{color:"rgba(255,255,255,0.7)", fontWeight:"bolder", display:"inline-block", right:"3%", position:"absolute"}}>{pwdcheckmsg}</h6> </label>
                        <input id="id" onChange={oncheckpwdhandler} placeholder=" 비밀번호를 다시 한 번 입력해주세요 " type="password" style={{paddingLeft:"10px",outline:"none",color:"white", width: "100%", height: "60%", background:"none", borderColor:"rgba(255,255,255,0.15)", borderRadius:"15px",background:"rgba(0,0,0,0.2)" }} />
                    </div>

                    <div style={{ width: "100%", height: "20%" }}>
                    <label for="id" ><h5 style={{color:"rgba(255,255,255,0.7)", fontWeight:"bolder", display:"inline-block"}}>ㆍ닉네임</h5> <h6 style={{color:"rgba(255,255,255,0.7)", fontWeight:"bolder", display:"inline-block", right:"3%", position:"absolute"}}>{nickmsg}</h6> </label>
                        <input id="id" onChange={onnicknamehandler} placeholder=" 닉네임을 입력해주세요 ( 2~10자 ) " type="text" style={{ paddingLeft:"10px",outline:"none",color:"white",width: "100%", height: "60%", background:"none", borderColor:"rgba(255,255,255,0.15)", borderRadius:"15px",background:"rgba(0,0,0,0.2)" }} />
                    </div>

                    <div style={{ width: "100%", height: "12%", bottom:"5%", display:"inline-block", position:"absolute"}}>
                        <button onClick={onsubmit} style={{ width: "100%",outline:"none", height: "100%",fontSize:"45px", fontWeight:"normal", color:"white",
                                        background:"rgba(243,69,69)", border:"1.5px solid rgba(0,0,0,0)", borderRadius:"15px"}} >
                            회 원 가 입
                        </button> 
                    </div>

                </div>
            </div>
            <div>

            </div>
        </div>

        
    )
    // return (
    //     <div>
    //         <div>
    //             이름:<input type="text" value={user.name} onChange={onNameHandler}></input>
    //         </div>
    //         <div>
    //             전화번호:<input type="text" value={user.number} onChange={onNumberHandler}></input>
    //         </div>
    //         <div>
    //             이메일:<input type="email" value={user.email} onChange={onEmailHandler}></input>
    //         </div>
    //         <div>
    //             아이디:<input type="text" value={user.id} onChange={onIdHandler}></input>
    //         </div>
    //         <div>
    //             비밀번호:<input type="password" value={user.password} onChange={onPasswordHandler}></input>
    //         </div>
    //         <div>
    //             비밀번호 확인:<input type="password" value={user.checkpassword} onChange={onCheckPasswordHandler}></input>
    //         </div>
    //         <div>
    //             <button onClick={onSubmitHandler}>회원가입</button>
    //         </div>
    //     </div>
    // );
}

export default Register;
