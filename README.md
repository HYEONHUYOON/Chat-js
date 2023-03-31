# 채팅 웹

<img width="1680" alt="스크린샷 2023-03-31 오후 2 06 47" src="https://user-images.githubusercontent.com/101074004/229051956-08664012-13c8-4a3c-9da0-282d554d49c3.png">


<img width="1680" alt="Chat" src="https://user-images.githubusercontent.com/101074004/229052312-857e8d94-326e-4ff5-9c0e-bcfd69096eb5.png">


---

프로젝트 기간 

2023/03/20 ~ 2023/03/30

---

개발 환경
* js
* react, node js
* http, express, socket io
* Mongo DB

---

# 구현

- 홈
    - 로그인 
    
        => POST로 아이디 패스워드 서버에 전달 

        => DB 에서 로그인 정보 find() 

        => 받은 body 정보와 비교

        => 정보가 맞다면 로그인 Sucess
- 회원가입 

    => POST로 아이디 패스워드 서버에 전달 
    
    => body 에서 아이디 패스워드 꺼내기
    
    => 난수 Salt 와 함께 패스워드 hashing 암호화 
    
    => 암호화된 패스워드, 난수 Salt, 아이디 DB에 save() 
- 채팅 리스트

    => DB 에서 방정보 받아오기 (READ)
        - 받아온 정보
        
    => 자신이 만든 채팅방이라면 Setting 버튼 활성화
    - 채팅방 입장전 닉네임 입력
    
    - 방입장
    - 방정보 변경 
    
- 방 생성 (CREATE)
- 방 정보 setting
    
    - 방 이름 변경 (UPDATE)
    
    - 방 삭제 (DELETE)
    
---


![chat diagram](https://user-images.githubusercontent.com/101074004/229051850-79f3c28b-c169-44fe-b34d-ea69482a2611.png)




