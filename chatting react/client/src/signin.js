import './App.css';
import {useState} from 'react'
import {useNavigate} from "react-router-dom"

function Signin() {

    const navigate = useNavigate();

    const [registId,setRegistId] = useState("");
    const [registPw,setRegistPw] = useState("");
    
    /**로그인 */
    const Signin =async()=>{
        if(registId !== ""&&registPw !==""){
        console.log(registId,registPw);
        fetch("http://localhost:3000/Signin",{
            method:'POST',
            mode:'cors',
            headers :{
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({
                'key' : registId,
                'pw' : registPw
            })
        })
        navigate('/');
    }
    }

    const OnKeyPressEnter = (e) =>{
        if(registId!==""&&registPw!==""){
            if(e.key === 'Enter'){
                console.log('press E')
                Signin();
                navigate('/');
            }
        }
    }
    
  return (
    <div className="app">

      <div className='msger'>
        <div className='menuBatch'>SiGN UP</div>

        <div className='menuBatch'>
            <input 
                className='inputData'
                type={'text'}
                placeholder={'ID'}
                onKeyDown ={OnKeyPressEnter}
                value = {registId}
                onChange = {(e)=>{
                    setRegistId(e.target.value); 
                }}
            />
            
            <input 
                className='inputData'
                type={'text'}
                placeholder={'PW'}
                onKeyDown ={OnKeyPressEnter}
                value = {registPw}
                onChange = {(e)=>{
                    setRegistPw(e.target.value); 
                }}
            />
      </div>

      <div className='menuBatch'>
        <button className='button' onClick={Signin}>Sign Up</button>
      </div>

      </div>

    </div>
  );
}

export default Signin;
