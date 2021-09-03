import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getsaga } from '../modules/chart';
function Test() {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.chart.data);
    useEffect(() => {
        dispatch(getsaga());
    }, []);

    return (
        <div>
            <div style={{ fontSize: 50 }}>{data}</div>
        </div>
    );
}

export default Test;
