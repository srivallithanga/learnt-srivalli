import logo from './logo.svg';
import './App.css';
import Menu from './Menu';
import Login from './Login';
import Footer from './Footer';
import Container from './Container';
import Counter from './Counter';
import Todo from './Todo';
import Hobby from './Hobby';
import Add from './Add';
import Degree from './Degree';
import Student from './StudentObj';
import Gender from './Gender';
import Fake from './Fake';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Github from './Github';
import TodoDetails from './TodoDetails';
import TodoDetailsEdit from './TodoDetailsEdit';
const LOGIN_URL="https://ascendion.com/login";
let menuData=[
  {title:"Home",path:"/"},
  {title:"About",path:"/about"},
  {title:"Contact",path:"/contact"},
]
let login_attempts=5
let error_msgs={error:"sry",error_500:"server error"};
function greet(){
  alert("hi you are logged in");
}

function App() {
  return (
    <div className="App">
                    <Fake />
       {/* <BrowserRouter>
                <Routes>
                <Route path="/todo" element={<Todo />} />
                <Route path="/todo/:id" element={<TodoDetails />} />
                <Route path="/todo/:id/edit" element={<TodoDetailsEdit />} />
                    
                </Routes>
            </BrowserRouter>  */}
    </div>
          
  );
}

export default App;
