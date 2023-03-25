import './App.css';

import {io} from "socket.io-client"
import {useEffect, useState,useRef} from 'react'
import {useNavigate} from "react-router-dom"

const socket = io.connect('http://localhost:3000');

function Chat({nameProps,roomNumprops,getRoomState}) {

  const [typingMsg,setTypingMsg] = useState("");
  const [msg,setMsg] = useState([]);
  const [name,setname] = useState("");
  const [roomNum,setRoomNum] = useState("");

  const scrollRef = useRef();

  //나가기
  function leave(){
    getRoomState(true);
    socket.emit('leaveRoom');
    console.log('leave');
  }

  //메세지 보냄
  const sendMsg = async()=>{
    console.log('보냄');
    console.log(roomNum)
    await socket.emit("sendMsg",typingMsg,name,roomNumprops);
    setTypingMsg("");
  }

  //엔터시
  const OnKeyPressEnter = (e) =>{
    if(typingMsg!==""){
        if(e.key === 'Enter'){
            console.log('press E')
            sendMsg();
        }
    }
  }

  //렌더링시 
  useEffect(()=>{

    socket.on('sendBackCasting',(msgData)=>{
      console.log('hey')
      const msgJson = JSON.parse(msgData);
      setMsg((list)=>[...list,msgJson]);
      console.log('받음')
    })
    console.log('안녕');
    console.log(roomNumprops)
    setname(nameProps);
    setRoomNum(roomNumprops);
  },[socket]);
  
  return (
    <div className="msger">
      <div className="msger-header">

        <div className ="msger-header-title">
          CHAT
        </div>

        <button 
            className="msger-button"
            onClick={leave}
            >leave</button>
      </div>

      <div className="msger-chat">
        <div className ="chatBox">
            {msg.map((msgM)=>{
              return (
                <div className="msg left-msg" key ={msgM.key}>
                  <div className="msg-bubble">
                    <div className="msg-text" ref ={scrollRef} >
                      {msgM.msg}
                    </div>
                  </div>
              </div>
              )
            })}
        </div>
      </div>

      <div className="msger-inputarea">

      <input 
      type="text" 
      className="msger-input" 
      value={typingMsg}
      onKeyDown ={OnKeyPressEnter}
      onChange={(e)=>{
        setTypingMsg(e.target.value)
      }}
      />

      <button 
      className="msger-send-btn" onClick={sendMsg}>Send</button>
      </div>
    </div>
  );
}

export default Chat;
