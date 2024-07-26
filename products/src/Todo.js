import { useState, useEffect } from "react";
import axios from "axios";
import TodoForms from "./TodoForms";
import TodoList from "./TodoList";
function Todo(){
    let todoInitialValue=[{name:"Default name",status:"default status"}];
    let [todos,setTodos]=useState(todoInitialValue);
    let [todoEntered,setTodoEntered]=useState("Default todo");
    let [statusEntered,setStatusEntered]=useState("Default status");
    useEffect(function(){
        console.log("function is called on load");
        getTodos();
    },[]);
    function changeTodoEntered(e){
        console.log(e);
        console.log(e.target);
        console.log(e.target.value);
        setTodoEntered(e.target.value);
    }

    function getTodos(){
        axios
        .get("/todos")
            .then(function (response){
                console.log(response.data);
                setTodos(response.data);
            })
            .catch(function (error){
                console.log(error);
            });
    }
    function addTodo(){
        let newTodoObj = {name:todoEntered,status:statusEntered};
        console.log(newTodoObj);
        axios
        .post("/todos",newTodoObj)
        .then(function(response){
            console.log(response);
            if(response.data.status==1){
                getTodos();
            }
        })
        .catch(function(error){
            console.log(error);
        })
    }
    function deleteTodo(indexToDelete){
        axios
        .delete(`/todos/${indexToDelete}`)
        .then(function (response){
            console.log(response);
            getTodos();
        })
        .catch(function(error){
            console.log(error);
        })
    }
    return (
        <div>
            <TodoForms
            todoEntered={todoEntered}
            changeTodoEntered={changeTodoEntered}
            setStatusEntered={setStatusEntered}
            addTodo={addTodo}
            />
            <TodoList
            todos={todos}
            deleteTodo={deleteTodo}
            />
        </div>
    );
}

export default Todo;