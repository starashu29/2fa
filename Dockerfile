FROM node:slim
COPY . /app
WORKDIR /app
RUN npm i
CMD npm start
