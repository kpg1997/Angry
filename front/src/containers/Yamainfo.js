import React from 'react'
import LatestBlocks from '../components/LatestBlocks'
import Transactions from '../components/Transactions'
const Yamainfo = () => {
    return (
            <div style={{width:"55%",marginLeft:"20%",background:"white",height:"750px",display:"inline-block",
                          position:"absolute",top:"15%",padding:"10px 10px 20px 20px ",
                          borderRadius:"15px",border:"1px solid rgb(66,66,66)", boxShadow:"0px 0px 3px 3px rgb(88,88,88)" }}>
                <h1 style={{fontWeight:"800",color:"rgb(22,22,22)"}}>YAMA COIN Info</h1>

                <div style={{width:"100%",borderRadius:"10px", height:"42%", top:"2.5%", display:"inline",float:"left", background:"rgb(238,235,232)",position:"relative"}}><LatestBlocks/></div>
                <div style={{width:"100%",borderRadius:"10px", height:"45%",marginBottom:"10px", marginTop:"30px", display:"inline",
                 float:"right", background:"rgb(238,235,232)",position:"relative"}}><Transactions/></div>





            </div>

    )
}

export default Yamainfo
