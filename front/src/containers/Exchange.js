import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import List from '../components/List';
import BitCoin from './BitCoin';
import Ethereum from './Ethereum';
import Yamacoin from './Yamacoin';
import { getpayment, getconclusion } from '../modules/payment';
import { useSelector, useDispatch } from 'react-redux';
function Exchange() {
    const dispatch = useDispatch();
    const [pageRender, setpageRender] = useState(1);
    useEffect(() => {
        dispatch(getconclusion());
    }, [getconclusion]);

    useEffect(() => {
        dispatch(getpayment({ token: user.token }));
    }, [getpayment]);
    const onBTC = () => {
        setpageRender(2);
    };
    const onETH = () => {
        setpageRender(3);
    };
    const onYAMA = () => {
        setpageRender(1);
    };
    const user = useSelector((state) => state.user);
    const gogo = useSelector((state) => state.chart.gogo);
    const charting = useSelector((state) => state.chart.dataing);
    const ethcharting = useSelector((state) => state.ethchart.dataing);
    const pendingsell = useSelector((state) => state.payment.pendingsell);
    const pendingbuy = useSelector((state) => state.payment.pendingbuy);
    const conclusion = useSelector((state) => state.payment.conclusion);

    return (
        <div style={{width:"60%", height:"800px", background:"none",marginLeft:"15%"}}>
            <List onBTC={onBTC} onETH={onETH} onYAMA={onYAMA} charting={charting} ethcharting={ethcharting}></List>
            {pageRender == 1 ? (
                <Yamacoin user={user} pendingsell={pendingsell} pendingbuy={pendingbuy} conclusion={conclusion}></Yamacoin>
                ) : pageRender == 2 ? (
                    <BitCoin/>
                    ) : (
                <Ethereum/>
            )}
        </div>
    );
}

export default Exchange;
