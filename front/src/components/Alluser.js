import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react'
import {CopyToClipboard} from 'react-copy-to-clipboard';
const Alluser = () => {
    const [alluser,setAlluser] = useState([]);

    useEffect(()=>{

        axios.get('/user/alluserinfo').then((res)=>{
            if(res.data.success){
                setAlluser(res.data.user)
            }
            else {
                alert(res.data.message)
            }
        })
        
    },[])
   
    const listUser = alluser.map((a) =>
    <div style={{ width: "100%", height: "50px", background: "rgb(230,230,230)",marginTop:"5px",borderRadius:"10px",paddingTop:"5px"}}>
    <div style={{width:"20%",height:"100%",background:"none",float:"left"}}>
        <h4 style={{textAlign:"center",paddingTop:"5px",fontWeight:"600"}}>{a.nickname}</h4>
    </div>
    <div style={{width:"60%",height:"100%",background:"none",float:"left"}}>
        <h5 style={{textAlign:"start",paddingTop:"5px",paddingLeft:"30px"}}>{a.address}</h5>
        <CopyToClipboard text={a.address}><button style={{float:"right",marginTop:"-40px",background:"rgb(190,190,190)",height:"100%",width:"100px",fontSize:"20px"}}>Copy</button></CopyToClipboard>
    </div>
    <div style={{width:"20%",height:"100%",background:"none",float:"left"}}>
        <h6 style={{textAlign:"end",paddingTop:"5px",fontWeight:"600",paddingRight:"25px"}}>{a.have_yama}</h6>

    </div>
</div>
);

    return (
        <div style={{width:"55%",marginLeft:"20%",background:"white",height:"80%",display:"inherit",
        position:"absolute",top:"15%",padding:"10px 10px 20px 20px ",
        borderRadius:"15px",border:"1px solid rgb(66,66,66)", boxShadow:"0px 0px 3px 3px rgb(88,88,88)" }}>
        <h1 style={{fontWeight:"800",color:"rgb(22,22,22)"}}>YAMA Users Info</h1>
            <div style={{ width: "100%", height: "80%", background: "none", marginTop: "20px",overflow:"auto" }}>
                <div style={{ width: "100%", height: "50px", background: "rgb(180,180,180)"}}>
                    <div style={{width:"20%",height:"100%",background:"none",float:"left"}}>
                        <h3 style={{textAlign:"center",paddingTop:"5px",fontWeight:"600"}}>NickName</h3>
                    </div>
                    <div style={{width:"60%",height:"100%",background:"none",float:"left"}}>
                        <h3 style={{textAlign:"start",paddingTop:"5px",fontWeight:"600",paddingLeft:"10%"}}>Address</h3>
                    </div>
                    <div style={{width:"20%",height:"100%",background:"none",float:"left"}}>
                        <h3 style={{textAlign:"center",paddingTop:"5px",fontWeight:"600"}}>Have Yama</h3>
                    </div>
                </div>
                {listUser}
            </div>
        </div>
    )
}

export default Alluser
