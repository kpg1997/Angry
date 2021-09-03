import React, { useState } from 'react'
import Navbar from '../containers/Navbar'
import UserBox from '../containers/UserBox'

import Yamainfo from '../containers/Yamainfo'
const Main = () => {
    


    return (
        <div style={{backgroundColor:"rgba(22,22,22)", height:"100vh", width:"100%"}}>
            <Navbar/>
           <div style={{width:"95%", display:"inline"}}>
            <Yamainfo/>

            {/* <div style={{width:"25%",height:"50%",background:"none",display:"inline-block",marginLeft:"5%",position:"absolute",left:"10%",top:"20%"}}><LatestBlocks/></div>
            <div style={{width:"25%",height:"50%",background:"none",display:"inline-block",marginLeft:"5%",position:"absolute",left:"40%",top:"20%"}}><Transactions/></div> */}
            </div>
            <div style={{width:"20%",height:"30%",background:"none",display:"inline-block",marginLeft:"5%", top:"15%",position:"absolute",right:"0%" }}><UserBox/></div>
           
           </div>
        
    )
}

export default Main
