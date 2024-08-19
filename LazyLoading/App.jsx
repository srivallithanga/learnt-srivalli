// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
// import Login from './Login';
// import Dashboard from './Dashboard'; 
// import Logout from './Logout';
// import './App.css';
// import JwtDecode from './JwtDecode';

// function App() {
//     return (
//         <div className="app-container">
//           <BrowserRouter>
//           <Logout />
//             <Routes>
//                 <Route path="/" element={<JwtDecode />} />
//                 <Route path="/dashboard" element={<Dashboard />} />
//             </Routes>
//           </BrowserRouter>
//         </div>
//     );
// }

// export default App;


// import './App.css';
// import { BrowserRouter, Routes, Route} from 'react-router-dom';
// import Navbar from './Navbar';
// import AddProducts from './AddProducts'
// import ShowProducts from './ShowProducts'
// import ProductDetails from './ProductDetails'
// import AddCategory from '../AddCategory';
// import LazyHome from './LazyHome';
// // import Login from './Login';
// function App() {
//   return (  
//     <>
//     <BrowserRouter>
//         {/* <Navbar /> */}
//         <Routes>
//           <Route path='/' element={<AddProducts />}/>
//           <Route path="/products" element={<ShowProducts />} />
//         <Route path="/products/:id" element={<ShowProducts />} />
//         <Route path='/category' element={<AddCategory />}/>
        
//         </Routes>
//     </BrowserRouter>
//     {/* <Login/> */}
//     </>
//   );
// }
// export default App;

import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Flipkart/Navbar';
import { Container } from '@mui/material';

import ShowProducts from './Flipkart/Home/ShowProducts';
import ShowUsers from './Flipkart/Home/ShowUsers';

const AddProducts = lazy(() => import('./Flipkart/Admin/AddProducts'));
const AddUsers = lazy(() => import('./Flipkart/Admin/AddUsers'));


function App() {
  return (
    <Router>
      <Navbar />
      <Container>
        <Suspense fallback={<div>Loading admin components...</div>}>
          <Routes>
            <Route path="/admin" element={<div>Admin Dashboard</div>} />
            <Route path="/admin/addproducts" element={<AddProducts />} />
            <Route path="/admin/addusers" element={<AddUsers />} />
          </Routes>
        </Suspense>

        <Routes>
          <Route path="/home" element={<div>Home Dashboard</div>} />
          <Route path="/home/showproducts" element={<ShowProducts />} />
          <Route path="/home/showusers" element={<ShowUsers />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;