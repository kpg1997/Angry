import React from 'react';
import Chart from 'react-google-charts';

function Charts({ datas }) {
    return (
        <div>
            <Chart
                width={'100%'}
                height={350}
                chartType="CandlestickChart"
                loader={<div>Loading Chart</div>}
                data={datas}
                options={{
                    legend: 'none',
                    bar: { groupWidth: '100%' }, // Remove space between bars.
                    width: 1500,
                    candlestick: {
                        fallingColor: { strokeWidth: 0, fill: '#0000FF' }, // red
                        risingColor: { strokeWidth: 0, fill: '#a52714' }, // blue
                    },
                }}
                rootProps={{ 'data-testid': '2' }}
            />
        </div>
    );
}

export default Charts;
