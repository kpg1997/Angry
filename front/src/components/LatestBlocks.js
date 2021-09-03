import React, { useState, useEffect } from 'react';
import { Link, withRouter } from "react-router-dom";
import axios from 'axios';
import { render } from 'react-dom';

import moment from 'moment'
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
    //Transactions
    const [tx, setTx] = useState([]);

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

       var fmt1 = 'YYYY.MM.DD HH:mm:ss';

       //현재시간
       var now = moment();

       var time,time1,time2,time3,time4;
       //몇분 전
       //blocks
       var date = new Date(blocks.time*1000);
       var mining = moment(date).format(fmt1);
       let day= moment.duration(now.diff(blocks.time*1000)).days();
       let hour= moment.duration(now.diff(blocks.time*1000)).hours();
       let minute= moment.duration(now.diff(blocks.time*1000)).minutes();
       let second= moment.duration(now.diff(blocks.time*1000)).seconds();
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
       var date1 = new Date(blocks1.time*1000);
       var mining1 = moment(date1).format(fmt1);
       let day1= moment.duration(now.diff(blocks1.time*1000)).days();
       let hour1= moment.duration(now.diff(blocks1.time*1000)).hours();
       let minute1= moment.duration(now.diff(blocks1.time*1000)).minutes();
       let second1= moment.duration(now.diff(blocks1.time*1000)).seconds();
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
       var date2 = new Date(blocks2.time*1000);
       var mining2 = moment(date2).format(fmt1);
       let day2= moment.duration(now.diff(blocks2.time*1000)).days();
       let hour2= moment.duration(now.diff(blocks2.time*1000)).hours();
       let minute2= moment.duration(now.diff(blocks2.time*1000)).minutes();
       let second2= moment.duration(now.diff(blocks2.time*1000)).seconds();
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
       var date3 = new Date(blocks3.time*1000);
       var mining3 = moment(date3).format(fmt1);
       let day3= moment.duration(now.diff(blocks3.time*1000)).days();
       let hour3= moment.duration(now.diff(blocks3.time*1000)).hours();
       let minute3= moment.duration(now.diff(blocks3.time*1000)).minutes();
       let second3= moment.duration(now.diff(blocks3.time*1000)).seconds();
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
       var date4 = new Date(blocks4.time*1000);
       var mining4 = moment(date4).format(fmt1);
       let day4= moment.duration(now.diff(blocks4.time*1000)).days();
       let hour4= moment.duration(now.diff(blocks4.time*1000)).hours();
       let minute4= moment.duration(now.diff(blocks4.time*1000)).minutes();
       let second4= moment.duration(now.diff(blocks4.time*1000)).seconds();
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





       //    var t = {
    //        day:moment.duration(now.diff(blocks.time*1000)).days()+"일",
    //        hour:moment.duration(now.diff(blocks.time*1000)).hours()+"시간",
    //        minute:moment.duration(now.diff(blocks.time*1000)).minutes()+"분",
    //        second:moment.duration(now.diff(blocks.time*1000)).seconds()+"초"
    //    }
    //    var t1 = {
    //        day:moment.duration(now.diff(blocks1.time*1000)).days()+"일",
    //        hour:moment.duration(now.diff(blocks1.time*1000)).hours()+"시간",
    //        minute:moment.duration(now.diff(blocks1.time*1000)).minutes()+"분",
    //        second:moment.duration(now.diff(blocks1.time*1000)).seconds()+"초"
    //    }
    //    var t2 = {
    //        day:moment.duration(now.diff(blocks2.time*1000)).days()+"일",
    //        hour:moment.duration(now.diff(blocks2.time*1000)).hours()+"시간",
    //        minute:moment.duration(now.diff(blocks2.time*1000)).minutes()+"분",
    //        second:moment.duration(now.diff(blocks2.time*1000)).seconds()+"초"
    //    }
    //    var t3 = {
    //        day:moment.duration(now.diff(blocks3.time*1000)).days()+"일",
    //        hour:moment.duration(now.diff(blocks3.time*1000)).hours()+"시간",
    //        minute:moment.duration(now.diff(blocks3.time*1000)).minutes()+"분",
    //        second:moment.duration(now.diff(blocks3.time*1000)).seconds()+"초"
    //    }
    //    var t4 = {
    //        day:moment.duration(now.diff(blocks4.time*1000)).days()+"일",
    //        hour:moment.duration(now.diff(blocks4.time*1000)).hours()+"시간",
    //        minute:moment.duration(now.diff(blocks4.time*1000)).minutes()+"분",
    //        second:moment.duration(now.diff(blocks4.time*1000)).seconds()+"초"
    // }

    return (
        <div style={{background:"none", width:"100%",marginTop:"5px",marginLeft:"5px"}}>
        <h2 className="title" style={{color:"rgb(22,22,22)"}}>Latest Blocks<br/><span>The most recently mined blocks</span></h2>
        
            <div style={{ width: "100%", textAlign: 'center', height: "auto",marginTop:"-15px" }}>
                <div style={{ width: "10%", float: "left", height: "auto" }}>
                    <h5 style={{color:"rgb(22,22,22)"}}><strong>Height</strong></h5>

                </div>
                <div style={{ width: "17%", float: "left", height: "auto" }}>
                    <h5 style={{color:"rgb(22,22,22)"}}><strong>Time</strong></h5>
                </div>
                <div style={{ width: "73%", float: "left", height: "auto", textOverflow: "ellipsis" }}>
                    <h5 style={{color:"rgb(22,22,22)"}}><strong>Hash</strong></h5>

                </div>
            
            <Link to={`/block/${blocks.hash}`} style={{color:"rgb(22,22,22)"}}>
            <div style={{width:"10%",float:"left",height:"auto",marginTop:"7px"}}>
                <h5 style={{}}>{blocks.height}</h5>
            </div>
            <div style={{width:"17%",float:"left",height:"auto",marginTop:"7px"}}>
                <h5 style={{}}>{time}</h5>
            </div>
            <div style={{width:"73%",float:"left",height:"auto",textOverflow:"ellipsis",marginTop:"7px"}}>
                <h5 style={{textAlign:"left", width:"100%",overflow:"hidden", textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
                    {blocks.hash}
                </h5>
            </div>
            </Link>
            <Link to={`/block/${blocks1.hash}`} style={{color:"rgb(22,22,22)"}}>
            <div style={{width:"10%",float:"left",height:"auto",marginTop:"5px"}}>
                <h5 style={{}}>{blocks1.height}</h5>
            </div>
            <div style={{width:"17%",float:"left",height:"auto",marginTop:"5px"}}>
                <h5 style={{}}>{time1}</h5>
            </div>
            <div style={{width:"73%",float:"left",height:"auto",textOverflow:"ellipsis",marginTop:"5px"}}>
                <h5 style={{textAlign:"left", width:"100%",overflow:"hidden", textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
                    {blocks1.hash}
                </h5>
            </div>
            </Link>
            <Link to={`/block/${blocks2.hash}`} style={{color:"rgb(22,22,22)"}}>
            <div style={{width:"10%",float:"left",height:"auto",marginTop:"5px"}}>
                <h5 style={{}}>{blocks2.height}</h5>
            </div>
            <div style={{width:"17%",float:"left",height:"auto",marginTop:"5px"}}>
                <h5 style={{}}>{time2}</h5>
            </div>
            <div style={{width:"73%",float:"left",height:"auto",textOverflow:"ellipsis",marginTop:"5px"}}>
                <h5 style={{textAlign:"left", width:"100%",overflow:"hidden", textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
                    {blocks2.hash}
                </h5>
            </div>
            </Link>
            <Link to={`/block/${blocks3.hash}`} style={{color:"rgb(22,22,22)",marginTop:"5px"}}>
            <div style={{width:"10%",float:"left",height:"auto",marginTop:"5px"}}>
                <h5 style={{}}>{blocks3.height}</h5>
            </div>
            <div style={{width:"17%",float:"left",height:"auto",marginTop:"5px"}}>
                <h5 style={{}}>{time3}</h5>
            </div>
            <div style={{width:"73%",float:"left",height:"auto",textOverflow:"ellipsis",marginTop:"5px"}}>
                <h5 style={{textAlign:"left", width:"100%",overflow:"hidden", textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
                    {blocks3.hash}
                </h5>
            </div>
            </Link>
            <Link to={`/block/${blocks4.hash}`} style={{color:"rgb(22,22,22)"}}>
            <div style={{width:"10%",float:"left",height:"auto",marginTop:"5px"}}>
                <h5 style={{}}>{blocks4.height}</h5>
            </div>
            <div style={{width:"17%",float:"left",height:"auto",marginTop:"5px"}}>
                <h5 style={{}}>{time4}</h5>
            </div>
            <div style={{width:"73%",float:"left",height:"auto",textOverflow:"ellipsis",marginTop:"5px"}}>
                <h5 style={{textAlign:"left", width:"100%",overflow:"hidden", textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
                    {blocks4.hash}
                </h5>
            </div>
            </Link>




        </div>
        
         
        </div>
    );
}

export default LatestBlocks;
