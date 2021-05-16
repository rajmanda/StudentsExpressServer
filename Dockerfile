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
# docker build -t studentsexpressserver ./   {builds the docker image}
# docker run -d -p 8080:3000 docker.io/library/studentsexpressserver
# open browser t localhost:8080/students

# To Push the image to Docker Hub
# Create the  students-express-server in docker hub.
# docker tag studentsexpressserver:latest  dockerrajmanda/students-express-server:latest
# docker push dockerrajmanda/students-express-server:latest