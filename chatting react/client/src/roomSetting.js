import './App.css';
import {useEffect, useState} from 'react'
import {useNavigate} from "react-router-dom"

function RoomSetting({settingRoomState,room_id}) {
 
    const [roomName,setRoomName] = useState(""); 

    const [idKey,setidKey] = useState("");   

    const changeRoomName = async() =>{
        if(roomName!=="")
        {
            settingRoomState(false);

            const res =await fetch('http://localhost:3000/changeRoomName',{
                method :'PATCH',
                mode : 'cors',
                headers :{
                    'Content-Type': 'application/json'
                },
                body : JSON.stringify({
                    'origin' : room_id,
                    'changeName' : roomName,
                })
            })
        }   
    }

    const onRemove =() =>{
        if(window.confirm('Are you sure you want to delete it?')){
            deleteRoom(); 
        }
    }

    const deleteRoom = async() =>{

        settingRoomState(false);
        
        const res =await fetch('http://localhost:3000/deleteRoom',{
            method :'PATCH',
            mode : 'cors',
            headers :{
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({
                'origin' : room_id,
            })
        })    
    }

    useEffect(()=>{
        setidKey(room_id);
    },[])

  return (
    <div className="app">

      <div className='msger'>
        <div className='menuBatch'><p className='settingP'>Room Setting</p></div>
            <div className ="settingBox">
                <p className='settingP'>Change Room Name : </p>
                <input 
                className='inputData'
                type={'text'}
                value ={roomName}
                placeholder={'Name'}
                onChange = {(e)=>{
                    setRoomName(e.target.value)
                }}
            />
            </div>
            <div>
            <button className='makeroombutton' onClick={changeRoomName}>Room Name Change</button>  
            </div>
            <div>
            <button className='makeroombutton' onClick={onRemove}>Room Delete</button>    
            </div>
      </div>
    </div>
  );
}

export default RoomSetting;