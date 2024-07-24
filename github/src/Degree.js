import { useState } from "react";
function Degree(){
    let [degreeValue,setDegreeValue]=useState(0);
    function changeDegreeValue(e){
        setDegreeValue(e.target.value);
    }

    let [res,setRes]=useState(0);
    function sinFunc(degree){
        setRes(Math.sin(degreeValue).toFixed(2));
    }
    function cosFunc(degree){
        setRes(Math.cos(degreeValue).toFixed(2));
    }
    function tanFunc(degree){
        setRes(Math.tan(degreeValue).toFixed(2));
    }
    return (
        <div className="degree">
            <input type="text" name="degreeNum" placeholder="Enter Degree" onChange={changeDegreeValue}/><br></br>
            <button onClick={sinFunc}>Sin</button>&nbsp;&nbsp;
            <button onClick={cosFunc}>Cos</button>&nbsp;&nbsp;
            <button onClick={tanFunc}>Tan</button>
            <h1>{res}</h1>
        </div>
    )
}

export default Degree;