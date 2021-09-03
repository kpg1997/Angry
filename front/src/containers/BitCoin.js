import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getsaga, getchart } from '../modules/chart';
// import '../styles/grid.css';
import Chart from 'kaktana-react-lightweight-charts';

function BitCoin() {
    const dispatch = useDispatch();

    const gogo = useSelector((state) => state.chart.gogo);
    const charting = useSelector((state) => state.chart.dataing);

    useEffect(() => {
        dispatch(getchart());
        dispatch(getsaga());
    }, [getsaga, getchart]);

    const data = useSelector((state) => state.chart.data);

    const state = {
        options: {
        
            layout: {
                backgroundColor: '#253248',
                textColor: 'rgba(255, 255, 255, 0.9)',
            },
            grid: {
                vertLines: {
                    color: '#334158',
                },
                horzLines: {
                    color: '#334158',
                },
            },

            priceScale: {
                borderColor: '#485c7b',
            },
            timeScale: {
                fixLeftEdge: true,
                visible: true,
                borderColor: '#485c7b',
                timeVisible: true,
                secondsVisible: false,
            },
        },
        candlestickSeries: [
            {
                options: {
                    upColor: '#FF6347',
                    downColor: '#6495ED',
                    borderVisible: false,
                    wickVisible: true,
                    borderColor: '#000000',
                    wickColor: '#737375',
                    borderUpColor: '#4682B4',
                    borderDownColor: '#A52A2A',
                    wickUpColor: '#4682B4',
                    wickDownColor: '#A52A2A',
                },
                data: data,
            },
        ],
    };

    return (
        <div style={{ width: "100%", background: "none",height:"90%" }}>

            <div>
                <Chart options={state.options} candlestickSeries={state.candlestickSeries} autoWidth height={320} />
            </div>
            <div style={{ width: "35%", background: "rgb(243,240,237)", float: "left", marginTop: "20px", borderRadius:"15px",padding:"10px",boxShadow:"0 0 3px 3px rgb(180,180,180)",marginLeft:"3px" }}>
                <div style={{ width: "100%", background: "none" }}>

                <div style={{width:"100%",float:"left",borderBottom:"1px solid rgb(200,200,200)"}}><h2><b>비트코인</b></h2></div>
                    <div style={{ width: "30%", float: "left",marginTop:"15px"}}><h3><b>현재가</b></h3></div>
                    <div style={{ width: "70%", float: "left",marginTop:"15px" }}><h3><b>{charting[0]}</b></h3></div>
                </div>

                {charting[1] == 'RISE' ? (
                    <div style={{ widthL: "100%", background: "none" }}>

                        <div style={{ width: "30%", float: "left",marginTop:"15px" }}><h3><b>전일대비</b></h3></div>
                        <div style={{ width: "70%", float: "left",marginTop:"15px" }}><h3><b>{charting[3]}% ▲ {charting[2]}</b></h3></div></div>
                ) : (
                    <div>
                        <div style={{ width: "30%", float: "left",marginTop:"15px" }}><h4><b>전일대비</b></h4></div>
                        <div style={{ width: "70%", float: "left",marginTop:"15px" }}><h5><b>{charting[3]}% ▼ {charting[2]}</b></h5></div>
                    </div>
                )}

            </div>

                <div style={{ width: "35%", background: "rgb(243,240,237)", float: "right", marginTop: "30px" , height:"auto",padding:"15px",borderRadius:"15px",boxShadow:"0px 0px 3px 3px rgb(180,180,180)",border:"2px solid rgb(180,180,180)"}}>

                    <div>
                        {gogo[0]
                            .slice(0)
                            .reverse()
                            .map((x) => {
                                return (
                                    <div>
                                    <div style={{width:"30%",float:"left",background:"none",height:"35px",textAlign:"start",color:"rgb(255,35,67)"}}><h6><b>{x.ask_size}</b></h6></div>
                                    <div style={{width:"40%",float:"left",background:"",height:"35px", textAlign:"center",color:"rgb(255,35,67)"}}><h5><b>{x.ask_price}</b></h5></div>
                                    <div style={{width:"30%",float:"left",background:"",height:"35px"}}></div>
                                    </div>
                                    // <div>
                                    //     <div>
                                    //         {x.ask_size}---매도:
                                    //     </div>
                                    // </div>
                                );
                            })}
                        <div style={{width:"100%",border:"1px solid rgb(200,200,200)",height:"1px",float:"left"}}/>
                        {gogo[0]
                            .slice(0)
                            .reverse()
                            .map((x) => {
                                return (
                                    <div>
                                    <div style={{width:"30%",float:"left",background:"",height:"35px",textAlign:"start",color:"rgb(255,35,67)"}}></div>
                                    <div style={{width:"40%",float:"left",background:"",height:"35px", textAlign:"center",color:"rgb(23,99,182)"}}><h5><b>{x.bid_price}</b></h5></div>
                                    <div style={{width:"30%",float:"left",background:"",height:"35px",color:"rgb(23,99,182)",textAlign:"end"}}><h5><b>{x.bid_size}</b></h5></div>
                                    </div>
                                    // <div>
                                    //     <div style={{ marginLeft: 104 }}>
                                    //         매수:{x.bid_price}---
                                    //         {x.bid_size}
                                    //     </div>
                                    // </div>
                                );
                            })}
                            <div style={{width:"100%",border:"1px solid rgb(200,200,200)",height:"1px",float:"left"}}/>
                        <div style={{paddingTop:"5px"}}>
                            
 
                                <div style={{width:"100%",float:"left",background:"",height:"35px", textAlign:"center",color:"rgb(22,22,22)"}}><h5><b>수량</b></h5></div>
                                
                                <div style={{width:"50%",float:"left",background:"",height:"35px",color:"rgb(255,35,67)",textAlign:"center"}}><h5><b>{gogo[1]}</b></h5></div>
                                <div style={{width:"50%",float:"left",background:"",height:"35px",color:"rgb(23,99,182)",textAlign:"center"}}><h5><b>{gogo[2]}</b></h5></div>
                            
                        </div>
                    </div>
                </div>
            </div>
        
    );
}

export default BitCoin;
