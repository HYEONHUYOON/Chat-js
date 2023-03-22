import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {BrowserRouter,Routes,Route} from 'react-router-dom'

//Chat 컴포넌트
import Chat from './chat';
import Home from './home';

function App() {

  return (
    <div className="App">
        <BrowserRouter>
        <Routes>
          <Route path='/home' element ={<Home/>}/>
          <Route path='/chat' element ={<Chat/>}/>
        </Routes>
        </BrowserRouter>      
    </div>
  );
}

export default App;
