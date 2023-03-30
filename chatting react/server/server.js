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

//방 데이터
let RoomSchema = new Schema({
    roomName:{
        required: true,
        type: String,
    },
    roomMaker: {
        required: true,
        type: String,
    },
})

const userDataModel = mongoose.model('UserData', UserSchema);
const roomDataModel = mongoose.model('RoomData', RoomSchema);

//서버
const server = http.createServer(app);

const fs = require('fs');

let msgData={
    key : "",
    msg : "",
    time : "",
}

app.use(express.json());
app.use(cors());

//회원가입
app.post('/signin',(req,res)=>{
    console.log("sign in")
    res.header("Access-Control-Allow-Origin", "*");
    
    const{key,pw} = req.body;

    //추가적인 난수
    const salt = crypto.randomBytes(128).toString('base64');

    //유저 정보 스키마
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
app.post('/login',async(req,res)=>{
    console.log("login")
    res.header("Access-Control-Allow-Origin", "*");
    
    const{key,pw} = req.body;

    //디비 정보 탐색
    const isExist = await userDataModel.exists({user_id : key});

    //값이 존재 한다면
    if(isExist)
    {
        const docs = await userDataModel.find({user_id : key});

        //비밀번호 확인
        docs.map((doc)=>{   
            console.log(doc.user_id);
            //hash 비교
            if(crypto
                .createHash('sha512')
                .update(pw + doc.salt)
                .digest('hex') === doc.password)
                {
                    console.log(`${key} login Succes`);
                    return res.send('login Succes');
                }
                //비밀번호 불일치
                else{
                    return res.send('Password doesnt match'); 
                }
        })
    }
    else{
        return res.send('ID does not exist'); 
    }
   
})

//채팅 방 생성
app.post('/makeRoom',(req,res)=>{
    console.log("MakeRoom")
    res.header("Access-Control-Allow-Origin", "*");
    
    const{roomName,id} = req.body;

    console.log(roomName,id);

    //방 정보 스키마
    const roomData = new roomDataModel({
        roomName : roomName,
        roomMaker : id,
    });

    //방 등록
    roomData.save().then(()=>{
        console.log('Room Make Sucess');
        return res.send('MakeRoom');    
    });
})

//방이름 바꾸기
app.patch('/changeRoomName',async(req,res)=>{
    console.log('changeRoomName');
    const {origin,changeName} = req.body;

    console.log(origin);
    console.log(changeName);

    const pass = await roomDataModel.updateOne({_id:origin},{$set : {roomName: changeName}});

    return res.status(200);
})

app.patch('/deleteRoom',async(req,res)=>{
    console.log('deleteRoom');
    const {origin,changeName} = req.body;

    console.log(origin);
    console.log(changeName);

    const pass = await roomDataModel.deleteOne({_id:origin});

    return res.status(200);
})

//방정보 
app.get('/reqroom',async(req,res)=>{

    //방 정보 유무
    const isExist = await roomDataModel.exists();

    if(isExist){
        console.log("방 존재")
        const docs = await roomDataModel.find();

        return res.json(docs);
    }


    //return res.json(roomData)
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
    //     //socket.leave(roomNum);
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
