import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './Pages/login.js';
import Register from './Pages/register'; 
import Dashboard from './Pages/dashboard'; 

const App = () => {
    return(
        <BrowserRouter>
        <Routes>
            <Route path='login' exact element = {<Login/>}/>
            <Route path='register' exact element = {<Register/>}/>
            <Route path='dashboard' exact element = {<Dashboard/>}/>
        </Routes>
        </BrowserRouter>
    )
} 

export default App;