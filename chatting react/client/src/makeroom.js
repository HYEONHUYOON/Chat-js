import './App.css';
import {useState} from 'react'
import {useNavigate} from "react-router-dom"

function MakeRoom() {
    const navigate = useNavigate();

    const [roomName,setRoomName] = useState("");

    async function makeroom(){
        if(roomName!==""){
            const res = await fetch("http://localhost:3000/makeRoom",{
                method:'POST',
                mode:'cors',
                headers :{
                    'Content-Type': 'application/json'
                },
                body : JSON.stringify({
                    'key' : roomName,
                })
            })
        }
        navigate('/chatlist');
    }

    const OnKeyPressEnter = (e) =>{
        if(roomName!==""){
            if(e.key === 'Enter'){
                console.log('press E')
                makeroom();
            }
        }
    }

  return (
    <div className="app">

      <div className='msger'>
        <div className='menuBatch'>Chat Room</div>
        <div className='menuBatch'>
            <div>
                <input 
                className='inputData' 
                placeholder='Room Name'
                onKeyDown={OnKeyPressEnter}
                onChange ={(e)=>{
                    setRoomName(e.target.value);
                }}
                /> 
            </div>
            <div>
                <button className='button' onClick={makeroom}>CREATE</button>    
            </div>
      </div>
      </div>
    </div>
  );
}

export default MakeRoom;