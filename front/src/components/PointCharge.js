import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { putpointcharge, updatepointcharge } from '../modules/pointcharge';

const PointCharge = () => {
    const dispatch = useDispatch();
    const pointcharge = useSelector(state => state.pointcharge);
    const user = useSelector(state => state.user)

    const putpointChargehandler = (e) => {
        dispatch(putpointcharge(e.target.value))
    }

    const pointChargehandler = () => {
        const charge = window.confirm(pointcharge.userpointcharge + "포인트를 충전하시겠습니까?");
        if (charge == true) {
            dispatch(updatepointcharge({ putpointcharge: pointcharge.userpointcharge, usertoken: user.token }))
            
        } else {
            return false;
        }
    }



    return (
        <div>
            <div style={{width:"350px",height:"auto",background:"rgb(243,240,237)",padding:"10px",borderRadius:"15px",marginTop:"30px",border:"1px solid rgb(66,66,66)", boxShadow:"0px 0px 3px 3px rgb(88,88,88)"}}>
                <h4 style={{textAlign:"center"}}><b>포인트 충전</b></h4>
            <div>
            <input type="number" placeholder="Hash or Height를 입력하세요" onChange={putpointChargehandler} value={pointcharge.userpointcharge}
            style={{width:"68%",height:"40px",marginTop:"5px"}}/>
            <button style={{width:"30%",height:"40px",marginLeft:"2%",background:"rgb(180,180,180)"}} onClick={pointChargehandler}>충전</button>
            </div>
            </div>
        </div>
        // <div>
        //     <input type="number" onChange={putpointChargehandler} value={pointcharge.userpointcharge} />
        //     <button onClick={pointChargehandler}>포인트 충전</button>
        // </div>
    )
}

export default PointCharge
