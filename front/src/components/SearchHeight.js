import React, { useState, useEffect } from 'react';
import { Link, useHistory, withRouter } from "react-router-dom";
import axios from 'axios';


function SearchHeight() {
    let history =  useHistory()
    const [index, setIndex] = useState("");
    const [hash, setHash] = useState("");

    const onHeighthandler = (e) =>{
        setIndex(e.target.value);
        setHash(e.target.value);
        console.log("바껴",index);
    }

    const onSubmit = async (e) => {
        let body = {
            index : index,
        }
        if(index.length==64){
            history.push(`/block/${index}`)
        }else{
            axios.post("/api/getblockhash_result",(body)).then((res)=>{
                history.push(`/block/${res.data.result}`)
            })
        }
    };


    return (
        <>
        <div>
            <div style={{width:"350px",height:"auto",background:"rgb(243,240,237)",padding:"10px",borderRadius:"15px",marginTop:"30px",border:"1px solid rgb(66,66,66)", boxShadow:"0px 0px 3px 3px rgb(88,88,88)"}}>
                <h4 style={{textAlign:"center"}}><b>블록 검색</b></h4>
            <div>
            <input type="text" placeholder="Hash or Height를 입력하세요" onChange={onHeighthandler}
            style={{width:"68%",height:"40px",marginTop:"5px"}}/>
            <button style={{width:"30%",height:"40px",marginLeft:"2%",background:"rgb(180,180,180)"}} onClick={onSubmit}>검색</button>
            </div>
            </div>
        </div>
        </>
    );
}

export default SearchHeight;
