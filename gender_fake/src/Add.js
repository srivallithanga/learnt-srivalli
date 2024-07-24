import { useState } from "react";
function Add(){
    let [firstNum,setFirstNum]=useState(0);
    let [secondNum,setSecondNum]=useState(0);
    function changeFirstNum(e){
        setFirstNum(e.target.value);
    }
    function changeSecondNum(e){
        setSecondNum(e.target.value);
    }
    let [addNum,setAddNum]=useState(0);
    function addNumbers(){
        let total=Number(firstNum)+Number(secondNum)
        setAddNum(total);
    }
    return (
        <div className="add">
            <input type="number" name="first" placeholder="Enter first Number" onChange={changeFirstNum}/><br></br>
            <input type="number" name="second" placeholder="Enter second Number" onChange={changeSecondNum}/><br></br>
            <button onClick={addNumbers}>Add</button>
            <h1>{addNum}</h1>
        </div>
    )
}
export default Add;