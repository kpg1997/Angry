import React, { useState, useEffect } from 'react';
import { Link, useHistory, withRouter } from "react-router-dom";
import axios from 'axios';
import './LatestBlocks.css';
import moment from 'moment';

function Block(props) {
    let Hash = props.Hash;
    let history = useHistory();
    
    if(Hash===undefined){
        alert("잘못된 주소입니다");
        history.push("/");
    }
    // console.log(Hash);


        const [height, setHeight] = useState("");
        const [time, setTime] = useState("");
        const [size, setSize] = useState("");
        const [weight, setWeight] = useState("");
        const [hash, setHash] = useState("");
        const [tx, setTx] = useState([]);
        const [nonce, setNonce] = useState("");
        const [difficulty, setDifficulty] = useState("");
        const [previousblockhash, setPreviousblockhash] = useState("");
        const [nextblockhash,setNextblockhash] = useState("");
        useEffect(async()=>{
            
            const res = await axios.get(`/api/block/${Hash.hash}`)
            console.log('띠용',res)
            setHeight(res.data.result.height);
            setTime(res.data.result.time);
            setSize(res.data.result.size);
            setWeight(res.data.result.weight);
            setHash(res.data.result.hash);
           
            setNonce(res.data.result.nonce);
            setDifficulty(res.data.result.difficulty);
            setPreviousblockhash(res.data.result.previousblockhash);
            setNextblockhash(res.data.result.nextblockhash);
            const res2 = await axios.get(`/api/blockPage/${Hash.hash}`)
            setTx(res2.data);
            console.log("res2",res2.data);
        },[Hash])
        
        // <p style={{width:"80%",height:"100%",background:"none",float:"right",overflow:"hidden", textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{a}</p>
        const listItem = tx.map((a) =>
        <div style={{height:"40px", width:"100%", paddingLeft:"15px", background:"rgb(223,220,217)",marginTop:"3px",borderRadius:"5px",textAlign:"center",textJustify:"auto"}}>  
             <b style={{top:"25%",position:"relative",display:"inline", color :"black"}}><Link to={a.url} style={{color:"black"}}>{a.txid}</Link></b> 
            </div>
    );
    
    var fmt1 = 'YYYY.MM.DD HH:mm:ss';
    var date = new Date(time*1000);
    //현재시간
    var now = moment(date).format(fmt1);
    
    
    
    
    
    
    return (
        <div>

        <div style={{background:"rgb(243,240,237)",padding:"10px",borderRadius:"15px"}}>
            <h2 className="title">Block #{height}</h2>
        <div style={{border:"1px solid rgb(22,22,22)",marginTop:"30px",height:"80%"}}>

            <div style={{width:"100%",height:"30px",background:"none"}}>
                <div style={{width:"20%",height:"100%", textAlign:"center",background:"none",float:"left"}}><b>Height</b></div>
                <div style={{width:"80%",height:"100%",background:"none",float:"right"}}>{height}</div>
            </div>

            <div style={{width:"100%",height:"30px",background:"none"}}>
                <div style={{width:"20%",height:"100%", textAlign:"center",background:"none",float:"left"}}><b>Hash</b></div>
                <div style={{width:"80%",height:"100%",background:"none",float:"right"}}>{hash}</div>
            </div>

            <div style={{width:"100%",height:"30px",background:"none"}}>
                <div style={{width:"20%",height:"100%", textAlign:"center",background:"none",float:"left"}}><b>Next Hash</b></div>
                <div style={{width:"80%",height:"100%",background:"none",float:"right"}}>
                <Link  style={{color:"rgb(22,22,22)"}} to={`/block/${nextblockhash}`}><b>{nextblockhash}</b></Link></div>
            </div>

            <div style={{width:"100%",height:"30px",background:"none"}}>
                <div style={{width:"20%",height:"100%", textAlign:"center",background:"none",float:"left"}}><b>Previous Hash</b></div>
                <div style={{width:"80%",height:"100%",background:"none",float:"right"}}>
                    <Link style={{color:"rgb(22,22,22)"}} to={`/block/${previousblockhash}`}><b>{previousblockhash}</b></Link>
                    </div>
            </div>

            <div style={{width:"100%",height:"30px",background:"none"}}>
                <div style={{width:"20%",height:"100%", textAlign:"center",background:"none",float:"left"}}><b>Generation Time</b></div>
                <div style={{width:"80%",height:"100%",background:"none",float:"right"}}>{now}</div>
            </div>

            <div style={{width:"100%",height:"30px",background:"none"}}>
                <div style={{width:"20%",height:"100%", textAlign:"center",background:"none",float:"left"}}><b>Block Size</b></div>
                <div style={{width:"80%",height:"100%",background:"none",float:"right"}}>{size} bytes</div>
            </div>

            <div style={{width:"100%",height:"30px",background:"none"}}>
                <div style={{width:"20%",height:"100%", textAlign:"center",background:"none",float:"left"}}><b>Weight</b></div>
                <div style={{width:"80%",height:"100%",background:"none",float:"right"}}>{weight}</div>
            </div>

            <div style={{width:"100%",height:"30px",background:"none"}}>
                <div style={{width:"20%",height:"100%", textAlign:"center",background:"none",float:"left"}}><b>Nonce</b></div>
                <div style={{width:"80%",height:"100%",background:"none",float:"right"}}>{nonce}</div>
            </div>
            <div style={{width:"100%",height:"30px",background:"none"}}>
                <div style={{width:"20%",height:"100%", textAlign:"center",background:"none",float:"left"}}><b>Difficulty</b></div>
                <div style={{width:"80%",height:"100%",background:"none",float:"right"}}>{difficulty}</div>
            </div>
        </div>

        </div>
        <div style={{width:"100%",height:"auto", background:"none", marginTop:"20px",display:"inline-block",top:"5px", position:"relative", background:"rgb(243,240,237)",padding:"10px", borderRadius:"15px"}}>
                <h2 style={{fontWeight:"700"}}>Transactions Id</h2>
                
                <div style={{width:"100%",height:"100%",display:"inline-block",marginTop:"5px"}}>
                {listItem}
                </div>
        </div>
            {/* <table className="Block">

<tr>
<td>Previous Hash</td>
<Link  to={`/block/${previousblockhash}`}><td>{previousblockhash}</td></Link>
</tr>
<tr>
<td>Time</td>
<td>{now}</td>
</tr>
<tr>
<td>Block Size</td>
<td>{size} bytes</td>
</tr>
<tr>
<td>Weight</td>
<td>{weight}</td>
</tr>
<tr>
<td>Nonce</td>
<td>{nonce}</td>
</tr>
<tr>
<td>Difficulty</td>
<td>{difficulty}</td>
</tr>
<tr style={{height:"40%", overflow:"scroll", display:"inline"}}>
<td className="tx">TxId</td>
{listItem}
</tr>
</table> */}
</div>    
       
       );


    }
    
export default Block;
