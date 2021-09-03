import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Moment from 'react-moment';
import { deletepending } from '../modules/payment';
import { getpayment } from '../modules/payment';
import "./scrollbar.css"

function Payment({ pendingsell, pendingbuy, token,id }) {
    const dispatch = useDispatch();
    const ondeletehandeler = (e) => {
        const date = e.target.dataset.id;
        const type = Number(e.target.dataset.type);
        const amount = parseFloat(e.target.dataset.amount);
        const price = parseFloat(e.target.dataset.price);
        dispatch(deletepending({ token: token, date: date, price: price, type: type, amount: amount }));
    };
    const a = pendingsell.filter((x) => { return x.id == id });
    const b = pendingbuy.filter((x) => { return x.id == id });
      
    
    return (
        <div style={{width:"100%",background:"white",marginTop:"30px",float:"left",borderRadius:"20px",padding:"0"}}>
             <div style={{width:"100%",background:"rgb(233,230,227)",height:"50px",textAlign:"center"}}>

            <div style={{width:"10%",background:"none",height:"50px",float:"left",paddingTop:"1%"}}><h5><b>구 분</b></h5></div>
            <div style={{width:"15%",background:"none",height:"50px",float:"left",paddingTop:"1%"}}><h5><b>가 격</b></h5></div>
            <div style={{width:"20%",background:"none",height:"50px",float:"left",paddingTop:"1%"}}><h5><b>수량</b></h5></div>
            <div style={{width:"20%",background:"none",height:"50px",float:"left",paddingTop:"1%"}}><h5><b>총 금액</b></h5> </div>
            <div style={{width:"30%",background:"none",height:"50px",float:"left",paddingTop:"1%"}}><h5><b>날 짜</b></h5> </div>
            <div style={{width:"5%",background:"none",height:"50px",float:"left",paddingTop:"1%"}}><h5><b></b></h5></div>
             </div>
             <div className="scrollbar" style={{width:"100%",background:"rgb(233,230,227)",textAlign:"center", marginTop:"1px"}}>
                {a == false ? (
                    <div></div>
                ) : a.length == 0 ? (
                    <div style={{display:"none"}}></div>
                ) : (
                    <div  >
                        {a.map((x) => {
                            return (
                                <div key={x.date}>
                                    <div style={{ width: "10%", background: "none", height: "50px", float: "left", paddingTop: "1%",color:"rgb(23,99,182)" }}><h6><b>매 도</b></h6> </div>
                                    <div style={{ width: "15%", background: "none", height: "50px", float: "left", paddingTop: "1%" }}><h6><b>{x.price}</b></h6></div>
                                    <div style={{ width: "20%", background: "none", height: "50px", float: "left", paddingTop: "1%" }}><h6><b>{x.amount}</b></h6></div>
                                    <div style={{ width: "20%", background: "none", height: "50px", float: "left", paddingTop: "1%" }}><h6><b>{x.sum}</b></h6></div>
                                    <div style={{ width: "30%", background: "none", height: "50px", float: "left", paddingTop: "1%" }}><h6><b><Moment format="YYYY-MM-DD HH:mm:ss">{x.date}</Moment></b></h6></div>
                                    <div style={{ width: "5%", background: "none", height: "50px", float: "left", paddingTop: "1%" }}>
                                    <button onClick={ondeletehandeler} data-id={x.date} data-type="0" data-price={x.price} data-amount={x.amount}>
                                        취소
                                    </button></div>

                                    
                                </div>
                            );
                        })}
                            </div>
                )}
            
                {b == false ? (
                    <div></div>
                    ) : b.length == 0 ? (
                        <div style={{display:"none"}}></div>
                        ) : (
                            <div>
                        {' '}
                        {b.map((x) => {
                            return (
                                <div>
                                    <div style={{ width: "10%", background: "none", height: "50px", float: "left", paddingTop: "1%",color:"rgb(255,35,67)" }}><h6><b>매 수</b></h6> </div>
                                    <div style={{ width: "15%", background: "none", height: "50px", float: "left", paddingTop: "1%" }}><h6><b>{x.price}</b></h6></div>
                                    <div style={{ width: "20%", background: "none", height: "50px", float: "left", paddingTop: "1%" }}><h6><b>{x.amount}</b></h6></div>
                                    <div style={{ width: "20%", background: "none", height: "50px", float: "left", paddingTop: "1%" }}><h6><b>{x.sum}</b></h6></div>
                                    <div style={{ width: "30%", background: "none", height: "50px", float: "left", paddingTop: "1%" }}><h6><b><Moment format="YYYY-MM-DD HH:mm:ss">{x.date}</Moment></b></h6></div>
                                    <div style={{ width: "5%", background: "none", height: "50px", float: "left", paddingTop: "1%" }}>
                                    <button onClick={ondeletehandeler} data-id={x.date} data-type="0" data-price={x.price} data-amount={x.amount}>
                                        취소
                                    </button></div>
                                </div>
                            );
                        })}
                    </div>
                )}
            
                </div>
            
        </div>
    );
}

export default React.memo(Payment);