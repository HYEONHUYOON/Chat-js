import './App.css';
import {useEffect, useState} from 'react'
import {json, useNavigate} from "react-router-dom"
import {io} from 'socket.io-client'

import Chat from './chat';

const socket = io.connect('http://localhost:3000')

function ChatList() {

    const navigate = useNavigate();

    const [name,setname] = useState("");
    const [roomNum,setroomNum] = useState("");        
    const [chatRoom,setChatRoom] = useState([]);
    const [enterState,setenterState] = useState(true);
  
    //방 생성 이동
    const makeroom=()=>{
        navigate('/makeroom')
    }

    //방 상태 받을 함수
    const getRoomState = (e) =>{
      setenterState(e);
      console.log(e);
    }

    //방 데이터 요청
    async function reqRoom(){
        let res = await fetch('http://localhost:3000/reqroom',{
          dataType: 'application/json'
        })
        .then((res) => {return res.json();})
        .then((json)=>{
            setChatRoom(json)   
        })
    }

    //방입장 
    const enterRoom = (num)=>{
      if(name!==""){
        setroomNum(num);
        setenterState(false);
        socket.emit('joinRoom',num,name);
        console.log(`enter ${roomNum}`)
      }
      else{
        alert('Please enter your name')
      }
    }

    //렌더링시 한번
    useEffect(()=>{
        reqRoom();
    },[])

  return (
    <div className="app">{enterState ? (
      <div className='msger'>
        <div>
        <div className='menuBatch'>Chat Room</div>
        <div>
        <input 
                className='inputData'
                type={'text'}
                placeholder={'NAME'}
                value = {name}
                onChange = {(e)=>{
                    setname(e.target.value); 
                }}
            />
        </div>
        
        <div>
          <button className='makeroombutton' onClick={makeroom}>Make Room</button>    
        </div>
        <div className='menuBatch'>
          {chatRoom.map((m)=>{
            if(m.roomNum !==0)
            return(
              <div className='viewChattingRoom' key = {m.roomNum}>
                <div className='viewChattingRoom'>
                <p>&#91; {m.roomNum} Room &#93;</p>
                <p>{m.roomName}</p>
                <button className='button' onClick={()=>enterRoom(m.roomNum)}>Enter</button>  
                </div>
              </div>
            )
          })}
          </div>  
        </div>
      </div>) : (<Chat nameProps={name} roomNumprops ={roomNum} getRoomState={getRoomState} socket = {socket}/>)}
    </div>
  );
}

export default ChatList;
