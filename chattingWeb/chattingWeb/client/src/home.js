import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Home() {
    
    const navigate = useNavigate();

    const [id,setEmail] = useState("");
    const [roomNum,setRoomNum] = useState("");

    const userData ={
      'id' : id,
      'roomNum' : roomNum
    }

    //post 
    const fetchUserData = () =>{
        fetch("http://localhost:3000/home",{
            method : 'POST',
            mode : 'cors',
            headers:{
            'Content-Type': 'application/json'
            },
            body:JSON.stringify(userData)
        })
        .then(function(){
          console.log(`Enter ChatRoom - ${roomNum}`)
          navigate(`/chat`) 
        })
        .catch((res)=>
        console.log('faile'))
      } 
    
  
    //로그인 함수
    const Login =()=>{
      if(id!==""&&roomNum!==""){
      console.log('requset Login');
      fetchUserData();
    }
    }
  
    return (
      <div className="App">
        <div className ='App-header'>
              <div>
              <p>CHAT</p>
  
                <input type={'text'} placeholder={'ID'} onChange={(e)=>{
                setEmail(e.target.value);
                }}/>
              
               <input type={'text'} placeholder={'Room Number'} onChange={(e)=>{
                setRoomNum(e.target.value);
                }}/>
        
                <button onClick={Login}>Login</button>
                </div>
              <div>
          </div>
        </div>   
      </div>
    );
  }
  
  export default Home;