import React from 'react';

function List({ onBTC, onETH, onYAMA }) {
    return (
        <div style={{width:"100%",height:"auto"}}>
            <button style={{width:"100px",background:"rgb(75,102,146)",border:"none", color:"rgb(243,240,237)", height:"50px",borderRadius:"10px 10px 0px 0px",fontSize:"20px",fontWeight:"600"}} onClick={onYAMA}>야마코인</button>
            <button style={{width:"100px",background:"rgb(75,102,146)",border:"none", color:"rgb(243,240,237)", height:"50px",borderRadius:"10px 10px 0px 0px",marginLeft:"1%",fontSize:"20px",fontWeight:"600"}} onClick={onBTC}>비트코인</button>
            <button style={{width:"100px",background:"rgb(75,102,146)",border:"none", color:"rgb(243,240,237)", height:"50px",borderRadius:"10px 10px 0px 0px",marginLeft:"1%",fontSize:"20px",fontWeight:"600"}} onClick={onETH}>이더리움</button>

        </div>
    );
}

export default List;
