import { useState } from "react";
function Counter(){
    let [stateCount,setStateCount]=useState(0);
    function increase(){
        setStateCount(stateCount+1);
    }
    function decrease(){
        setStateCount(stateCount-1);
    }
    function resetCount(){
        // alert(count);
        setStateCount(0);
    }
    return (
        <div>
            <h1>{stateCount}</h1>
            <button onClick={increase}>Increase</button>
            <button onClick={decrease}>Decrease</button>
            <button onClick={resetCount}>Reset Count</button>
        </div>
    )
}

export default Counter;