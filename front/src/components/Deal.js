import React, { useState } from 'react';
import Price from './Price';
import { coinprice } from '../modules/yamatrade';
import { useDispatch } from 'react-redux';

function Deal() {
    const dispatch = useDispatch();
    const [dealcheck, setdealcheck] = useState(false);
    return (
        <div style={{width:"100%",height:"400px",background:"none",marginTop:"2%"}} className="tlqkf">
            

                <button style={{width:"70px",height:"40px",border:"none",float:"left", marginLeft:"5%",color:"white", 
                marginRight:"1%", borderRadius:"10px 10px 0px 0px",background:"rgb(85,112,156)",fontSize:"18px",fontWeight:"600"}}
                    onClick={() => {
                        dispatch(coinprice());
                        setdealcheck(true);
                    }}
                >
                    매 도
                </button>
                <button style={{width:"70px",height:"40px",float:"left" ,border:"none",borderRadius:"10px 10px 0px 0px",
                color:"white", background:"rgb(255, 90, 90)",fontSize:"18px",fontWeight:"600",marginLeft:"1%"}}
                    onClick={() => {
                        dispatch(coinprice());
                        setdealcheck(false);
                    }}
                >
                    매 수
                </button>
                <div>
                    {dealcheck == false ? (
                        <div>
                            <Price about={'매수'} mode={'KRW'}></Price>
                        </div>
                    ) : (
                        <div>
                            <Price about={'매도'} mode={'YAMA'}></Price>
                        </div>
                    )}
                </div>
        </div>
    );
}

export default Deal;
