import TodoItem from "./TodoItem";

function TodoList({
todos,
deleteTodo
}){
    return (
        <>
        {todos.map(function(val,index){
                return <TodoItem
                val={val} deleteTodo={deleteTodo} index={index}
                />
            })}
        </>
    );
}

export default TodoList;