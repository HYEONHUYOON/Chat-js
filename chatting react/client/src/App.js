import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import { useState } from 'react';

import Home from './home';
import Chat from './chat';
import Signin from './signin';
import ChatList from './chatlist';
import MakeRoom from './makeroom';

function App(props) {

  const [id,setId] = useState("");

  const setIdFunc = (recevieId) =>{
      setId(recevieId);
  }

  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element ={<Home setIdFunc ={setIdFunc}/>}/>
        <Route path='/Signin' element = {<Signin/>}/>
        <Route path='/chatlist' element = {<ChatList idprops ={(id)}/>}/>
        <Route path='/makeroom' element = {<MakeRoom idprops ={(id)}/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
