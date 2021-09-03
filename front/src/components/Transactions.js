import React, { useState, useEffect } from 'react';
import { Link, withRouter } from "react-router-dom";
import axios from 'axios';
import './LatestBlocks.css';
import moment from 'moment';

function Transactions() {
    //최근 거래
    const [tx, setTx] = useState([]);
    const [tx1, setTx1] = useState([]);
    const [tx2, setTx2] = useState([]);
    const [tx3, setTx3] = useState([]);
    const [tx4, setTx4] = useState([]);
    //Transactions
    


    useEffect(async () => {
        try {
            //0
            // setTimeout('window.location.reload()',90000);
            const res = await axios.get("/api/listtransactions");
            console.log("호롤롤",res);
            
            
            setTx(res.data[4]);
            setTx1(res.data[3]);
            setTx2(res.data[2]);
            setTx3(res.data[1]);
            setTx4(res.data[0]);
        } catch (error) {
            console.log("!!", error);
        }
    }, []);

    //현재시간
    var now = moment();

    var time,time1,time2,time3,time4;
    //몇분 전
    //blocks
    let day= moment.duration(now.diff(tx.timereceived*1000)).days();
    let hour= moment.duration(now.diff(tx.timereceived*1000)).hours();
    let minute= moment.duration(now.diff(tx.timereceived*1000)).minutes();
    let second= moment.duration(now.diff(tx.timereceived*1000)).seconds();
    if(day>0){
        time = `${day}일 전`;
    }
    else if (hour>0){
        time = `${hour}시간 전`;
    }
    else if (minute > 0){
        time = `${minute}분 전`;
    }
    else { time = `${second}초 전`}
    //blocks1
    let day1= moment.duration(now.diff(tx1.timereceived*1000)).days();
    let hour1= moment.duration(now.diff(tx1.timereceived*1000)).hours();
    let minute1= moment.duration(now.diff(tx1.timereceived*1000)).minutes();
    let second1= moment.duration(now.diff(tx1.timereceived*1000)).seconds();
    if(day1>0){
        time1 = `${day1}일 전`;
    }
    else if (hour1>0){
        time1 = `${hour1}시간 전`;
    }
    else if (minute1 > 0){
        time1 = `${minute1}분 전`;
    }
    else { time1 = `${second1}초 전`}
    //blocks2
    let day2= moment.duration(now.diff(tx2.timereceived*1000)).days();
    let hour2= moment.duration(now.diff(tx2.timereceived*1000)).hours();
    let minute2= moment.duration(now.diff(tx2.timereceived*1000)).minutes();
    let second2= moment.duration(now.diff(tx2.timereceived*1000)).seconds();
    if(day2>0){
        time2 = `${day2}일 전`;
    }
    else if (hour2>0){
        time2 = `${hour2}시간 전`;
    }
    else if (minute2 > 0){
        time2 = `${minute2}분 전`;
    }
    else { time2 = `${second2}초 전`}
    //blocks3
    let day3= moment.duration(now.diff(tx3.timereceived*1000)).days();
    let hour3= moment.duration(now.diff(tx3.timereceived*1000)).hours();
    let minute3= moment.duration(now.diff(tx3.timereceived*1000)).minutes();
    let second3= moment.duration(now.diff(tx3.timereceived*1000)).seconds();
    if(day3>0){
        time3 = `${day3}일 전`;
    }
    else if (hour3>0){
        time3 = `${hour3}시간 전`;
    }
    else if (minute3 > 0){
        time3 = `${minute3}분 전`;
    }
    else { time3 = `${second3}초 전`}
    //blocks4
    let day4= moment.duration(now.diff(tx4.timereceived*1000)).days();
    let hour4= moment.duration(now.diff(tx4.timereceived*1000)).hours();
    let minute4= moment.duration(now.diff(tx4.timereceived*1000)).minutes();
    let second4= moment.duration(now.diff(tx4.timereceived*1000)).seconds();
    if(day4>0){
        time4 = `${day4}일 전`;
    }
    else if (hour4>0){
        time4 = `${hour4}시간 전`;
    }
    else if (minute4 > 0){
        time4 = `${minute4}분 전`;
    }
    else { time4 = `${second4}초 전`}

    return (
        <div style={{background:"none", width:"100%",marginTop:"5px",marginLeft:"5px"}}>
        <h2 className="title">Latest Transactions<br/><span>The most recently published unconfirmed transactions</span></h2>
        
        <div style={{ width: "100%", textAlign: 'center', height: "auto",marginTop:"-15px" }}>
                <div style={{ width: "65%", float: "left", height: "auto", textOverflow: "ellipsis" }}>
                    <h5 style={{color:"rgb(22,22,22)"}}><strong>TxId</strong></h5>

                </div>
                <div style={{ width: "20%", float: "left", height: "auto" }}>
                    <h5 style={{color:"rgb(22,22,22)"}}><strong>Time</strong></h5>
                </div>
                
                <div style={{ width: "15%", float: "left", height: "auto" }}>
                    <h5 style={{color:"rgb(22,22,22)"}}><strong>Amount</strong></h5>

                </div>
            
            <Link to={`/tx/${tx4.txid}`} style={{color:"rgb(22,22,22)"}}>
            <div style={{width:"65%",float:"left",height:"auto",textOverflow:"ellipsis",marginTop:"7px"}}>
                <h5 style={{textAlign:"left", width:"100%",overflow:"hidden", textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
                    {tx4.txid}
                </h5>
            </div>
            <div style={{width:"20%",float:"left",height:"auto",marginTop:"7px"}}>
                <h5 style={{}}>{time4}</h5>
            </div>
            <div style={{width:"15%",float:"left",height:"auto",marginTop:"7px"}}>
                <h5 style={{}}>{Math.abs(tx4.amount)}</h5>
            </div>
            </Link>

            <Link to={`/tx/${tx3.txid}`} style={{color:"rgb(22,22,22)"}}>
            <div style={{width:"65%",float:"left",height:"auto",textOverflow:"ellipsis",marginTop:"7px"}}>
                <h5 style={{textAlign:"left", width:"100%",overflow:"hidden", textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
                    {tx3.txid}
                </h5>
            </div>
            <div style={{width:"20%",float:"left",height:"auto",marginTop:"7px"}}>
                <h5 style={{}}>{time3}</h5>
            </div>
            <div style={{width:"15%",float:"left",height:"auto",marginTop:"7px"}}>
                <h5 style={{}}>{Math.abs(tx3.amount)}</h5>
            </div>
            </Link>

            <Link to={`/tx/${tx2.txid}`} style={{color:"rgb(22,22,22)"}}>
            <div style={{width:"65%",float:"left",height:"auto",textOverflow:"ellipsis",marginTop:"7px"}}>
                <h5 style={{textAlign:"left", width:"100%",overflow:"hidden", textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
                    {tx2.txid}
                </h5>
            </div>
            <div style={{width:"20%",float:"left",height:"auto",marginTop:"7px"}}>
                <h5 style={{}}>{time2}</h5>
            </div>
            <div style={{width:"15%",float:"left",height:"auto",marginTop:"7px"}}>
                <h5 style={{}}>{Math.abs(tx2.amount)}</h5>
            </div>
            </Link>
           
            <Link to={`/tx/${tx1.txid}`} style={{color:"rgb(22,22,22)"}}>
            <div style={{width:"65%",float:"left",height:"auto",textOverflow:"ellipsis",marginTop:"7px"}}>
                <h5 style={{textAlign:"left", width:"100%",overflow:"hidden", textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
                    {tx1.txid}
                </h5>
            </div>
            <div style={{width:"20%",float:"left",height:"auto",marginTop:"7px"}}>
                <h5 style={{}}>{time1}</h5>
            </div>
            <div style={{width:"15%",float:"left",height:"auto",marginTop:"7px"}}>
                <h5 style={{}}>{Math.abs(tx1.amount)}</h5>
            </div>
            </Link>

            <Link to={`/tx/${tx.txid}`} style={{color:"rgb(22,22,22)"}}>
            <div style={{width:"65%",float:"left",height:"auto",textOverflow:"ellipsis",marginTop:"7px"}}>
                <h5 style={{textAlign:"left", width:"100%",overflow:"hidden", textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
                    {tx.txid}
                </h5>
            </div>
            <div style={{width:"20%",float:"left",height:"auto",marginTop:"7px"}}>
                <h5 style={{}}>{time}</h5>
            </div>
            <div style={{width:"15%",float:"left",height:"auto",marginTop:"7px"}}>
                <h5 style={{}}>{Math.abs(tx.amount)}</h5>
            </div>
            </Link>


        </div>
        </div>
    );
}

export default Transactions;
