import './App.css';
import Form from './materialui/Form';
import Home from './materialui/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route
  } from "react-router-dom";
import Textfield from './materialui/Textfield';


function App() {
  
return (
  <>
  <Textfield/>
<Router>
<div className="App">
<>
<Routes>
<Route path='/login' element={<Form title="Login" />} />
<Route path='/register' element={<Form title="Register"

/>} />
<Route
path='/home'
element={
<Home />}
/>

</Routes>
</>
</div>
</Router>
</>
);
}

export default App;
