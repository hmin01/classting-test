## 클래스팅(Classting) 백엔드 과제

아래 기능을 포함한 뉴스피드 API 구현

- 학교 소식을 발행할 수 있는 학교 페이지 생성 기능
- 학교 소식에 대한 CRUD 기능
- 학교 페이지 구독 및 구독 취소 기능
- 구독한 학교의 소식을 모아서 볼 수 있으며, 최신 순으로 노출
- 구독 취소를 하여도 기존 뉴스피드 조회 가능

### 구성

NestJS 프레임워크를 기반으로 API를 구현하였고, Swagger를 활용하여 각 API의 기능을 문서화하였습니다.

- http://13.125.252.118:3000/apis-doc 으로 접속하여 Swagger를 확인할 수 있습니다.

데이터베이스는 AWS DynamoDB 기반으로 School, News, Subscription 테이블로 구성하였습니다.

- School 테이블(= classting-school)은 학교 페이지 생성 과정에서 데이터를 저장하며, 지역(region)과 학교명(name)가 저장됩니다. 두 개의 데이터를 이용하여 해시 값을 생성하고 해당 값은 학교의 ID로써 파티션 키(Partition key)로 사용되고 저장됩니다.
- News 테이블(= classting-news)은 학교 소식이 저장되며, 파티션 키(Partition key)는 학교명, 정렬 키(Sort key)는 타임스탬프 형태에 소식 생성 시간입니다. 이외에 저장되는 값은 소식 내용, 수정 시간(Timestamp)가 있습니다.
- Subscription 테이블(= classting-subscription)은 학생(= 사용자)가 학교 소식을 수신하기 위한 학교를 구독하기 위한 데이터가 저장됩니다. 파티션 키(Partition key)는 사용자 ID, 정렬 키(Sort key)는 학교 ID입니다. 그 외에 구독 시작 시간과 구독 취소 시간이 타임스탬프(Timestamp) 형태로 저장됩니다.

### 설정

환경 변수

1. AWS DynamoDB를 사용하기 위한 AWS Configure 정보

```
AWS_ACCESS_KEY_ID=<aws_access_key_id>
AWS_SECRET_ACCESS_KEY=<aws_secret_access_key>
AWS_REGION=<region>
```

2. JWT 토큰 검증을 위한 시크릿 키로써 해당 프로젝트에서는 "classting"이라고 임시로 사용하였습니다.

```
JWT_SECRET=classting
```

### 기타 정보

- 사용자 ID는 임의로 지정하였으며, 해당 정보를 포함한 민감하지 않은 데이터로 JWT 토큰을 임의로 생성하여 사용하였습니다.

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwidXNlcl9pZCI6InRlc3QwMDEiLCJpYXQiOjE1MTYyMzkwMjJ9._ry6b2GfvBn7yjUGEYgZAqd_eksSLyMn32wO1ZGMR2A
```

- API 요청에 있어서 Header의 Authorization 속성에 추가하여 해당 사용자를 파악하는 AccessToken으로 사용하고자 하는 의도였습니다.
- 대량의 데이터에서 효율적인 쿼리가 가능하도록 DynamoDB 테이블에 파티션 키와 정렬 키를 설정하였습니다.

### 실행 및 테스트

0. node.js를 설치합니다.
1. 위 설명에 맞춰 환경 변수(.env)를 설정합니다.
2. `npm instsll` 명령을 통해 의존성을 가진 라이브러리들을 설치합니다.
3. 아래 명령들을 이용하여 실행 또는 테스트를 진행할 수 있습니다.
   - 개발 모드: npm run start:dev
   - 프로덕트 모드 (빌드 및 실행): `npm run build` 명령을 통해 빌드 후, `npm run start:prod` 명령으로 실행합니다.
   - 테스트: npm test
