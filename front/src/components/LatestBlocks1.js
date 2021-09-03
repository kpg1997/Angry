import React, { useState, useEffect } from 'react';
import { Link, withRouter } from "react-router-dom";
import axios from 'axios';
import './LatestBlocks.css';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import moment from 'moment';
function LatestBlocks() {
    //최근블록
    const [blocks, setBlocks] = useState([
        {
            hash : "",
            time : "",
            height : "",
        }
    ]);
    const [blocks1, setBlocks1] = useState([
        {
            hash : "",
            time : "",
            height : "",
        }
    ]);
    const [blocks2, setBlocks2] = useState([
        {
            hash : "",
            time : "",
            height : "",
        }
    ]);
    const [blocks3, setBlocks3] = useState([
        {
            hash : "",
            time : "",
            height : "",
        }
    ]);
    const [blocks4, setBlocks4] = useState([
        {
            hash : "",
            time : "",
            height : "",
        }
    ]);

    useEffect(async () => {
        try {
            //0
            // setTimeout('window.location.reload()',90000);
            const res = await axios.get("/api/LatestBlocks");
            console.log(res.data[0]);
           
                setBlocks(res.data[0]);
                setBlocks1(res.data[1]);
                setBlocks2(res.data[2]);
                setBlocks3(res.data[3]);
                setBlocks4(res.data[4]);

         } catch (error) {
           console.log("!!", error);
         }
       }, []);
       //현재시간
        var now = moment();

        let day= moment.duration(now.diff(blocks.time*1000)).days()+"일";
        let hour= moment.duration(now.diff(blocks.time*1000)).hours()+"시간";
        let minute= moment.duration(now.diff(blocks.time*1000)).minutes()+"분";
        let second= moment.duration(now.diff(blocks.time*1000)).seconds()+"초";
        if(day>0){
            let time = day
        }
        else if (hour>0){
            let time = hour
        }
        else if (minute > 0){
            let time = minute
        }
        else { let time = second}
        // var t1 = {
        //     day:moment.duration(now.diff(blocks1.time*1000)).days()+"일",
        //     hour:moment.duration(now.diff(blocks1.time*1000)).hours()+"시간",
        //     minute:moment.duration(now.diff(blocks1.time*1000)).minutes()+"분",
        //     second:moment.duration(now.diff(blocks1.time*1000)).seconds()+"초"
        // }
        // var t2 = {
        //     day:moment.duration(now.diff(blocks2.time*1000)).days()+"일",
        //     hour:moment.duration(now.diff(blocks2.time*1000)).hours()+"시간",
        //     minute:moment.duration(now.diff(blocks2.time*1000)).minutes()+"분",
        //     second:moment.duration(now.diff(blocks2.time*1000)).seconds()+"초"
        // }
        // var t3 = {
        //     day:moment.duration(now.diff(blocks3.time*1000)).days()+"일",
        //     hour:moment.duration(now.diff(blocks3.time*1000)).hours()+"시간",
        //     minute:moment.duration(now.diff(blocks3.time*1000)).minutes()+"분",
        //     second:moment.duration(now.diff(blocks3.time*1000)).seconds()+"초"
        // }
        // var t4 = {
        //     day:moment.duration(now.diff(blocks4.time*1000)).days()+"일",
        //     hour:moment.duration(now.diff(blocks4.time*1000)).hours()+"시간",
        //     minute:moment.duration(now.diff(blocks4.time*1000)).minutes()+"분",
        //     second:moment.duration(now.diff(blocks4.time*1000)).seconds()+"초"
        // }


    return (
        <>
        <h2 className="title">Latest Blocks<br/><span>The most recently mined blocks</span></h2>

        <table className="LatestBlocks">
            <tr>
                <th>Height</th>
                <th>Time</th>
                <th>Hash</th>
            </tr>
            <tr>
                <Link to={`/block/${blocks.hash}`}><td>{blocks.height}</td></Link>
                <td>{t.day+t.hour+t.minute+t.second}전</td>
                <div className="hash">{blocks.hash}</div>
                <td><CopyToClipboard text={blocks.hash}><button>Copy</button></CopyToClipboard></td>
            </tr>
            <tr>
                <Link to={`/block/${blocks1.hash}`}><td>{blocks1.height}</td></Link>
                <td>{t1.day+t1.hour+t1.minute+t1.second}전</td>
                <div className="hash">{blocks1.hash}</div>
                <td><CopyToClipboard text={blocks1.hash}><button>Copy</button></CopyToClipboard></td>
            </tr>
            <tr>
                <Link to={`/block/${blocks2.hash}`}><td>{blocks2.height}</td></Link>
                <td>{t2.day+t2.hour+t2.minute+t2.second}전</td>
                <div className="hash">{blocks2.hash}</div>
                <td><CopyToClipboard text={blocks2.hash}><button>Copy</button></CopyToClipboard></td>
            </tr>
            <tr>
                <Link to={`/block/${blocks3.hash}`}><td>{blocks3.height}</td></Link>
                <td>{t3.day+t3.hour+t3.minute+t3.second}전</td>
                <div className="hash">{blocks3.hash}</div>
                <td><CopyToClipboard text={blocks3.hash}><button>Copy</button></CopyToClipboard></td>
            </tr>
            <tr>
                <Link to={`/block/${blocks4.hash}`}><td>{blocks4.height}</td></Link>
                <td>{t4.day+t4.hour+t4.minute+t4.second}전</td>
                <div className="hash">{blocks4.hash}</div>
                <td><CopyToClipboard text={blocks4.hash}><button>Copy</button></CopyToClipboard></td>
            </tr>
        </table>
        </>
    );
}

export default LatestBlocks;
