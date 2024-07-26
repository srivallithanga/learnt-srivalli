import { useParams } from "react-router-dom";
import { useEffect,useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function TodoDetails(){
    const [todoData,setTodoData]=useState({});
    const {id} =useParams();
    useEffect(function (){
        axios.get(`/todos/${id}`).then(function(response){
            setTodoData(response.data);
        });
    },[]);

    return (
        <div>
            <div>Title:{todoData.name}</div>
            <div>Status:{todoData.status}</div>
            <div>Todo Id:{todoData.id}</div>
            <Link to="edit">Edit todo</Link>
        </div>
    );
}

export default TodoDetails;