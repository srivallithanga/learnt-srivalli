import { useParams } from "react-router-dom";
function Login(props){
    let params=useParams();
    let msg="Login Component";
    console.log(props);
    function doLogin(){
        alert("You are logged in.");
    }
    return (
        <div className="Login">
            <h6>Login URL={props.L_URL}</h6>
            <h6>Login Attempts={props.login_attempts}</h6>
            <button onClick={props.greet}>Greet</button>
            <h1>{params.title}</h1>
            <input type="text" name="username" placeholder="Enter Username"/>
            <input type="password" name="password" placeholder="Enter Password"/>
            <button onClick={doLogin}>Login</button>
        </div>
    )
}

export default Login;