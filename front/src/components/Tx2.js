import React, { useState, useEffect } from 'react';
import { Link, withRouter } from "react-router-dom";
import axios from 'axios';
import './LatestBlocks.css';
import send_icon from './common/send-icon.png';
import receive_icon from './common/receive_icon.png';
import * as GrIcons from 'react-icons/gr';
import sendAir_icon from './common/send.png'
function Tx2() {
    // let txid = props.Hash;
    // console.log("txid",txid.txid)
    // const [tx, setTx] = useState([]);
    // useEffect(async()=>{

    //     const res = await axios.get(`/api/Txinfo1/${txid.txid}`);
    //     console.log('띠용',res)
    //     setTx(res.data);
       
    // },[])
    
    return (

        <div style={{background:"white",padding:"10px",height:"auto",borderRadius:"15px"}}>
            <h1><b>Transaction</b></h1>
            <h4><span># MemoryPool에 없는 TxID 입니다</span></h4>
            <div style={{width:"100%" ,background:"none",height:"300px",marginTop:"40px"}}>
                <div style={{width:"35%",height:"100%",background:"none",position:"relative",float:"left", borderRadius:"15px",border:"1px solid black",padding:"15px"}}>
                    <div style={{width:"40%",height:"20%",background:"none",position:"relative",float:"left"}}><h4><b></b></h4></div>
                    <h2><b>Send</b></h2>
                    <div style={{width:"60%",height:"20%",background:"none",position:"relative",float:"left"}}><h4><b></b></h4></div>
                    <div style={{width:"40%",height:"20%",background:"none",position:"relative",float:"left"}}><h4><b>ID</b></h4></div>
                    <div style={{width:"60%",height:"20%",background:"none",position:"relative",float:"left"}}><h4><b></b></h4></div>
                    <div style={{width:"40%",height:"20%",background:"none",position:"relative",float:"left"}}><h4><b>Nickname</b></h4></div>
                    <div style={{width:"60%",height:"20%",background:"none",position:"relative",float:"left"}}><h4><b></b></h4></div>
                    <h4><b>Address</b></h4>
                    <h4 style={{overflow:"hidden", textOverflow:"ellipsis",whiteSpace:"nowrap"}}><b></b></h4>
                </div>


                <div style={{width:"30%", height:"100%",background:"none",position:"relative",float:"left"}}>
                    <img src={sendAir_icon} style={{width:"80%",marginLeft:"10%"}}/>
                    <div style={{width:"100%",background:"none",height:"41.2%",textAlign:"center"}}>
                        <h4><b>Amount  : </b></h4>
                        <h4><b>Fee : </b></h4>

                    </div>
                </div>


                <div style={{width:"35%",height:"100%",background:"none",position:"relative",float:"left", borderRadius:"15px",border:"1px solid black",padding:"15px"}}>

                <div style={{width:"40%",height:"20%",background:"none",position:"relative",float:"left"}}><h4><b></b></h4></div>
                    <h2><b>Receive</b></h2>
                    <div style={{width:"60%",height:"20%",background:"none",position:"relative",float:"left"}}><h4><b></b></h4></div>
                    <div style={{width:"40%",height:"20%",background:"none",position:"relative",float:"left"}}><h4><b>ID</b></h4></div>
                    <div style={{width:"60%",height:"20%",background:"none",position:"relative",float:"left"}}><h4><b></b></h4></div>
                    <div style={{width:"40%",height:"20%",background:"none",position:"relative",float:"left"}}><h4><b>Nickname</b></h4></div>
                    <div style={{width:"60%",height:"20%",background:"none",position:"relative",float:"left"}}><h4><b></b></h4></div>
                    <h4><b>Address</b></h4>
                    <h4 style={{overflow:"hidden", textOverflow:"ellipsis",whiteSpace:"nowrap"}}><b></b></h4>

                </div>
            </div>
            <div style={{width:"100%" ,background:"none",height:"300px"}}>
            <div style={{ width: "50%", background: "none", height: "10%", float: "left" }}></div>
            <div style={{ width: "50%", background: "none", height: "10%", float: "left" }}></div>
            <div style={{ width: "50%", background: "none", height: "90%", float: "left",paddingLeft:"5%" }}><img src={send_icon} style={{ width: "50%" }} /></div>
            <div style={{ width: "50%", background: "none", height: "90%", float: "left",paddingRight:"5%" }}><img src={receive_icon} style={{ width: "50%",float:"right" }} /></div>
            </div>


            {/* <div style={{ width: "50%", background: "none", height: "50%", float: "left" }}>
                <div style={{position:"relative"}}>
                    <div style={{ width: "200px" }}><img src={send_icon} style={{ width: "100%" }} /></div>
                </div>                
            </div>

            <div style={{ width: "50%", background: "none", height: "50%", float: "right" }}>
                <div style={{left:"60%" ,position:"relative"}}>
                    <div style={{ width: "200px" }}><img src={receive_icon} style={{ width: "100%" }} /></div>
                </div>
            </div> */}
            {/* {tx.sendid}
            {tx.sendAddress}
            {tx.sendNickname}
            {tx.receiveid}
            {tx.receiveAddress}
            {tx.receiveNickname}
            {tx.amount}
            {tx.fee} */}
        </div>

    );
}

export default Tx2;