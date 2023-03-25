const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http');
const {Server} = require('socket.io');
const { json } = require('express');

const server = http.createServer(app);

const fs = require('fs')
const today = new Date();

let userData =[{
    key : "",
    pw : "",
}]

let msgData={
    key : "",
    msg : "",
    time : "",
}

roomNumCount = 0;
let roomData=[{
    roomNum : roomNumCount,
    roomName : "",
}]

let userCount = 0;

const io = new Server(server,{
    cors:{
        origin : 'http://localhost:3001',
        methods : ['GET','POST'],
    },
});

app.use(express.json());
app.use(cors());

//회원가입
app.post('/signin',(req,res)=>{
    console.log("sign in")
    res.header("Access-Control-Allow-Origin", "*");
    
    const{key,pw} = req.body;

    if(userCount === 0){
        userData[0].key = key;
        userData[0].pw = pw;
    }
    else{
        userData.push({key,pw});
    }

    userCount++;

    console.log(userData.map((m)=>{
        console.log(m);
    }))
})

//로그인
app.post('/login',(req,res)=>{
    console.log("login")
    res.header("Access-Control-Allow-Origin", "*");
    
    const{key,pw} = req.body;

    //아이디 비교
    userData.map((data)=>{
        console.log(data.key)
        if(data.key === key)
        {
            console.log("ID exists")
            if(data.pw === pw)
            {
                return res.send('login Succes');  
            }
            else{
                return res.send('Password doesnt match'); 
            }
        }
        else{
            console.log("ID does not exist")
            return res.send('ID does not exist');  
        }
    })  
})

//채팅 방 생성
app.post('/makeRoom',(req,res)=>{
    console.log("MakeRoom")
    res.header("Access-Control-Allow-Origin", "*");
    
    const{key} = req.body;

    roomNumCount ++;

    if(roomNumCount === 1){
        roomData[0].roomNum = roomNumCount;
        roomData[0].roomName = key;
    }
    else{
        roomData.push({
            roomNum : roomNumCount,
            roomName : key,
        });
    }

    console.log(JSON.stringify(roomData))
    return res.send('MakeRoom');    
})

app.get('/reqroom',(req,res)=>{
    console.log(roomData)
    return res.json(roomData)
})

//소켓통신
io.on('connection',(socket)=>{
    console.log('socket connected');

    //방입장
    socket.on('joinRoom',(roomNum,name)=> {
        socket.join(roomNum);
        console.log(`enter ${name} ${roomNum}`)
    })
    
    // socket.on('leaveRoom',()=>{
    //     console.log(`leave Room ${roomNum}`)
    //     socket.leave(roomNum);
    // });
 
    //메세지
    socket.on('sendMsg',(msg,name,roomNum)=>{

        console.log('받음')
        console.log(roomNum);
        console.log(msg);
        //시간
        let hours = ('0' + today.getHours()).slice(-2); 
        let minutes = ('0' + today.getMinutes()).slice(-2);
        const time = hours.toString() + " : " + minutes.toString();

        //userMsg[0].key = key;
        msgData.msg = msg;
        msgData.time = time;
        msgData.key = name;

        //제이슨 파일 작성
        const msgDatajson = JSON.stringify(msgData)
        //fs.appendFile('msgData',msgDatajson);
        
        //메세지 반환
        io.to(roomNum).emit('sendBackCasting',(JSON.stringify(msgData)));
    })
})

server.listen(3000,()=>{
    console.log('listening');
})
