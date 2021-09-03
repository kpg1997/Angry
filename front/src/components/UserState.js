import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Login from '../components/Login';
import { logout } from '../modules/user';


const UserState = () => {

    const user = useSelector(state => state.user);
    const dispatch = useDispatch()
    return (
        <div className="UserState" style={{color:"rgb(22,22,22)", width: "350px",height:"auto",background:"rgb(243,240,237)",borderRadius:"10px", border:"1px solid rgb(66,66,66)", boxShadow:"0px 0px 3px 3px rgb(88,88,88)"}}>
            <div style={{padding:"10px"}}>

                <div style={{width:"100%", height:"70px"}}>
                    <div style={{width:"55%",height:"100%",  float:"left"}}>
                        <h4 style={{textAlign:"center",paddingTop:"10%"}}><strong> {user.nickname}</strong> 님</h4>
                    </div>
                    <div style={{width:"30%",height:"80%",  float:"right"}}>
                        <button onClick={()=>{dispatch(logout())}} style={{ width: "100%",height:"50px",marginTop:"10px", borderRadius:"15px",display:"inline-block", right:"0", background:"rgb(237,69,69)",border:"none",fontSize:"20px",color:"rgb(22,22,22)",fontWeight:'700' }}>로그아웃</button>
                    </div>
                </div>

                <div style={{width:"100%", height:"60px",borderBottom:"1px solid rgb(88,88,88)"}}>
                    <div style={{width:"100%",height:"35%",textAlign:"center"}}>
                        <strong>내 지갑 주소</strong>
                        <b style={{fontSize:"14px"}}>{user.address}</b>
                    </div>
                    <div style={{width:"100%",height:"65%"}}></div>
                </div>
            


                <div style={{width:"100%", height:"50px"}}>
                    <div style={{width:"50%",height:"100%", float:"left",borderRight:"1px solid rgb(88,88,88)",paddingTop:'5px'}}>
                        <div style={{width:"100%",height:"50%", float:"left"}}>
                            <p style={{textAlign:"center"}}>Point</p>    
                        </div>
                        <div style={{width:"100%",height:"50%", float:"left"}}>
                            <p style={{textAlign:"center"}}><strong>{user.point.toLocaleString()}</strong></p>
                        </div>
                    </div>

                    <div style={{ width: "50%", height: "100%", float: "left",paddingTop:'5px' }}>
                        <div style={{ width: "100%", height: "50%", float: "left" }}>
                            <p style={{textAlign:"center"}}>보유 코인 (YAMA)</p>    
                        </div>
                        <div style={{ width: "100%", height: "50%", float: "left" }}> 
                            <p style={{textAlign:"center"}}><strong>{user.have_yama} </strong></p>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default UserState
