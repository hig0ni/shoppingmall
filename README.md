![image](https://github.com/hig0ni/shoppingmall/assets/111436454/607ca53a-f71a-4598-90dc-145aebd7ecb6)

# THE Camping - Camping Shopping Mall 🏕️


💡 캠핑용품을 판매하는 쇼핑몰 웹 어플리케이션 이며, PC & Mobile 모두 호환되는 반응형 웹입니다.

https://https://meta-camping-service.com

## Tech Stack 🛠️
FrontEnd: Nextjs

BackEnd: Nestjs

DataBase: MySQL

+) GraphQL, TypeScript

## Main API 📢
회원가입, 로그인, 로그아웃
+ JWT 이용(AccessToken, RefreshToken)
+ 항상 호출되는 header에 RefreshToken을 이용해 AccessToken 재발급 받는 API 호출
+ 따라서 소셜로그인시 AccessToken을 발급 받지 않아도 RefreshToken을 이용해 AccessToken을 발급 받을 수 있다.


소셜로그인
+ passport 이용(Google, Kakao, Naver)
+ 소셜로그인마다 같은 이메일을 쓰는 경우가 있으므로 isAuth라는 column을 추가해 구분함
  ![image](https://github.com/hig0ni/shoppingmall/assets/111436454/e04dc8c8-759c-43f6-8003-05fb5156d8ba)


프로필 수정(비밀번호 수정, 닉네임 수정, 회원탈퇴)
+ 소셜로그인은 비밀번호 수정할 수 없게!
+ 소셜로그인의 닉네임은 이름 뒤에 random number를 추가하고 후에 변경하도록 설계 ex) 하이고니#567477



