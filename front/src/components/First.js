import React from 'react';
import { Link } from 'react-router-dom';
import Nav from './Nav';
import p from '../images/p.png';
function First() {
    return (
        <div>
            <Nav p={p}></Nav>
            <div style={{ fontSize: 60 }}>첫번째 페이지</div>
            <ul>
                <li>
                    <Link to="login">로그인</Link>
                </li>
                <li>
                    <Link to="reg">회원가입</Link>
                </li>
                <li>
                    <Link to="exchange">거래소</Link>
                </li>
            </ul>
        </div>
    );
}

export default First;
