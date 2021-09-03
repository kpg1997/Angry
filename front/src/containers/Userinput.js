import React, { useState, useEffect } from 'react';
import axios from 'axios';
function Userinput() {
    let reg_name = /^[가-힣a-zA-Z]+$/; // 한글 + 영문만
    let reg_num = /^[0-9]{8,13}$/; // 전화번호 숫자만
    let reg_id = /^[A-Za-z]{1}[A-Za-z0-9_-]{3,19}$/; // 반드시 영문으로 시작 숫자+언더바/하이픈 허용 4~2
    let reg_pw = /(?=.*[a-zA-ZS])(?=.*?[#?!@$%^&*-]).{6,24}/; // 문자와 특수문자 조합의 6~24 자리

    const [username, setusername] = useState('');
    const [usernum, setusernum] = useState('');
    const [userid, setuserid] = useState('');

    const [userpwd, setuserpwd] = useState('');
    const [usercheckpwd, setusercheckpwd] = useState('');
    const [checkpwd, setcheckpwd] = useState(true);

    const onnamehandler = (e) => {
        setusername(e.target.value);
        console.log(username);
    };
    const onnumhandler = (e) => {
        setusernum(e.target.value);
    };
    const onidhandler = (e) => {
        setuserid(e.target.value);
    };
    const onpwdhandler = (e) => {
        setuserpwd(e.target.value);
    };
    const oncheckpwdhandler = (e) => {
        setusercheckpwd(e.target.value);
    };

    const onsubmit = () => {
        if (username == '' || usernum == '' || userid == '' || userpwd == '' || usercheckpwd == '') {
            alert('빈 곳 없이 입력해주세요!!');
        } else if (checkpwd === false) {
            alert('비밀번호가 같은지 확인해주세요!');
        } else if (!reg_name.test(username)) {
            alert('이름을 정확하게 입력해주세요');
        } else if (!reg_num.test(usernum)) {
            alert('전화번호 숫자만 입력해주세요');
        } else if (!reg_id.test(userid)) {
            alert('아이디 반드시 영문으로 시작 숫자+언더바/하이픈 허용 4~2');
        } else if (!reg_pw.test(userpwd)) {
            alert('비밀번호 문자와 특수문자 조합의 6~24 자리로 입력해주세요');
        } else {
            axios.get('/users').then((res) => {
                console.log(res.data);
            });
        }
    };

    const oncheckid = () => {
        axios.get('/users').then((res) => {
            if (res.data.success === true) {
                alert('사용가능!');
            } else {
                alert('사용불가!');
            }
        });
    };

    useEffect(() => {
        if (userpwd === usercheckpwd) {
            setcheckpwd(true);
        } else {
            setcheckpwd(false);
        }
    }, [usercheckpwd]);
    return (
        <div>
            <div>
                이름:<input type="text" value={username} onChange={onnamehandler}></input>
            </div>
            <div>
                전화번호:<input type="text" placeholder="ex)01012345678" value={usernum} onChange={onnumhandler}></input>
            </div>
            <div>
                아이디:<input type="text" value={userid} onChange={onidhandler}></input>
                <button onClick={oncheckid}>중복확인</button>
            </div>
            <div>
                비밀번호:<input type="password" value={userpwd} onChange={onpwdhandler}></input>
            </div>
            <div>
                비밀번호확인:<input type="password" value={usercheckpwd} onChange={oncheckpwdhandler}></input>
            </div>
            {checkpwd === false ? <div>비밀번호가 일치하지않아욧!</div> : null}
            <button onClick={onsubmit}>회원가입</button>
        </div>
    );
}

export default Userinput;
