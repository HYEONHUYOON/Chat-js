import './App.css';
import {useEffect, useState} from 'react'
import {json, useNavigate} from "react-router-dom"
import {io} from 'socket.io-client'

import Chat from './chat';
import RoomSetting from './roomSetting';

const socket = io.connect('http://localhost:3000')

function ChatList({idprops}) {

    const navigate = useNavigate();

    const [id,setId] = useState("");
    const [name,setname] = useState("");
    const [roomNum,setroomNum] = useState("");        
    const [chatRoom,setChatRoom] = useState([]);
    const [enterState,setenterState] = useState(true);
    const [enterSetting,setSettingState] = useState(false);
    const [settingRoomName,setSettingRoomName] = useState("");
  
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

    //채팅창 입장
    const settingRoom = (state,idKey)=>{
      console.log('Setting');
      setSettingRoomName(idKey);
      settingRoomState(state);
    }

    //페이지 상태
    const settingRoomState = (e)=>{
      setSettingState(e);
    }

    //렌더링시 한번
    useEffect(()=>{
        setId(idprops)
        reqRoom();
    },[])

    //설정시
    useEffect(()=>{
      reqRoom();
  },[enterSetting])

  if(!enterSetting){
  return (
    <div className="app">{enterState ? (
      <div className='msger'>
        <div>
        <div className='menuBatch'>Chat Room</div>
        <div>
        <input 
                className='inputData'
                type={'text'}
                placeholder={'Name'}
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
          {
          chatRoom.map((m)=>{
            if(m.roomMaker === id){
              return(
              <div className='viewChattingRoom' key = {m._id}>
                <div className='viewChattingRoom'>
                <p>Chat Room</p>
                <p>&#91; {m.roomName} &#93;</p>
                <button className='button' onClick={()=>enterRoom(m._id)}>Enter</button>  
                <button className='buttonSetting' onClick={()=>settingRoom(true,m._id)}>Setting</button>  
                </div>
              </div>
              )
            }else{
            return(
              <div className='viewChattingRoom' key = {m._id}>
                <div className='viewChattingRoom'>
                <p>Chat Room</p>
                <p>&#91; {m.roomName} &#93;</p>
                <button className='button' onClick={()=>enterRoom(m._id)}>Enter</button>  
                </div>
              </div>
            )}
          }
          )}
          </div>  
        </div>
      </div>) : (<Chat nameProps={name} roomNumprops ={roomNum} getRoomState={getRoomState} socket = {socket}/>)}
    </div>
  );
        }else{
          return(
            <RoomSetting settingRoomState={settingRoomState} room_id ={settingRoomName}/>
          )
        }
}

export default ChatList;
