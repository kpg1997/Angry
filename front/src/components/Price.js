import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { putamount, putprice, putsum, buysell, coinprice, plusprice, minusprice, changepercent, waittrade } from '../modules/yamatrade';
import PointCharge from './PointCharge';
import { getpayment } from '../modules/payment';
function Price({ about, mode }) {
    
    const dispatch = useDispatch();
    const yama = useSelector((state) => state.yamatrade);
    const loginUser = useSelector((state) => state.user);

    const onpricehandler = (e) => {
        dispatch(putprice({ price: e.target.value, amount: yama.amount }));
    };
    const onamounthandler = (e) => {
        dispatch(putamount({ amount: e.target.value, price: yama.price }));
    };
    const onsumhandler = (e) => {
        dispatch(putsum({ sum: e.target.value, price: yama.price }));
    };
    const onbuysellhandler = () => {
        if(loginUser.loginSuccess==false){
            alert('로그인 부터 해주세요!');
        }
        else if (about == '매수' && yama.sum > loginUser.point) {
            alert('포인트가 부족해요!!');
        } else if (about == '매도' && yama.amount > loginUser.have_yama) {
            alert('보유코인이 부족해요!!');
        } else if(yama.price==0||yama.amount==0){
            alert('수량or가격을 다시한번 확인해주세요!')
        } else {
            dispatch(
                buysell({
                    id: loginUser.userId,
                    type: about,
                    price: yama.price,
                    amount: yama.amount,
                    sum: yama.sum,
                    usercoin: loginUser.have_yama,
                    userpoint: loginUser.point,
                    useraddress: loginUser.address,
                    token: loginUser.token,
                })
            );
        }
    };
    const onminushandler = () => {
        dispatch(minusprice({ num: 50, amount: yama.amount }));
    };
    const onplushandler = () => {
        dispatch(plusprice({ num: 50, amount: yama.amount }));
    };
    const percent = (e) => {
        dispatch(changepercent({ type: about, percent: e, price: yama.price, userpoint: loginUser.point, usercoin: loginUser.have_yama }));
    };

    useEffect(() => {
        dispatch(coinprice());
        dispatch(waittrade());
    }, []);

    return (
        <div style={{width:"100%",height:"auto", background:"red",}}>



            

            <div style={{width:"30%", height:"370px",background:"white",borderRadius:"15px" ,float:"left", marginLeft:"-16%",marginTop:"35px", paddingLeft:"10px",paddingRight:"10px"}}>
            
            <div style={{width:"100%",height:"60px",background:"none"}}>
            <div style={{width:"50%",height:"60px",background:"none",float:"left",textAlign:"start",paddingTop:"5%"}}><h6><b>주문 가능</b></h6></div>
            <div style={{width:"50%",height:"60px",background:"none",float:"left",textAlign:"end",paddingTop:"5%"}}><h5><b>{about == '매수' ? loginUser.point : loginUser.have_yama} {mode}</b></h5></div>
                </div>
                <div style={{ width: "100%", height: "60px", background: "none" }}>
                    <div style={{ width: "30%", height: "60px", background: "none", float: "left", textAlign: "start", paddingTop: "5%" }}><h6><b>주문 가격</b></h6></div>
                    <input style={{border:"none",paddingBottom:"20px", width: "70%", height: "60px", background: "none", float: "left", textAlign: "end", paddingTop: "5%", outline: "none", fontSize: "25px" }} type="number" value={yama.price} onChange={onpricehandler} min={0}></input>
                </div>
                <div style={{ width: "100%", height: "60px", background: "none" }}>
                    <div style={{ width: "30%", height: "60px", background: "none", float: "left", textAlign: "start", paddingTop: "5%" }}><h6><b>주문 수량</b></h6></div>
                    <input style={{border:"none",paddingBottom:"20px", width: "70%", height: "60px", background: "none", float: "left", textAlign: "end", paddingTop: "5%", outline: "none", fontSize: "25px" }} type="number" value={yama.amount} onChange={onamounthandler} min={0}></input>

                </div>
                <div style={{ width: "100%", height: "60px", background: "none" }}>

                <button style={{ width: "15%", height: "30px", float:"right",marginRight:"1%"}}
                    onClick={() => {
                        percent(0.1);
                    }}
                >
                    10%
                </button>
                <button style={{ width: "15%", height: "30px", float:"right",marginRight:"1%"}}
                    onClick={() => {
                        percent(0.25);
                    }}
                >
                    25%
                </button>
                <button style={{ width: "15%", height: "30px", float:"right",marginRight:"1%"}}
                    onClick={() => {
                        percent(0.5);
                    }}
                >
                    50%
                </button>
                <button style={{ width: "18%", height: "30px", float:"right",marginRight:"1%"}}
                    onClick={() => {
                        percent(1);
                    }}
                >
                    100%
                </button>
                </div>
              
                <div style={{ width: "100%", height: "60px", background: "none" }}>
                <div style={{ width: "30%", height: "60px", background: "none", float: "left", textAlign: "start", paddingTop: "5%" }}><h6><b>주문 가격</b></h6></div>
                    <input style={{border:"none",paddingBottom:"20px", width: "70%", height: "60px", background: "none", float: "left", textAlign: "end", paddingTop: "5%", outline: "none", fontSize: "25px" }}  type="number" step="0.00000001" value={yama.sum} onChange={onsumhandler}></input>

                </div>
                <div style={{ width: "100%", height: "60px", background: "none" }}>
                    <button onClick={onbuysellhandler} style={{width:"100%",height:"60px",borderRadius:"15px"}}>주문하기</button>
                    </div>


            
            </div>


            <div style={{width:"27%", height:"auto",background:"rgb(245,245,245)",float:"left",minHeight:"400px",borderRadius:"20px",marginLeft:"3%"}}>
                <div style={{width:"100%",height:"50px",background:"none"}}>
                    <div style={{width:"50%",height:"50px",background:"none",float:"left",textAlign:"start",paddingLeft:"5%", paddingTop:"2.5%"}}><h5><b>금 액</b></h5></div>
                    <div style={{width:"50%",height:"50px",background:"none",float:"right",textAlign:"end",paddingRight:"5%", paddingTop:"2.5%"}}><h5><b>수 량</b></h5></div>
                </div>
                <div style={{width:"100%",height:"auto",background:"none",color:"rgb(23,99,182)"}}>
                    
            {yama.selllist == undefined?<div>로딩중</div>:
            (
                yama.selllist.length == 0
                    ? <div>매도 없음</div> : <div>{
                        yama.selllist.slice(0)
                            .reverse()
                            .map((x) => (
                                
                                <div>
                                <div style={{width:"50%",height:"35px",background:"none",float:"left",textAlign:"start",paddingLeft:"5%", paddingTop:"2.5%"}}><h6><b>{x.price}</b></h6></div>
                                 <div style={{width:"50%",height:"35px",background:"none",float:"right",textAlign:"end",paddingRight:"5%", paddingTop:"2.5%"}}><h6><b>{x.sum}</b></h6></div>

                                </div>
                            ))
                    }</div>
            )
            }
                </div>
                <div style={{width:"100%",height:"auto",background:"none",color:"rgb(255,35,67)"}}>

            {yama.buylist == undefined?<div>로딩중</div>:
            (
                yama.buylist.length == 0? <div>매수 없음</div>
                    : <div>{
                        yama.buylist.map((x) => (
                            <div>
                                <div style={{width:"50%",height:"35px",background:"none",float:"left",textAlign:"start",paddingLeft:"5%", paddingTop:"2.5%"}}><h6><b>{x.price}</b></h6></div>
                                 <div style={{width:"50%",height:"35px",background:"none",float:"right",textAlign:"end",paddingRight:"5%", paddingTop:"2.5%"}}><h6><b>{x.sum}</b></h6></div>
                            </div>
                        ))
                    }</div>
            )
            }
                </div>

            <hr />
            <div style={{width:"100%",height:"50px",background:"none"}}>

            <div style={{width:"30%",height:"50px",background:"none",float:"left",textAlign:"start",color:"rgb(23,99,182)",color:"rgb(255,35,67)",paddingLeft:"7%",paddingTop:"5%"}}><p style={{fontSize:"14px", fontWeight:"700"}}>{yama.totalbuyamount}</p></div>
            <div style={{width:"40%",height:"50px",background:"none",float:"left",textAlign:"center",paddingTop:"5%"}}><h5><b>수 량</b></h5></div>
            <div style={{width:"30%",height:"50px",background:"none",float:"left",textAlign:"end",paddingTop:"5%",paddingRight:"5%",color:"rgb(23,99,182)"}}><p style={{fontSize:"14px", fontWeight:"700",paddingRight:"3px"}}>{yama.totalsellamount}</p></div>

            
            
            
            {/* <div>주문형태 -지정가-</div>
            <div>
                주문가능 {about == '매수' ? loginUser.point : loginUser.have_yama} {mode}
            </div>
            <div>
                {about} 가격(KRW)
                <input type="number" step="0.00000001" value={yama.price} onChange={onpricehandler}></input>
                <button onClick={onminushandler}>-</button>
                <button onClick={onplushandler}>+</button>
            </div>
            <div>
                주문수량(YAMA)
                <input type="number" step="0.00000001" value={yama.amount} onChange={onamounthandler}></input>
            </div>
            <div>
                <button
                    onClick={() => {
                        percent(0.1);
                    }}
                >
                    10%
                </button>
                <button
                    onClick={() => {
                        percent(0.25);
                    }}
                >
                    25%
                </button>
                <button
                    onClick={() => {
                        percent(0.5);
                    }}
                >
                    50%
                </button>
                <button
                    onClick={() => {
                        percent(1);
                    }}
                >
                    100%
                </button>
            </div>
            <div>
                주문총액(KRW)
                <input type="number" step="0.00000001" value={yama.sum} onChange={onsumhandler}></input>
            </div>
            <div>최소주문금액: 1,000 KRW 수수료: 0.05%</div>
            <button onClick={onbuysellhandler}>주문하기</button>
            {yama.selllist == undefined?<div>로딩중</div>:
            (
                yama.selllist.length == 0
                    ? <div>매도 없음</div> : <div>{
                        yama.selllist.slice(0)
                            .reverse()
                            .map((x) => (
                                <div>
                                    매도- 가격:{x.price} 수량{x.sum}
                                </div>
                            ))
                    }</div>
            )
            }
            <hr />
            {yama.buylist == undefined?<div>로딩중</div>:
            (
                yama.buylist.length == 0? <div>매수 없음</div>
                    : <div>{
                        yama.buylist.map((x) => (
                            <div>
                                매수- 가격:{x.price} 수량{x.sum}
                            </div>
                        ))
                    }</div>
            )
            }
            {yama.totalsellamount}수량 {yama.totalbuyamount}
            <hr />
            <div>
                <PointCharge />
            </div> */}
        </div>
        </div></div>
    );
}

export default Price;
