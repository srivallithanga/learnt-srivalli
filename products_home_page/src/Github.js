import { useState } from "react";
import axios from "axios";

function Github() {
    let [name, setName] = useState("");
    let [genderData, setGenderData] = useState(null);

    function changeGenderName(e) {
        setName(e.target.value);
    }

    function showGender() {
        let url = `https://api.github.com/users/${name}`;
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
            <button onClick={showGender} className="show-button">Show</button>
            {genderData && (
                <div className="product-card">
                    <p><b>Id:</b> {genderData.id}</p>
                    <p><b>Avatar:</b> <img src={genderData.avatar_url} className="product-image" /></p>
                </div>
            )}
        </div>
    );
}

export default Github;
