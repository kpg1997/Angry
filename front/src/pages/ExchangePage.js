import React, { useState } from 'react'
import Navbar from '../containers/Navbar'
import UserBox from '../containers/UserBox'
import Exchange from '../containers/Exchange';

const ExchangePage = () => {
    


    return (
        <div style={{backgroundColor:"rgba(22,22,22)", height:"145vh", width:"100%", minHeight:"100vh"}}>
            <Navbar/>
           <div style={{width:"95%", display:"inline"}}>
            <Exchange/>

            {/* <div style={{width:"25%",height:"50%",background:"none",display:"inline-block",marginLeft:"5%",position:"absolute",left:"10%",top:"20%"}}><LatestBlocks/></div>
            <div style={{width:"25%",height:"50%",background:"none",display:"inline-block",marginLeft:"5%",position:"absolute",left:"40%",top:"20%"}}><Transactions/></div> */}
            </div>
            <div style={{width:"20%",height:"30%",background:"none",display:"inline-block",marginLeft:"5%", top:"15%",position:"absolute",right:"0%" }}><UserBox/></div>
           
           </div>
        
    )
}

export default ExchangePage;