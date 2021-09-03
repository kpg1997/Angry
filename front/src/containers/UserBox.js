import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Login from '../components/Login';
import { logout } from '../modules/user';
import UserState from '../components/UserState';
import Sendfrom from '../components/Sendfrom';
import SearchHeight from '../components/SearchHeight';
import PointCharge from '../components/PointCharge';
const UserBox = () => {
const logind = useSelector(state => state.user.loginSuccess);
const dispatch = useDispatch()



    if(!logind)
    return (
        <>
            <Login/>
            <SearchHeight/>
        </>
    )
    else { return (

        <div>

        <UserState/>
        <Sendfrom/>
        <SearchHeight/>
        <PointCharge/>

        </div>    
    )}
}

export default UserBox

