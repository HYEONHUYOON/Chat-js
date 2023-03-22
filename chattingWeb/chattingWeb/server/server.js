const express = require('express');
const app = express();

//바디 데이터 파서
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const hhtp = require('http');
const cors = require('cors');

const axios = require('axios')

const router = express.Router();

const userData =[{
    id : "",
    roomNum : "",
}]

let receiveMessage = "";

//cors 에러 방지
app.use(cors({
    cors:{
        origin : 'https://localhost:3000/',
        methods:['GET','POST']
    }
}));

app.use(express.json());

//이 경로에서 사용 하겠다
app.use(express.static('C:\Users\윤현후\Desktop\chattingWeb\client\build'));

//http 서버 생성
const server = hhtp.createServer(app);

//get
app.get('/',function(req,res){
    console('connected');
})

//chat post 메세지 보냄
app.post('/chat',(req,res)=>{
    //res.header("Access-Control-Allow-Origin", "*");
    const{message} = req.body;
    receiveMessage = message;
    console.log(receiveMessage);
    return res.send('200');
})

//메세지 요청
app.get('/messaging',(req,res)=>{
    const sending = receiveMessage;
    return res.send(sending);
})

//home post id와 방번호 받음
app.post('/home',(req,res)=>{
    //res.header("Access-Control-Allow-Origin", "*");
    const{id,roomNum} = req.body;

    userData.push({
        id,
        roomNum
    })

    return res.send('200');
})

//리스닝 3001
server.listen(3000,()=>{
    console.log('listening');
});


