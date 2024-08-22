FROM node:latest

# docker build optimization: 도커 캐시를 활용할 수 있는 부분은 먼저 COPY하기
COPY ./package.json /myfolder/
COPY ./yarn.lock /myfolder/
WORKDIR /myfolder/
RUN yarn install

# 나머지 변경이 잦은 내용(즉 코드) 복사
COPY . /myfolder/

CMD yarn start:dev