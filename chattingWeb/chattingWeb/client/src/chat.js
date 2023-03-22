import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Chat() {

    const [typingMessage,setTypingMessage] = useState("");
    const [messagePool,setMessagePool] = useState([]);

    //엔터
    const OnKeyPressEnter = (e) =>{
        if(typingMessage!==""){
            if(e.key === 'Enter'){
                console.log('press E')
                sendMessage();
            }
        }
    }

    //메세지 보내기 POST
    const sendMessage = async() =>{
        fetch("http://localhost:3000/chat",{
            method : 'POST',
            mode : 'cors',
            headers:{
            'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                'message' : typingMessage,
            })
        })
        .then(function(){
            //메세지 입력창 초기화
            setTypingMessage("");
        })
        .catch((res)=>
        console.log('faile'))
    }
    
    //메세지 요청 for polling 
    async function requsestMessage(){
        let res = await fetch(`http://localhost:3000/messaging`)
        .then(res => res.text())
        .then((res)=>{
            console.log(res);
            if(res!==""){
            setMessagePool((list)=>[...list,res])
            }
        })
    }
    
    //실시간 통신을 위해 polling 사용
    //렌더링 될 때 마다 pooling 되는것 을 막기 위해 useEffect 
    //useEffect는 렌더링시 1회 실행 되기 때문에 interval사용
    useEffect(() => {
        let polling = setInterval(() => {
            requsestMessage();
        }, 500);

        // 페이지에 벗어날 경우 polling X
        return () => {
            clearInterval(polling);
        };
    }, []);

    return (
        <div className="App">
            <div className ='App-header'>
            <div className='chat_wrap'>
                <div className='inner'>
                    {messagePool.map((contents)=>{
                        return(
                            <div className='item'>
                                <div className='msg'>
                                    <p>{contents}</p>
                                </div>
                            </div>
                        );
                    })}
                    <div>
            </div>
                </div>
                <div className=''>
                <input 
                    type={'text'} 
                    onKeyDown = {OnKeyPressEnter}
                    value = {typingMessage}
                    onChange={(e)=>{
                        setTypingMessage(e.target.value);
                }} />
                    <button onClick={sendMessage}>전송</button>
                </div>
                </div>
            </div>
        </div>
    );


   
}

export default Chat;
