import { combineReducers } from 'redux';
import { gogo, watcher } from '../modules/chart';
import user, {waitlogin,waitlogout,waitlogintokeb} from '../modules/user';
import chart from '../modules/chart';
import pointcharge from '../modules/pointcharge';
import yamatrade, { waitpercent, waitbuysell, waitprice } from '../modules/yamatrade';
import { all } from '@redux-saga/core/effects';
import { waitpointcharge } from '../modules/pointcharge';
import payment, { waitpayment } from '../modules/payment';
import ethchart, { ethwatcher } from '../modules/ethchart';
import yamachart, { waityamadata } from '../modules/yamachart';

const rootreducer = combineReducers({
    user,
    chart,
    yamatrade,
    ethchart,
    pointcharge,
    payment,
    yamachart,
});

export function* rootsaga() {
    yield all([waityamadata(), waitlogintokeb(),waitlogin(),waitlogout(), watcher(), waitprice(), waitbuysell(), waitpercent(),waitpointcharge(), waitpayment(), ethwatcher()]);
}
export default rootreducer;
