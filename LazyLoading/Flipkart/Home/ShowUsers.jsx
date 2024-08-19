import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ShowUsers() {
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    function displayCategory() {
        const url = "http://localhost:3000/api/v1/users";
        axios.get(url)
            .then((response) => {
                setData(response.data.users);
            })
            .catch((error) => {
                alert("Server is not responding. Please try again later.");
                console.error(error);
            });
    }

    function viewUserDetails(userId) {
        navigate(`/users/${userId}`);
    }

    return (
        <div className='container'>
            <h1>Show Users</h1>
            <button className ='btn' onClick={displayCategory}>Load Users</button>
            <div className='user-list'>
                {data.map((user) => (
                    <div className='user-card' key={user._id} onClick={() => viewUserDetails(user._id)}>
                        <p><b>Name:</b> {user.displayName}</p>
                        <p><b>Email:</b> {user.email}</p>
                        <p><b>Username:</b> {user.username}</p>
                        <p><b>Status:</b> {user.status ? 'True' : 'False'}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ShowUsers;