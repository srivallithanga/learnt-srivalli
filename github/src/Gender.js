import { useState } from "react";
import axios from "axios";

function Gender() {
    let [name, setName] = useState("");
    let [genderData, setGenderData] = useState(null);

    function changeGenderName(e) {
        setName(e.target.value);
    }

    function showGender() {
        let url = `https://api.genderize.io/?name=${name}`;
        axios
            .get(url)
            .then(function (response) {
                console.log(response.data);
                setGenderData(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <div className="gender-container">
            <input type="text" name="name" onChange={changeGenderName} value={name} placeholder="Enter a name" className="input-field"/>
            <button onClick={showGender} className="show-button">Show Gender</button>
            {genderData && (
                <div className="gender-result">
                    <p><b>Gender:</b> {genderData.gender}</p>
                </div>
            )}
        </div>
    );
}

export default Gender;
