import './App.css';

import {useEffect, useState,useRef} from 'react'
import {useNavigate} from "react-router-dom"
import {io} from 'socket.io-client'

function Chat({nameProps,roomNumprops,getRoomState,socket}) {

  //날짜계산
  const today = new Date();

  const [typingMsg,setTypingMsg] = useState("");
  const [msg,setMsg] = useState([]);
  const [name,setname] = useState("");
  const [roomNum,setRoomNum] = useState("");

  const scrollRef = useRef();

  let a = 0;

  let msgData={
    key : "",
    msg : "",
    time : "",
}
  
  //나가기
  function leave(){
    getRoomState(true);
    socket.emit('leaveRoom');
    console.log('leave');
  }

  //메세지 보냄
  const sendMsg = async()=>{
    if(typingMsg!==""){

      let hours = ('0' + today.getHours()).slice(-2); 
      let minutes = ('0' + today.getMinutes()).slice(-2);
      const time = hours.toString() + " : " + minutes.toString();

      msgData.msg = typingMsg;
      msgData.time = time;
      msgData.key = name;

      const msgDatajson = JSON.stringify(msgData);

    await socket.emit("sendMsg",msgDatajson,roomNum);

    setMsg((list)=>[...list,msgData]);

    setTypingMsg("");
    }
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

  useEffect(()=>{
    console.log("정보")
    setname(nameProps);
    setRoomNum(roomNumprops);
  },[])

  //소켓이 update 될 때마다
  useEffect(()=>{
    socket.on('sendBackCasting',function(msgDatajson){   
      const msgJson = JSON.parse(msgDatajson);
      setMsg((list)=>[...list,msgJson]);
    })
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
              if(msgM.key === name){
                return(
                  <div className="msg right-msg" key ={msgM.key}>

                  <div className="msg-bubble">

                    <div className="msg-text" ref ={scrollRef} >
                      {msgM.msg}
                    </div>

                    <div className='msg-info'>

                    <div className="msg-info-name" ref ={scrollRef}> 
                      {msgM.key}
                    </div>
                    <div className="msg-info-time" ref ={scrollRef} >
                      {msgM.time}
                    </div>
                    </div>
                  </div>
              </div>
                )
              }else{
              return (
                <div className="msg left-msg" key ={msgM.key}>

                  <div className="msg-bubble">

                    <div className="msg-text" ref ={scrollRef} >
                      {msgM.msg}
                    </div>

                    <div className='msg-info'>

                    <div className="msg-info-name" ref ={scrollRef}> 
                      {msgM.key}
                    </div>
                    <div className="msg-info-time" ref ={scrollRef} >
                      {msgM.time}
                    </div>
                    </div>
                  </div>
              </div>
              )
              }
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
