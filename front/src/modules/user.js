import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import { delay, put, takeEvery, takeLatest,call } from 'redux-saga/effects';
import axios from 'axios'


const initialState = {
        nickname: '',
        userId: '',
        address: '',
        point: '',
        have_yama: '',
        token : '',
        loginSuccess: false,
};
// ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ로그인 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
const LOGIN = 'user/LOGIN';
export const login = createAction(LOGIN, (user) => user);

const INPUTUSER ='user/INPUTUSER';
export const inputuser=createAction(INPUTUSER,(input)=>input);

function* LoginUser(body) {
    
    console.log("ddd",body.payload);
    const initdata = yield call([axios, 'post'], '/user/login', body.payload);
    console.log(initdata.data)
    if(initdata.data.loginSuccess==true){
        yield put(inputuser(initdata.data))
    }
   else if(initdata.data.loginSuccess==false){
       yield alert(initdata.data.message)
   }
}

export function* waitlogin(){
    yield takeEvery(LOGIN,LoginUser)
}
// ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ로그아웃 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
const LOGOUT = 'user/LOGOUT';
export const logout = createAction(LOGOUT, (logout)=>logout); 

const LOGOUTUSER = 'user/LOGOUTUSER';
export const logoutuser = createAction(LOGOUTUSER, (data)=>data)



function* LogoutUser(){
    const initdata = yield call([axios, 'get'], '/user/logout')
    yield alert(initdata.data.message)
    yield put(logoutuser(initdata.data))
}


export function* waitlogout(){
    yield takeEvery(LOGOUT,LogoutUser)
}
// ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ토큰 자동 로그인 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
const LOGINTOKEN = 'user/LOGINTOKEN'; 
export const login_token = createAction(LOGINTOKEN, (user) => user);

const INPUTUSERTOKEN ='user/INPUTUSERTOKEN';
export const inputusertoken=createAction(INPUTUSERTOKEN,(input)=>input);

function* LoginTokenUser(body) {
    
    // console.log("ddd",body.payload);
    const initdata = yield call([axios, 'post'], '/user/login_token', body.payload);
    console.log(initdata.data)
    if(initdata.data.loginSuccess==true){
        yield put(inputusertoken(initdata.data))
    }
   else if(initdata.data.loginSuccess==false){
       yield alert(initdata.data.message)
   }
}
// ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ업데이트 유저 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
const UPDATEUSER = 'yama/UPDATEUSER';

export const updateuser = createAction(UPDATEUSER, (input) => input);


export function* waitlogintokeb(){
    yield takeLatest(LOGINTOKEN,LoginTokenUser)
}

const user = handleActions(
    {
        [INPUTUSER]: (state, { payload: input }) =>
            produce(state, (draft) => {
                draft.nickname = input.nickname;
                draft.userId = input.userId;
                draft.address= input.address;
                draft.point= input.point;
                draft.have_yama= input.have_yama;
                draft.token = input.token;
                draft.loginSuccess= input.loginSuccess;
            }),

        [LOGOUTUSER]: (state, {payload: data}) =>
            produce(state, (draft) =>
            draft = initialState),

        [INPUTUSERTOKEN]: (state, {payload : input}) =>
            produce(state, (draft)=>{
                draft.nickname = input.nickname;
                draft.userId = input.userId;
                draft.address = input.address;
                draft.point = parseInt(input.point);
                draft.have_yama = input.have_yama;
                draft.token = input.token;
                draft.loginSuccess = input.loginSuccess;
            }),
        [UPDATEUSER]: (state, { payload: input }) =>
            produce(state, (draft) => {
                draft.point = input.point;
                draft.have_yama = input.have_yama;
            }),

    },
    initialState
);



export default user;