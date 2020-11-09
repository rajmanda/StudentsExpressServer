#FROM node:7
# base image
FROM node:12.2.0

WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
CMD npm start
EXPOSE 3000

#https://buddy.works/guides/how-dockerize-node-application
# docker build -t studentsapi ./   {builds the docker image}
# docker run -d -p 8080:3000 docker.io/library/studentsapi
# open browser t localhost:8080/students
