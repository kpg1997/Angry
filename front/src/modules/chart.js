import { createAction, handleActions } from 'redux-actions';
import { take, put, call, delay, takeLatest, takeEvery } from '@redux-saga/core/effects';
import socket from '../socket';
import { closeChannel, createSocketChannel } from '../createSocketChannel';
import produce from 'immer';
import axios from 'axios';

const CHART = 'chart/CHART';
const GODATA = 'chart/GODATA';
const CHARTING = 'chart/CHARTING';
const TRADING = 'chart/TRADING';
const FIRSTTRADING = 'chart/FIRSTTRADING';

export const getdata = createAction(CHART, (input) => input);
export const godata = createAction(GODATA, (input) => input);
export const charting = createAction(CHARTING, (input) => input);
export const trading = createAction(TRADING, (input) => input);
export const firsttrading = createAction(FIRSTTRADING, (input) => input);

const GETSAGA = 'chart/GETSAGA';
const INITIALCHART = 'chart/INITIALCHART';

export const getsaga = createAction(GETSAGA);
export const getchart = createAction(INITIALCHART);

const initialState = {
    data: [],
    dataing: '',
    gogo: [[{ ask_price: '', bid_price: '', ask_size: '', bid_size: '' }]],
};

function* waitTask() {
    let channel;
    let channel2;
    try {
        channel = yield call(createSocketChannel, 'tasks');
        channel2 = yield call(createSocketChannel, 'tasks2');
        while (true) {
            const task = yield take(channel);
            const task2 = yield take(channel2);
            yield onTask(task);
            yield onTask2(task2);
        }
    } catch (e) {
        console.log(e, 'error');
    } finally {
        socket.close();
        closeChannel(channel);
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
    yield put(charting(task));
    if (i == 1) {
        yield put(
            firsttrading({
                time: gotime,
                open: opentrade,
                high: hightrade,
                lowt: lowtrade,
                close: lasttrade,
            })
        );
    } else {
        yield put(
            trading({
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
    yield put(godata(task2));
}

function* gochart() {
    const initdata = yield call([axios, 'get'], '/users', JSON);
    yield put(getdata(initdata.data));
}

export function* watcher() {
    yield takeEvery(INITIALCHART, gochart);
    yield takeEvery(GETSAGA, waitTask);
}

const chart = handleActions(
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

export default chart;
