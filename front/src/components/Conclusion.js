import React from 'react';
import Moment from 'react-moment';
import "./scrollbar.css"

function conclusion({ conclusion }) {
    return (
        <div style={{width:"33%", float:"right",marginTop:"-400px",height:"400px", background:"rgb(243,240,237)",borderRadius:"15px",padding:"15px",}}>
            
            <div className="scrollbar">
                {conclusion == undefined ? <div>로딩중...</div> : <div>{conclusion
                    .slice(0)
                    .reverse()
                    .map((x) => {
                        return (
                            <div style={{background:"rgb(231,228,225)",padding:"5px",borderRadius:"5px", marginTop:"3px"}}>
                              <h6><b>체결가격:{x.price} | 체결량:{x.amount} | 체결금액:{x.sum} </b></h6>   
                              <h6>체결시간:<Moment format="YYYY-MM-DD HH:mm:ss">{x.date}</Moment> </h6>
                            </div>
                        );
                    })}</div>}</div>
        </div>
    );
}

export default conclusion;
