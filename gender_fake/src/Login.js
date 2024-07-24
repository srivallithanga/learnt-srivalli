import { useParams } from "react-router-dom";
function Login(){
    let params=useParams();
    let msg="Login Component";
    function doLogin(){
        alert("You are logged in.");
    }
    return (
        <div className="Login">
            <h1>{params.title}</h1>
            <input type="text" name="username" placeholder="Enter Username"/>
            <input type="password" name="password" placeholder="Enter Password"/>
            <button onClick={doLogin}>Login</button>
        </div>
    )
}

export default Login;