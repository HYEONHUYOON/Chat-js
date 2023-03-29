const express = require('express');
const app = express();
const { json } = require('express');

const cors = require('cors');
const http = require('http');

const {Server} = require('socket.io');

require('dotenv').config();

//암호화
const crypto = require('crypto');

//DB
const mongoose = require('mongoose');
const {Schema} = require('mongoose')

//env !gitignore
const uri = process.env.DATABASE_URL;

//디비 연결
mongoose.connect(uri,{
    useNewUrlParser : true,
}).then(()=>{
    console.log("DB Connected");
}).catch(()=>{
    console.log("DB connect Fail");
})

//디비 스키마
let UserSchema = new Schema({
    user_id: {
      required: true,
      unique: true,
      type: String,
    },
    salt: {
        required: true,
        type: String,
      },
    password: {
      required: true,
      type: String,
    },
})

let RoomSchema = new Schema({

})

const userDataModel = mongoose.model('UserData', UserSchema)

//서버
const server = http.createServer(app);

const fs = require('fs')

// let userData =[{
//     key : "",
//     pw : "",
// }]

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

app.use(express.json());
app.use(cors());

//회원가입
app.post('/signin',(req,res)=>{
    console.log("sign in")
    res.header("Access-Control-Allow-Origin", "*");
    
    const{key,pw} = req.body;

    //추가적인 난수
    const salt = crypto.randomBytes(128).toString('base64');

    //스키마
    const userData = new userDataModel({
        user_id : key,
        salt : salt,
        password : crypto
        .createHash('sha512')
        .update(pw + salt)
        .digest('hex')
    });

    userData.save().then(()=>{
        console.log('sign up sucess');
    });
})

//로그인
app.post('/login',(req,res)=>{
    console.log("login")
    res.header("Access-Control-Allow-Origin", "*");
    
    const{key,pw} = req.body;

    // const salt = userDataModel.findOne({user_id : key}).then((err,docs)=>{
    //         if(pw === docs.pass)
    //         {
    //             console.log("A");
    //         }
    //         else{
    //             console.log("B");
    //         }
    //     }

    // );

    console.log(salt);

    //let idexist = ""; 

    // //아이디 비교
    // userData.map((data)=>{
    //     console.log(data.key)
    //     if(data.key === key)
    //     {
    //         idexist = key;
            
    //         console.log("ID exists")
    //         if(data.pw === pw)
    //         {
    //             return res.send('login Succes');  
    //         }
    //         else{
    //             return res.send('Password doesnt match'); 
    //         }
    //     }
    // })  

    // if(idexist === ""){
    //     console.log("ID does not exist")
    //     return res.send('ID does not exist');  
    // }
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

//방정보 
app.get('/reqroom',(req,res)=>{
    //console.log(roomData)
    return res.json(roomData)
})

//소켓
const io = new Server(server,{
    cors:{
        origin : 'http://localhost:3001',
        methods : ['GET','POST'],
    },
});

//소켓통신
io.on('connection',(socket)=>{
    console.log(`socket ${socket.id} connected`);

    socket.on('joinRoom',(num,name)=> {
        console.log(`socket ${socket.id} join`);
        socket.join(num);
        console.log(num);
        console.log(`enter ${name} ${num}`)
    })
    
    // socket.on('leaveRoom',()=>{
    //     console.log(`leave Room ${roomNum}`)
    //     socket.leave(roomNum);
    // });
 
    //메세지
    socket.on('sendMsg',(msgDatajson,roomNum)=>{
        
        console.log(msgDatajson)

        //메세지 반환
        socket.to(roomNum).emit('sendBackCasting',msgDatajson);
    })
})

server.listen(3000,()=>{
    console.log('listening');
})
