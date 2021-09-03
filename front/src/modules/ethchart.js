import { createAction, handleActions } from 'redux-actions';
import { take, put, call, delay, takeLatest, takeEvery } from '@redux-saga/core/effects';
import socket from '../socket';
import { closeChannel, createSocketChannel } from '../createSocketChannel';
import produce from 'immer';
import axios from 'axios';

const CHART = 'ethchart/CHART';
const GODATA = 'ethchart/GODATA';
const CHARTING = 'ethchart/CHARTING';
const TRADING = 'ethchart/TRADING';
const FIRSTTRADING = 'ethchart/FIRSTTRADING';

export const ethgetdata = createAction(CHART, (input) => input);
export const ethgodata = createAction(GODATA, (input) => input);
export const ethcharting = createAction(CHARTING, (input) => input);
export const ethtrading = createAction(TRADING, (input) => input);
export const ethfirsttrading = createAction(FIRSTTRADING, (input) => input);

const GETSAGA = 'ethchart/GETSAGA';
const INITIALCHART = 'ethchart/INITIALCHART';

export const ethgetsaga = createAction(GETSAGA);
export const ethgetchart = createAction(INITIALCHART);

const initialState = {
    data: [],
    dataing: '',
    gogo: [[{ ask_price: '', bid_price: '', ask_size: '', bid_size: '' }]],
};

function* waitTask() {
    let channel3;
    let channel4;
    try {
        channel3 = yield call(createSocketChannel, 'tasks3');
        channel4 = yield call(createSocketChannel, 'tasks4');
        while (true) {
            const task = yield take(channel3);
            const task2 = yield take(channel4);
            yield onTask(task);
            yield onTask2(task2);
        }
    } catch (e) {
        console.log(e, 'error');
    } finally {
        socket.close();
        closeChannel(channel3);
    }
}
let i = 0;
let currtime;
let opentrade;
let hightrade;
let lowtrade;
let lasttrade;
function* onTask(task) {
    ++i;
    currtime = String(task[4]).substring(0, 10);
    let gotime = Number(currtime) + 32400;
    if (i == 1) {
        opentrade = task[0];
        hightrade = task[0];
        lowtrade = task[0];
    }
    if (hightrade < task[0]) {
        hightrade = task[0];
    }
    if (lowtrade > task[0]) {
        lowtrade = task[0];
    }
    lasttrade = task[0];
    if (i == 20) {
        i = 0;
    }

    // console.log('타임', gotime, '오픈', opentrade, '하이', hightrade, '로우', lowtrade, '클로즈', lasttrade);
    // console.log('여기도있어요', i, task[0]);
    yield put(ethcharting(task));
    if (i == 1) {
        yield put(
            ethfirsttrading({
                time: gotime,
                open: opentrade,
                high: hightrade,
                lowt: lowtrade,
                close: lasttrade,
            })
        );
    } else {
        yield put(
            ethtrading({
                time: gotime,
                open: opentrade,
                high: hightrade,
                low: lowtrade,
                close: lasttrade,
            })
        );
    }
}
function* onTask2(task2) {
    yield put(ethgodata(task2));
}

function* gochart() {
    const initdata = yield call([axios, 'get'], '/users/ethchart', JSON);
    yield put(ethgetdata(initdata.data));
}

export function* ethwatcher() {
    yield takeEvery(INITIALCHART, gochart);
    yield takeEvery(GETSAGA, waitTask);
}

const ethchart = handleActions(
    {
        [CHART]: (state, { payload: input }) =>
            produce(state, (draft) => {
                draft.data = input;
            }),

        [GODATA]: (state, { payload: input }) =>
            produce(state, (draft) => {
                draft.gogo = input;
            }),
        [CHARTING]: (state, { payload: input }) =>
            produce(state, (draft) => {
                draft.dataing = input;
            }),
        [FIRSTTRADING]: (state, { payload: input }) =>
            produce(state, (draft) => {
                draft.data.push(input);
            }),
        [TRADING]: (state, { payload: input }) =>
            produce(state, (draft) => {
                draft.data.pop();
                draft.data.push(input);
            }),
    },
    initialState
);
export default ethchart;
