import { createAction, handleActions } from 'redux-actions';
import { take, put, call, delay, takeLatest, takeEvery } from '@redux-saga/core/effects';
import produce from 'immer';
import axios from 'axios';
import { updateuser } from './user';
import { getpayment, putconclusion } from './payment';

const PRICE = 'yama/PRICE';
const AMOUNT = 'yama/AMOUNT';
const SUM = 'yama/SUM';
const INITPRICE = 'yama/INITPRICE';
const PLUSPRICE = 'yama/PLUSPRICE';
const MINUSPRICE = 'yama/MINUSPRICE';
const SELLPERCENT = 'yama/SELLPERCENT';
const BUYPERCENT = 'yama/BUYPERCENT';
const GOTRADE = 'yama/GOTRADE';
const TOTALSELLBUY = 'yama/TOTALSELLBUY';
// const UPDATEUSER = 'yama/UPDATEUSER';

export const putprice = createAction(PRICE, (input) => input);
export const putamount = createAction(AMOUNT, (input) => input);
export const putsum = createAction(SUM, (input) => input);
export const initprice = createAction(INITPRICE, (input) => input);
export const plusprice = createAction(PLUSPRICE, (input) => input);
export const minusprice = createAction(MINUSPRICE, (input) => input);
export const sellpercent = createAction(SELLPERCENT, (input) => input);
export const buypercent = createAction(BUYPERCENT, (input) => input);
export const gotrade = createAction(GOTRADE, (input) => input);
export const totalsellbuy = createAction(TOTALSELLBUY, (input) => input);
// export const updateuser = createAction(UPDATEUSER, (input) => input);

const BUYSELL = 'yama/BUYSELL';
const COINPRICE = 'yama/COINPRICE';
const CHANGEPERCENT = 'yama/CHANGEPERCENT';
const WAITTRADE = 'yama/WAITTRADE';

export const buysell = createAction(BUYSELL, (input) => input);
export const coinprice = createAction(COINPRICE, (input) => input);
export const changepercent = createAction(CHANGEPERCENT, (input) => input);
export const waittrade = createAction(WAITTRADE, (input) => input);

function* taskbuysell(params) {
    yield delay(1000);
    // yield console.log(params.payload);
    if (params.payload.type == '매수') {
        params.payload.type = 0;
        const check = yield call([axios, 'post'], '/yamacoin/sellbuy', { data: params.payload });
        // console.log(check);
        if (check.data.success == true) {
            yield put(waittrade());
            yield put(updateuser(check.data.users));
            yield put(getpayment({ token: params.payload.token }));
            const conclusions = yield call([axios, 'get'], '/yamacoin/conclusion', JSON);

            yield put(putconclusion(conclusions.data.result));
        }
    } else if (params.payload.type == '매도') {
        params.payload.type = 1;
        const check = yield call([axios, 'post'], '/yamacoin/sellbuy', { data: params.payload });
        if (check.data.success == true) {
            yield put(waittrade());
            yield put(updateuser(check.data.users));
            yield put(getpayment({ token: params.payload.token }));
            const conclusions = yield call([axios, 'get'], '/yamacoin/conclusion', JSON);

            yield put(putconclusion(conclusions.data.result));
        }
    }
}

export function* waitbuysell() {
    yield takeLatest(BUYSELL, taskbuysell);
}

function* takeprice() {
    const inprice = yield call([axios, 'get'], '/yamacoin', JSON);
    // console.log(inprice);
    yield put(initprice(inprice.data.yamacoin[0].price));
}

function accumulate(tradelist) {
    let totalsellamount = 0;
    let totalbuyamount = 0;
    for (let i = 0; i < tradelist.data.selllist.length; i++) {
        totalsellamount += tradelist.data.selllist[i].sum;
    }
    for (let i = 0; i < tradelist.data.buylist.length; i++) {
        totalbuyamount += tradelist.data.buylist[i].sum;
    }

    return { totalsellamount: totalsellamount, totalbuyamount: totalbuyamount };
}

function* preparetrade() {
    const tradelist = yield call([axios, 'get'], '/yamacoin/waittrade', JSON);
    // console.log('여기요', tradelist.data);

    yield put(gotrade(tradelist.data));
    const total = yield accumulate(tradelist);
    yield put(totalsellbuy(total));
}

export function* waitprice() {
    yield takeEvery(COINPRICE, takeprice);
    yield takeEvery(WAITTRADE, preparetrade);
}

function* takepercent(params) {
    // console.log(params.payload);
    if (params.payload.type == '매수') {
        yield put(buypercent(params.payload));
    } else if (params.payload.type == '매도') {
        yield put(sellpercent(params.payload));
    }
}

export function* waitpercent() {
    yield takeEvery(CHANGEPERCENT, takepercent);
}

const initialState = {
    // userid: 'test2',
    // userpoint: 400000,
    // usercoin: 400,
    // useraddress: 'YSr58FEX1XivN3SHKL9eqKXbhWjhN6QyXp',
    price: 0,
    amount: 0,
    sum: 0,
    selllist: [],
    buylist: [],
    totalsellamount: 0,
    totalbuyamount: 0,
};

const yamatrade = handleActions(
    {
        [PRICE]: (state, { payload: input }) =>
            produce(state, (draft) => {
                draft.price = parseFloat(input.price);
                draft.sum = draft.price * parseFloat(input.amount);
            }),
        [AMOUNT]: (state, { payload: input }) =>
            produce(state, (draft) => {
                draft.amount = parseFloat(input.amount);
                draft.sum = parseFloat(input.price) * parseFloat(input.amount);
            }),
        [SUM]: (state, { payload: input }) =>
            produce(state, (draft) => {
                draft.sum = parseFloat(input.sum);
                draft.amount = parseFloat(input.sum) / parseFloat(input.price);
            }),
        [INITPRICE]: (state, { payload: input }) =>
            produce(state, (draft) => {
                draft.price = parseFloat(input);
                draft.amount = 0;
                draft.sum = 0;
            }),
        [PLUSPRICE]: (state, { payload: input }) =>
            produce(state, (draft) => {
                draft.price = draft.price + parseFloat(input.num);
                draft.sum = parseFloat(input.amount) * draft.price;
            }),
        [MINUSPRICE]: (state, { payload: input }) =>
            produce(state, (draft) => {
                draft.price = draft.price - parseFloat(input.num);
                draft.sum = parseFloat(input.amount) * draft.price;
            }),
        [SELLPERCENT]: (state, { payload: input }) =>
            produce(state, (draft) => {
                draft.amount = (parseFloat(input.usercoin) * parseFloat(input.percent)).toFixed(8);
                draft.sum = parseInt(draft.amount * parseFloat(input.price));
            }),
        [BUYPERCENT]: (state, { payload: input }) =>
            produce(state, (draft) => {
                draft.amount = (parseFloat(input.userpoint) * parseFloat(input.percent) / parseFloat(input.price)).toFixed(8);
                draft.sum = parseInt(draft.amount * parseFloat(input.price));
            }),
        [GOTRADE]: (state, { payload: input }) =>
            produce(state, (draft) => {
                draft.selllist = input.selllist;
                draft.buylist = input.buylist;
            }),
        [TOTALSELLBUY]: (state, { payload: input }) =>
            produce(state, (draft) => {
                draft.totalsellamount = input.totalsellamount;
                draft.totalbuyamount = input.totalbuyamount;
            }),
        // [UPDATEUSER]: (state, { payload: input }) =>
        //     produce(state, (draft) => {
        //         draft.userpoint = input.point;
        //         draft.usercoin = input.have_yama;
        //     }),
    },
    initialState
);

export default yamatrade;
