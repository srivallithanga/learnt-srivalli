import { Link } from "react-router-dom";
    function TodoItem({
val,
deleteTodo,
index
}){
    return(
        <div>
                    {val.name}<button onClick={function(){
                        deleteTodo(index)
                    }}
                    >Delete</button>
                    <Link to={`${index}`}>View Todo</Link>
    </div>
    );
}

export default TodoItem;