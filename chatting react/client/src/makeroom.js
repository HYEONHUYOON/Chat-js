import './App.css';
import {useEffect, useState} from 'react'
import {useNavigate} from "react-router-dom"

function MakeRoom({idprops}) {
    const navigate = useNavigate();

    const [roomName,setRoomName] = useState("");
    const [id,setId] = useState("");

    async function makeroom(){
        if(roomName!==""){
            const res = await fetch("http://localhost:3000/makeRoom",{
                method:'POST',
                mode:'cors',
                headers :{
                    'Content-Type': 'application/json'
                },
                body : JSON.stringify({
                    'roomName' : roomName,
                    'id' : id,
                })
            })
        }
        console.log("넘어가")
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

    useEffect(()=>{
        setId(idprops)
        console.log(id);
    },[])

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