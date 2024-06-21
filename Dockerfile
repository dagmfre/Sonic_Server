ARG NODE_VERSION=20.12.2

FROM node:${NODE_VERSION}-alpine

ENV MONGODB_URI=mongodb://dagmfre:dag%4013645440@ac-i9nn5ua-shard-00-00.rkrulns.mongodb.net:27017,ac-i9nn5ua-shard-00-01.rkrulns.mongodb.net:27017,ac-i9nn5ua-shard-00-02.rkrulns.mongodb.net:27017/userSongsData?ssl=true&replicaSet=atlas-l4b87f-shard-0&authSource=admin&retryWrites=true&w=majority&appName=FirstCluster
ENV SECRET_KEY=jA2n!vG8@zNcT4*rP6yQkL5&wX9bUvM7oFsZdRg3JmBpHx
ENV PORT=5000

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=3001

EXPOSE 3001

CMD ["node", "index"]
