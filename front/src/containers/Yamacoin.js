import React, { useEffect } from 'react';
import List from '../components/List';
import Deal from '../components/Deal';
import Payment from '../components/Payment';
import Conclusion from '../components/Conclusion';
import Chart from 'kaktana-react-lightweight-charts';
import { useDispatch, useSelector } from 'react-redux';
import { yamadata } from '../modules/yamachart';

function Yamacoin({ user, pendingbuy, pendingsell, conclusion }) {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(yamadata());
    }, []);
    const data = useSelector((state) => state.yamachart.data);
    const state = {
        options: {

            fixLeftEdge: true,
            layout: {
                backgroundColor: '#253248',
                textColor: 'rgba(255, 255, 255, 0.9)',
            },
            grid: {
                vertLines: {
                    color: '#334158',
                },
                horzLines: {
                    color: '#334158',
                },
            },

            priceScale: {
                borderColor: '#485c7b',
            },
            timeScale: {
                fixLeftEdge: true,
                visible: true,
                borderColor: '#485c7b',
                timeVisible: true,
                secondsVisible: false,
            },
        },
        candlestickSeries: [
            {
                options: {
                    upColor: '#FF6347',
                    downColor: '#6495ED',
                    borderVisible: false,
                    wickVisible: true,
                    borderColor: '#000000',
                    wickColor: '#737375',
                    borderUpColor: '#4682B4',
                    borderDownColor: '#A52A2A',
                    wickUpColor: '#4682B4',
                    wickDownColor: '#A52A2A',
                },
                data: data,
            },
        ],
    };
  

    return (
        <div>
            
            <div>
                <Chart options={state.options} candlestickSeries={state.candlestickSeries} autoWidth height={320} />
            </div>
            <div>
                <Deal></Deal>
                <Conclusion conclusion={conclusion}></Conclusion>
            </div>
            <div>
                <Payment pendingsell={pendingsell} pendingbuy={pendingbuy} token={user.token} id={user.userId}></Payment>
            </div>
            <div>
            </div>
        </div>
    );
}

export default Yamacoin;
