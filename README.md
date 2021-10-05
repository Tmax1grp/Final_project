# Final_project
# 재택 학습 플랫폼 
- 기관: 한국 품질 재단, 티맥스 클라우드 - 클라우드 네이티브 개발자 양성 과정
- 구성 인원: 4명(FE 2명, BE 3명)

## 주제
Spring Boot, Spring Cloud, Kafka, React를 활용하여 책을 주제로 한 온라인 서점 개발

## 목적
- MSA 구조 온라인 서점 개발을 하며 MSA 기초 경험
- 설계부터 배포까지 웹 개발 사이클 간접적 경험
- 협업 능력 향상
  - API 설계서를 통한 프론트엔드와 협업
  - 이슈 발생 시 동료와 함께 해결
  - 일정 관리, 역할 분담, 협업 툴(Github, google spreadsheet, presentation, freedcamp 등)
- AWS에 컨테이너 기반 Micro Service 배포

## 설계 문서
- [설계 문서](https://docs.google.com/spreadsheets/d/1RMjJhBACs4M5Lf2PFYwSV22JbhALD7Ir3AbgMmGk_lA/edit?usp=sharing)
  - 요구사항 정의서
  - API 설계서
- [화면 설계서](https://docs.google.com/presentation/d/1tjjttfJEs4hcG_XkakWIzEYK-_Jn_Pw7wDECue57YrU/edit?usp=sharing)
- [버전 관리](https://github.com/jjiiiiinie/Module_pjt3_Group1)

## 개발 일정
![image](https://user-images.githubusercontent.com/42633180/135300809-d2ffea27-ee8f-4214-84d0-6ade4f23df93.png)

## 구조
![image](https://user-images.githubusercontent.com/42633180/135304814-16436f30-7e7e-4556-8222-81b123067313.png)
![image](https://user-images.githubusercontent.com/42633180/135322718-253108e0-5ad1-445a-8c34-092a6581eb37.png)

## 환경
### 프론트엔드
- Programming Language: HTML, CSS/SCSS, JS
- Web: Node.js 14.17.6, React(17.0.2), Axios(0.21.1)

### 백엔드
- Programming Language: Java 11
- Web: Spring Boot 2.5.x, Spring Cloud
- Container Platform : Docker 20.10.x
- Cloud: AWS(EC2) Amazone-Linux
- Database: AWS RDS MariaDB
- ETC: Kafka 2.7.0, RabbitMQ 3.9

