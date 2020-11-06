FROM node:7
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
CMD npm start
EXPOSE 3000

#https://buddy.works/guides/how-dockerize-node-application