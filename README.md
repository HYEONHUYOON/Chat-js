# 채팅 웹

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

![Uploading 제목 없는 다이어그램.drawio-3.png…]()




