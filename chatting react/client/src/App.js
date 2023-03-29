import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import { useState } from 'react';

import Home from './home';
import Chat from './chat';
import Signin from './signin';
import ChatList from './chatlist';
import MakeRoom from './makeroom';

function App(props) {

  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element ={<Home/>}/>
        <Route path='/Signin' element = {<Signin/>}/>
        <Route path='/chatlist' element = {<ChatList/>}/>
        <Route path='/makeroom' element = {<MakeRoom/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
