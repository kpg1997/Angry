import { createAction, handleActions } from "redux-actions";
import axios from 'axios';
import produce from "immer";
import { call, delay, put, takeLatest } from "redux-saga/effects";
import { updateuser } from "./user";

const PUTPOINTCHARGE = "yama/PUTPOINTCHARGE";

export const putpointcharge = createAction(PUTPOINTCHARGE, (input) => input);


const UPDATEPOINTCHARGE = "yama/UPDATEPOINTCHARGE";

export const updatepointcharge = createAction(UPDATEPOINTCHARGE, (input) => input);

export function* waitpointcharge(){
    yield takeLatest(UPDATEPOINTCHARGE,taskpointcharge);

}
function* taskpointcharge(params){
    yield delay(1000);
    // yield console.log('taskpointcharge ?? ',params.payload);
    const charge = yield call([axios,'post'],'/yamacoin/pointcharge',{data:params.payload});
    // yield console.log(charge.data)
    if(charge.data.success == true){
        yield put(updateuser(charge.data.result[0]));
    }
}


const initialState = {
    // usertoken: "eyJhbGciOiJIUzI1NiJ9.a2FuZzExMDc.jOX4VXb6D5AzqXvr9QztI7V8CmDC9DvZLK1GUHZJPjU",
    userpointcharge: 0,
}

const pointcharge = handleActions({
    [PUTPOINTCHARGE]: (state, { payload: input }) =>
        produce(state, (draft) => {
            draft.userpointcharge = parseInt(input);
        }),
}, initialState)

export default pointcharge;
