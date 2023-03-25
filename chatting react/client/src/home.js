import './App.css';
import {useState} from 'react'
import {useNavigate} from "react-router-dom"

function Home() {

    const navigate = useNavigate();

    const [id,setId] = useState("");
    const [pw,setPw] = useState("");
    
    /**로그인 */
    async function Login(){
        if(id!==""&&pw!==""){
        let res = await fetch("http://localhost:3000/login",{
            method:'POST',
            mode:'cors',
            headers :{
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({
                'key' : id,
                'pw' : pw
            })
        })
        .then(res => res.text())
        .then((res)=>{
            console.log(res);
            if(res === "login Succes"){
                navigate('/chatlist');
            }
            else{
                alert(res);
            }
        })
    }
    }

    function Signin(){
        navigate('/Signin');
    }

    const OnKeyPressEnter = (e) =>{
        if(id!==""&&pw!==""){
            if(e.key === 'Enter'){
                console.log('press E')
                Login();
            }
        }
    }
    
  return (
    <div className="app">

      <div className='msger'>
        <div className='menuBatch'>LOGIN</div>

        <div className='menuBatch'>
            <input 
                className='inputData'
                type={'text'}
                placeholder={'ID'}
                onKeyDown ={OnKeyPressEnter}
                value = {id}
                onChange = {(e)=>{
                    setId(e.target.value); 
                }}
            />
            
            <input 
                className='inputData'
                type={'text'}
                placeholder={'PW'}
                onKeyDown ={OnKeyPressEnter}
                value = {pw}
                onChange = {(e)=>{
                    setPw(e.target.value); 
                }}
            />
      </div>

      <div className='menuBatch'>
        <button className='button' onClick={Login}>Login</button>
      </div>

      <div className='menuBatch'>
        <button className='button' onClick={Signin}>Sign up</button>

      </div>

      </div>

    </div>
  );
}

export default Home;
