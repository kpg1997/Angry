import React from 'react'
import Navbar from '../containers/Navbar'
import UserBox from '../containers/UserBox'
import Block from '../components/Block'
const BlockPage = ({match}) => {
    let Hash = match.params;
    return (
        <div style={{backgroundColor:"rgba(22,22,22)", height:"auto", width:"100%",minHeight:"100vh", scrollbarWidth:"none",msOverflowStyle:"none"}}>
            <Navbar/>
           <div style={{width:"95%", display:"inline"}}>
                <div style={{width:"50%",marginLeft:"20%",marginTop:"2%",borderRadius:"15px",padding:"10px", height:"auto", background:"none"}}>
                    <Block Hash={Hash}/>
                </div>


            </div>
            <div style={{width:"20%",height:"30%",background:"none",display:"inline-block",marginLeft:"5%", top:"15%",position:"absolute",right:"5%" }}><UserBox/></div>
           
           </div>   
    )
}

export default BlockPage
