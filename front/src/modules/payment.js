import { createAction, handleActions } from 'redux-actions';
import { take, put, call, delay, takeLatest, takeEvery } from '@redux-saga/core/effects';
import axios from 'axios';
import produce from 'immer';
import { updateuser } from './user';
import { getchart } from './yamachart';

const PUTPAYMENT = 'payment/PUTPAYMENT';
const PUTCONCLUSION = 'payment/PUTCONCLUSION';

export const putpayment = createAction(PUTPAYMENT, (input) => input);
export const putconclusion = createAction(PUTCONCLUSION, (input) => input);

const GETPAYMENT = 'payment/GETPAYMENT';
const GETCONCLUSION = 'payment/GETCONCLUSION';
const DELETEPENDING = 'payment/DELETEPENDING';

export const getpayment = createAction(GETPAYMENT, (input) => input);
export const getconclusion = createAction(GETCONCLUSION);
export const deletepending = createAction(DELETEPENDING, (input) => input);

//유저토큰
function* taskpayment(params) {
    const inittrade = yield call([axios, 'post'], '/yamacoin/mysellbuy', { token: params.payload.token });
    // console.log(inittrade.data);
    if (inittrade.data.success == false) {
        yield put(putpayment({ success: false }));
    } else if (inittrade.data.success == true) {
        yield put(putpayment(inittrade.data));
    }
}
// let startdate;
// let j = 0;

// let opentrade;
// let hightrade;
// let lowtrade;
// let lasttrade;
// function* taskconclusion() {
//     const conclusions = yield call([axios, 'get'], '/yamacoin/conclusion', JSON);

// }

function* takedeletepending(params) {
    const inittrade = yield call([axios, 'post'], '/yamacoin/mysellbuy/delete', {
        token: params.payload.token,
        date: params.payload.date,
        price: params.payload.price,
        type: params.payload.type,
        amount: params.payload.amount,
    });
    if (inittrade.data.success == true) {
        yield put(putpayment(inittrade.data));
        yield put(updateuser(inittrade.data.updateres));
    }
}

export function* waitpayment() {
    yield takeEvery(DELETEPENDING, takedeletepending);
    // yield takeEvery(GETCONCLUSION, taskconclusion);
    yield takeEvery(GETPAYMENT, taskpayment);
}

const initialState = {
    pendingsell: [],
    pendingbuy: [],
    conclusion: [[{ amount: null, buy_id: '', date: '', num: null, price: null, sell_id: '', sum: null }]],
};

const payment = handleActions(
    {
        [PUTPAYMENT]: (state, { payload: input }) =>
            produce(state, (draft) => {
                // console.log('input',input)
                draft.pendingsell = input.mysell;
                draft.pendingbuy = input.mybuy;
            }),
        [PUTCONCLUSION]: (state, { payload: input }) =>
            produce(state, (draft) => {
                draft.conclusion = input;
            }),
    },
    initialState
);

//const a = pendingbuy.filter((x) => x.id == id);
export default payment;
