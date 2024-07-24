import { useState } from "react";
function Hobby(){
    // let hobbyInitialValue=["Cook","Gym","Homework","Eat"];
    let [hobbies,sethobbies]=useState([]);
    let [hobbyEntered,setHobbyEntered]=useState("Default Hobby");
    function changeHobbyEntered(e){
        console.log(e);
        console.log(e.target);
        console.log(e.target.value);
        setHobbyEntered(e.target.value);
    }
    function addHobby(){
        let newHobbyArr = [...hobbies, hobbyEntered];
        sethobbies(newHobbyArr);
    }
    function deleteHobby(indexToDelete){
        let newhobbies=hobbies.filter(function(val,index){
            if(indexToDelete==index) return false;
            return true;
        });
        sethobbies(newhobbies);
    }

    function removeAllHobbies(){
        let newRemoveHobbyArr = [...hobbies];
        sethobbies(newRemoveHobbyArr=[]);
    }
    return (
        <div className="hobby">
            <input type="text" name="Hobbyitem" value={hobbyEntered} onChange={changeHobbyEntered}/>
            <button onClick={addHobby}>Add Hobby</button>
            {hobbies.map(function(val,index){
                return <div>
                    {val}&nbsp;&nbsp;<button onClick={function(){
                        deleteHobby(index)
                    }}
                    >Delete</button>
                    </div>
            })}
            <br></br><button onClick={removeAllHobbies}>Remove All</button>
        </div>
    );
}

export default Hobby;