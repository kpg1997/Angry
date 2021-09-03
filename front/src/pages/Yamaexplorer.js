import React, { useState } from 'react'
import Navbar from '../containers/Navbar'
import UserBox from '../containers/UserBox'
import YamainfoCom from '../components/YamainfoCom'

const Yamaexplorer = () => {
    


    return (
        <div style={{backgroundColor:"rgba(22,22,22)", height:"1500px", width:"100%", minHeight:"100vh"}}>
            <Navbar/>
            <div style={{width:"50%",marginLeft:"20%",marginTop:"2%",borderRadius:"15px",padding:"10px", height:"auto", background:"none"}}> 
            <YamainfoCom/>
            </div>
            <div style={{width:"20%",height:"30%",background:"none",display:"inline-block",marginLeft:"5%", top:"15%",position:"absolute",right:"0%" }}><UserBox/></div>
           
           </div>
        
    )
}

export default Yamaexplorer
