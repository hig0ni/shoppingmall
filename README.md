![image](https://github.com/hig0ni/shoppingmall/assets/111436454/9696d55d-7978-460b-a244-9d3222186672)


# THE Camping - Camping Shopping Mall 🏕️


💡 캠핑용품을 판매하는 쇼핑몰 웹 어플리케이션 이며, PC & Mobile 모두 호환되는 반응형 웹입니다.

## Tech Stack 🛠️
FrontEnd: Nextjs

BackEnd: Nestjs

DataBase: MySQL

+) GraphQL, TypeScript

## 💡 캠핑용품 쇼핑몰 Why?

학습하면서 배운 로그인, 회원가입, 결제, 이미지 업로드 등 다양한 API를 적용해 볼 수 있는 서비스여서 선택

## **📢 Main API**

# User

### 1️⃣ 회원가입, 로그인, 로그아웃
![1](https://github.com/hig0ni/shoppingmall/assets/111436454/738f82e8-67d3-4a79-a2f8-5d4803ede668)
![2](https://github.com/hig0ni/shoppingmall/assets/111436454/dc6114d4-8602-432a-afb7-de2f566a1b26)
![3](https://github.com/hig0ni/shoppingmall/assets/111436454/8935381b-7534-463c-90ca-7c9305f1c660)

- JWT 이용(AccessToken, RefreshToken)
- 보안을 위해 AccessToken의 만료시간을 짧게 설정 ⇒ RefreshToken이 있어서 괜찮음!
- 항상 호출되는 header에 RefreshToken을 이용해 AccessToken 재발급 받는 API 호출
- 따라서 소셜로그인시 AccessToken을 발급 받지 않아도 RefreshToken을 이용해 AccessToken을 발급 받을 수 있다.

- AccessToken은 recoil을 사용해 변수에 저장하고 RefreshToken은 쿠키에 저장

![4](https://github.com/hig0ni/shoppingmall/assets/111436454/c0999e3d-428d-4e58-9afd-0645b442123c)

- 로그아웃 시 RefreshToken을 클라이언트에서 쿠키 삭제 하던 방식으로 처리하였으나, httpOnly 설정으로 바꾸고 난 후 클라이언트에서 삭제가 불가능해서 서버로 요청을 보내 서버에서 쿠키 삭제하는 방식으로 처리

### 2️⃣ 소셜로그인

- passport 이용(Google, Kakao, Naver)
- 각 소셜로그인 마다 같은 이메일을 쓰는 경우가 있으므로 isAuth라는 column을 추가해 구분함

![5](https://github.com/hig0ni/shoppingmall/assets/111436454/4309dff2-ca1a-44c3-8261-74fe3e964352)

### 3️⃣ 프로필 수정(비밀번호 수정, 닉네임 수정, 회원탈퇴)
![6](https://github.com/hig0ni/shoppingmall/assets/111436454/72a0c027-ae89-403d-8760-7238baf88823)
![7](https://github.com/hig0ni/shoppingmall/assets/111436454/18b30500-c191-40df-a824-a0d20ea90ca6)
![8](https://github.com/hig0ni/shoppingmall/assets/111436454/8397a3a3-d409-40b3-b86e-986dda60c905)

- 소셜로그인은 비밀번호 수정할 수 없게!
- 소셜로그인의 닉네임은 이름 뒤에 random number를 추가하고 후에 변경하도록 설계 ex) 하이고니#567477
![33](https://github.com/hig0ni/shoppingmall/assets/111436454/937b5275-1885-43bc-a198-e1305e38f814)
![34](https://github.com/hig0ni/shoppingmall/assets/111436454/7bd92e0a-c76d-4be5-8ae6-d4f221dffce9)

# Product

### 1️⃣ 상품 목록 가져오기

- 처음 상품 페이지(/products)에 들어가면 전체 상품의 목록을 가져온다.

![9](https://github.com/hig0ni/shoppingmall/assets/111436454/0e49acae-8839-4ebb-9ebd-c17cbb3b78be)

- 이후 카테고리를 선택하면 전체 상품 중에서 해당 카테고리만 필터링해서 보여준다.

![10](https://github.com/hig0ni/shoppingmall/assets/111436454/89b3f1bb-2ea3-4dad-bb68-7e4b0df4efed)

### 2️⃣ 상품 검색

- 검색창에 단어 검색 시 해당 단어를 포함하는 상품을 모두 가져와서 그 목록을 보여준다.

![11](https://github.com/hig0ni/shoppingmall/assets/111436454/7e14d32f-a9d6-44af-a16b-6b7306482f38)

### 3️⃣ 상품 상세보기

![12](https://github.com/hig0ni/shoppingmall/assets/111436454/87861bd2-b9a4-446d-bdd0-119764c7d0bf)

- 상세보기는 사진, 상품명, 가격, 상품 설명으로 되어 있고, 사진은 상품 등록 시 gcp에 저장한 이미지를 가져온다.

### 4️⃣ 상품 등록

![13](https://github.com/hig0ni/shoppingmall/assets/111436454/647263c4-05fc-479e-9bf2-dc3c1c0d15e7)

- 이미지는 gcp에 저장해서 다운로드 받을 url을 가져온다.
- 상품 등록 시 상품명, 상품 설명, 가격, 카테고리, url을 저장한다.

### 5️⃣ 상품 수정

진행중

### 6️⃣ 상품 삭제

진행중

# Point

### 1️⃣ 포인트 충전

![14](https://github.com/hig0ni/shoppingmall/assets/111436454/9820f556-16d4-48a5-a779-c0ff7428b087)
![15](https://github.com/hig0ni/shoppingmall/assets/111436454/48ffaf09-d131-4067-a08d-9c5c3cb7629b)

- 포트원 라이브러리를 사용해 KaKaoPay로 결제해서 포인트 충전
- 충전할 금액을 선택한 후 KaKaoPay 버튼을 누르면 결제창으로 이동하며 성공 시 제공 받는 impUid와 amount를 이용해서 DB에 저장
![20](https://github.com/hig0ni/shoppingmall/assets/111436454/99cb33a6-c097-41b1-95cb-4dd1a0029ee2)

### 2️⃣ 충전 내역 조회
![16](https://github.com/hig0ni/shoppingmall/assets/111436454/0f86f02e-51a2-4fae-a919-e2a752b0367e)


- 충전 내역은 아직 환불 하지 않은 충전 목록을 보여준다.
- 따라서 server에서 data를 보내줄 때 아직 cancle되지 않은 목록만 가져와야함
- 로직은 1. status가 CANCEL인 `impuid` 조회 2. typeorm의 ‘not’, ‘in’을 이용해서 'CANCEL' 상태의 `impUid`를 제외한 결과를 return 한다.

### 3️⃣ 포인트 환불
![17](https://github.com/hig0ni/shoppingmall/assets/111436454/64d4f84d-e615-46a8-95ad-5069b42bc663)
![18](https://github.com/hig0ni/shoppingmall/assets/111436454/a928811a-7f36-414c-bb9d-e4555d5f8269)

- 충전 내역에서 환불하고 싶은 내역을 선택하면 알림창이 뜨고 확인을 누르면 환불 api를 요청한다.
- 로직은 1. 결제내역 조회 2. 이미 취소됐던 pointTransactions 인지 검증 3. 포인트가 취소하기에 충분히 있는지 검증
- 모두 통과하면 iamport로 취소 요청을 보내고 DB에 amount는 -amount, status는 CANCEL인 데이터를 추가한다.

![19](https://github.com/hig0ni/shoppingmall/assets/111436454/f85db57a-d25b-4647-9402-bbd09dcdf8f9)


+) 이후 해야 할 것

상품 수정,

상품 삭제,

포인트로 상품 결제,

상품 개수에 따라 리스트 만들기(ex: 1/5)

