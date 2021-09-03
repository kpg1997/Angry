import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import { take, put, call, delay, takeLatest, takeEvery } from '@redux-saga/core/effects';
import socket from '../socket';
import { closeChannel, createSocketChannel } from '../createSocketChannel';
import { gotrade, totalsellbuy } from './yamatrade';
import { putconclusion, putpayment } from './payment';

const CHART = 'yamachart/CHART';
const YAMADATA = 'yamachart/YAMADATA';
const INITYAMA = 'yamachart/INITYAMA';
const FIRSTCHART = 'firstchart/FIRSTCHART';

export const firstchart = createAction(FIRSTCHART, (input) => input);
export const inityama = createAction(INITYAMA, (input) => input);
export const getchart = createAction(CHART, (input) => input);
export const yamadata = createAction(YAMADATA);

const initialState = {
    data: [],
    dataing: '',
    gogo: [[{ ask_price: '', bid_price: '', ask_size: '', bid_size: '' }]],
};
let startdate;
let j = 0;
let p = 0;
let opentrade;
let hightrade;
let lowtrade;
let lasttrade;
let ropentrade;
let rhightrade;
let rlowtrade;
let rlasttrade;
let enddate;
let ddata = [];
let check = 0;
let endnum;
let restart;
function* onTask(task) {
    check++;
    console.log('task ==>', task);
    yield put(gotrade(task));
    yield put(putconclusion(task.conclusion));
    yield put(totalsellbuy(task));
    yield put(putpayment(task));
    console.log('task.allSellbuy', task.mysell, 'task.allSellbuy.length', task.mybuy);
    // for(let i=0;task.allSellbuy.length;i++){
    //     console.log("task.allSellbuy[i]",task.allSellbuy[i]);
    // }
    if (check == 1) {
        enddate = new Date(task.conclusion[task.conclusion.length - 1].date).getTime() / 1000 + 32400;
        endnum = task.conclusion.length - 1;
        restart = enddate;
        console.log('end', enddate);
    }

    startdate = new Date(task.conclusion[0].date).getTime() / 1000 + 32400;
    if (enddate < new Date(task.conclusion[task.conclusion.length - 1].date).getTime() / 1000 + 32400) {
        let i = 1;
        restart = new Date(task.conclusion[endnum + 1].date).getTime() / 1000 + 32400;
        while (endnum + i <= task.conclusion.length - 1) {
            j++;

            if (restart + 300 >= new Date(task.conclusion[endnum + i].date).getTime() / 1000 + 32400) {
                if (j == 1) {
                    ropentrade = task.conclusion[endnum + i].price;
                    rhightrade = task.conclusion[endnum + i].price;
                    rlowtrade = task.conclusion[endnum + i].price;
                }
                if (rhightrade < task.conclusion[endnum + i].price) {
                    rhightrade = task.conclusion[endnum + i].price;
                }
                if (rlowtrade > task.conclusion[endnum + i].price) {
                    rlowtrade = task.conclusion[endnum + i].price;
                }
                rlasttrade = task.conclusion[endnum + i].price;
                if (j == 1) {
                    console.log(
                        '------------------++',
                        task.conclusion[endnum + i].price,
                        new Date(task.conclusion[endnum + i].date).getTime() / 1000 + 32400
                    );

                    yield put(
                        firstchart({
                            time: new Date(task.conclusion[endnum + i].date).getTime() / 1000 + 32400,
                            open: ropentrade,
                            high: rhightrade,
                            low: rlowtrade,
                            close: rlasttrade,
                        })
                    );
                } else {
                    console.log('222222222222222222222222222222222222222222');
                    yield put(
                        getchart({
                            time: new Date(task.conclusion[endnum + i].date).getTime() / 1000 + 32400,
                            open: ropentrade,
                            high: rhightrade,
                            low: rlowtrade,
                            close: rlasttrade,
                        })
                    );
                }
            } else {
                console.log('333333333333333333333333333');
                ropentrade = task.conclusion[endnum + i].price;
                rhightrade = task.conclusion[endnum + i].price;
                rlowtrade = task.conclusion[endnum + i].price;
                rlasttrade = task.conclusion[endnum + i].price;
                yield put(
                    firstchart({
                        time: new Date(task.conclusion[endnum + i].date).getTime() / 1000 + 32400,
                        open: ropentrade,
                        high: rhightrade,
                        low: rlowtrade,
                        close: rlasttrade,
                    })
                );
                j = 0;
                restart = new Date(task.conclusion[endnum + i].date).getTime() / 1000 + 32400;
            }

            i++;
        }
    } else if (enddate == new Date(task.conclusion[task.conclusion.length - 1].date).getTime() / 1000 + 32400 && check == 1) {
        for (let t = 0; t < task.conclusion.length; t++) {
            p++;
            if (startdate + 300 >= new Date(task.conclusion[t].date).getTime() / 1000 + 32400 || t == task.conclusion.length - 1) {
                if (p == 1) {
                    opentrade = task.conclusion[t].price;
                    hightrade = task.conclusion[t].price;
                    lowtrade = task.conclusion[t].price;
                }
                if (hightrade < task.conclusion[t].price) {
                    hightrade = task.conclusion[t].price;
                }
                if (lowtrade > task.conclusion[t].price) {
                    lowtrade = task.conclusion[t].price;
                }
                lasttrade = task.conclusion[t].price;
                if (t == task.conclusion.length - 1) {
                    ddata.push({
                        time: new Date(task.conclusion[t].date).getTime() / 1000 + 32400,
                        open: opentrade,
                        high: hightrade,
                        low: lowtrade,
                        close: lasttrade,
                    });
                }
            } else {
                ddata.push({
                    time: new Date(task.conclusion[t].date).getTime() / 1000 + 32400,
                    open: opentrade,
                    high: hightrade,
                    low: lowtrade,
                    close: lasttrade,
                });
                p = 0;
                startdate = new Date(task.conclusion[t].date).getTime() / 1000 + 32400;
                opentrade = task.conclusion[t].price;
                hightrade = task.conclusion[t].price;
                lowtrade = task.conclusion[t].price;
                lasttrade = task.conclusion[t].price;
            }
        }

        console.log('ddata', ddata);
        yield put(inityama(ddata));
    }
}

function* taskyamadata() {
    let channell;

    try {
        channell = yield call(createSocketChannel, 'yamadata');
        while (true) {
            const task = yield take(channell);
            yield onTask(task);
        }
    } catch (e) {
        console.log(e, 'error');
    } finally {
        socket.close();
        closeChannel(channell);
    }
}

export function* waityamadata() {
    yield takeEvery(YAMADATA, taskyamadata);
}

const yamachart = handleActions(
    {
        [INITYAMA]: (state, { payload: input }) =>
            produce(state, (draft) => {
                draft.data = input;
            }),
        [FIRSTCHART]: (state, { payload: input }) =>
            produce(state, (draft) => {
                draft.data.push(input);
            }),
        [CHART]: (state, { payload: input }) =>
            produce(state, (draft) => {
                draft.data.pop();
                draft.data.push(input);
            }),
    },
    initialState
);

export default yamachart;